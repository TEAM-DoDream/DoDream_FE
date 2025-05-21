import Like from '@assets/icons/like.svg?react';
// zod 스키마에서 추출한 RecruitItem 타입을 불러옵니다
import { RecruitItem } from '@validation/recruit/recruitSchema.ts';

// interface RecruitCardProps {
//   item: RecruitItem;
//   onClick?: () => void;
// }

const RecruitCard = ({ item }: { item: RecruitItem }) => {
  return (
    <div className="flex h-[330px] w-[388px] cursor-pointer flex-col justify-between rounded-[30px] border border-gray-200 bg-white p-[24px] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      {/* D-day & 좋아요 */}
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

      {/* 회사명 & 제목 */}
      <div>
        <div className="mt-[20px] text-gray-500 font-B03-M">
          {item.companyName}
        </div>
        <h3 className="mt-[12px] text-black font-T04-SB">{item.title}</h3>

        {/* 해시태그 */}
        <div className="mt-[16px] flex flex-wrap gap-0.5">
          <span className="whitespace-nowrap px-2 py-1 text-gray-500 font-B03-M">
            # {item.locationName}
          </span>
          <span className="whitespace-nowrap px-2 py-1 text-gray-500 font-B03-M">
            # {item.jobTypeName}
          </span>
          <span className="whitespace-nowrap px-2 py-1 text-gray-500 font-B03-M">
            # {item.experienceLevel}
          </span>
          <span className="whitespace-nowrap px-2 py-1 text-gray-500 font-B03-M">
            # {item.requiredEducationLevel}
          </span>
        </div>
      </div>

      {/* 마감일 */}
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
