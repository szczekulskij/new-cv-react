import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSeries, getSeriesBySlug } from '@/lib/blog';
import type { Metadata } from 'next';

type Props = {
  params: { series: string };
};

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ series: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const series = getSeriesBySlug(params.series);
  if (!series) return {};
  return {
    title: series.title,
    description: series.description,
  };
}

export default function SeriesPage({ params }: Props) {
  const series = getSeriesBySlug(params.series);

  if (!series) {
    notFound();
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-14">
      <Link
        href="/series"
        className="inline-flex items-center text-text-muted hover:text-text mb-8 transition-colors font-mono text-[10px] tracking-widest"
      >
        ← BACK
      </Link>

      <div className="mb-2 font-mono text-[10px] tracking-widest text-accent">
        SERIES
      </div>
      <h1 className="text-3xl font-bold text-text mb-2">{series.title}</h1>
      {series.description && (
        <p className="text-text-muted text-sm mb-6 leading-relaxed">
          {series.description}
        </p>
      )}

      {series.content && (
        <div
          className="prose text-sm mb-10"
          dangerouslySetInnerHTML={{ __html: series.content }}
        />
      )}

      <div className="divide-y divide-border">
        {series.posts.length === 0 ? (
          <p className="text-text-muted py-8 text-sm">No posts in this series yet.</p>
        ) : (
          series.posts.map((post) => (
            <Link
              key={post.slug}
              href={`/series/${series.slug}/${post.slug}`}
              className="block py-5 group"
            >
              <div className="flex items-start gap-4">
                <span className="text-[10px] font-mono text-text-light whitespace-nowrap mt-1 w-6">
                  {String(post.seriesOrder).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h2 className="text-sm font-bold text-text group-hover:text-accent transition-colors mb-1">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
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
