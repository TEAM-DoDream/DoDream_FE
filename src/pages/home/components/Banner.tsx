import Arrow from '@assets/icons/arrow.svg?react';
import Bell from '@assets/images/bell.webp';
import { useNoBannerQuery } from '@hook/useHomeQuery';
import { useNavigate } from 'react-router-dom';
import Tag from '@common/Tag.tsx';
import SliderContainer from './SliderContainer';

const Banner = () => {
  const { data: jobList } = useNoBannerQuery();
  const navigate = useNavigate();

  return (
    <div className="flex h-[489px] w-full flex-row items-center justify-center space-x-5 bg-purple-150 px-[120px] pb-[50px] pt-[60px]">
      <div className="relative flex flex-row gap-6">
        <div className="mt-[10px]">
          <div className="pb-[10px] pt-[33px] text-purple-700 font-T02-B">
            인생 2막의 시작은 <br />
            두드림과 함께 하세요!
          </div>
          <SliderContainer />
        </div>
      </div>

      <div className="flex h-[379px] w-[440px] flex-col items-start rounded-[30px] border border-gray-300 bg-white p-[30px]">
        <div className="flex w-full flex-row items-start justify-between">
          <img src={Bell} alt="Bell" className="h-[60px] w-[60px]" />
          <div
            className="flex cursor-pointer flex-row items-center"
            onClick={() => navigate('/jobsearch')}
          >
            <div className="text-gray-500 font-B02-SB"> 채용 정보 보기 </div>
            <Arrow />
          </div>
        </div>

        <span className="mt-5 text-gray-900 font-T01-B">
          {' '}
          인기 직종 채용 현황
        </span>

        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-5">
            {jobList &&
              jobList.map((job) => (
                <div
                  key={job['job-name']}
                  className="flex flex-row items-center gap-4"
                >
                  <Tag context={job['job-name']} />
                  <div className="text-gray-900 font-T05-SB">{job.count}건</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
