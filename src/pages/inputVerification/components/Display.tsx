

interface DisplayProps {
  email: string;
  remainTime: number;
}

const Display = ({ email, remainTime }: DisplayProps) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex min-h-[52px] w-[424px] flex-col justify-center rounded-2xl bg-gray-50 p-5">
      <div className="grid grid-cols-2 text-sm text-gray-500">
        <span>발송된 이메일</span>
        <span className="text-left text-black">{email}</span>
      </div>
      <div className="mt-1 grid grid-cols-2 text-sm text-gray-500">
        <span>인증까지 남은 시간</span>
        <span className="text-left font-semibold text-blue-500">
          {formatTime(remainTime)}
        </span>
      </div>
    </div>
  );
};

export default Display;
