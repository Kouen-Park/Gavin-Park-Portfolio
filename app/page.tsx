import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import Image from "next/image";
import Link from "next/link";
import { archiveProject, projects, supportingProjects } from "@/data/projects";

const method = ["idea", "prototype", "run", "diagnose", "test", "improve"];

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <section className="work-section shell" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Selected work · 2026</p>
          <h2 id="work-title">Reliable products,<br />different boundaries.</h2>
          <p>Recoverable scoring, private collaboration, and local AI knowledge. Three core projects, with decisions and dated verification before technology lists.</p>
        </div>
        <div className="project-list">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      </section>

      <section className="supporting-section shell" id="supporting-work" aria-labelledby="supporting-title">
        <div className="supporting-heading"><p className="eyebrow">Supporting work</p><h2 id="supporting-title">A different kind of system.</h2><p>Narrative architecture and reusable game systems, alongside the three core product case studies.</p></div>
        {supportingProjects.map((project) => <Reveal key={project.slug}>
          <article className="supporting-project" style={{ "--accent": project.accent } as React.CSSProperties}>
            <div className="supporting-copy">
              <p className="eyebrow">Supporting project · {project.status}</p>
              <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
              <p>{project.summary}</p>
              <p className="supporting-status">Recovery milestone committed and pushed; human playtest, audio, and visual sign-off remain open.</p>
              <Link className="text-link" href={`/work/${project.slug}`}>Read the supporting case study <span aria-hidden="true">→</span></Link>
            </div>
            {project.media[0] && <Image src={project.media[0].src} alt={project.media[0].alt} width={project.media[0].width} height={project.media[0].height} sizes="(max-width: 760px) 100vw, 30vw" />}
          </article>
        </Reveal>)}
      </section>

      <section className="method-section" id="method" aria-labelledby="method-title">
        <div className="shell method-grid">
          <Reveal><p className="eyebrow">Working method</p><h2 id="method-title">Progress is a loop,<br />not a reveal.</h2></Reveal>
          <Reveal className="method-flow">
            {method.map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < method.length - 1 && <i aria-hidden="true">→</i>}</div>)}
          </Reveal>
          <Reveal className="method-note"><p>I keep assumptions visible, run the real thing early, and turn failures into the next concrete test.</p><p>SecondBrain supports that loop: I keep original sources, dated project records, decisions, and open questions in linked Markdown. It is my working method, not a fourth product in this portfolio.</p></Reveal>
        </div>
      </section>

      <section className="about-section shell" aria-labelledby="about-title">
        <Reveal className="about-intro">
          <p className="eyebrow">A little context</p>
          <h2 id="about-title">Curious about the system<br />behind the screen.</h2>
        </Reveal>
        <Reveal className="about-copy">
          <p>I build across C#/.NET, Python/FastAPI, TypeScript/Next.js, SwiftUI, and React Native, with PostgreSQL and local data systems behind the interfaces. I’m also studying computer science at the University of Auckland.</p>
          <p>Outside the build, I’m interested in golf, pixel art, narrative games, AI coding agents, and personal knowledge management. I learn by making a small prototype, running it, diagnosing the failure, testing the fix, and improving the next version.</p>
          <ul className="interest-list" aria-label="Interests"><li>Golf & statistics</li><li>Pixel art & narrative games</li><li>AI-assisted development</li><li>Personal knowledge systems</li></ul>
        </Reveal>
      </section>

      <section className="archive-section shell" aria-labelledby="archive-title">
        <Reveal className="archive-row">
          <div><p className="eyebrow">Archive · {archiveProject.status}</p><h2 id="archive-title">{archiveProject.title}</h2></div>
          <p>{archiveProject.summary} {archiveProject.outcome} Individual ownership is not overstated.</p>
          <ul className="tag-list">{archiveProject.stack.map((item) => <li key={item}>{item}</li>)}</ul>
        </Reveal>
      </section>

      <section className="contact-section shell" aria-labelledby="contact-title">
        <Reveal>
          <p className="eyebrow">Start a conversation</p>
          <h2 id="contact-title">The code and the thinking<br />are both open for inspection.</h2>
          <a className="button-link" href="https://github.com/Kouen-Park" rel="noreferrer" target="_blank">Visit GitHub <span aria-hidden="true">↗</span></a>
        </Reveal>
      </section>
    </main>
  );
}
