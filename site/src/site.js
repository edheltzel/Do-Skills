import { existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

export const siteName = 'Do Skills';

export const siteDescription =
  'A curated set of skills for coding agents: a loop from idea to pull request, plus stack skills you add per project. Install the global set once with npx skills.';

export const installCommand =
  'npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/global -g';

/** Per-project install. Replace <group> with a group name. */
export const projectCommand =
  'npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/project/<group>';

/**
 * Skill counts shown in the hero ledger and the scope cards, read from
 * skills/<scope>/<group>/<skill>/SKILL.md at build time so they never drift.
 * The build runs from site/, so the repo root is its parent.
 */
function countSkills() {
  const root = resolve(process.cwd(), '..', 'skills');
  const dirs = (path) => readdirSync(path, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => join(path, d.name));
  const counts = { skills: 0, global: 0, project: 0, groups: 0 };
  for (const scope of ['global', 'project']) {
    for (const group of dirs(join(root, scope))) {
      const n = dirs(group).filter((skill) => existsSync(join(skill, 'SKILL.md'))).length;
      counts[scope] += n;
      if (n > 0) counts.groups += 1;
    }
  }
  counts.skills = counts.global + counts.project;
  return counts;
}

export const counts = countSkills();

/** In-site docs hub. Canonical pages live in the repo `docs/` tree. */
export const docsHref = '/docs/';
export const installHref = 'https://github.com/edheltzel/Do-Skills/blob/master/README.md#installation';

/**
 * Social preview image. The landing page (LandingLayout.astro) resolves `path`
 * against the `site` origin. The file is public/og.png (1200x630).
 */
export const ogImage = {
  path: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Do Skills. A curated set of skills for coding agents: a loop from idea to pull request, plus stack skills you add per project. Install the global set once with npx skills.',
};
