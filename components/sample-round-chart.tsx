"use client";

import { Grid } from "@/components/charts/grid";
import { Line } from "@/components/charts/line";
import { LineChart } from "@/components/charts/line-chart";
import { XAxis } from "@/components/charts/x-axis";

const fixture = [
  { date: new Date("2026-01-01"), score: 4 }, { date: new Date("2026-01-02"), score: 5 },
  { date: new Date("2026-01-03"), score: 3 }, { date: new Date("2026-01-04"), score: 4 },
  { date: new Date("2026-01-05"), score: 6 }, { date: new Date("2026-01-06"), score: 4 },
  { date: new Date("2026-01-07"), score: 3 }, { date: new Date("2026-01-08"), score: 5 },
  { date: new Date("2026-01-09"), score: 4 },
];

export default function SampleRoundChart() {
  return (
    <div className="sample-chart" aria-label="Sample round fixture score by hole">
      <div className="chart-heading"><span>Sample round data</span><strong>Hole score</strong></div>
      <LineChart data={fixture} aspectRatio="2 / 1" animationDuration={700} margin={{ top: 24, right: 24, bottom: 48, left: 24 }}>
        <Grid horizontal vertical={false} stroke="var(--border)" strokeDasharray="2,5" />
        <Line dataKey="score" stroke="var(--birdie)" strokeWidth={3} showMarkers fadeEdges={false} />
        <XAxis numTicks={5} />
      </LineChart>
      <p>Repository fixture values only — not product performance or user outcome data.</p>
    </div>
  );
}
