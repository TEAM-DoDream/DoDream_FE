import { z } from 'zod';

export const ScrapTrainingItemSchema = z.object({
  scrapId: z.number().int(),
  trprId: z.string(),
  title: z.string(),
  subTitle: z.string(),
  address: z.string(),
  trprDegr: z.string(),
  traDuration: z.string(),
  realMan: z.string(),
  titleLink: z.string().url().or(z.literal('')),
});

export type ScrapTrainingItem = z.infer<typeof ScrapTrainingItemSchema>;

const SortSchema = z.array(z.any());

const PageableSchema = z.object({
  offset: z.number().int(),
  sort: SortSchema,
  unpaged: z.boolean(),
  paged: z.boolean(),
  pageNumber: z.number().int(),
  pageSize: z.number().int(),
});

export const ScrapTrainingListResponseSchema = z.object({
  success: z.boolean(),
  timestamp: z.string(),
  data: z.object({
    totalElements: z.number().int(),
    totalPages: z.number().int(),
    size: z.number().int(),
    content: z.array(ScrapTrainingItemSchema),
    number: z.number().int(),
    sort: SortSchema,
    numberOfElements: z.number().int(),
    pageable: PageableSchema,
    first: z.boolean(),
    last: z.boolean(),
    empty: z.boolean(),
  }),
});

export type ScrapTrainingListResponse = z.infer<
  typeof ScrapTrainingListResponseSchema
>;
