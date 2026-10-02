import type { Project } from "@/data/projects";

// An architecture explanation, deliberately not a fabricated product screenshot.
export function SystemFlow({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <figure className={`system-flow ${compact ? "system-flow--compact" : ""}`}>
      <p className="eyebrow">{project.title} · local architecture</p>
      <ol aria-label={`${project.title} knowledge flow`}>
        {project.systemFlow?.map((step, index) => (
          <li key={step.title}>
            <span aria-hidden="true">0{index + 1}</span>
            <div><h3>{step.title}</h3><p>{step.detail}</p></div>
          </li>
        ))}
      </ol>
      <figcaption>Architecture derived from the repository; not a UI capture or a performance measurement.</figcaption>
    </figure>
  );
}
