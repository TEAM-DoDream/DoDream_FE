import Like from '@assets/icons/like.svg?react';
import { LearningItem } from '@utils/data/learn/learnDummy.ts';

const LearningCard = ({ item }: { item: LearningItem }) => {
  return (
    <div className="flex h-[340px] w-[402px] flex-col justify-between rounded-[30px] border border-gray-200 bg-white p-6 transition-shadow hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
      <div>
        <div className="flex items-start justify-between">
          {item.isDay && (
            <span className="rounded-[10px] bg-purple-100 px-3 py-1 text-purple-500 font-B01-B">
              D-day
            </span>
          )}
          <Like className="ml-auto h-6 w-6 cursor-pointer text-gray-300 hover:text-purple-500" />
        </div>

        <div className="mt-[12px] text-gray-500 font-B03-M">{item.company}</div>

        <h3 className="mt-[12px] text-black font-T04-SB">{item.title}</h3>

        <div className="mt-[16px] flex flex-wrap gap-0.5">
          {item.hashtags.map((tag, index) => (
            <span
              key={index}
              className="whitespace-nowrap px-2 py-1 text-gray-500 font-B03-M"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex justify-end">
        <div className="rounded-[10px] bg-purple-50 px-4 py-2">
          <span className="text-purple-500 font-B01-B">
            {item.price.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default LearningCard;
