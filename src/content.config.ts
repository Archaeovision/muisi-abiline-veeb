// https://docs.astro.build/en/guides/content-collections/#the-collection-config-file

// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define your collection(s)
const kirjutised = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/pages/kirjutised" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
    })
});


// 5. Export a single `collections` object to register your collection(s)
export const collections = { kirjutised };