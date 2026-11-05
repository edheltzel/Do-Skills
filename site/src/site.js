export const siteName = 'Do Skills';

export const siteDescription =
  'A curated set of skills for coding agents: a loop from idea to pull request, plus stack skills you add per project. Install the global set once with npx skills.';

export const installCommand =
  'npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/global -g';

/** Per-project install. Replace <group> with a group name. */
export const projectCommand =
  'npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/project/<group>';

/**
 * Skill counts shown in the hero ledger and the scope cards. One source so the
 * two never drift; update here when Do-Skills adds or removes a skill.
 */
export const counts = { skills: 67, global: 38, project: 29, groups: 13 };

/** In-site docs hub. Canonical pages live in the repo `docs/` tree. */
export const docsHref = '/docs';
export const installHref = '/#install';

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
