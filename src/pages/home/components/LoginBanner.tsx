import Arrow from '@assets/icons/arrow.svg?react';
import Bell from '@assets/images/bell.webp';
import { useBannerQuery } from '@hook/useHomeQuery';
import { useUserStore } from '@store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '@store/filterStore';
import SliderContainer from '@pages/home/components/SliderContainer.tsx';
import { useGetInfo } from '@hook/mypage/useMypageQuery';

const LoginBanner = () => {
  const { data: jobList } = useBannerQuery();
  const regionName = useUserStore((s) => s.regionName);
  const navigate = useNavigate();
  const setSelection = useFilterStore((s) => s.setSelection);
  const nickname = localStorage.getItem('nickname');
  const { data: myInfo } = useGetInfo();

  const levelLabel = (() => {
    const level = myInfo?.level?.trim();
    if (!level) return null;
    const normalized = level.replace(/\s*단계\s*$/u, '');
    return normalized.length > 0 ? normalized : null;
  })();
  return (
    <div className="flex h-[489px] w-full items-center justify-center gap-5 bg-purple-150 px-[120px] pb-[50px] pt-[60px]">
      <div className="mt-[10px]">
        <div className="pb-[10px] pt-[33px] text-purple-700 font-T02-B">
          안녕하세요,
          <br />
          {levelLabel ? `[${levelLabel}] ` : ''}
          {nickname}님
        </div>
        <SliderContainer />
      </div>
      <div className="flex h-[379px] w-[480px] flex-col gap-5 rounded-[30px] border bg-white p-8">
        <div className="flex w-full items-center justify-between">
          <img src={Bell} alt="Bell" className="h-[60px] w-[60px]" />
          <button
            className="flex items-center text-gray-500 font-B02-SB"
            onClick={() => {
              setSelection('location', regionName);
              navigate('/jobsearch');
            }}
          >
            채용 정보 보기 <Arrow />
          </button>
        </div>

        <span className="truncate text-gray-900 font-T01-B">
          {regionName} 채용 현황
        </span>
        <div className="flex flex-col gap-5">
          {jobList?.map((job) => (
            <div key={job['job-name']} className="flex items-center gap-4">
              <div className="rounded-[10px] bg-purple-100 p-2 text-purple-500 font-T05-SB">
                {job['job-name']}
              </div>
              <div className="text-gray-900 font-T05-SB">{job.count}건</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginBanner;
