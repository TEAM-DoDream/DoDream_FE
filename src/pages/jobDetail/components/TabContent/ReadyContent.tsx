const ReadyContent = () => {
  const items = [
    {
      text: '유튜브에서 "요양보호사 하루일과" 영상 시청하기',
    },
    {
      text: `‘한국보건의료인국가시험원' 홈페이지 방문하여 자격요건, 시험 일정 확인..`,
    },
    {
      text: `‘한국보건의료인국가시험원' 홈페이지 방문하여 자격요건, 시험 일정 확인..`,
    },
  ];

  return (
    <div className="gap-10 space-y-5">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <div className="truncate text-gray-500 font-B01-M">{item.text}</div>

          <button className="hover: flex h-[34px] w-[96px] items-center justify-center rounded-[10px] bg-purple-500 p-2 text-purple-100 font-B03-SB hover:bg-purple-600">
            내 할일에 추가
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReadyContent;
