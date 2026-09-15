"use client";

import type { Evidence } from "@/data/projects";
import { useEffect, useRef } from "react";

export function EvidenceRail({ evidence, compact = false }: { evidence: Evidence[]; compact?: boolean }) {
  const line = useRef<SVGPathElement>(null);
  useEffect(() => {
    if (!line.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let animation: { pause?: () => void } | undefined;
    const node = line.current;
    const run = () => import("animejs").then(({ animate }) => {
      if (!cancelled) animation = animate(node, { strokeDashoffset: [520, 0], duration: 1100, ease: "out(3)" });
    });
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) { run(); observer.disconnect(); }
    }, { rootMargin: "120px" });
    observer.observe(node);
    return () => { cancelled = true; observer.disconnect(); animation?.pause?.(); };
  }, []);
  return (
    <ol className={`evidence-rail ${compact ? "evidence-rail--compact" : ""}`}>
      <svg className="evidence-line" viewBox="0 0 2 520" preserveAspectRatio="none" aria-hidden="true">
        <path ref={line} d="M1 0V520" pathLength="520" strokeDasharray="520" strokeDashoffset="520" />
      </svg>
      {evidence.map((item) => (
        <li key={item.stage}>
          <span className="evidence-dot" aria-hidden="true" />
          <div>
            <p className="eyebrow">{item.stage}</p>
            <h3>{item.claim}</h3>
            {!compact && <p>{item.detail}</p>}
            {!compact && <p className="source">Verified {item.verificationDate} · {item.source}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
