# Design System: Gavin Park Portfolio

## 1. Visual Theme & Atmosphere

The site feels like a carefully edited engineering case file: open, calm, exact, and materially connected to real work. Large project imagery supplies the emotion while rules, captions, timestamps, and the Evidence Rail provide structure. The interface is deliberately quieter than the projects it frames.

The memorable device is the Evidence Rail, a thin continuous route that connects problem, decision, implementation, verification, and status. It behaves like a trace through a system rather than decorative timeline chrome.

## 2. Color Palette & Roles

- **Cold paper** (`#F3F6F5`): primary page surface.
- **Clear white** (`#FFFFFF`): media wells and elevated reading surfaces.
- **Near-black ink** (`#101817`): headings and primary copy.
- **Measured grey** (`#68726F`): secondary copy and metadata; never used where contrast falls below AA.
- **Signal blue** (`#2457D6`): links, keyboard focus, and global interactive state.
- **Quiet rule** (`#CBD4D0`): dividers, rail scaffolding, and image boundaries.

Project accents are local and never compete on one surface: BirdieBuddy uses deep fairway green (`#1F5B4B`), The Thirteenth Disciple uses fired ochre (`#B36A36`), SecondBrain uses archive violet (`#665A8E`), and Music Webapp uses muted wine (`#8E4750`).

## 3. Typography Rules

- **Archivo**: display and section headings, 600–700 weight, compact but never tighter than `-0.035em`.
- **IBM Plex Sans**: body copy, navigation, and captions, 400–600 weight, 1.55–1.7 line-height.
- **IBM Plex Mono**: evidence stages, dates, status, stack, and measured data only.
- Body measure stays between 62 and 72 characters. Display type tops out at 88px on wide screens and scales fluidly.

## 4. Component Stylings

- **Links and buttons:** plain-language labels, minimum 44px target, underlines or clear shape change, and a 3px signal-blue focus outline with offset.
- **Project entries:** editorial split rows, not generic same-size cards. Copy and image alternate their weight while a hairline boundary contains the row.
- **Status tags:** compact mono labels with a thin tinted outline; no pill styling except for true status controls.
- **Evidence Rail:** 1px base track, 2px active trace, circular nodes under 10px, and stage labels aligned to content rather than floating badges.
- **Media:** 12–16px corners, one border or one shadow but never both. Screenshots retain their native character and always carry factual captions.

## 5. Layout Principles

- A fluid twelve-column desktop grid collapses into a single reading column under 768px.
- The home page opens with the thesis and the Evidence Rail occupying the first viewport together.
- Selected work uses generous vertical pacing and alternating media/copy composition rather than a uniform card grid.
- Case-study pages use a wide media column and a sticky evidence index on desktop; on mobile the index becomes part of the reading flow.
- Spacing uses an 8px base with 16, 24, 40, 64, 96, and 144px milestones.

## 6. Motion and Interaction

- Motion for React owns route-adjacent reveals, card image response, and navigation state.
- Anime.js owns the one-time Evidence Rail SVG draw on the home page.
- KokonutUI background paths are adapted into a near-static blueprint field behind the hero at very low contrast.
- Bklit is isolated to a dynamically loaded BirdieBuddy demo chart with clearly labelled fixture data.
- Content is visible before hydration. Reduced-motion mode removes path drawing and transforms while preserving state changes.

## 7. Stitch Generation Notes

Use these phrases: “refined engineering case file,” “editorial project index,” “evidence-led portfolio,” “continuous system trace,” “large authentic product captures,” and “quiet technical metadata.” Avoid testimonial sections, purple SaaS gradients, generic bento tiles, icon-card grids, glassmorphism, custom cursors, and ornamental 3D.
