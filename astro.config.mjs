// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ride.kevnet.cloud",
  integrations: [sitemap()],
  output: "static",
  build: {
    // Inline all CSS into the HTML head. The site is one page targeting
    // cellular passengers — saving the CSS round trip beats per-page caching.
    inlineStylesheets: "always",
  },
});
