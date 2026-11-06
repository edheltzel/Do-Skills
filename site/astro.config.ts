import { execSync } from "node:child_process";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, {
  defineConfig as defineNimbusConfig,
} from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";
import { repoLinks } from "./src/lib/repo-links";

const buildCommit = execSync("git rev-parse --verify HEAD^{commit}", {
  cwd: new URL("..", import.meta.url),
  encoding: "utf8",
}).trim();

const site = process.env.SITE_URL || "https://doskills.edheltzel.codes";

const nimbusConfig = defineNimbusConfig({
  site,
  title: "Do Skills",
  description:
    "A curated set of skills for coding agents: a loop from idea to pull request, plus stack skills you add per project.",
  locale: "en",
  homeLabel: "Home",
  github: "https://github.com/edheltzel/Do-Skills",
  socialImage: "/og.png",
  socialImageAlt:
    "Do Skills. A curated set of skills for coding agents: a loop from idea to pull request, plus stack skills you add per project.",
  sidebar: {
    items: [
      { label: "Home", link: "/" },
      { label: "Global", autogenerate: { directory: "global" } },
      { label: "Project", autogenerate: { directory: "project" } },
    ],
  },
  // Same-repo checkout of docs/ — not a second copy. Path is relative to site/.
  sources: {
    "do-skills": {
      repo: "..",
      ref: buildCommit,
      path: "docs",
      editPattern: "https://github.com/edheltzel/Do-Skills/edit/master/{path}",
    },
  },
});

export default defineConfig({
  site,
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    nimbus(nimbusConfig, {
      // The docs are plain .md from ../docs; there is no MDX to validate.
      validateMdx: false,
      rules: {
        "nimbus/frontmatter-shape": "error",
        "nimbus/internal-link": "error",
      },
      markdown: {
        hastPlugins: [tableScroll(), repoLinks()],
        features: { headingAttributes: true },
      },
    }),
  ],
});
