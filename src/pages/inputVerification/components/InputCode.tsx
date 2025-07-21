const InputCode = () => {
  return (
    <div className="relative min-h-[72px] w-[424px]">
      <input
        type="text"
        placeholder="인증번호를 입력하세요"
        className="w-full rounded-[16px] border border-gray-300 px-[20px] py-[24px] pl-4 text-gray-700 font-B02-M placeholder:text-gray-400 focus:outline-none"
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-[10px] bg-gray-400 px-[10px] py-[8px] text-white font-B03-M"
      >
        다시 받기
      </button>
    </div>
  );
};

export default InputCode;
