import Link from 'next/link';
import { getAllSeries } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intro Series',
  description: 'Multi-part series working through foundational topics in systems and software.',
};

export default function SeriesIndexPage() {
  const series = getAllSeries();

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold text-text mb-1">Intro Series</h1>
      <p className="text-text-muted italic text-sm mb-10">
        Multi-part deep dives, one topic at a time.
      </p>

      {series.length === 0 ? (
        <p className="text-text-muted py-8 text-sm">No series yet. Check back soon!</p>
      ) : (
        <div className="grid gap-3">
          {series.map((s) => (
            <Link
              key={s.slug}
              href={`/series/${s.slug}`}
              className="block p-4 border border-border rounded group hover:border-accent transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <h2 className="text-sm font-bold text-text group-hover:text-accent transition-colors">
                  {s.title}
                </h2>
                <span className="text-[10px] font-mono text-text-light whitespace-nowrap">
                  {s.posts.length} PARTS
                </span>
              </div>
              {s.description && (
                <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                  {s.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
