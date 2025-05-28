import { z } from 'zod';

export const TodoDetailSchema = z.object({
  todoId: z.number(),
  title: z.string(),
  isPublic: z.boolean(),
  memoText: z.string(),
  link: z.string(),
  images: z.array(
    z.object({
      imageId: z.number(),
      imageUrl: z.string().url().or(z.string()),
    })
  ),
});

export type TodoDetailData = z.infer<typeof TodoDetailSchema>;
