import Button from '@common/Button';
import { Input } from '@common/Input';
import { useEffect, useState } from 'react';

interface SignupProps {
  onNext: () => void;
}

const SignupEmailVerify = ({ onNext }: SignupProps) => {
  const [verifyNum, setVerifyNum] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (timeLeft <= 0) return;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
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
            <div className="text-gray-900 font-B02-M">123Dodream@naver.com</div>
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
            className="absolute right-3 top-16 h-[38px] -translate-y-1/2 items-center justify-center rounded-[10px] bg-gray-400 px-[10px] py-2 text-white font-B03-M"
          >
            다시 받기
          </button>
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
