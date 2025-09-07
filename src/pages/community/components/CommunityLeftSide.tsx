import CommunityDropdown from './CommunityDropdown';
import { useNavigate } from 'react-router-dom';
import { useCommunityStore } from '@store/useCommunityStore';
import { useGetHotPopularQuery } from '@hook/community/query/useGetHotPopularQuery';
import Bookmark from '@assets/icons/bookmark.svg?react';
import Arrow from '@assets/icons/arrow.svg?react';
import jobNames, { findJobIdByName } from '@utils/data/community/jobs';
import BaseImage from '@assets/images/profile.png';

const CommunityLeftSide = () => {
  const navigate = useNavigate();
  const { selectedJobName } = useCommunityStore();
  const { data: popularTodos = [] } = useGetHotPopularQuery();
  return (
    <div className="mt-[95px] flex-col items-start">
      <div className="flex w-[384px] flex-col items-start rounded-[20px] bg-white p-[30px]">
        <CommunityDropdown
          options={jobNames}
          value={jobNames[0]}
          onSelect={(value) => {
            console.log(value);
          }}
          className="cursor-pointer"
        />

        <div className="text-black font-T02-B"> 꿈꾸는 드리머</div>

        <div
          className="mt-[30px] flex w-full cursor-pointer flex-row items-center justify-end text-gray-500 font-B02-SB"
          onClick={() => {
            const id = findJobIdByName(selectedJobName);
            navigate(`/others/${id ?? 1}`);
          }}
        >
          전체보기
          <Arrow />
        </div>
      </div>

      <div className="mb-[102px] mt-[22px] flex w-[384px] flex-col items-start rounded-[20px] bg-white px-[30px] pb-[30px] pt-10">
        <div className="text-black font-T04-B">
          {' '}
          {selectedJobName} HOT 할 일
        </div>
        <div className="mt-[37px] flex w-full flex-col items-start">
          {popularTodos.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              className="flex w-full cursor-pointer flex-row items-start justify-between py-4"
              onClick={() => navigate(`/otherslist/${item.todoGroupId}`)}
            >
              <div className="flex flex-row items-center gap-[15px]">
                <div className="text-purple-500 font-T05-SB">{idx + 1}</div>
                <div className="flex flex-row items-center gap-[15px]">
                  <img
                    src={item.imageUrl || BaseImage}
                    alt="프로필이미지"
                    className="h-[30px] w-[30px] rounded-full bg-gray-50"
                  />

                  <div className="flex flex-col">
                    <div className="flex w-full flex-row items-start justify-between gap-[10px]">
                      <div className="w-[170px] min-w-0 flex-1 truncate text-black font-B01-SB">
                        {item.description}
                      </div>
                      <div className="shrink-0 whitespace-nowrap text-gray-500 font-C01-R">
                        {item.dDay}
                      </div>
                    </div>
                    <div className="mt-1 text-gray-500 font-C01-R">
                      {item.name}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center gap-[6px] text-purple-500">
                <Bookmark />
                <span className="font-B03-SB">{item.saveCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityLeftSide;
