import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@common/Button';
import Modal from '@common/modal/Modal.tsx';
import ToastModal from '@common/modal/ToastModal.tsx';
import { useJobSelect } from '@hook/jobselect/useJobSelect';
import { useGetInfo } from '@hook/mypage/useMypageQuery.ts';
import { useJobSelectIdMutation } from '@hook/jobselect/useJobSelectIdMutation.ts';
import { ReactTagManager } from 'react-gtm-ts';

const JobSelect = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: jobList } = useJobSelect();
  const { data: info } = useGetInfo();
  const saveJobMutation = useJobSelectIdMutation();
  const [selectedJob, setSelectedJob] = useState<{
    id: number;
    name: string;
  } | null>(info?.job ? { id: info.job.jobId, name: info.job.jobName } : null);
  const [openModal, setOpenModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [pendingJob, setPendingJob] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isFirstJobModal, setIsFirstJobModal] = useState(false);
  const [hasEverSelectedJob, setHasEverSelectedJob] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (info?.job) {
      setSelectedJob({ id: info.job.jobId, name: info.job.jobName });
      setHasEverSelectedJob(true);
    } else {
      setSelectedJob(null);
      setHasEverSelectedJob(false);
    }
  }, [info]);

  const handlePick = (jobId: number, jobName: string) => {
    if (!hasEverSelectedJob) {
      setPendingJob({ id: jobId, name: jobName });
      setIsFirstJobModal(true);
      setOpenModal(true);
    } else {
      setSelectedJob((prev) =>
        prev?.id === jobId ? null : { id: jobId, name: jobName }
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleModalConfirm = () => {
    if (isFirstJobModal && pendingJob) {
      saveJobMutation.mutate(pendingJob.id, {
        onSuccess: () => {
          ReactTagManager.action({
            event: 'job_select',
            job_id: pendingJob.id,
            category: 'JobSelect',
            clickText: '직업 담기',
            source_page: location.pathname,
          });
          setSelectedJob({ id: pendingJob.id, name: pendingJob.name });
          setHasEverSelectedJob(true);
          queryClient.invalidateQueries({ queryKey: ['mypageInfo'] });
          setOpenModal(false);
          setPendingJob(null);
          setIsFirstJobModal(false);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
          navigate('/', { state: { toast: '직업이 추가되었습니다' } });
        },
      });
    }
  };

  const handleSaveButton = () => {
    setIsFirstJobModal(false);
    setOpenModal(true);
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
              !selectedJob ||
              (hasEverSelectedJob && selectedJob.id === info?.job?.jobId)
            }
            onClick={handleSaveButton}
          />
        </div>
      </div>

      {openModal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
            setPendingJob(null);
            setIsFirstJobModal(false);
          }}
          jobId={pendingJob?.id || selectedJob?.id || 0}
          onConfirm={isFirstJobModal ? handleModalConfirm : undefined}
          isFirstJob={isFirstJobModal}
        />
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
