import { BackgroundPaths } from "./kokonutui/background-paths";

export function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <BackgroundPaths />
      <div className="hero-meta"><span>Software engineer</span><span>Auckland, New Zealand</span></div>
      <h1 id="hero-title">I build dependable<br />software systems<br /><em>and make the work legible.</em></h1>
      <div className="hero-foot">
        <p>I design products, tools, and interactive systems with the evidence close at hand—from a resilient golf workflow to a research-led narrative game.</p>
        <a className="text-link" href="#work">Selected work <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
