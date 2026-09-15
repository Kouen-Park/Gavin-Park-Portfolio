import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Gavin Park, home">Gavin Park</Link>
        <nav aria-label="Primary navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#method">Method</Link>
          <a href="https://github.com/Kouen-Park" rel="noreferrer" target="_blank">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  );
}
