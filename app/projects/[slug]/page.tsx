import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { bySlug, projects, publicSrc, site } from '@/lib/data';
import { Reveal } from '@/components/motion/Reveal';
import { ProjectInquiry } from '@/components/projects/ProjectInquiry';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = bySlug(projects, slug);
  if (!project) return { title: 'Project' };
  return {
    title: `${project.title} | ${site.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = bySlug(projects, slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="bg-void">
      <section className="relative isolate min-h-[70svh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={publicSrc(project.image)}
            alt={project.title}
            fill
            priority
            className={`object-cover ${project.imagePosition ?? ''}`}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-void/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/50" />
        </div>

        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
          <Reveal>
            <Link
              href="/#projects"
              className="kicker mb-8 inline-block text-ivory/55 transition-colors hover:text-ivory"
            >
              ← All positions
            </Link>
            <p className="kicker mb-4 text-silver-bright">
              {project.developer ? `${project.developer} · ${project.location}` : project.location}
            </p>
            <h1 className="display max-w-4xl text-5xl text-ivory md:text-7xl lg:text-8xl">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="mt-4 font-display text-lg italic text-ivory/70 md:text-xl">
                “{project.tagline}”
              </p>
            )}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/70 md:text-lg">
              {project.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ivory/10 px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="kicker mb-5">The brief</p>
              <p className="body max-w-2xl text-base md:text-lg">{project.body}</p>

              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="border-l border-silver/30 pl-4 text-sm leading-relaxed text-ink-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="rounded-[28px] border border-ivory/10 bg-paper-2 p-7 md:p-9">
                <p className="kicker mb-6 text-muted">The position</p>
                <dl className="space-y-5">
                  {[
                    ...(project.developer ? [['Developer', project.developer] as const] : []),
                    ['Pricing', project.price],
                    ['Format', project.beds],
                    ['Carpet', project.sqft],
                    ['Location', project.location],
                    ['Access', project.status],
                    ...(project.rera ? [['MahaRERA', project.rera] as const] : []),
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-4 border-b border-ivory/10 pb-4 last:border-0 last:pb-0"
                    >
                      <dt className="text-[10px] uppercase tracking-[0.18em] text-muted">
                        {label}
                      </dt>
                      <dd className="text-right text-sm text-ivory">{value}</dd>
                    </div>
                  ))}
                </dl>
                <ProjectInquiry />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {project.typologies && project.typologies.length > 0 && (
        <section className="border-t border-ivory/10 px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="kicker mb-4">Exclusive residences</p>
              <h2 className="display mb-10 text-3xl text-ivory md:text-4xl">
                Pricing & RERA carpet
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="overflow-hidden rounded-[22px] border border-ivory/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-paper-2 text-[10px] uppercase tracking-[0.16em] text-muted">
                    <tr>
                      <th className="px-5 py-4 font-medium md:px-7">Typology</th>
                      <th className="px-5 py-4 font-medium md:px-7">RERA carpet (sq ft)</th>
                      <th className="px-5 py-4 font-medium md:px-7">Price (all incl.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.typologies.map((row) => (
                      <tr key={`${row.name}-${row.area}`} className="border-t border-ivory/10">
                        <td className="px-5 py-4 text-ivory md:px-7">
                          <span className="block">{row.name}</span>
                          {row.note && (
                            <span className="mt-1 block text-[11px] text-muted">{row.note}</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-ink-2 md:px-7">{row.area}</td>
                        <td className="px-5 py-4 text-ivory md:px-7">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-muted">
                All-inclusive pricing as briefed. Figures are indicative and subject to change.
                {project.rera ? ` MahaRERA ${project.rera}.` : ''}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {project.floorBands && project.floorBands.length > 0 && (
        <section className="border-t border-ivory/10 px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="kicker mb-4">Floor bands</p>
              <h2 className="display mb-10 text-3xl text-ivory md:text-4xl">How the tower is read</h2>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {project.floorBands.map((band, i) => (
                <Reveal key={band.name} delay={i * 0.05}>
                  <div className="rounded-[22px] border border-ivory/10 bg-paper-2 px-6 py-8">
                    <p className="kicker mb-3 text-muted">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="display text-2xl text-ivory">{band.name}</h3>
                    <p className="mt-3 text-sm text-ink-2">{band.floors}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="border-t border-ivory/10 px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="kicker mb-4">More positions</p>
              <h2 className="display mb-10 text-3xl text-ivory md:text-4xl">Continue exploring</h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {others.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 0.05}>
                  <Link
                    href={`/projects/${item.slug}`}
                    className="group block overflow-hidden rounded-[22px] border border-ivory/10 bg-paper-2"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={publicSrc(item.image)}
                        alt={item.title}
                        fill
                        className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${item.imagePosition ?? ''}`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="kicker mb-2 text-muted">{item.location}</p>
                      <h3 className="display text-xl text-ivory">{item.title}</h3>
                      <p className="mt-2 text-sm text-ink-2">{item.price}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
