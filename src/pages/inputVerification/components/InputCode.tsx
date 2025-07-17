const InputCode = () => {
  return (
    <div className="relative w-[384px]">
      <input
        type="text"
        placeholder="인증번호를 입력하세요"
        className="h-12 w-full rounded-lg border border-gray-300 pl-4 pr-[84px] text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-gray-300 px-3 py-1.5 text-sm text-white"
      >
        다시 받기
      </button>
    </div>
  );
};

export default InputCode;
