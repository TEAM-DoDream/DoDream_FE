import { z } from 'zod';

export const TodoSchema = z.object({
  todoId: z.number(),
  title: z.string(),
  completed: z.boolean(),
  isMemoExist: z.boolean(),
  isPublic: z.boolean(),
});

export const TodoDataSchema = z.object({
  todoGroupId: z.number(),
  memberNickname: z.string(),
  daysAgo: z.number(),
  jobName: z.string(),
  totalView: z.number(),
  todos: z.array(TodoSchema),
});

export type Todo = z.infer<typeof TodoSchema>;
export type TodoData = z.infer<typeof TodoDataSchema>; 