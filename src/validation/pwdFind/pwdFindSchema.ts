import { z } from 'zod';

export const pwdFindSchema = z.object({
    email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요.' })
    .email({ message: '올바른 이메일 형식이 아닙니다.' }),
  loginId: z
    .string()
    .min(1, { message: '아이디를 입력해주세요.' })
});

export type PwdFindFormData = z.infer<typeof pwdFindSchema>;