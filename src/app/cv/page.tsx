import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CV',
  description: 'Jan Szczekulski - Curriculum Vitae',
};

const experience = [
  {
    company: 'Amazon',
    location: 'Seattle, USA',
    roles: [
      { title: 'Software Development Engineer', period: 'Apr 2025 – Present' },
      { title: 'Software Development Engineer Intern', period: 'Jun 2024 – Sept 2024' },
    ],
    bullets: [
      'Led redesign and deprecation of a 17-year legacy Tier-1 distributed configuration platform handling 10M+ daily requests across 200+ global fulfillment sites, consolidating fragmented schemas into unified DynamoDB-backed APIs with zero production downtime.',
      'Designed and implemented large-scale migration infrastructure including schema redesign, migration tooling, double-read/double-write validation frameworks, staged traffic shifting, rollback mechanisms, and production monitoring.',
      'Developed distributed backend services and APIs in Java/Spring using DynamoDB, ECS, Lambda, SQS, SNS, Kinesis, and CI/CD tooling while driving tradeoff decisions between scalability, fault-tolerance, and blast radius minimization.',
      'Owned operational reliability for 3+ Tier-1 production systems including deployment pipelines, dashboards, alarms, incident response, load testing, and production migration coordination.',
      'Resolved critical European-wide production incidents by identifying transient distributed bugs and introducing safeguards across 3+ Tier-1 services.',
      'Designed and shipped 3 key features across 8+ systems, earning/saving estimated $450M per year - focused on reducing manual intervention and scaling across more sites.',
    ],
  },
  {
    company: 'UC San Diego',
    location: 'San Diego, USA',
    roles: [
      { title: 'Graduate Research Assistant @ Contextual Robotics Institute', period: 'Sept 2024 – Mar 2025' },
      { title: 'Teaching Assistant', period: 'Jan 2025 – Mar 2025' },
    ],
    bullets: [
      'Co-author and co-lead implementer of a state-of-the-art robotic tabletop rearrangement system published at ICRA 2025, focusing on long-horizon planning and robust execution under physical-world uncertainty.',
      'Built planning systems integrating vision-language models and large language models for mobile manipulation and multi-step reasoning tasks.',
      'Prepared study resources and provided office hours and seminars for a Search and Optimization course.',
    ],
  },
  {
    company: 'The Hut Group (THG)',
    location: 'Manchester, UK',
    roles: [
      { title: 'Software Engineer', period: 'Dec 2021 – Aug 2023' },
      { title: 'Data Scientist', period: 'Sept 2020 – Dec 2021' },
    ],
    bullets: [
      'Designed and implemented experimentation infrastructure integrating an in-house A/B testing backend with a high-throughput widget delivery platform serving 5k+ RPS.',
      'Built backend APIs, integration services, rollout tooling, and React-based frontend systems enabling rapid experiment configuration - contributing to £150M+ YoY business impact.',
      'Designed backend integrations between experimentation systems, widgeting services, and analytics platforms using TypeScript, Python, SQL, React.js, and MVC architectures.',
      'Built SQL and Python pipelines for experiment evaluation, statistical analysis, and operational analytics across millions of daily events.',
      'Managed production infrastructure including Kubernetes clusters, deployment pipelines, VM provisioning, patching, and operational maintenance.',
    ],
  },
];

const publications = [
  {
    title: 'OmniManip: Towards General Robotic Manipulation via Object-Centric Interaction Primitives as Spatial Constraints',
    venue: 'ICRA 2025',
    description: 'Co-author; contributed to long-horizon robotic planning, manipulation systems, and LLM-assisted embodied AI reasoning.',
  },
  {
    title: 'In Search for Optimal Schedule During Long-Term Treatment of Port-Wine Birthmarks',
    venue: 'Scientific Reports',
    description: 'Co-author; applied machine learning and statistical analysis methods to medical outcome prediction from imaging datasets.',
  },
];

const education = [
  {
    school: 'University of California, San Diego',
    degree: 'M.S. in Computer Science, GPA: 3.85',
    period: '2023 – 2025',
  },
  {
    school: 'University of Liverpool',
    degree: 'B.Sc. (Hons) Computer Science & Mathematics, First Class',
    period: '2017 – 2020',
  },
];

const skills = [
  { category: 'Languages', items: 'Java, C, Python, Go, TypeScript, SQL' },
  { category: 'Cloud & Infrastructure', items: 'AWS ECS, EC2, Lambda, DynamoDB, SNS, SQS, Kinesis, AWS CDK, Docker, Kubernetes' },
  { category: 'Frontend', items: 'React.js, JavaScript, MVC Architectures' },
  { category: 'Backend & Distributed Systems', items: 'Spring Boot, REST APIs, Distributed Systems, Data Migration, Reliability Engineering, API Design, High-Throughput Systems' },
  { category: 'Data Systems', items: 'A/B Testing Platforms, Statistical Analysis, Data Aggregation Systems' },
  { category: 'ML & Research', items: 'PyTorch, Vision-Language Models, Large Language Models, Robotics Planning Systems' },
];

export default function CVPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-text">CV</h1>
        <a
          href="/resume.pdf"
          className="text-xs font-mono tracking-widest px-3 py-1.5 border border-border rounded hover:border-text text-text-muted hover:text-text transition-colors"
        >
          DOWNLOAD PDF
        </a>
      </div>
      <p className="text-text-muted text-sm mb-10 leading-relaxed">
        Software engineer with 4+ years of experience designing and building distributed systems,
        including cloud-native user and internal-facing platforms. Main experience in distributed
        frontends and backends, event-driven architectures, migration frameworks, high-throughput
        APIs, and operational tooling.
      </p>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-5">Experience</h2>
        <div className="space-y-8">
          {experience.map((item) => (
            <div key={item.company} className="border-l-2 border-border pl-4">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-sm font-bold text-text">{item.company}</h3>
                <span className="text-xs font-mono text-text-light whitespace-nowrap">{item.location}</span>
              </div>
              {item.roles.map((role) => (
                <div key={role.title} className="flex items-start justify-between gap-3 mb-0.5">
                  <p className="text-xs text-text-muted">{role.title}</p>
                  <span className="text-xs font-mono text-text-light whitespace-nowrap">{role.period}</span>
                </div>
              ))}
              <ul className="mt-2 space-y-1.5">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="text-xs text-text leading-relaxed pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-text-light">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section className="mb-12">
        <h2 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-5">Publications</h2>
        <div className="space-y-5">
          {publications.map((pub) => (
            <div key={pub.title} className="border-l-2 border-border pl-4">
              <h3 className="text-sm font-bold text-text">{pub.title}</h3>
              <p className="text-xs font-mono text-text-light mb-1">{pub.venue}</p>
              <p className="text-xs text-text-muted">{pub.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-5">Education</h2>
        <div className="space-y-5">
          {education.map((item) => (
            <div key={item.school} className="border-l-2 border-border pl-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-text">{item.school}</h3>
                  <p className="text-xs text-text-muted">{item.degree}</p>
                </div>
                <span className="text-xs font-mono text-text-light whitespace-nowrap">{item.period}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xs font-mono tracking-widest text-text-muted uppercase mb-5">Technical Skills</h2>
        <div className="space-y-3">
          {skills.map((group) => (
            <div key={group.category}>
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-0.5">{group.category}</p>
              <p className="text-xs text-text">{group.items}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
