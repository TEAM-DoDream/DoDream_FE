import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@common/Button';
import Modal from '@common/modal/Modal.tsx';
import ToastModal from '@common/modal/ToastModal.tsx';
import { useJobSelect } from '@hook/jobselect/useJobSelect';
import { useGetInfo } from '@hook/mypage/useMypageQuery.ts';
import { useJobSelectIdMutation } from '@hook/jobselect/useJobSelectIdMutation.ts';

const JobSelect = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: jobList } = useJobSelect();
  const { data: info } = useGetInfo();
  const saveJobMutation = useJobSelectIdMutation();
  const initialJobIdRef = useRef<number | null>(info?.job?.jobId ?? null);
  const [selectedJob, setSelectedJob] = useState<{
    id: number;
    name: string;
  } | null>(info?.job ? { id: info.job.jobId, name: info.job.jobName } : null);
  const [openModal, setOpenModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (info?.job) {
      initialJobIdRef.current = info.job.jobId;
      setSelectedJob({ id: info.job.jobId, name: info.job.jobName });
    } else {
      initialJobIdRef.current = null;
      setSelectedJob(null);
    }
  }, [info]);

  const handlePick = (jobId: number, jobName: string) => {
    if (initialJobIdRef.current === null) {
      saveJobMutation.mutate(jobId, {
        onSuccess: () => {
          initialJobIdRef.current = jobId;
          setSelectedJob({ id: jobId, name: jobName });
          queryClient.invalidateQueries({ queryKey: ['mypageInfo'] });
          navigate('/', { state: { toast: '직업이 추가되었습니다' } });
          setTimeout(() => setShowToast(false), 2000);
        },
      });
    } else {
      setSelectedJob((prev) =>
        prev?.id === jobId ? null : { id: jobId, name: jobName }
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-start justify-center px-[120px] pb-[92px] pt-[90px]">
      <div className="text-center text-gray-900 font-T01-B">
        관심 있는 직업을 하나만 담아주세요!
      </div>
      <div className="mt-[18px] text-center text-gray-500 font-B01-M">
        담은 직업을 바탕으로 나만의 할 일을 작성해볼 수 있어요.
      </div>

      <div className="mt-[60px] flex flex-col">
        <div className="text-gray-600 font-B01-B">담은 직업</div>
        <div className="mt-1 flex flex-row items-center gap-[30px]">
          {selectedJob ? (
            <span className="inline-block rounded-full border border-purple-500 bg-purple-50 px-4 py-1 text-purple-500 font-B01-M">
              {selectedJob.name}
            </span>
          ) : (
            <div className="text-gray-300 font-B01-M">
              아직 담은 직업이 없어요
            </div>
          )}
          <Button
            text="저장"
            color="primary"
            type="button"
            className="h-[42px] w-[85px] font-B03-SB"
            disabled={
              !selectedJob || selectedJob.id === initialJobIdRef.current
            }
            onClick={() => setOpenModal(true)}
          />
        </div>
      </div>

      {openModal && selectedJob && (
        <Modal onClose={() => setOpenModal(false)} jobId={selectedJob.id} />
      )}

      <div className="mt-11 grid w-full grid-cols-5 gap-x-5 gap-y-5">
        {jobList?.map((job) => {
          const isActive = selectedJob?.id === job.jobId;
          return (
            <div
              key={job.jobId}
              className={`flex h-full w-full cursor-pointer flex-col items-start rounded-[18px] border ${
                isActive
                  ? 'border-purple-500 shadow-shadow2'
                  : 'border-gray-200'
              }`}
            >
              <img
                src={job.imageUrl}
                alt={job.jobName}
                className="h-[180px] w-full rounded-t-[18px] object-cover"
              />
              <div className="flex h-full w-full flex-col justify-between px-4 pb-5 pt-4">
                <div>
                  <div className="text-gray-900 font-T05-SB">{job.jobName}</div>
                  <div className="mt-[10px] text-gray-500 font-C01-R">
                    {job.jobDescription}
                  </div>
                </div>
                <div className="mt-5 flex w-full justify-end">
                  <button
                    onClick={() => handlePick(job.jobId, job.jobName)}
                    className={`whitespace-nowrap rounded-[6px] border px-3 py-[6px] font-B03-R ${
                      isActive
                        ? 'border-purple-500 bg-purple-500 text-white'
                        : 'border-purple-500 bg-white text-purple-500 hover:bg-purple-50'
                    }`}
                  >
                    {isActive ? '담기 취소' : '담기'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-[60px] flex w-full justify-center">
        <Button
          text="직업 추천 받기"
          color="primary"
          type="button"
          className="h-[71px] w-[196px] items-center justify-center font-T04-B"
          onClick={() => navigate('/onboard')}
        />
      </div>

      {showToast && (
        <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2 transform">
          <ToastModal text={'직업이 추가되었습니다'} />
        </div>
      )}
    </div>
  );
};

export default JobSelect;
