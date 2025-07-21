import { z } from 'zod';

export const idFindSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 형식이 아닙니다.' })
});

export type IdFindFormData = z.infer<typeof idFindSchema>; 