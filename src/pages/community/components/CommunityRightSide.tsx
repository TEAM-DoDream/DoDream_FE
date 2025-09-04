import { useState } from 'react';
import DropDownIcon from '@assets/icons/drop_down.svg?react';
import CommunityContents from './CommunityContents';

const CommunityRightSide = () => {
  const [active, setActive] = useState('전체');
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState('최신순');

  const filters = ['전체', '1단계: 씨앗', '2단계: 새싹', '3단계: 꿈나무'];
  const sortOptions = ['최신순', '인기순'];

  const handleSelect = (option: string) => {
    setSort(option);
    setIsOpen(false);
  };

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

        <div className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex cursor-pointer flex-row items-center gap-2 p-[10px]"
          >
            <span className="text-gray-900 font-B02-M">{sort}</span>
            <DropDownIcon className="h-4 w-4 text-gray-700" />
          </button>

          {isOpen && (
            <div className="absolute right-[10px] mt-[5px] w-[192px] rounded-2xl border-[1.4px] border-gray-200 bg-white shadow-shadow4">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`cursor-pointer px-5 py-6 ${
                    sort === option
                      ? 'text-purple-500 font-B01-SB'
                      : 'text-gray-400 font-B01-M'
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CommunityContents />
    </div>
  );
};

export default CommunityRightSide;
