import { posix } from "node:path";
import { fileURLToPath } from "node:url";
import type { NimbusIntegrationOptions } from "@cloudflare/nimbus-docs";

type HastPlugin = NonNullable<NonNullable<NimbusIntegrationOptions["markdown"]>["hastPlugins"]>[number];

const REPO = "https://github.com/edheltzel/Do-Skills";
// Snapshot layout: .nimbus/sources/<source>/<hash>/<commit>/<repo path>
const SNAPSHOT_PATH = /\/[0-9a-f]{40}\/(.+)$/;
const DOCS_DIR = /^docs\/(global|project)(?:\/([^/]+))?$/;
const RELATIVE = /^(?![a-z][a-z0-9+.-]*:|\/|#)/i;

/**
 * The canonical docs are written for GitHub, so they link to folders and
 * files relative to their own path. Nimbus rewrites links to published `.md`
 * pages; every other relative link would resolve against the page URL and 404.
 * Send folders under docs/{global,project} to their docs hub section, and
 * anything else to the same path on GitHub.
 */
export function repoLinks(): HastPlugin {
  return ({ fileURL }) => {
    const repoPath = fileURL && fileURLToPath(fileURL).match(SNAPSHOT_PATH)?.[1];
    if (!repoPath) return null;
    return {
      name: "do-skills:repo-links",
      element: {
        filter: ["a"],
        visit(node) {
          const href = node.properties?.href;
          if (typeof href !== "string" || !RELATIVE.test(href)) return;
          const [, path = "", suffix = ""] = href.match(/^([^?#]*)(.*)$/) ?? [];
          if (!path || /\.mdx?$/.test(path)) return;
          const target = posix.normalize(posix.join(posix.dirname(repoPath), path));
          if (target.startsWith("..")) return;
          const isDir = path.endsWith("/");
          const clean = target.replace(/\/$/, "");
          const hub = isDir ? clean.match(DOCS_DIR) : null;
          const next = hub
            ? `/docs/#${hub[2] ? `${hub[1]}-${hub[2]}` : hub[1]}`
            : `${REPO}/${isDir ? "tree" : "blob"}/master/${clean}${isDir ? "/" : ""}${suffix}`;
          return { ...node, properties: { ...node.properties, href: next } };
        },
      },
    };
  };
}
