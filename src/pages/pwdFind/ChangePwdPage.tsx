import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@common/Input.tsx';
import Button from '@common/Button.tsx';
import { z } from 'zod';
import { pwdSchema } from '@validation/pwdFind/pwdSchema';
import { useLocation } from 'react-router-dom';

const changePwdSchema = z
  .object({
    password: pwdSchema,
    passwordcheck: pwdSchema,
  })
  .refine((data) => data.password === data.passwordcheck, {
    path: ['passwordcheck'],
    message: '비밀번호가 일치하지 않습니다',
  });

type ChangePwdFormData = z.infer<typeof changePwdSchema>;

const ChangePwdPage = () => {
  const location = useLocation();
  const { email, loginId } = location.state || {};

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<ChangePwdFormData>({
    resolver: zodResolver(changePwdSchema),
    mode: 'onChange'
  });

  const onSubmit = () => {
    console.log('이메일:', email);
    console.log('아이디:', loginId);
    // 비밀번호 변경 API 호출 로직 추가
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[428px] flex-col items-start justify-center md:mt-16 lg:mt-24">
        <div className="mb-2 text-lg text-gray-800 font-T01-B">
          비밀번호 재설정
        </div>

        <div className="mb-[50px] text-gray-800 font-B02-M">
          8~16자 영문 대소문자, 숫자, 특수문자를 포함해야합니다.
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-1 text-gray-600 font-B01-M">비밀번호</div>
          <Input
            {...register('password')}
            type="password"
            placeholder="비밀번호를 입력하세요"
            className={`mb-1 h-[68px] w-full font-B02-M ${errors.password ? 'border-red-500' : ''}`}
            isPassword
            value={watch('password') || ''}
            onChange={e => setValue('password', e.target.value, { shouldValidate: true })}
          />
          {errors.password && (
            <p className="mb-4 text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="mb-4 mt-2 text-gray-500 font-B03-M">
            8~16자/영문 대소문자, 숫자, 특수문자 조합
          </div>

          <div className="mb-1 mt-2 text-gray-600 font-B01-M">비밀번호 확인</div>
          <Input
            {...register('passwordcheck')}
            type="password"
            placeholder="비밀번호를 입력하세요"
            className={`mb-1 h-[68px] w-full font-B02-M ${errors.passwordcheck ? 'border-red-500' : ''}`}
            isPassword
            value={watch('passwordcheck') || ''}
            onChange={e => setValue('passwordcheck', e.target.value, { shouldValidate: true })}
          />
          {errors.passwordcheck && (
            <p className="mb-4 text-red-500 text-sm">{errors.passwordcheck.message}</p>
          )}

          <div className="mt-[50px] h-[60px] w-full font-T05-SB">
            <Button
              text="비밀번호 변경하기"
              className="bg-primary-500 h-full w-full p-[11px] text-white"
              type="submit"
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePwdPage;
