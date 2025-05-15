import Arrow from '@assets/icons/arrow.svg?react';
import Like from '@assets/icons/like.svg?react';
import FullLike from '@assets/icons/fullheart.svg?react';
import Eye from '@assets/icons/purpleeye.svg?react';
import { useUserStore } from '@store/useUserStore';
import { useState } from 'react';
import { useNewRecruitQuery, useNoNewRecruitQuery } from '@hook/useHomeQuery';

const HomeRecruit = () => {
  const regionName = useUserStore((state) => state.regionName);
  // const sortByTime = (a: RecruitItem, b: RecruitItem): number => {
  //   const timeA = Number(a.time) || 0;
  //   const timeB = Number(b.time) || 0;
  //   return timeA - timeB;
  // };
  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({});
  const toggleLike = (id: number) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const isLoggedIn = localStorage.getItem('accessToken');

  const { data: recruitData } = isLoggedIn
    ? useNewRecruitQuery(1)
    : useNoNewRecruitQuery(1);

  return (
    <div>
      <div className="mb-[50px] flex items-center justify-between">
        <div className="text-gray-900 font-T02-B">
          {isLoggedIn
            ? `${regionName}에 새로 올라온 구인글이에요!`
            : '두드림에 새로 올라온 구인글이에요!'}
        </div>
        <div className="flex cursor-pointer flex-row items-center text-gray-500 font-B02-SB">
          더 보러가기
          <Arrow />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {recruitData &&
          recruitData.map((data) => (
            <div
              key={data.id}
              className="flex h-auto w-[384px] cursor-pointer flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 p-[30px] hover:shadow-shadow2"
            >
              <div
                className="flex w-full flex-col items-end"
                onClick={() => toggleLike(data.id)}
              >
                {likedItems[data.id] ? <FullLike /> : <Like />}
              </div>
              <div className="mt-3 text-gray-500 font-B03-M">
                {data.companyName}
              </div>
              <div className="mt-4 flex h-10 items-center justify-center rounded-[10px] bg-purple-100 px-[10px] py-2 text-purple-500 font-B01-B">
                {data.jobName}
              </div>
              <div className="mt-2 self-stretch text-gray-900 font-T05-SB">
                {data.title}
              </div>

              <div className="mt-[61px] flex w-full items-center justify-between">
                <div className="text-gray-500 font-B03-M">{data.postDate}</div>
                <div className="flex flex-row items-center justify-center gap-[6px]">
                  <Eye />
                  <span className="text-purple-500 font-B03-M">
                    {data.count}명이 관심을 보였어요
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeRecruit;
