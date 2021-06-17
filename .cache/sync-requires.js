
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/Users/beatricegobbo/Documents/Github-docs/xaiprimer-app/.cache/dev-404-page.js")),
  "component---src-pages-about-js": preferDefault(require("/Users/beatricegobbo/Documents/Github-docs/xaiprimer-app/src/pages/about.js")),
  "component---src-pages-chart-js": preferDefault(require("/Users/beatricegobbo/Documents/Github-docs/xaiprimer-app/src/pages/chart.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/beatricegobbo/Documents/Github-docs/xaiprimer-app/src/pages/index.js")),
  "component---src-pages-tool-js": preferDefault(require("/Users/beatricegobbo/Documents/Github-docs/xaiprimer-app/src/pages/tool.js")),
  "component---src-pages-using-typescript-tsx": preferDefault(require("/Users/beatricegobbo/Documents/Github-docs/xaiprimer-app/src/pages/using-typescript.tsx"))
}

