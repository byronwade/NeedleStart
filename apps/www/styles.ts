export const appStyles = String.raw`
:root {
  color-scheme: light;
  --background: #f7f8f5;
  --foreground: #17211b;
  --card: #ffffff;
  --card-foreground: #17211b;
  --muted: #e8ece4;
  --muted-foreground: #5b665d;
  --primary: #245a41;
  --primary-foreground: #ffffff;
  --secondary: #dfe7dd;
  --secondary-foreground: #17211b;
  --accent: #b96826;
  --accent-foreground: #ffffff;
  --border: #d5dbd2;
  --input: #d5dbd2;
  --ring: #245a41;
  --radius: 10px;
  --shadow: 0 24px 70px rgba(38, 66, 48, 0.16);
  --grid-line: rgba(23, 33, 27, 0.04);
  --header-bg: rgba(247, 248, 245, 0.88);
  --header-border: rgba(23, 33, 27, 0.08);
  --surface: rgba(255, 255, 255, 0.78);
  --surface-soft: rgba(255, 255, 255, 0.62);
  --surface-strong: rgba(255, 255, 255, 0.92);
  --surface-row: rgba(255, 255, 255, 0.68);
  --code-bg: rgba(255, 255, 255, 0.62);
  --card-shadow: 0 14px 34px rgba(38, 66, 48, 0.08);
  --focus-contrast: #ffffff;
}

html.dark {
  color-scheme: dark;
  --background: #0c100e;
  --foreground: #edf6ef;
  --card: #121a16;
  --card-foreground: #edf6ef;
  --muted: #1b241f;
  --muted-foreground: #a9b7ae;
  --primary: #8bd3a9;
  --primary-foreground: #082014;
  --secondary: #1f2b24;
  --secondary-foreground: #edf6ef;
  --accent: #d69b62;
  --accent-foreground: #1f1207;
  --border: #2d3a33;
  --input: #334239;
  --ring: #8bd3a9;
  --shadow: 0 24px 70px rgba(0, 0, 0, 0.34);
  --grid-line: rgba(237, 246, 239, 0.045);
  --header-bg: rgba(12, 16, 14, 0.86);
  --header-border: rgba(237, 246, 239, 0.08);
  --surface: rgba(18, 26, 22, 0.78);
  --surface-soft: rgba(31, 43, 36, 0.72);
  --surface-strong: rgba(18, 26, 22, 0.94);
  --surface-row: rgba(18, 26, 22, 0.68);
  --code-bg: rgba(12, 16, 14, 0.62);
  --card-shadow: 0 14px 34px rgba(0, 0, 0, 0.24);
  --focus-contrast: #082014;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: var(--background);
}

body {
  margin: 0;
  min-width: 320px;
  background:
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
    linear-gradient(180deg, var(--grid-line) 1px, transparent 1px),
    var(--background);
  background-size: 42px 42px;
  color: var(--foreground);
  font-family: "Geist", "Aptos", "Segoe UI", system-ui, sans-serif;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}

.skip-link {
  position: fixed;
  left: 1rem;
  top: 1rem;
  z-index: 20;
  transform: translateY(-150%);
  border-radius: 8px;
  background: var(--foreground);
  color: var(--background);
  padding: 0.7rem 1rem;
  transition: transform 180ms ease;
}

.skip-link:focus {
  transform: translateY(0);
}

.site-shell {
  min-height: 100dvh;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--header-border);
  background: var(--header-bg);
  padding: 0.9rem clamp(1rem, 4vw, 3rem);
  backdrop-filter: blur(18px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 700;
}

.brand-mark {
  display: grid;
  width: 2.15rem;
  height: 2.15rem;
  place-items: center;
  border-radius: 8px;
  background: var(--foreground);
  color: var(--background);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.9rem;
  font-weight: 700;
}

.primary-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.15rem;
}

.theme-toggle {
  display: inline-grid;
  width: 2.35rem;
  height: 2.35rem;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-soft);
  color: var(--foreground);
  cursor: pointer;
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.theme-toggle:hover {
  background: var(--secondary);
  transform: translateY(-1px);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 3px;
}

.theme-icon {
  grid-area: 1 / 1;
  transition: opacity 160ms ease, transform 160ms ease;
}

.theme-icon-moon {
  opacity: 0;
  transform: rotate(-20deg) scale(0.72);
}

html.dark .theme-icon-sun {
  opacity: 0;
  transform: rotate(20deg) scale(0.72);
}

html.dark .theme-icon-moon {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}

.primary-nav a {
  border-radius: 8px;
  color: var(--muted-foreground);
  font-size: 0.94rem;
  font-weight: 560;
  padding: 0.55rem 0.72rem;
  transition: background 180ms ease, color 180ms ease;
}

.primary-nav a:hover,
.primary-nav a:focus-visible {
  background: var(--secondary);
  color: var(--foreground);
  outline: none;
}

.home-page {
  overflow: hidden;
}

.section-shell {
  margin-inline: auto;
  max-width: 1180px;
  padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
}

.hero-section {
  display: grid;
  min-height: 72dvh;
  align-items: center;
  grid-template-columns: minmax(0, 0.88fr) minmax(390px, 1.12fr);
  gap: clamp(2rem, 6vw, 5rem);
  padding-top: clamp(2.5rem, 7vw, 5rem);
}

.hero-copy {
  display: grid;
  gap: 1.2rem;
  max-width: 680px;
}

.eyebrow {
  color: var(--primary);
  font-size: 0.92rem;
  font-weight: 700;
}

.hero-copy h1 {
  margin: 0;
  max-width: 10ch;
  font-size: clamp(4rem, 9.5vw, 8.4rem);
  line-height: 0.88;
  text-wrap: balance;
}

.hero-copy p {
  margin: 0;
  max-width: 62ch;
  color: var(--muted-foreground);
  font-size: clamp(1.02rem, 2vw, 1.22rem);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
  padding-top: 0.4rem;
}

.hero-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  padding-top: 0.4rem;
}

.hero-visual {
  position: relative;
  min-height: 520px;
}

.map-console {
  position: relative;
  min-height: 520px;
  overflow: hidden;
  border: 1px solid rgba(23, 33, 27, 0.12);
  border-radius: 10px;
  background: #102018;
  box-shadow: var(--shadow);
  color: #edf6ee;
}

.console-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(237, 246, 238, 0.12);
  padding: 0.85rem 1rem;
}

.console-dots {
  display: flex;
  gap: 0.35rem;
}

.console-dots span {
  display: block;
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 999px;
  background: #c7d6c7;
  opacity: 0.72;
}

.console-label {
  color: rgba(237, 246, 238, 0.72);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
}

.route-map {
  position: relative;
  min-height: 360px;
  margin: 1.25rem;
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgba(237, 246, 238, 0.055) 1px, transparent 1px),
    linear-gradient(180deg, rgba(237, 246, 238, 0.055) 1px, transparent 1px);
  background-size: 34px 34px;
}

.map-line {
  position: absolute;
  height: 2px;
  transform-origin: left center;
  background: rgba(173, 198, 173, 0.55);
}

.map-line-one {
  left: 27%;
  top: 33%;
  width: 35%;
  transform: rotate(19deg);
}

.map-line-two {
  left: 28%;
  top: 59%;
  width: 34%;
  transform: rotate(-16deg);
}

.map-line-three {
  left: 57%;
  top: 45%;
  width: 24%;
  transform: rotate(49deg);
}

.map-node {
  position: absolute;
  display: grid;
  gap: 0.25rem;
  min-width: 9.4rem;
  border: 1px solid rgba(237, 246, 238, 0.13);
  border-radius: 8px;
  background: rgba(247, 248, 245, 0.08);
  padding: 0.8rem;
}

.map-node strong,
.map-node span {
  display: block;
}

.map-node strong {
  font-size: 0.88rem;
}

.map-node span {
  color: rgba(237, 246, 238, 0.68);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.72rem;
}

.node-route {
  left: 7%;
  top: 27%;
}

.node-render {
  right: 9%;
  top: 39%;
}

.node-map {
  left: 15%;
  bottom: 15%;
}

.node-agent {
  right: 8%;
  bottom: 10%;
}

.console-log {
  display: grid;
  gap: 0.55rem;
  border-top: 1px solid rgba(237, 246, 238, 0.12);
  padding: 1rem 1.25rem 1.25rem;
  color: rgba(237, 246, 238, 0.78);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.76rem;
}

.relationship-board {
  display: grid;
  grid-template-columns: minmax(160px, 0.66fr) minmax(0, 1.34fr);
  gap: 0.9rem;
  padding: 0.95rem;
}

.tree-panel {
  min-width: 0;
  border: 1px solid rgba(237, 246, 238, 0.12);
  border-radius: 8px;
  background: rgba(247, 248, 245, 0.06);
}

.source-panel {
  background:
    linear-gradient(180deg, rgba(237, 246, 238, 0.075), rgba(237, 246, 238, 0.035)),
    rgba(247, 248, 245, 0.045);
}

.inspector-panel {
  background: rgba(247, 248, 245, 0.08);
}

.panel-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.7rem;
  border-bottom: 1px solid rgba(237, 246, 238, 0.12);
  padding: 0.85rem;
  color: rgba(237, 246, 238, 0.86);
  font-size: 0.82rem;
  font-weight: 700;
}

.file-tree,
.output-stack {
  display: grid;
  gap: 0.65rem;
  padding: 0.85rem;
}

.tree-group {
  display: grid;
  gap: 0.32rem;
}

.tree-row {
  min-width: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 8px;
  color: rgba(237, 246, 238, 0.78);
  font-size: 0.82rem;
  min-height: 2.35rem;
  padding: 0.45rem 0.55rem;
}

.tree-folder {
  color: rgba(237, 246, 238, 0.9);
  font-weight: 700;
}

.tree-file {
  grid-template-columns: auto auto 1fr;
  margin-left: 0.15rem;
}

.tree-row-active {
  border-color: rgba(187, 215, 188, 0.28);
  background: rgba(220, 239, 226, 0.1);
  color: #f4fff6;
}

.tree-row strong,
.tree-row small,
.output-card strong,
.output-card small {
  display: block;
  min-width: 0;
  overflow-wrap: anywhere;
}

.tree-row small,
.output-card small {
  color: rgba(237, 246, 238, 0.58);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
  font-weight: 500;
}

.tree-indent {
  width: 0.8rem;
  height: 1.35rem;
  border-bottom: 1px solid rgba(237, 246, 238, 0.22);
  border-left: 1px solid rgba(237, 246, 238, 0.22);
  border-bottom-left-radius: 6px;
}

.relationship-spine {
  position: relative;
  display: grid;
  align-content: center;
  gap: 2.2rem;
}

.relationship-spine::before {
  position: absolute;
  inset: 2rem 50% 2rem auto;
  width: 1px;
  background: rgba(237, 246, 238, 0.16);
  content: "";
}

.relation-pill {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  border: 1px solid rgba(237, 246, 238, 0.13);
  border-radius: 8px;
  background: #14291f;
  color: rgba(237, 246, 238, 0.82);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
  padding: 0.52rem 0.58rem;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}

.output-stack {
  gap: 0.75rem;
}

.output-card {
  min-width: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.65rem;
  align-items: start;
  border: 1px solid rgba(237, 246, 238, 0.12);
  border-radius: 8px;
  background: rgba(247, 248, 245, 0.075);
  color: rgba(237, 246, 238, 0.86);
  padding: 0.75rem;
}

.output-card span,
.tree-row span {
  min-width: 0;
}

.inspector-body {
  display: grid;
  gap: 0.68rem;
  padding: 0.75rem;
}

.route-summary-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.78rem;
  align-items: start;
  border: 1px solid rgba(237, 246, 238, 0.14);
  border-radius: 8px;
  background: rgba(220, 239, 226, 0.1);
  padding: 0.72rem;
}

.route-summary-icon {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  border-radius: 8px;
  background: rgba(220, 239, 226, 0.14);
  color: #d9f1de;
}

.route-summary-card span,
.route-summary-card strong,
.route-summary-card small {
  display: block;
  min-width: 0;
  overflow-wrap: anywhere;
}

.route-summary-card span {
  color: rgba(237, 246, 238, 0.58);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
}

.route-summary-card strong {
  color: #f5fff7;
  font-size: 0.95rem;
}

.route-summary-card small {
  color: rgba(237, 246, 238, 0.62);
  font-size: 0.76rem;
}

.relationship-list {
  display: grid;
  gap: 0.52rem;
}

.relationship-edge {
  display: grid;
  min-width: 0;
  grid-template-columns: 1fr;
  gap: 0.36rem;
  align-items: start;
  border: 1px solid rgba(237, 246, 238, 0.1);
  border-radius: 8px;
  background: rgba(16, 32, 24, 0.42);
  padding: 0.68rem;
}

.relationship-edge span,
.relationship-edge strong {
  min-width: 0;
  overflow-wrap: anywhere;
}

.relationship-edge span {
  color: rgba(237, 246, 238, 0.76);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.7rem;
}

.relationship-edge span:last-child {
  color: #f5fff7;
  font-family: "Geist", "Aptos", "Segoe UI", system-ui, sans-serif;
  font-size: 0.82rem;
  font-weight: 720;
}

.relationship-edge strong {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: 1px solid rgba(237, 246, 238, 0.12);
  border-radius: 999px;
  background: rgba(237, 246, 238, 0.08);
  color: #eff9f1;
  font-size: 0.66rem;
  justify-self: start;
  padding: 0.32rem 0.45rem;
  white-space: nowrap;
}

.evidence-strip {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.evidence-card {
  display: grid;
  min-width: 0;
  grid-template-columns: auto 1fr;
  gap: 0.48rem;
  align-items: start;
  border: 1px solid rgba(237, 246, 238, 0.11);
  border-radius: 8px;
  background: rgba(247, 248, 245, 0.06);
  color: rgba(237, 246, 238, 0.82);
  padding: 0.65rem;
}

.evidence-card span,
.evidence-card strong,
.evidence-card small {
  display: block;
  min-width: 0;
  overflow-wrap: anywhere;
}

.evidence-card strong {
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
}

.evidence-card small {
  color: rgba(237, 246, 238, 0.56);
  font-size: 0.66rem;
}

.artifact-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.artifact-chip {
  display: inline-flex;
  max-width: 100%;
  align-items: center;
  gap: 0.34rem;
  border: 1px solid rgba(237, 246, 238, 0.11);
  border-radius: 999px;
  background: rgba(247, 248, 245, 0.06);
  color: rgba(237, 246, 238, 0.72);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.66rem;
  padding: 0.36rem 0.5rem;
  overflow-wrap: anywhere;
}

.relationship-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  border-top: 1px solid rgba(237, 246, 238, 0.12);
  background: rgba(237, 246, 238, 0.08);
  color: rgba(237, 246, 238, 0.74);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.72rem;
}

.relationship-footer span {
  background: #102018;
  padding: 0.8rem 1rem;
}

.section-heading {
  display: grid;
  gap: 0.65rem;
  max-width: 720px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 4.1rem);
  line-height: 0.98;
  text-wrap: balance;
}

.section-heading p {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 1.06rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  padding-top: 2rem;
}

.feature-card {
  min-height: 240px;
}

.feature-icon,
.speed-icon {
  display: grid;
  width: 2.35rem;
  height: 2.35rem;
  place-items: center;
  border-radius: 8px;
  background: var(--secondary);
  color: var(--primary);
}

.speed-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(320px, 1.14fr);
  gap: 1rem;
}

.speed-list {
  display: grid;
  gap: 0.8rem;
}

.speed-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.85rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-row);
  padding: 0.9rem;
}

.speed-row strong,
.speed-row span {
  display: block;
}

.speed-row span {
  color: var(--muted-foreground);
  font-size: 0.92rem;
}

.map-preview-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
  gap: 1rem;
  align-items: stretch;
}

.map-artifact-list {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
}

.map-artifact-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid var(--border);
  list-style: none;
  padding: 0.78rem 0;
}

.map-artifact-list li:last-child {
  border-bottom: 0;
}

.code-path {
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.86rem;
}

.flow-board {
  display: grid;
  gap: 0.8rem;
}

.flow-step {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
  align-items: start;
}

.flow-index {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: 8px;
  background: var(--foreground);
  color: var(--background);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.8rem;
}

.counter-shell {
  padding-top: 0;
}

.counter-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.counter-card p {
  margin: 0;
  color: var(--muted-foreground);
}

.page-shell,
.docs-page {
  margin-inline: auto;
  max-width: 1180px;
  padding: clamp(2.5rem, 7vw, 5rem) clamp(1rem, 4vw, 3rem) clamp(4rem, 9vw, 7rem);
}

.page-hero {
  display: grid;
  gap: 1.1rem;
  padding-bottom: clamp(2rem, 5vw, 3.5rem);
}

.page-hero-copy {
  display: grid;
  gap: 0.85rem;
  max-width: 820px;
}

.page-hero h1 {
  margin: 0;
  font-size: clamp(3rem, 7vw, 6.4rem);
  line-height: 0.92;
  text-wrap: balance;
}

.page-hero p {
  margin: 0;
  max-width: 70ch;
  color: var(--muted-foreground);
  font-size: clamp(1rem, 2vw, 1.18rem);
}

.page-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.page-grid,
.benchmark-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.principle-card,
.benchmark-card,
.example-card,
.doc-card {
  min-width: 0;
}

.principle-card .ui-card-content,
.benchmark-card .ui-card-content,
.doc-card .ui-card-content,
.example-card .ui-card-content {
  display: grid;
  gap: 0.8rem;
}

.principle-card p,
.benchmark-card p,
.doc-card p,
.example-card p {
  margin: 0;
  color: var(--muted-foreground);
}

.callout-band {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 1.5rem;
  align-items: end;
  border-top: 1px solid var(--border);
  margin-top: clamp(2.5rem, 6vw, 4rem);
  padding-top: clamp(2rem, 5vw, 3rem);
}

.callout-band h2,
.examples-intro h2,
.docs-intro h2,
.reference-section h2,
.docs-status-panel h2 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1;
  text-wrap: balance;
}

.callout-band p,
.examples-intro p,
.docs-intro p,
.reference-section p,
.docs-status-panel p {
  margin: 0;
  color: var(--muted-foreground);
}

.callout-band > div,
.examples-intro,
.docs-intro {
  display: grid;
  gap: 0.75rem;
}

.compact-callout {
  align-items: start;
}

.examples-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 1rem;
  align-items: start;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.example-card code,
.doc-card code {
  width: fit-content;
  max-width: 100%;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--code-bg);
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
  padding: 0.38rem 0.5rem;
  overflow-wrap: anywhere;
}

.roadmap-panel {
  position: relative;
  display: grid;
  gap: 0.85rem;
  max-width: 840px;
}

.roadmap-rail {
  position: absolute;
  bottom: 1.4rem;
  left: 1rem;
  top: 1.4rem;
  width: 1px;
  background: var(--border);
}

.roadmap-item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  align-items: start;
}

.roadmap-icon {
  z-index: 1;
  display: grid;
  width: 2.1rem;
  height: 2.1rem;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--primary);
}

.roadmap-item > div:last-child {
  display: flex;
  min-height: 3.25rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 0.9rem 1rem;
}

.roadmap-item h2 {
  margin: 0;
  font-size: 1rem;
}

.docs-browser {
  display: grid;
  grid-template-columns: minmax(220px, 0.34fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.docs-sidebar {
  position: sticky;
  top: 5rem;
  display: grid;
  gap: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 0.85rem;
}

.docs-search {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.55rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--muted-foreground);
  padding: 0.58rem 0.65rem;
}

.docs-search kbd {
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface-strong);
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.68rem;
  padding: 0.16rem 0.32rem;
}

.docs-nav-group {
  display: grid;
  gap: 0.35rem;
}

.docs-nav-group h2 {
  margin: 0;
  color: var(--foreground);
  font-size: 0.78rem;
  text-transform: uppercase;
}

.docs-nav-group a {
  border-radius: 7px;
  color: var(--muted-foreground);
  font-size: 0.9rem;
  padding: 0.42rem 0.5rem;
}

.docs-nav-group a:hover,
.docs-nav-group a:focus-visible {
  background: var(--secondary);
  color: var(--foreground);
  outline: none;
}

.docs-content {
  display: grid;
  gap: 1rem;
}

.doc-card-link {
  display: block;
  min-width: 0;
}

.doc-card-link .ui-card {
  height: 100%;
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.doc-card-link:hover .ui-card,
.doc-card-link:focus-visible .ui-card {
  border-color: var(--ring);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.doc-card-link:focus-visible {
  border-radius: var(--radius);
  outline: 2px solid var(--ring);
  outline-offset: 4px;
}

.docs-feature-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.reference-section,
.docs-status-panel {
  display: grid;
  gap: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  padding: 1.1rem;
}

.docs-status-panel {
  align-items: start;
  grid-template-columns: auto 1fr;
}

.reference-section > div:first-child {
  display: grid;
  gap: 0.75rem;
}

.reference-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.reference-pills a {
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--background);
  color: var(--muted-foreground);
  font-size: 0.84rem;
  padding: 0.45rem 0.65rem;
}

.reference-pills a:hover,
.reference-pills a:focus-visible {
  border-color: var(--ring);
  color: var(--foreground);
  outline: none;
}

.docs-lane-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.docs-lane-card .ui-card-content {
  display: grid;
  gap: 0.45rem;
}

.docs-lane-card .ui-card-content a {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-soft);
  color: var(--foreground);
  padding: 0.58rem 0.65rem;
}

.docs-lane-card .ui-card-content a:hover,
.docs-lane-card .ui-card-content a:focus-visible {
  border-color: var(--ring);
  outline: none;
}

.docs-lane-card .ui-card-content a span:first-child {
  min-width: 0;
  overflow-wrap: anywhere;
}

.docs-nav-group a[aria-current="page"] {
  background: var(--foreground);
  color: var(--background);
}

.docs-article-page {
  display: grid;
  grid-template-columns: minmax(220px, 0.28fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.docs-article-sidebar {
  top: 5rem;
}

.docs-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 8px;
  color: var(--muted-foreground);
  font-size: 0.9rem;
  font-weight: 650;
  padding: 0.48rem 0.5rem;
}

.docs-back-link:hover,
.docs-back-link:focus-visible {
  background: var(--secondary);
  color: var(--foreground);
  outline: none;
}

.docs-article {
  display: grid;
  gap: 1rem;
  min-width: 0;
}

.docs-article-header {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--card-shadow);
  padding: clamp(1.1rem, 3vw, 1.6rem);
}

.docs-article-icon {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border-radius: 8px;
  background: var(--foreground);
  color: var(--background);
}

.docs-article-heading {
  display: grid;
  gap: 0.7rem;
  min-width: 0;
}

.docs-article-kicker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
}

.docs-article-kicker > span:last-child {
  color: var(--muted-foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.docs-article h1 {
  margin: 0;
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  line-height: 0.95;
  text-wrap: balance;
}

.docs-article-heading p {
  margin: 0;
  max-width: 72ch;
  color: var(--muted-foreground);
  font-size: 1.05rem;
}

.docs-source-panel {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface-soft);
  padding: 0.9rem 1rem;
}

.docs-source-panel span,
.docs-source-panel code {
  display: block;
  min-width: 0;
}

.docs-source-panel span {
  color: var(--muted-foreground);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.docs-source-panel code {
  color: var(--foreground);
  font-family: "Geist Mono", "Cascadia Code", monospace;
  font-size: 0.86rem;
  overflow-wrap: anywhere;
}

.docs-article-sections {
  display: grid;
  gap: 1px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--border);
}

.docs-prose-section {
  display: grid;
  gap: 0.65rem;
  background: var(--surface-strong);
  padding: clamp(1rem, 3vw, 1.35rem);
}

.docs-prose-section h2 {
  margin: 0;
  font-size: clamp(1.35rem, 3vw, 2.1rem);
  line-height: 1.05;
}

.docs-prose-section p {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 1rem;
}

.docs-next-card .ui-card-content {
  padding-top: 0.9rem;
}

.docs-next-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
}

.docs-next-links a {
  display: flex;
  min-height: 3.1rem;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--foreground);
  font-weight: 650;
  padding: 0.65rem 0.75rem;
  overflow-wrap: anywhere;
}

.docs-next-links a:hover,
.docs-next-links a:focus-visible {
  border-color: var(--ring);
  outline: none;
}

.ui-button {
  display: inline-flex;
  min-height: 2.65rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  font-size: 0.94rem;
  font-weight: 650;
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease;
  white-space: nowrap;
}

.ui-button:hover {
  transform: translateY(-1px);
}

.ui-button:active {
  transform: translateY(1px) scale(0.99);
}

.ui-button:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 3px;
}

.ui-button-default {
  background: var(--primary);
  color: var(--primary-foreground);
}

.ui-button-default:hover {
  background: #1c4935;
}

.ui-button-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.ui-button-outline {
  border-color: var(--border);
  background: var(--surface-soft);
  color: var(--foreground);
}

.ui-button-ghost {
  background: transparent;
  color: var(--foreground);
}

.ui-button-size-default {
  padding: 0.65rem 0.95rem;
}

.ui-button-size-sm {
  min-height: 2.25rem;
  padding: 0.48rem 0.7rem;
}

.ui-button-size-lg {
  min-height: 3rem;
  padding: 0.78rem 1.12rem;
}

.ui-button-size-icon {
  width: 2.65rem;
  padding: 0;
}

.ui-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--card-foreground);
  box-shadow: var(--card-shadow);
}

.ui-card-header {
  display: grid;
  gap: 0.55rem;
  padding: 1.1rem 1.1rem 0;
}

.ui-card-title {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.2;
}

.ui-card-description {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.94rem;
}

.ui-card-content {
  padding: 1.1rem;
}

.ui-card-footer {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0 1.1rem 1.1rem;
}

.ui-badge {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1;
  padding: 0.35rem 0.5rem;
  white-space: nowrap;
}

.ui-badge-default {
  background: var(--foreground);
  color: var(--background);
}

.ui-badge-secondary {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

.ui-badge-outline {
  border-color: var(--border);
  background: var(--surface-soft);
  color: var(--muted-foreground);
}

.ui-badge-success {
  background: #dcefe2;
  color: #22523b;
}

.ui-badge-warning {
  background: #f3e4cf;
  color: #764617;
}

html.dark .ui-badge-success {
  background: rgba(139, 211, 169, 0.16);
  color: #b9e9cc;
}

html.dark .ui-badge-warning {
  background: rgba(214, 155, 98, 0.16);
  color: #f0c497;
}

.ui-separator {
  height: 1px;
  width: 100%;
  background: var(--border);
}

.ui-separator-vertical {
  width: 1px;
  height: auto;
}

@media (max-width: 900px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .primary-nav {
    justify-content: flex-start;
  }

  .hero-section,
  .speed-layout,
  .map-preview-grid,
  .page-grid,
  .benchmark-grid,
  .callout-band,
  .examples-layout,
  .docs-browser,
  .docs-article-page {
    grid-template-columns: 1fr;
  }

  .hero-visual,
  .map-console {
    min-height: 430px;
  }

  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .relationship-board {
    grid-template-columns: 1fr;
  }

  .tree-panel {
    min-height: auto;
  }

  .docs-sidebar {
    position: static;
  }

  .docs-feature-grid {
    grid-template-columns: 1fr;
  }

  .docs-lane-grid,
  .docs-next-links {
    grid-template-columns: 1fr;
  }

  .relationship-spine {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .relationship-spine::before {
    display: none;
  }
}

@media (max-width: 620px) {
  .primary-nav a {
    padding-inline: 0.5rem;
  }

  .hero-copy h1 {
    font-size: clamp(3.2rem, 18vw, 4.9rem);
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .examples-grid {
    grid-template-columns: 1fr;
  }

  .speed-row,
  .counter-card {
    align-items: flex-start;
    grid-template-columns: 1fr;
  }

  .counter-card {
    flex-direction: column;
  }

  .map-node {
    min-width: 7.8rem;
  }

  .relationship-footer {
    grid-template-columns: 1fr;
  }

  .roadmap-item > div:last-child,
  .docs-article-header,
  .docs-source-panel,
  .docs-status-panel {
    grid-template-columns: 1fr;
  }
}
`;
