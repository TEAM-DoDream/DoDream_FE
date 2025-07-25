import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@common/Button.tsx';
import Display from '@pages/inputVerification/components/Display.tsx';
import InputCode from '@pages/inputVerification/components/InputCode.tsx';
import {
  VerificationFormData,
  verificationSchema,
} from '@validation/idFind/verificationSchema';
import { useVerifyCodeCheckMutation } from '@hook/signup/useVerifyCodeCheckMutation';

const InputVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    mode: 'onChange',
  });

  const code = watch('verificationCode');
  const { mutate: verifyCodeCheck } = useVerifyCodeCheckMutation();

  const onSubmit = () => {
    if (!email) {
      alert('이메일 정보가 없습니다.');
      return;
    }

    verifyCodeCheck(
      {
        email,
        type: 'FIND_ID',
        code,
      },
      {
        onSuccess: (response) => {
          // 예시: response.loginId 또는 response.data.loginId 등 실제 응답 구조에 맞게
          const loginId = response.loginId; // 또는 response.data.loginId
          navigate('/resultId', { state: { email, loginId } });
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[428px] flex-col items-start justify-center md:mt-16 lg:mt-24">
        <h2 className="mb-4 text-gray-700 font-T01-B">인증번호 입력하기</h2>
        <p className="mb-6 text-gray-800 font-B02-M">
          이메일로 전송된 인증번호를 입력해주세요.
        </p>

        {email && <Display email={email} />}
        <label className="mb-2 text-gray-600 font-B01-M">인증번호 입력</label>
        <InputCode 
          value={watch('verificationCode') || ''} 
          email={email || ''}
          onChange={(value) => setValue('verificationCode', value)} 
        />

        {errors.verificationCode && (
          <p className="mb-4 text-sm text-red-500">
            {errors.verificationCode.message}
          </p>
        )}

        <p className="mt-[10px] text-gray-500 font-B03-M">
          인증번호가 안 왔다면 이메일을 확인하거나 [다시 받기]를 눌러주세요
        </p>

        <div className="mt-8 h-[60px] w-full font-T05-SB">
          <Button
            text="입력 완료하기"
            className="h-[60px] w-full"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};

export default InputVerification;
