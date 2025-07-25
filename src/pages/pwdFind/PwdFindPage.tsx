import { Input } from '@common/Input.tsx';
import Button from '@common/Button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PwdFindFormData, pwdFindSchema } from '@validation/pwdFind/pwdFindSchema';
import { useVerifyMutation } from '@hook/signup/useVerifyMutation';
import { useNavigate } from 'react-router-dom';

const PwdFindPage = () => {
  const { handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<PwdFindFormData>({
    resolver: zodResolver(pwdFindSchema),
    mode: 'onChange'
  });
  const { mutate: verify } = useVerifyMutation();
  const navigate = useNavigate();
  const onSubmit = () => {
    verify({
      email: watch('email'),
      loginId: watch('loginId'),
      type: 'FIND_PASSWORD',
    }, {
      onSuccess: () => {
        alert(watch('loginId'));
        navigate('/verification', { state: { email: watch('email'), loginId: watch('loginId'), type: 'FIND_PASSWORD' } });
      },
      onError: (error) => {
        alert(error);
      },
    });
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[428px] flex-col items-start justify-center md:mt-16 lg:mt-24">
        <div className="mb-4 text-gray-700 font-T01-B">비밀번호 찾기</div>
        <div className="mb-6 text-gray-800 font-B02-M">
          가입한 이메일을 입력하시면, 비밀번호를 다시 설정할 수 있는 인증번호를
          전송해드립니다.
        </div>
        <div className={'mt-[24px] mb-1 text-gray-600 font-B01-M'}>이메일</div>
        <Input
          value={watch('email') || ''}
          title={'이메일'}
          placeholder={'이메일을 입력하세요'}
          onChange={e => setValue('email', e.target.value, { shouldValidate: true })}
          className={`h-[68px] w-full font-B02-M ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && (
          <p className="mb-4 text-red-500 text-sm">{errors.email.message}</p>
        )}
        <div className={'mt-[24px] mb-1 text-gray-600 font-B01-M'}>아이디</div>
        <Input
          value={watch('loginId') || ''}
          title={'아이디'}
          placeholder={'아이디를 입력하세요'}
          onChange={e => setValue('loginId', e.target.value, { shouldValidate: true })}
          className={`h-[68px] w-full font-B02-M ${errors.loginId ? 'border-red-500' : ''}`}
        />
        {errors.loginId && (
          <p className="mb-4 text-red-500 text-sm">{errors.loginId.message}</p>
        )}
        <div className="mt-[48px] h-[60px] w-full font-T05-SB">
          <Button
            text={'인증번호 전송하기'}
            className="h-full w-full"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
};

export default PwdFindPage;
