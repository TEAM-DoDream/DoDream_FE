import CheckList from '@common/CheckList';

const readyList: string[] = [
  // '준비하기 tab을 누르면 나오는 화면이에용',
  // '준비하기 tab을 누르면 나오는 화면이에용',
  // '준비하기 tab을 누르면 나오는 화면이에용',
];

const ReadyTab = () => {
  return (
    <div className="flex h-[168px] flex-col gap-4 overflow-hidden">
      {!readyList || readyList.length === 0 ? (
        <div className="text-gray-500 font-B02-SB">해당 todo가 없습니다.</div>
      ) : (
        <CheckList lists={readyList} />
      )}
    </div>
  );
};

export default ReadyTab;
