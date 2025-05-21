import { LoginHomeCard } from './HomeImage';
import MyDreamArrow from '@assets/icons/myDreamarrow.svg?react';
import Arrow from '@assets/icons/arrow.svg?react';
import Bell from '@assets/images/bell.webp';
import { useBannerQuery } from '@hook/useHomeQuery';
import { useUserStore } from '@store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '@store/filterStore';
import CheckList from '@common/CheckList';

const challengeList = [
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ...',
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ...',
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ...',
  'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ...',
];

const LoginBanner = () => {
  const { data: jobList } = useBannerQuery();
  const regionName = useUserStore((state) => state.regionName);
  const navigate = useNavigate();
  const setSelection = useFilterStore((state) => state.setSelection);

  return (
    <div className="flex h-[489px] w-full flex-row items-center justify-center space-x-5 bg-purple-150 px-[120px] pb-[50px] pt-[60px]">
      <div className="relative flex flex-row gap-6">
        <LoginHomeCard />

        <div className="absolute right-0 flex w-[162px] cursor-pointer items-center gap-2 rounded-full bg-white py-[6px] pl-4 pr-1">
          <span className="text-gray-500 font-B02-SB"> 나의 할일 가기</span>
          <MyDreamArrow />
        </div>

        <div className="absolute left-[30px] top-10 flex flex-col">
          <span className="text-white font-B02-M"> 58일째 꿈꾸는중</span>

          <div className="mt-[10px] text-white font-T01-B">
            요양보호사 시작하는 중
          </div>
        </div>

        <div className="absolute">
          <div className="absolute bottom-0 left-[30px] top-[255px] flex items-center justify-center">
            <CheckList
              lists={challengeList}
              className="my-6 flex flex-col gap-4"
            />
          </div>
        </div>
      </div>

      <div className="flex h-[379px] w-[440px] flex-col items-start rounded-[30px] border border-gray-300 bg-white p-[30px]">
        <div className="flex w-full flex-row items-start justify-between">
          <img src={Bell} alt="Bell" className="h-[60px] w-[60px]" />
          <button
            type="button"
            className="flex cursor-pointer flex-row items-center"
            onClick={() => {
              setSelection('location', regionName);
              navigate('/jobsearch');
            }}
          >
            <div className="text-gray-500 font-B02-SB"> 채용 정보 보기 </div>
            <Arrow />
          </button>
        </div>

        <span className="mt-5 text-gray-900 font-T01-B">
          {' '}
          {regionName} 채용 현황
        </span>

        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-5">
            {jobList &&
              jobList.map((job) => (
                <div
                  key={job['job-name']}
                  className="flex flex-row items-center gap-4"
                >
                  <div className="flex items-center justify-center rounded-[10px] bg-purple-100 p-2 text-purple-500 font-T05-SB">
                    {job['job-name']}
                  </div>
                  <div className="text-gray-900 font-T05-SB">{job.count}건</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;
