import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { archiveProject, projects } from "@/data/projects";

const method = ["idea", "prototype", "run", "diagnose", "test", "improve"];

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <section className="work-section shell" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Selected work · 2026</p>
          <h2 id="work-title">Three systems,<br />shown through evidence.</h2>
          <p>Each case study follows the same trail: what was difficult, what I decided, what I built, and what the current evidence supports.</p>
        </div>
        <div className="project-list">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      </section>

      <section className="method-section" id="method" aria-labelledby="method-title">
        <div className="shell method-grid">
          <Reveal><p className="eyebrow">Working method</p><h2 id="method-title">Progress is a loop,<br />not a reveal.</h2></Reveal>
          <Reveal className="method-flow">
            {method.map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < method.length - 1 && <i aria-hidden="true">→</i>}</div>)}
          </Reveal>
          <Reveal className="method-note"><p>I keep assumptions visible, run the real thing early, and turn failures into the next concrete test.</p></Reveal>
        </div>
      </section>

      <section className="about-section shell" aria-labelledby="about-title">
        <Reveal className="about-intro">
          <p className="eyebrow">A little context</p>
          <h2 id="about-title">Curious about the system<br />behind the screen.</h2>
        </Reveal>
        <Reveal className="about-copy">
          <p>I’m a University of Auckland computer-science learner and hands-on developer. I work across Python, C#, JavaScript, Flask, ASP.NET, EF Core, and Playwright.</p>
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
