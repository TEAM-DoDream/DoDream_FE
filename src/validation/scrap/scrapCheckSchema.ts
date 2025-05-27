import { z } from 'zod';

const ScrapCheckItemSchema = z.object({
  index: z.number(),
  isScrap: z.boolean()
});

export const ScrapCheckResponseSchema = z.object({
  success: z.boolean(),
  timestamp: z.string(),
  data: z.array(ScrapCheckItemSchema)
});

export type ScrapCheckItem = z.infer<typeof ScrapCheckItemSchema>;
export type ScrapCheckResponse = z.infer<typeof ScrapCheckResponseSchema>; 