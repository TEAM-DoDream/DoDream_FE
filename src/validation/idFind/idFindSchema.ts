import { z } from 'zod';

export const idFindSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '유효하지 않은 형식의 이메일입니다. 다시 입력해주세요.' })
});

export type IdFindFormData = z.infer<typeof idFindSchema>; 