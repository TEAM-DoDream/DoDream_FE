import Like from '@assets/icons/like.svg?react';
import { isDdayReached } from '@utils/functions/dateCompare';

interface AcademyItem {
  address: string;
  realMan: string;
  subTitle: string;
  title: string;
  titleLink: string;
  traStartDate: string;
  traEndDate: string;
  traDuration: string;
  trainstCstId: string;
  trprDegr: string;
  trprId: string;
}

const LearningCard = ({ item }: { item: AcademyItem }) => {
  return (
    <div className="flex h-[330px] w-[388px] flex-col justify-between rounded-[30px] border border-gray-200 bg-white p-6 transition-shadow hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
      <div>
        <div className="flex items-start justify-between">
          {isDdayReached(item.traStartDate) && (
            <span className="rounded-[10px] bg-purple-100 px-3 py-1 text-purple-500 font-B01-B">
              D-day
            </span>
          )}
          <Like className="ml-auto h-6 w-6 cursor-pointer text-gray-300 hover:text-purple-500" />
        </div>

        <div className="mt-[12px] text-gray-500 font-B03-M">
          {item.subTitle}
        </div>

        <h3 className="mt-[12px] text-black font-T04-SB">{item.title}</h3>

        <div className="mt-[16px] flex flex-wrap gap-0.5">
          <span className="whitespace-nowrap px-2 py-1 text-gray-500 font-B03-M">
            # {item.address}
          </span>
          <span className="whitespace-nowrap px-2 py-1 text-gray-500 font-B03-M">
            # {item.traDuration}
          </span>
          <span className="whitespace-nowrap px-2 py-1 text-gray-500 font-B03-M">
            # {item.traStartDate} ~ {item.traEndDate}
          </span>
        </div>
      </div>

      <div className="mt-auto flex justify-end">
        <div className="rounded-[10px] bg-purple-50 px-4 py-2">
          <span className="text-purple-500 font-B01-B">{item.realMan}</span>
        </div>
      </div>
    </div>
  );
};

export default LearningCard;
