import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { EvidenceRail } from "./evidence-rail";
import { KnowledgeMap } from "./knowledge-map";
import { Reveal } from "./reveal";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const primary = project.media[0];
  return (
    <Reveal className="project-card" delay={index * 0.05}>
      <article className={project.featured ? "project-card--featured" : undefined} style={{ "--accent": project.accent } as React.CSSProperties}>
        <div className="project-index" aria-hidden="true">0{index + 1}</div>
        <div className="project-copy">
          <div className="project-kicker"><span>{project.featured ? "Featured case study" : "Supporting evidence"}</span><span>{project.status}</span><span>{project.period}</span></div>
          <h2><Link href={`/work/${project.slug}`}>{project.title}</Link></h2>
          <p className="project-summary">{project.summary}</p>
          {project.proof && <dl className="project-proof-summary">
            <div><dt>Role</dt><dd>{project.proof.role}</dd></div>
            <div><dt>Decision</dt><dd>{project.proof.reliability}</dd></div>
            <div><dt>Verified</dt><dd>{project.proof.verified}</dd></div>
            <div><dt>Status</dt><dd>{project.proof.status}</dd></div>
          </dl>}
          <ul className="tag-list" aria-label="Technology stack">{project.stack.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
          <Link className="text-link" href={`/work/${project.slug}`}>Read the case study <span aria-hidden="true">→</span></Link>
        </div>
        <div className="project-visual">
          {primary ? <Image src={primary.src} alt={primary.alt} width={primary.width} height={primary.height} sizes="(max-width: 760px) 100vw, 48vw" /> : <KnowledgeMap />}
        </div>
        <div className="project-proof-rail">
          <EvidenceRail evidence={project.evidence} compact />
        </div>
      </article>
    </Reveal>
  );
}
