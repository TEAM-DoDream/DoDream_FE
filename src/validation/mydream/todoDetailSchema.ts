import { z } from 'zod';

export const TodoDetailSchema = z.object({
  todoId: z.number(),
  title: z.string(),
  isPublic: z.boolean(),

  memoText: z.string().nullable().optional(),

  link: z.string().nullable().optional(),

  images: z
    .array(
      z.object({
        imageId: z.number(),
        imageUrl: z.string(),
      })
    )
    .nullable()
    .optional(),
});

export type TodoDetailData = z.infer<typeof TodoDetailSchema>;
