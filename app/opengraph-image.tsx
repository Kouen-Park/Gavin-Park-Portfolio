import { ImageResponse } from "next/og";
export const alt = "Gavin Park — dependable software systems, made legible";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#F3F6F5", color: "#101817", display: "flex", padding: 72, flexDirection: "column", justifyContent: "space-between", fontFamily: "sans-serif" }}><div style={{ fontSize: 28 }}>Gavin Park · Software Engineer</div><div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}><span>I build dependable software systems</span><span style={{ color: "#1F5B4B" }}>and make the work legible.</span></div><div style={{ fontSize: 22, color: "#68726F" }}>BirdieBuddy · The Thirteenth Disciple · SecondBrain</div></div>, size); }
