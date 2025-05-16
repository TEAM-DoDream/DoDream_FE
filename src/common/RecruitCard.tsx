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
interface RecruitCardProps {
  item: RecruitItem;
  onClick?: () => void;
}

const RecruitCard = ({ item, onClick }: RecruitCardProps) => {
  return (
    <div
      onClick={onClick}
      className="flex h-[330px] w-[388px] cursor-pointer flex-col justify-between rounded-[30px] border border-gray-200 bg-white p-[24px] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-start justify-between">
        <span className="ml-[10px] mt-[8px] rounded-[10px] bg-purple-100 px-3 py-1 text-purple-500 font-B01-B">
          {item.deadline === 'D-0' ? 'D-day' : item.deadline}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="ml-auto"
        >
          <Like className="h-6 w-6 text-gray-400 hover:text-gray-600" />
        </button>
      </div>

      <div>
        <div className="mt-[20px] text-gray-500 font-B03-M">{item.company}</div>
        <h3 className="mt-[12px] text-black font-T04-SB">{item.title}</h3>
        <div className="mt-[16px] flex flex-wrap gap-0.5">
          {item.hashtags.map((tag, i) => (
            <span
              key={i}
              className="whitespace-nowrap px-2 py-1 text-gray-500 font-B03-M"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-[30px] flex items-center justify-end gap-1 px-0 py-0">
        <span className="text-gray-500 font-B03-M">마감일</span>
        <span className="text-gray-300">|</span>
        <span className="text-purple-500 font-B03-M">{item.endDate}</span>
      </div>
    </div>
  );
};

export default RecruitCard;
