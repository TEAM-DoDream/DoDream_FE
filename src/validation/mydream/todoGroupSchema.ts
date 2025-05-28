import { z } from 'zod';

export const TodoItemSchema = z.object({
  todoId: z.number(),
  title: z.string(),
  completed: z.boolean(),
  isMemoExist: z.boolean(),
  isPublic: z.boolean(),
});

export const TodoGroupSchema = z.object({
  todoGroupId: z.number(),
  memberNickname: z.string(),
  profileImage: z.string().url().nullable(),
  daysAgo: z.number().nullable(),
  jobName: z.string().nullable(),
  totalView: z.number(),
  todos: z.array(TodoItemSchema),
});

export type TodoGroupData = z.infer<typeof TodoGroupSchema>;
