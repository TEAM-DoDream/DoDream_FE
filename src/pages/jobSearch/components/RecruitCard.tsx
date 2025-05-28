import Like from '@assets/icons/like.svg?react';
import PurpleHeartIcon from '@assets/icons/fullheart.svg?react';
import { RecruitItem } from '@validation/recruit/recruitSchema.ts';

interface RecruitCardProps {
  item: RecruitItem;
  isScrap?: boolean;
  onScrapClick?: (id: string, isScrap: boolean) => void;
}

const RecruitCard = ({
  item,
  isScrap = false,
  onScrapClick,
}: RecruitCardProps) => {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleScrapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onScrapClick) {
      onScrapClick(item.id, isScrap);
    }
  };

  return (
    <div className="flex h-[330px] w-[388px] cursor-pointer flex-col justify-between rounded-[30px] border border-gray-200 bg-white p-[24px] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="flex items-start justify-between">
        <span className="ml-[10px] mt-[8px] rounded-[10px] bg-purple-100 px-3 py-1 text-purple-500 font-B01-B">
          {item.deadline === 'D-0' ? 'D-day' : item.deadline}
        </span>
        <button
          type="button"
          onClick={handleScrapClick}
          aria-label={isLoggedIn ? '관심 채용 공고 담기' : '로그인 필요'}
          className={`ml-auto ${!isLoggedIn ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {isScrap ? (
            <PurpleHeartIcon className="h-6 w-6" />
          ) : (
            <Like className="h-6 w-6 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>

      <div>
        <div className="mt-[20px] text-gray-500 font-B03-M">
          {item.companyName}
        </div>
        <h3 className="mt-[12px] text-black font-T04-SB">{item.title}</h3>

        <div className="mt-[16px] flex flex-wrap gap-1">
          {[
            item.locationName,
            item.jobTypeName,
            item.experienceLevel,
            item.requiredEducationLevel,
          ].map((text) => (
            <span
              key={text}
              className="inline-block max-w-[45%] truncate break-words px-2 py-1 text-gray-500 font-B03-M"
            >
              # {text}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-[30px] flex items-center justify-end gap-1">
        <span className="text-gray-500 font-B03-M">마감일</span>
        <span className="text-gray-300">|</span>
        <span className="text-purple-500 font-B03-M">
          {item['expiration-date']}
        </span>
      </div>
    </div>
  );
};

export default RecruitCard;
