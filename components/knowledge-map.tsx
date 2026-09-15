export function KnowledgeMap() {
  const nodes = [
    { x: 92, y: 80, label: "capture", tone: "muted" }, { x: 260, y: 46, label: "source", tone: "muted" },
    { x: 392, y: 128, label: "project", tone: "accent" }, { x: 214, y: 192, label: "decision", tone: "accent" },
    { x: 482, y: 240, label: "verification", tone: "accent" }, { x: 316, y: 318, label: "next step", tone: "muted" },
    { x: 106, y: 286, label: "index", tone: "muted" },
  ];
  const edges = [[0,1],[0,3],[1,2],[2,3],[2,4],[3,4],[3,6],[4,5],[5,6]];
  return (
    <figure className="knowledge-map">
      <svg viewBox="0 0 580 380" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">SecondBrain knowledge graph</title>
        <desc id="map-desc">Captured sources connect to project decisions, verification, indexes, and next steps.</desc>
        {edges.map(([from, to]) => <line key={`${from}-${to}`} x1={nodes[from].x} y1={nodes[from].y} x2={nodes[to].x} y2={nodes[to].y} />)}
        {nodes.map((node) => (
          <g key={node.label} className={node.tone} transform={`translate(${node.x} ${node.y})`}>
            <circle r={node.tone === "accent" ? 9 : 6} /><text x="14" y="5">[[{node.label}]]</text>
          </g>
        ))}
      </svg>
      <figcaption>Static map derived from the system’s wikilink relationships.</figcaption>
    </figure>
  );
}
