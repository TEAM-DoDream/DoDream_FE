import { z } from 'zod';

export const RecruitItemSchema = z.object({
  url: z.string().url(),
  active: z.number(),
  title: z.string(),
  jobName: z.string(),
  companyName: z.string(),
  locationName: z.string(),
  jobTypeName: z.string(),
  experienceLevel: z.string(),
  requiredEducationLevel: z.string(),
  closeType: z.string(),
  salary: z.string(),
  id: z.string(),
  postTimestamp: z.string(),
  postDate: z.string(),
  'expiration-timestamp': z.string(),
  'expiration-date': z.string(),
  deadline: z.string(),
  count: z.coerce.number(),
});

export const RecruitListResponseSchema = z.object({
  count: z.number(),
  start: z.number(),
  total: z.coerce.number(),
  job: z.array(RecruitItemSchema),
});

export type RecruitItem = z.infer<typeof RecruitItemSchema>;
export type RecruitListResponse = z.infer<typeof RecruitListResponseSchema>;
