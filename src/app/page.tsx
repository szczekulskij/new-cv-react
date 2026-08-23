import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { getAllReadings } from '@/lib/readings';
import { format } from 'date-fns';

type RecentItem = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags: string[];
  type: 'blog' | 'reading';
};

const highlights = [
  { stat: '$450M+', label: 'estimated annual impact from features shipped at Amazon' },
  { stat: '10M+', label: 'daily requests served by systems I helped design' },
  { stat: '4', label: 'publications, incl. co-author of an ICRA 2025 robotics paper and an AI-in-medicine study' },
];

export default function Home() {
  const posts: RecentItem[] = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    description: p.description,
    tags: p.tags,
    type: 'blog',
  }));

  const readings: RecentItem[] = getAllReadings().map((r) => ({
    slug: r.slug,
    title: r.title,
    date: r.date,
    description: r.summary,
    tags: r.labels,
    type: 'reading',
  }));

  const recentItems = [...posts, ...readings]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8">
      {/* Hero */}
      <section className="pt-16 pb-10">
        <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-8">
        <div>
          <p className="text-xs font-mono tracking-widest text-accent uppercase mb-4">
            Software Engineer · Distributed Systems · AI
          </p>
          <h1 className="text-4xl font-bold text-text leading-tight mb-5 tracking-tight">
            Hi, I&apos;m Jan.
          </h1>
          <p className="text-text text-base leading-relaxed mb-4 max-w-xl">
            I&apos;m a Software Development Engineer at{' '}
            <a href="http://amazon.com/" className="text-accent hover:text-accent-hover underline underline-offset-2">Amazon</a>,
            {' '}where I design and build distributed systems that operate at scale. I&apos;m a recent
            M.S. Computer Science graduate of{' '}
            <a href="https://ucsd.edu" className="text-accent hover:text-accent-hover underline underline-offset-2">UCSD</a>,
            {' '}where I focused on systems and AI.
          </p>
          <p className="text-text text-base leading-relaxed mb-7 max-w-xl">
            Alongside my day job, I collaborate with the{' '}
            <a href="https://contextualrobotics.ucsd.edu/" className="text-accent hover:text-accent-hover underline underline-offset-2">Contextual Robotics Institute</a>
            {' '}on robotics research, and partner with Lazarski University on AI applications in medicine.
            Recent work includes{' '}
            <a href="https://arxiv.org/abs/2411.10899" className="text-accent hover:text-accent-hover underline underline-offset-2">a paper on tabletop object rearrangement</a>
            {' '}(ICRA 2025) and{' '}
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13095918/" className="text-accent hover:text-accent-hover underline underline-offset-2">a treatment-outcome study for Port-Wine Stain birthmarks</a>.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link
              href="/cv"
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest px-4 py-2.5 bg-text text-bg rounded hover:bg-accent transition-colors"
            >
              VIEW CV
            </Link>
            <a
              href="mailto:szczekulskij@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest px-4 py-2.5 border border-border rounded hover:border-text text-text hover:text-text transition-colors"
            >
              GET IN TOUCH
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-text-muted">
            <a href="https://www.linkedin.com/in/szczekulskij/" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LINKEDIN
            </a>
            <a href="https://github.com/szczekulskij" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GITHUB
            </a>
            <a href="https://www.researchgate.net/profile/Jan-Szczekulski-2" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">
              RESEARCHGATE
            </a>
          </div>
        </div>

        <img
          src="/images/profile/jan-headshot.jpg"
          alt="Portrait of Jan Szczekulski"
          width={640}
          height={640}
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border border-border shrink-0"
        />
        </div>
      </section>

      {/* Highlights */}
      <section className="pt-10 pb-10 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {highlights.map((h) => (
            <div key={h.label} className="flex flex-col bg-bg-card border border-border rounded p-4">
              <p className="text-xl font-bold text-text mb-2 tracking-tight">{h.stat}</p>
              <p className="text-xs text-text-muted leading-relaxed">{h.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Writing */}
      <section className="pt-4 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text">Recent writing</h2>
          <Link href="/blog" className="text-xs font-mono tracking-widest text-text-muted hover:text-text transition-colors">
            ALL POSTS →
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentItems.map((item) => (
            <Link key={`${item.type}-${item.slug}`} href={`/${item.type === 'blog' ? 'blog' : 'readings'}/${item.slug}`} className="block py-5 group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-text group-hover:text-accent transition-colors mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs font-mono tracking-wider px-1.5 py-0.5 border border-border rounded text-text-muted">
                          {tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {item.date && (
                  <span className="text-xs font-mono text-text-light whitespace-nowrap mt-0.5">
                    {format(new Date(item.date), 'MMM yyyy')}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
