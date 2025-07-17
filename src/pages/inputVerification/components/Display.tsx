const Display = () => {
  return (
    <div
      className={
        'flex h-[52px] w-[384px] flex-col justify-center border-[16px] bg-gray-50 p-5'
      }
    >
      <div className="flex justify-between text-sm text-gray-500">
        <span>발송된 이메일</span>
        <span className="text-black">123Dodream@naver.com</span>
      </div>
      <div className="mt-1 flex justify-between text-sm text-gray-500">
        <span>인증까지 남은 시간</span>
        <span className="font-semibold text-blue-500">02:59</span>
      </div>
    </div>
  );
};
export default Display;
