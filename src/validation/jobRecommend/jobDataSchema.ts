import { z } from 'zod';

export const jobDataSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string(),
  imageUrl: z.string(),
  reasons: z.object({
    personality: z.string().optional(),
    condition: z.string().optional(),
    strong: z.string().optional(),
  }),
});

export const jobDataArraySchema = z.array(jobDataSchema);

export type JobData = z.infer<typeof jobDataSchema>;
