import { BackgroundPaths } from "./kokonutui/background-paths";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <BackgroundPaths />
      <div className="hero-meta"><span>Software engineer · Full-stack systems</span><span>Auckland, New Zealand · NZ & Australia work eligible</span></div>
      <h1 id="hero-title">Software Engineer<br />building reliable<br /><em>full-stack systems.</em></h1>
      <div className="hero-foot">
        <div>
          <p>I build backend-aware products and interactive systems with recoverability, testing, and clear engineering decisions close at hand.</p>
          <p className="hero-availability">Open to internships, graduate programmes, and early-career roles.</p>
        </div>
        <div className="hero-actions">
          <Link className="button-link" href="/work/birdie-buddy">View BirdieBuddy <span aria-hidden="true">↗</span></Link>
          <a className="text-link" href="https://github.com/Kouen-Park" rel="noreferrer" target="_blank">View GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
