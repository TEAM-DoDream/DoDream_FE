import { z } from 'zod';

export const AcademyItemSchema = z.object({
  address: z.string(),
  realMan: z.string(),
  subTitle: z.string(),
  title: z.string(),
  titleLink: z.string().url(),
  traStartDate: z.string(),
  traEndDate: z.string(),
  traDuration: z.string(),
  trainstCstId: z.string(),
  trprDegr: z.string(),
  trprId: z.string(),
});
export type AcademyItem = z.infer<typeof AcademyItemSchema>;

export const AcademyListResponseSchema = z.object({
  srchList: z.array(AcademyItemSchema),
  scn_cnt: z.coerce.number(),
  pageNum: z.coerce.number(),
  pageSize: z.coerce.number(),
});
export type AcademyListResponse = z.infer<typeof AcademyListResponseSchema>;
