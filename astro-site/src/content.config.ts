import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    venue: z.string(),
    event: z.string().optional(),
    eventLink: z.string().optional(),
    slides: z.string().optional(),
    video: z.string().optional(),
    categories: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()),
    techStack: z.array(z.string()),
    github: z.string().optional(),
    demo: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { posts, talks, projects };
