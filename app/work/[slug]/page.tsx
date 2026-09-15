import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BirdieChart } from "@/components/birdie-chart";
import { EvidenceRail } from "@/components/evidence-rail";
import { KnowledgeMap } from "@/components/knowledge-map";
import { Reveal } from "@/components/reveal";
import { getProject, projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.title} — Gavin Park`, description: project.summary, url: `/work/${project.slug}`, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const creativeWork = {
    "@context": "https://schema.org", "@type": "CreativeWork", name: project.title,
    description: project.summary, creator: { "@type": "Person", name: "Gavin Park" },
    url: `${siteUrl}/work/${project.slug}`, keywords: project.stack.join(", "),
  };
  return (
    <main id="main" tabIndex={-1} className="case-page" style={{ "--accent": project.accent } as React.CSSProperties}>
      <section className="case-hero shell">
        <Link className="back-link" href="/#work"><span aria-hidden="true">←</span> Selected work</Link>
        <div className="case-title-grid">
          <div><p className="eyebrow">{project.featured ? "Featured case study" : "Supporting case study"} · {project.status}</p><h1>{project.title}</h1></div>
          <p className="case-outcome">{project.outcome}</p>
        </div>
        <dl className="case-meta">
          <div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Period</dt><dd>{project.period}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div><div><dt>Stack</dt><dd>{project.stack.join(" · ")}</dd></div>
        </dl>
        <div className="case-actions">
          {project.liveDemo && <a className="button-link" href={project.liveDemo} rel="noreferrer" target="_blank">Open live demo <span aria-hidden="true">↗</span></a>}
          {project.links.map((link) => <a className="text-link" key={link.href} href={link.href} rel="noreferrer" target="_blank">{link.label} <span aria-hidden="true">↗</span></a>)}
          {!project.liveDemo && project.slug === "birdie-buddy" && <p className="action-note">Live demo link is pending deployment verification.</p>}
        </div>
      </section>

      <section className="case-overview shell" aria-labelledby="overview-title">
        <Reveal className="case-intro"><p className="eyebrow">The system</p><h2 id="overview-title">{project.summary}</h2></Reveal>
        <Reveal className="constraint-list"><p className="eyebrow">Constraints</p><ul>{project.constraints.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>
      </section>

      {project.demoSteps && <section className="demo-guide shell" aria-labelledby="demo-guide-title">
        <div><p className="eyebrow">Recruiter demo path</p><h2 id="demo-guide-title">See the recovery flow<br />in three steps.</h2></div>
        <ol>{project.demoSteps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
      </section>}

      <section className="evidence-section shell" aria-labelledby="evidence-title">
        <div className="section-label"><p className="eyebrow">Evidence rail</p><h2 id="evidence-title">From pressure<br />to present state.</h2></div>
        <EvidenceRail evidence={project.evidence} />
      </section>

      <section className="decision-section" aria-labelledby="decisions-title">
        <div className="shell">
          <p className="eyebrow">Design decisions</p><h2 id="decisions-title">Architecture in service<br />of the constraints.</h2>
          <div className="decision-grid">{project.decisions.map((decision, index) => <Reveal key={decision.title}><article><span>0{index + 1}</span><h3>{decision.title}</h3><p>{decision.detail}</p></article></Reveal>)}</div>
        </div>
      </section>

      <section className="media-section shell" aria-labelledby="media-title">
        <div className="media-heading"><div><p className="eyebrow">Working evidence</p><h2 id="media-title">The interface<br />is the evidence.</h2></div><p>Repository captures, shown with the context needed to read them accurately.</p></div>
        {project.slug === "secondbrain" ? <KnowledgeMap /> : (
          <div className={`media-grid media-grid--${project.slug}`}>
            {project.media.map((media) => <figure key={media.src}><Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width: 760px) 100vw, 70vw" /><figcaption>{media.caption}</figcaption></figure>)}
          </div>
        )}
        {project.slug === "birdie-buddy" && <BirdieChart />}
      </section>

      <section className="limits-section shell" aria-labelledby="limits-title">
        <Reveal><p className="eyebrow">Limits and next steps</p><h2 id="limits-title">What the current<br />evidence does not prove.</h2></Reveal>
        <Reveal><ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>
      </section>

      <section className="case-end shell">
        {project.liveDemo && <a className="button-link" href={project.liveDemo} rel="noreferrer" target="_blank">Open live demo <span aria-hidden="true">↗</span></a>}
        {project.links.map((link) => <a className="button-link" key={link.href} href={link.href} rel="noreferrer" target="_blank">{link.label} <span aria-hidden="true">↗</span></a>)}
        {!project.liveDemo && project.slug === "birdie-buddy" && <p className="action-note">Live demo link is pending deployment verification.</p>}
        <Link className="text-link" href="/#work">Back to selected work <span aria-hidden="true">↑</span></Link>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork).replace(/</g, "\\u003c") }} />
    </main>
  );
}
