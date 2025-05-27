import { z } from 'zod';

export const ScrapRecruitItemSchema = z.object({
  scrapId: z.number(),
  id: z.string(),
  title: z.string(),
  companyName: z.string(),
  locationName: z.string(),
  experienceLevel: z.string(),
  jobTypeName: z.string(),
  'expiration-date': z.string(),
  deadline: z.string(),
  url: z.string(),
});

const SortSchema = z.union([
  z.object({
    empty: z.boolean(),
    sorted: z.boolean(),
    unsorted: z.boolean(),
  }),
  z.array(z.any()),
]);

export const ScrapRecruitListResponseSchema = z.object({
  success: z.boolean(),
  timestamp: z.string(),
  data: z.object({
    totalElements: z.number(),
    totalPages: z.number(),
    size: z.number(),
    content: z.array(ScrapRecruitItemSchema),
    number: z.number(),
    sort: SortSchema,
    numberOfElements: z.number(),
    pageable: z.object({
      offset: z.number(),
      sort: SortSchema,
      paged: z.boolean(),
      unpaged: z.boolean(),
      pageNumber: z.number(),
      pageSize: z.number(),
    }),
    first: z.boolean(),
    last: z.boolean(),
    empty: z.boolean(),
  }),
});

export type ScrapRecruitItem = z.infer<typeof ScrapRecruitItemSchema>;
export type ScrapRecruitListResponse = z.infer<
  typeof ScrapRecruitListResponseSchema
>;
