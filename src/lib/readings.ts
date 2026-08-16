import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const readingsDirectory = path.join(process.cwd(), 'content/readings');

export type Reading = {
  slug: string;
  title: string;
  date: string;
  labels: string[];
  summary: string;
  authors?: string;
  source?: string;
  sourceUrl?: string;
  content: string;
};

const DRAFT_MARKER = 'TODO: DO NOT INCLUDE IN WEBSITE YET';

function isFileExcluded(filePath: string): boolean {
  const raw = fs.readFileSync(filePath, 'utf8');
  return raw.includes(DRAFT_MARKER);
}

export function getAllReadings(): Reading[] {
  if (!fs.existsSync(readingsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(readingsDirectory);
  const readings = fileNames
    .filter(
      (name) =>
        (name.endsWith('.md') || name.endsWith('.mdx')) &&
        !name.startsWith('_')
    )
    .filter((name) => {
      const filePath = path.join(readingsDirectory, name);
      return !isFileExcluded(filePath);
    })
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, '');
      return getReadingBySlug(slug);
    });

  return readings.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getReadingBySlug(rawSlug: string): Reading {
  const slug = decodeURIComponent(rawSlug);
  const mdPath = path.join(readingsDirectory, `${slug}.md`);
  const mdxPath = path.join(readingsDirectory, `${slug}.mdx`);

  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const htmlContent = remark().use(html, { sanitize: false }).processSync(content).toString();

  return {
    slug,
    title: data.title || slug,
    date: data.date ? new Date(data.date).toISOString() : '',
    labels: data.labels || [],
    summary: data.summary || '',
    authors: data.authors,
    source: data.source,
    sourceUrl: data.sourceUrl,
    content: htmlContent,
  };
}


