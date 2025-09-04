import { useState } from 'react';
import DropDownIcon from '@assets/icons/drop_down.svg?react';
import CommunityContents from './CommunityContents';

const CommunityRightSide = () => {
  const [active, setActive] = useState('전체');

  const filters = ['전체', '1단계: 씨앗', '2단계: 새싹', '3단계: 꿈나무'];

  return (
    <div className="mt-[95px] flex w-full flex-col rounded-[30px] bg-white p-[30px]">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`rounded-[10px] p-2 font-B03-SB ${
                active === filter
                  ? 'bg-purple-100 text-purple-500'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex cursor-pointer flex-row items-center gap-2">
          <span className="text-gray-900 font-B02-M">최신순</span>
          <DropDownIcon className="h-4 w-4 text-gray-700" />
        </div>
      </div>
      <CommunityContents />
    </div>
  );
};

export default CommunityRightSide;
