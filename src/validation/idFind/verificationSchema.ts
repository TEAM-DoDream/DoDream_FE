import { z } from 'zod';

export const verificationSchema = z.object({
    verificationCode: z.string()
  .min(1, { message: '인증번호를 입력해주세요.' })
  .length(6, { message: '인증번호는 6자리입니다.' })
});

export type VerificationFormData = z.infer<typeof verificationSchema>;