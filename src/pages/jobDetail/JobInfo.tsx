import Arrow from '@assets/icons/arrow.svg?react';
import Divider from '@common/Divider';
import Info from '@assets/icons/info.svg?react';
import DetailSideBar from './components/DetailSideBar';
import JobView from './components/JobView';
import { useNavigate } from 'react-router-dom';
// import NoDataSideBar from './components/NoDataSideBar';

const JobInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-[120px] pb-[100px]">
      <div className="mt-10 flex w-full flex-row gap-4">
        <div className="flex w-full max-w-[690px] flex-col items-start">
          <Arrow
            className="h-9 w-9 rotate-180 cursor-pointer"
            onClick={() => navigate('/jobfound')}
          />

          <div className="mb-5 mt-[10px] text-gray-900 font-T01-B">
            {' '}
            요양보호사
          </div>

          <Divider />

          <div className="flex flex-col gap-[50px]">
            <div className="flex flex-col items-start justify-center gap-5">
              <div className="mt-[50px] text-gray-900 font-T03-B">
                직업 소개
              </div>
              <div className="h-[80px] text-gray-900 font-B01-M">
                요양보호사는 노인이나 장애인 등 일상생활이 어려운 분들을
                지원하는 직업입니다. 요양보호사는 노인이나 장애인 등 일상생활이
                어려운 분들을 지원하는 직업입니다. 요양보호사는 노인이나 장애인
                등 일상생활이 어려운 분들을 지원하는 직업입니다.
              </div>
            </div>

            <div className="flex w-full flex-row gap-6">
              <div className="flex w-[384px] flex-col gap-5">
                <span className="text-gray-900 font-T03-B"> 자격증 </span>
                <span className="text-gray-900 font-B01-M">
                  {' '}
                  요양보호사 자격증, 요양보호사 자격증{' '}
                </span>
              </div>

              <div className="flex flex-col gap-5">
                <span className="text-gray-900 font-T03-B">
                  {' '}
                  자격증 준비기간{' '}
                </span>
                <span className="text-gray-900 font-B01-M">약 1개월</span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <span className="text-gray-900 font-T03-B"> 급여 </span>
              <div className="flex w-full flex-row items-center gap-[10px]">
                <div className="flex w-[41px] rounded-[10px] bg-purple-100 p-2 text-purple-500 font-B03-SB">
                  월급
                </div>
                <div className="text-gray-900 font-B01-M"> 약 220만원</div>
              </div>
            </div>

            <div className="flex flex-col gap-[30px]">
              <div>
                <span className="text-gray-900 font-T03-B"> 업무 강도 </span>
                <div className="mt-5 flex flex-row items-center gap-1">
                  <span className="text-gray-900 font-T05-SB">
                    {' '}
                    신체활동 정도
                  </span>
                  <Info />
                </div>
                <div className="mt-[6px] text-gray-900 font-B01-M">
                  움직임이 많은 활동
                </div>
              </div>

              <div>
                <div className="mt-5 flex flex-row items-center gap-1">
                  <span className="text-gray-900 font-T05-SB">
                    정신적 스트레스
                  </span>
                  <Info />
                </div>
                <div className="mt-[6px] text-gray-900 font-B01-M">높음</div>
              </div>

              <div>
                <div className="mt-5 flex flex-row items-center gap-1">
                  <span className="text-gray-900 font-T05-SB">
                    대인관계 빈도
                  </span>
                  <Info />
                </div>
                <div className="mt-[6px] text-gray-900 font-B01-M">높음</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-[100px] h-fit w-[606px] pl-[102px]">
          <DetailSideBar />
        </div>

        {/* <NoDataSideBar /> */}
      </div>

      <JobView job="요양보호사" />
    </div>
  );
};

export default JobInfo;
