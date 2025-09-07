import { z } from 'zod';

export const PopularTodoSchema = z.object({
  todoId: z.number(),
  title: z.string(),
  profileImage: z.string().url().nullable(),
  memberNickname: z.string(),
  memberLevel: z.string().nullable(),
  jobName: z.string(),
  saveCount: z.number(),
});

export const PopularResponseSchema = z.object({
  success: z.boolean(),
  timestamp: z.string(),
  data: z.array(PopularTodoSchema),
});

export type PopularTodo = z.infer<typeof PopularTodoSchema>;
export type PopularResponse = z.infer<typeof PopularResponseSchema>;
