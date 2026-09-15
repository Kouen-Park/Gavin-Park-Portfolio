import Link from "next/link";
export default function NotFound() { return <main id="main" tabIndex={-1} className="not-found shell"><p className="eyebrow">404</p><h1>This trail ends here.</h1><p>The page you requested does not exist.</p><Link className="button-link" href="/">Return home</Link></main>; }
