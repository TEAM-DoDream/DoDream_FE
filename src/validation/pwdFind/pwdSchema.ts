import { z } from 'zod';

export const pwdSchema = z.string()
.trim()
.min(8, '8자 이상 입력해주세요')
.max(16, '16자 이하로 입력해주세요')
.regex(/[a-z]/, '소문자를 포함해주세요')
.regex(/[A-Z]/, '대문자를 포함해주세요')
.regex(/[0-9]/, '숫자를 포함해주세요')
.regex(/[^A-Za-z0-9]/, '특수문자를 포함해주세요');

export type PwdFormData = z.infer<typeof pwdSchema>;