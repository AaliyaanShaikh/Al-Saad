import type { Metadata } from 'next';
import { bySlug, projects, site } from '@/lib/data';
import { ProjectDetailPage } from '@/components/projects/ProjectDetailPage';

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
  if (!project) return null;

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return <ProjectDetailPage project={project} others={others} />;
}

