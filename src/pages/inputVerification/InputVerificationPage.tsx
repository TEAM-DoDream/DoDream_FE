import Button from '@common/Button.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import Display from '@pages/inputVerification/components/Display.tsx';
import InputCode from '@pages/inputVerification/components/InputCode.tsx';
import { VerificationFormData, verificationSchema } from '@validation/idFind/verificationSchema';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerifyCodeCheckMutation } from '@hook/signup/useVerifyCodeCheckMutation';
import { useState } from 'react';

const InputVerification = () => {
  const{handleSubmit, formState: { errors },setValue } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    mode: 'onChange'
  });

  const onSubmit = (data: VerificationFormData) => {
    console.log(data);
  };
  const location = useLocation();
  const email = location.state?.email;

  const { mutate: verifyCodeCheck } = useVerifyCodeCheckMutation();
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const handleVerifyCodeCheck = () => {
    verifyCodeCheck({
      email: email,
      type: 'FIND_ID',
      code: code,
    }, {
      onSuccess: (response) => {
        console.log(response);
        navigate('/resultId');
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[428px] flex-col items-start justify-center md:mt-16 lg:mt-24">
        <div className="mb-4 text-gray-700 font-T01-B">인증번호 입력하기</div>
        <div className="mb-6 text-gray-800 font-B02-M">
          이메일로 전송된 인증번호를 입력해주세요.
        </div>
        <Display email={email} />
        <div className={'mb-2 text-gray-600 font-B01-M'}>인증번호 입력</div>
        <InputCode onChange={(value) => {
          setValue('verificationCode', value);
        }} />
        {errors.verificationCode && (
          <p className="mb-4 text-red-500 text-sm">{errors.verificationCode.message}</p>
        )}
        <InputCode value={code} onChange={setCode} email={email} />
        <div className={'mt-[10px] text-gray-500 font-B03-M'}>
          인증번호가 안 왔다면 이메일을 확인하거나 [다시 받기]를 눌러주세요
        </div>
        <div className="mt-8 h-[60px] w-full font-T05-SB">
          <Button text={'입력 완료하기'} className="h-[60px] w-full" onClick={handleSubmit(onSubmit)}/>
          <Button text={'입력 완료하기'} className="h-[60px] w-full" onClick={handleVerifyCodeCheck} />
        </div>

      </div>
    </div>
  );
};

export default InputVerification;
