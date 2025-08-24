import DropDownIcon from '@assets/icons/drop_down.svg?react';
import Arrow from '@assets/icons/arrow.svg?react';
import Bookmark from '@assets/icons/bookmark.svg?react';
import CommunityRightSide from './components/CommunityRightSide';

const Community = () => {
  return (
    <div className="flex h-full w-full flex-row gap-[22px] bg-gray-50 px-[120px]">
      <div className="mt-[95px] flex-col items-start">
        <div className="flex w-[384px] flex-col items-start rounded-[20px] bg-white p-[30px]">
          <div className="flex flex-row items-center gap-[18px]">
            <div className="text-purple-500 font-T02-B"> 요양보호사 </div>
            <DropDownIcon className="h-[30px] w-[30px] cursor-pointer text-[#A1A6B5]" />
          </div>

          <div className="text-black font-T02-B"> 꿈꾸는 드리머</div>

          <div className="mt-[30px] flex w-full flex-row items-center justify-end text-gray-500 font-B02-SB">
            전체보기
            <Arrow />
          </div>
        </div>

        <div className="mb-[102px] mt-[22px] flex w-[384px] flex-col items-start rounded-[20px] bg-white px-[30px] pb-[30px] pt-10">
          <div className="text-black font-T04-B"> 요양보호사 HOT 할 일</div>
          <div className="mt-[37px] flex w-full flex-col items-start">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="flex w-full flex-row items-start justify-between py-4"
              >
                <div className="flex flex-row items-center gap-[15px]">
                  <div className="text-purple-500 font-T05-SB">{num}</div>
                  <div className="flex flex-row items-center gap-[15px]">
                    <img
                      src="이미지"
                      alt="프로필이미지"
                      className="h-[30px] w-[30px] rounded-full bg-gray-50"
                    />

                    <div className="flex flex-col">
                      <div className="flex flex-row items-center gap-[10px]">
                        <div className="text-black font-B01-SB">
                          할일 내용내용
                        </div>
                        <div className="text-gray-500 font-C01-R">2분 전</div>
                      </div>
                      <div className="mt-1 text-gray-500 font-C01-R">
                        해바라기엄마
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-[6px] text-purple-500">
                  <Bookmark />
                  <span className="font-B03-SB">11</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CommunityRightSide />
    </div>
  );
};

export default Community;
