import Arrow from '@assets/icons/arrow.svg?react';
import Divider from '@common/Divider';
import Info from '@assets/icons/info.svg?react';
import JobView from './components/JobView';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobDetailQuery } from '@hook/useJobQuery';
import LoadingSpinner from '@common/LoadingSpinner';
import CostIcon from '@assets/icons/cost.svg?react';
import CertificationIcon from '@assets/icons/certification.svg?react';
import CalendarIcon from '@assets/icons/calendar.svg?react';
import Button from '@common/Button';
import { useState } from 'react';
import AddJobModal from '@common/modal/AddJobModal';
// import NoDataSideBar from './components/NoDataSideBar';
import ProfileCard from './components/ProfileCard';

const JobInfo = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const {
    data: jobDetail,
    isLoading,
    error,
  } = useJobDetailQuery(Number(jobId));
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>에러가 발생했어요.</div>;

  return (
    <div className="flex flex-col bg-gray-50 px-[120px]">
      <div className="mt-10 flex w-full flex-row gap-10">
        <div className="flex flex-col items-start">
          <Arrow
            className="h-9 w-9 rotate-180 cursor-pointer"
            onClick={() => navigate('/jobfound')}
          />

          <div className="mt-[30px] flex h-[288px] w-[712px] flex-col items-start rounded-[30px] border border-gray-300 bg-white px-[30px] pb-[30px] pt-10">
            <div className="text-gray-900 font-T01-B">{jobDetail?.jobName}</div>
            <div className="mb-[30px] mt-[14px] text-gray-600 font-B01-M">
              {jobDetail?.jobDescription}
            </div>

            <Divider className="mb-[30px]" />

            <div className="flex flex-nowrap gap-[53px]">
              <div className="flex min-w-[176px] flex-row gap-[18px]">
                <CostIcon />

                <div className="flex flex-col">
                  <div className="text-gray-500 font-B02-M"> 급여</div>
                  <div className="flex flex-row items-center gap-2">
                    <div className="text-gray-800 font-B01-B">
                      {jobDetail?.salaryCost}
                    </div>
                    <div className="flex w-[41px] rounded-[10px] bg-purple-100 p-2 text-purple-500 font-B03-SB">
                      {jobDetail?.salaryType}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex min-w-[176px] flex-row gap-[18px]">
                <CertificationIcon />
                <div className="flex flex-col">
                  <div className="text-gray-500 font-B02-M"> 자격증 </div>
                  <div className="mt-2 flex flex-row items-center gap-2">
                    <div className="text-gray-800 font-B01-B">
                      {Array.isArray(jobDetail?.certification)
                        ? jobDetail?.certification.join(', ')
                        : jobDetail?.certification}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex min-w-[176px] flex-row gap-[18px]">
                <CalendarIcon />
                <div className="flex flex-col">
                  <div className="text-gray-500 font-B02-M">
                    {' '}
                    자격증 준비 기간{' '}
                  </div>
                  <div className="mt-2 flex flex-row items-center gap-2">
                    <div className="text-gray-800 font-B01-B">
                      {jobDetail?.certificationPeriod}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex h-[288px] w-[712px] flex-col items-start rounded-[30px] border border-gray-300 bg-white px-[30px] pb-[30px] pt-10">
            <div className="text-gray-900 font-T03-B"> 업무 강도 </div>
            <Divider className="my-[30px]" />

            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-center gap-[56px]">
                <div className="text-gray-500 font-B01-M"> 직무 활동량</div>
                <div className="flex flex-row gap-[10px]">
                  <div className="text-gray-900 font-B01-M">
                    {jobDetail?.strong.physical}
                  </div>
                  <Info className="text-[#A1A6B5]" />
                </div>
              </div>

              <div className="flex flex-row items-center gap-[26px]">
                <div className="text-gray-500 font-B01-M"> 정신적 스트레스</div>
                <div className="flex flex-row gap-[10px]">
                  <div className="text-gray-900 font-B01-M">
                    {jobDetail?.strong.stress}
                  </div>
                  <Info className="text-[#A1A6B5]" />
                </div>
              </div>

              <div className="flex flex-row items-center gap-[42px]">
                <div className="text-gray-500 font-B01-M"> 대인관계 빈도</div>
                <div className="flex flex-row gap-[10px]">
                  <div className="text-gray-900 font-B01-M">
                    {jobDetail?.strong.relationship}
                  </div>
                  <Info className="text-[#A1A6B5]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[30px]">
            <Button
              text={`${jobDetail?.jobName} 담기`}
              color="primary"
              type="button"
              className="flex h-[60px] w-[712px] items-center justify-center rounded-2xl px-[60px] py-3 font-T05-SB"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        <ProfileCard />

        {/* <NoDataSideBar /> */}
      </div>

      <JobView jobName={jobDetail?.jobName || ''} />
      {isModalOpen && <AddJobModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default JobInfo;
