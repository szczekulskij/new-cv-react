import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const seriesDirectory = path.join(postsDirectory, 'series');

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  technologies?: string;
  ghLink?: string;
  content: string;
};

export type SeriesPost = BlogPost & {
  series: string;
  seriesOrder: number;
};

export type Series = {
  slug: string;
  title: string;
  description: string;
  order: number;
  tags: string[];
  content: string;
  posts: SeriesPost[];
};

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(
      (name) =>
        (name.endsWith('.md') || name.endsWith('.mdx')) &&
        !name.startsWith('_')
    )
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, '');
      return getPostBySlug(slug);
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(rawSlug: string): BlogPost {
  const slug = decodeURIComponent(rawSlug);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);

  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const htmlContent = remark().use(html, { sanitize: false }).processSync(content).toString();

  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString() : '',
    description: data.description || '',
    tags: data.tags || [],
    technologies: data.technologies,
    ghLink: data.GHlink || data.ghLink,
    content: htmlContent,
  };
}



export function getAllSeries(): Series[] {
  if (!fs.existsSync(seriesDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(seriesDirectory, { withFileTypes: true });
  const series = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => getSeriesBySlug(entry.name))
    .filter((s): s is Series => s !== null);

  return series.sort((a, b) => a.order - b.order);
}

export function getSeriesBySlug(seriesSlug: string): Series | null {
  const dir = path.join(seriesDirectory, seriesSlug);
  if (!fs.existsSync(dir)) {
    return null;
  }

  const metaPath = fs.existsSync(path.join(dir, '_series.md'))
    ? path.join(dir, '_series.md')
    : path.join(dir, '_series.mdx');

  let meta: { [key: string]: any } = {};
  let metaContent = '';
  if (fs.existsSync(metaPath)) {
    const raw = fs.readFileSync(metaPath, 'utf8');
    const parsed = matter(raw);
    meta = parsed.data;
    metaContent = remark()
      .use(html, { sanitize: false })
      .processSync(parsed.content)
      .toString();
  }

  // TEMP: hide database lectures 9-25 for now. Remove this to bring them back.
  const hiddenSeriesOrders =
    seriesSlug === 'databases'
      ? new Set(Array.from({ length: 25 - 9 + 1 }, (_, i) => i + 9))
      : new Set<number>();

  const posts = fs
    .readdirSync(dir)
    .filter(
      (name) =>
        (name.endsWith('.md') || name.endsWith('.mdx')) &&
        !name.startsWith('_')
    )
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, '');
      return getSeriesPostBySlug(seriesSlug, slug);
    })
    .filter((post) => !hiddenSeriesOrders.has(post.seriesOrder))
    .sort((a, b) => a.seriesOrder - b.seriesOrder);

  return {
    slug: seriesSlug,
    title: meta.title || seriesSlug,
    description: meta.description || '',
    order: typeof meta.order === 'number' ? meta.order : 999,
    tags: meta.tags || [],
    content: metaContent,
    posts,
  };
}

export function getSeriesPostBySlug(
  seriesSlug: string,
  slug: string
): SeriesPost {
  const dir = path.join(seriesDirectory, seriesSlug);
  const mdPath = path.join(dir, `${slug}.md`);
  const mdxPath = path.join(dir, `${slug}.mdx`);

  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const htmlContent = remark()
    .use(html, { sanitize: false })
    .processSync(content)
    .toString();

  return {
    slug,
    series: seriesSlug,
    seriesOrder: typeof data.seriesOrder === 'number' ? data.seriesOrder : 999,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString() : '',
    description: data.description || '',
    tags: data.tags || [],
    technologies: data.technologies,
    ghLink: data.GHlink || data.ghLink,
    content: htmlContent,
  };
}
