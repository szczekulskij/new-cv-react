'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import type { Reading } from '@/lib/readings';

type Props = {
  readings: Reading[];
  allLabels: string[];
};

export function ReadingsClient({ readings, allLabels }: Props) {
  const [activeLabels, setActiveLabels] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return readings.filter((r) => {
      // Label filter
      if (activeLabels.length > 0) {
        const hasLabel = activeLabels.some((l) => r.labels.includes(l));
        if (!hasLabel) return false;
      }
      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q) ||
          (r.authors || '').toLowerCase().includes(q) ||
          r.labels.some((l) => l.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [readings, activeLabels, search]);

  const toggleLabel = (label: string) => {
    setActiveLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search papers & concepts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-transparent border border-border rounded focus:outline-none focus:border-accent placeholder:text-text-light"
        />
      </div>

      {/* Labels */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveLabels([])}
          className={`text-xs font-mono tracking-widest px-2 py-1 border rounded transition-colors ${
            activeLabels.length === 0
              ? 'bg-text text-bg border-text'
              : 'border-border text-text-muted hover:border-text hover:text-text'
          }`}
        >
          ALL
        </button>
        {allLabels.map((label) => (
          <button
            key={label}
            onClick={() => toggleLabel(label)}
            className={`text-xs font-mono tracking-widest px-2 py-1 border rounded transition-colors ${
              activeLabels.includes(label)
                ? 'bg-text text-bg border-text'
                : 'border-border text-text-muted hover:border-text hover:text-text'
            }`}
          >
            {label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-text-muted text-sm py-8">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((reading) => (
            <Link
              key={reading.slug}
              href={`/readings/${reading.slug}`}
              className="group block p-4 border border-border rounded hover:border-accent/50 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                {reading.labels.map((label) => (
                  <span
                    key={label}
                    className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 border border-border rounded text-text-muted uppercase"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <h2 className="text-sm font-bold text-text group-hover:text-accent transition-colors mb-1.5 line-clamp-2">
                {reading.title}
              </h2>
              {reading.authors && (
                <p className="text-[11px] text-text-light mb-2 line-clamp-1">
                  {reading.authors}
                </p>
              )}
              <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                {reading.summary}
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
