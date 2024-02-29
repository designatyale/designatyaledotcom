/*
 * earlyScripts.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * Defines "early scripts", which are inlined scripts to run before any Next.js
 * code is loaded. Their placement at the top of the HTML document allows them
 * to run before the DOM is rendered and so prevent any flash of unstyled content,
 * e.g. to add darkmode classes to the <html /> node before the page hydrates.
 */

import { any as javascript } from 'code-tag';

/* ------------------------------- Theme Color ------------------------------ */

const COLOR_SCHEME_INLINE = javascript`
if (typeof window !== "undefined") { 
  let colorScheme = localStorage.getItem("daylight-color-scheme") || "dark";
  if (colorScheme == "auto") {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    colorScheme = mql.matches ? "dark" : "light";
  }
  // document.documentElement.classList.add(\`\${colorScheme}-mode\`);
  document.documentElement.classList.add(\`dark-mode\`);
}
`;

export const ColorSchemeScript = () => (
  <script
    id="daylight-color-scheme-script"
    type="text/javascript"
    dangerouslySetInnerHTML={{
      __html: COLOR_SCHEME_INLINE,
    }}
  />
);

const MUFFLE_STROKE_WARN = javascript`
const { warn } = console;
console.warn = function(...args) {
  if (args[0] == "No stroke found!") return;
  warn(...args);
}
`;

export const MuffleStrokeWarnScript = () => (
  <script
    id="muffle-stroke-warn-script"
    type="text/javascript"
    dangerouslySetInnerHTML={{
      __html: MUFFLE_STROKE_WARN,
    }}
  />
);
