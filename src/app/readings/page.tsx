import { getAllReadings } from '@/lib/readings';
import { ReadingsClient } from '@/components/ReadingsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Readings',
  description: 'Papers and concepts I have read and summarized.',
};

export default function ReadingsPage() {
  const readings = getAllReadings();
  const allLabels = Array.from(
    new Set(readings.flatMap((r) => r.labels))
  ).sort();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14">
      <h1 className="text-3xl font-bold text-text mb-1">Readings</h1>
      <p className="text-text-muted italic text-sm mb-8">
        Papers and concepts I&apos;ve read through, with notes.
      </p>
      <ReadingsClient readings={readings} allLabels={allLabels} />
    </div>
  );
}
