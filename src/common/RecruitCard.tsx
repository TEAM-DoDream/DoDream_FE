import Like from '@assets/icons/like.svg?react';

export interface RecruitItem {
  id: number;
  company: string;
  title: string;
  hashtags: string[];
  endDate: string;
  deadline: string;
  url: string;
}

const RecruitCard = ({ item }: { item: RecruitItem }) => {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="flex h-full w-full flex-col rounded-[30px] border-2 border-gray-300 bg-white p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-[10px] bg-purple-100 px-3 py-1 text-purple-500 font-B01-B">
            {item.deadline === 'D-0' ? 'D-day' : item.deadline}
          </span>
          <div onClick={(e) => e.stopPropagation()}>
            <Like
              className="ml-auto flex h-6 w-6 cursor-pointer justify-end"
              onClick={(e) => {
                e.preventDefault();
                // 좋아요 로직 추후 담기로 추가
              }}
            />
          </div>
        </div>

        <div className="mt-2 text-gray-500 font-B03-M">{item.company}</div>

        <h3 className="mt-1 text-black font-T04-SB">{item.title}</h3>

        <div className="mt-4 flex flex-wrap gap-0.5">
          {item.hashtags.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-gray-500 font-B03-M">
              # {tag}
            </span>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-end gap-1 px-3 py-1">
          <span className="text-gray-500 font-B03-M">마감일</span>
          <span className="text-gray-300">|</span>
          <span className="text-purple-500 font-B03-M">{item.endDate}</span>
        </div>
      </div>
    </a>
  );
};

export default RecruitCard;
