import Button from '@common/Button';
import { Input } from '@common/Input';
import { useVerifyCodeCheckMutation } from '@hook/signup/useVerifyCodeCheckMutation';
import { useVerifyMutation } from '@hook/signup/useVerifyMutation';
import { useSignupStore } from '@store/useSignupStore';
import { useEffect, useState } from 'react';

interface SignupEmailVerifyProps {
  onNext: () => void;
  email: string;
}

const SignupEmailVerify = ({ onNext, email }: SignupEmailVerifyProps) => {
  const [verifyNum, setVerifyNum] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const setField = useSignupStore((state) => state.setField);

  const codeCheckMutation = useVerifyCodeCheckMutation();
  const verifyMutation = useVerifyMutation();

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendEnabled(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  useEffect(() => {
    if (verifyNum.trim().length === 6) {
      codeCheckMutation
        .mutateAsync({
          email,
          code: verifyNum.trim(),
          type: 'SIGN_UP',
        })
        .then(() => {
          setErrorMessage('');
          setSuccessMessage('올바른 인증번호입니다.');
        })
        .catch(() => {
          setSuccessMessage('');
          setErrorMessage('존재하지 않는 인증번호입니다.');
        });
    } else {
      setErrorMessage('');
      setSuccessMessage('');
    }
  }, [verifyNum, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (successMessage === '올바른 인증번호입니다.') {
      // Amplitude 이벤트 전송
      if (window.amplitude) {
        window.amplitude.track('email_verify_submit', {
          email: email,
          verification_status: 'success',
          timestamp: new Date().toISOString(),
        });
        console.log('Amplitude event sent: email_verify_submit');
      }
      
      onNext();
    }
    setField('email', email);
  };

  const handleResend = async () => {
    if (!isResendEnabled) return;

    try {
      await verifyMutation.mutateAsync({
        email,
        type: 'SIGN_UP',
      });
      setTimeLeft(180);
      setIsResendEnabled(false);
      setVerifyNum('');
      setErrorMessage('');
      setSuccessMessage('');
      
      // Amplitude 이벤트 전송 - 인증번호 재전송
      if (window.amplitude) {
        window.amplitude.track('email_verify_resend', {
          email: email,
          timestamp: new Date().toISOString(),
        });
        console.log('Amplitude event sent: email_verify_resend');
      }
    } catch {
      setErrorMessage('인증번호 재전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form
      className="flex w-full flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full max-w-[424px] flex-col items-start">
        <div className="mb-5 text-gray-900 font-T01-B">인증번호 입력하기</div>
        <div className="font-T01-M text-gray-800">
          이메일로 전송된 인증번호를 입력해주세요.
        </div>

        <div className="mt-5 flex w-full flex-col items-start justify-center gap-[10px] rounded-2xl bg-gray-50 p-5">
          <div className="flex flex-row gap-[60px]">
            <div className="text-gray-500 font-B02-M">발송된 이메일</div>
            <div className="text-gray-900 font-B02-M">{email}</div>
          </div>

          <div className="flex flex-row gap-[30px]">
            <div className="text-gray-500 font-B02-M">인증까지 남은 시간</div>
            <div className="text-success font-B02-B">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="relative mt-[50px] w-full">
          <Input
            inputtitle="인증번호 입력"
            placeholder="인증번호를 입력하세요"
            value={verifyNum}
            onChange={(e) => setVerifyNum(e.target.value)}
            className="h-[68px] w-full pr-[84px] font-B02-M"
          />

          <button
            type="button"
            disabled={!isResendEnabled}
            onClick={handleResend}
            className={`absolute right-3 top-16 h-[38px] -translate-y-1/2 items-center justify-center rounded-[10px] px-[10px] py-2 text-white font-B03-M ${
              isResendEnabled ? 'bg-purple-500' : 'bg-gray-400'
            }`}
          >
            다시 받기
          </button>

          {successMessage && (
            <div className="mt-[10px] text-success font-B03-M">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-[10px] text-warning font-B03-M">
              {errorMessage}
            </div>
          )}
        </div>

        <Button
          text="다음"
          color="primary"
          type="submit"
          className="mt-[59px] h-[60px] w-full font-T05-SB"
        />
      </div>
    </form>
  );
};

export default SignupEmailVerify;
