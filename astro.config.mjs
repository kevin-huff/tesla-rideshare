// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [],
  output: "static",
  build: {
    // Inline all CSS into the HTML head. The site is one page targeting
    // cellular passengers — saving the CSS round trip beats per-page caching.
    inlineStylesheets: "always",
  },
});
