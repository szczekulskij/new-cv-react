import { getReadingBySlug, getAllReadings } from '@/lib/readings';
import { format } from 'date-fns';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  const readings = getAllReadings();
  return readings.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const reading = getReadingBySlug(params.slug);
  return {
    title: reading.title,
    description: reading.summary,
  };
}

export default function ReadingPage({ params }: Props) {
  const reading = getReadingBySlug(params.slug);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-8 py-14">
      <Link
        href="/readings"
        className="inline-flex items-center text-text-muted hover:text-text mb-8 transition-colors font-mono text-xs tracking-widest"
      >
        ← BACK
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {reading.labels.map((label) => (
            <span
              key={label}
              className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 border border-border rounded text-text-muted uppercase"
            >
              {label}
            </span>
          ))}
          {reading.date && (
            <span className="text-xs font-mono text-text-light">
              {format(new Date(reading.date), 'MMM yyyy')}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">
          {reading.title}
        </h1>
        {reading.authors && (
          <p className="text-xs text-text-muted mb-2">{reading.authors}</p>
        )}
        {reading.source && (
          <p className="text-xs text-text-light">
            Source:{' '}
            {reading.sourceUrl ? (
              <a href={reading.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline underline-offset-2">
                {reading.source}
              </a>
            ) : (
              reading.source
            )}
          </p>
        )}
      </header>

      {/* Summary box */}
      <div className="bg-bg-card border border-border rounded p-4 mb-8">
        <p className="text-xs font-mono tracking-widest text-text-muted uppercase mb-2">Summary</p>
        <p className="text-sm text-text leading-relaxed">{reading.summary}</p>
      </div>

      {/* Full notes */}
      <div
        className="prose text-sm"
        dangerouslySetInnerHTML={{ __html: reading.content }}
      />
    </article>
  );
}
