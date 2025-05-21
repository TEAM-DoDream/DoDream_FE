import { z } from 'zod';

// 개별 채용 공고 스키마
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
  count: z.coerce.number(), // 문자열 숫자도 받도록
});

// 리스트 전체 응답 스키마
export const RecruitListResponseSchema = z.object({
  count: z.number(),
  start: z.number(),
  total: z.coerce.number(), // "28" 같은 문자열도 숫자로
  job: z.array(RecruitItemSchema),
});

export type RecruitItem = z.infer<typeof RecruitItemSchema>;
export type RecruitListResponse = z.infer<typeof RecruitListResponseSchema>;
