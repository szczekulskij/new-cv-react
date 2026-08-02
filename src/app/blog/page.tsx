import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Thoughts on AI, distributed systems, and software engineering.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold text-text mb-1">Writing</h1>
      <p className="text-text-muted italic text-sm mb-10">
        Writings on systems, AI and whatever else is on my mind.
      </p>

      <div className="divide-y divide-border">
        {posts.length === 0 ? (
          <p className="text-text-muted py-8 text-sm">No posts yet. Check back soon!</p>
        ) : (
          posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block py-5 group">
              <div className="flex items-start gap-5">
                {post.date && (
                  <span className="text-[10px] font-mono text-text-light whitespace-nowrap mt-1 hidden sm:block">
                    {format(new Date(post.date), 'MMM yyyy')}
                  </span>
                )}
                <div className="flex-1">
                  <h2 className="text-sm font-bold text-text group-hover:text-accent transition-colors mb-1">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-text-muted text-xs leading-relaxed line-clamp-2 mb-2">
                      {post.description}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 border border-border rounded text-text-muted">
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
