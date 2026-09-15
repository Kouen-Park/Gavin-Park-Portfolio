"use client";

import dynamic from "next/dynamic";

const SampleRoundChart = dynamic(() => import("./sample-round-chart"), {
  ssr: false,
  loading: () => <div className="chart-loading" role="status">Loading sample round chart…</div>,
});

export function BirdieChart() {
  return <SampleRoundChart />;
}
