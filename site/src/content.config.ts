import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { docsCollection, partialsCollection } from "@cloudflare/nimbus-docs/content";

export const collections = {
  docs: defineCollection(
    docsCollection({
      source: "do-skills",
      pattern: "{global,project}/**/*.md",
      schemaFields: {
        audience: z.literal("human").optional(),
      },
      strictFrontmatter: false,
    }),
  ),
  partials: defineCollection(partialsCollection()),
};
