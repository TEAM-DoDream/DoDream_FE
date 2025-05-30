import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import AddJobModal from '@common/modal/AddJobModal.tsx';
import Card from '@pages/jobRecommend/components/Card.tsx';
import JobTitle from '@pages/jobRecommend/components/JobTitle.tsx';
import { jobDataArraySchema } from '@validation/jobRecommend/jobDataSchema';
import { useAddJobMutation } from '@hook/useAddJobMutation';
import ToastModal from '@common/modal/ToastModal';
import Check from '@assets/icons/check.svg?react';
import { AxiosError } from 'axios';

interface ErrorResponse {
  success: boolean;
  timestamp: string;
  statusCode: number;
  code: string;
  message: string;
}

const JobRecommendPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('직업이 추가되었습니다');
  const [isErrorToast, setIsErrorToast] = useState(false);
  const nickname = localStorage.getItem('nickname');

  const parseResult = jobDataArraySchema.safeParse(location.state);
  const jobResults = useMemo(
    () => (parseResult.success ? parseResult.data : []),
    [parseResult]
  );

  const { mutate: addJob } = useAddJobMutation();

  useEffect(() => {
    if (!parseResult.success || jobResults.length === 0) {
      alert('추천 결과가 존재하지 않습니다.');
      navigate('/');
    }
  }, [parseResult, jobResults, navigate]);

  const handleOpenModal = (jobId: number) => {
    if (localStorage.getItem('accessToken')) {
      handleAddJob(jobId);
    } else {
      setSelectedJobId(jobId);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (selectedJobId !== null && localStorage.getItem('accessToken')) {
      handleAddJob(selectedJobId);
    }
  };

  const handleAddJob = (jobId: number) => {
    addJob(jobId, {
      onSuccess: () => {
        setIsErrorToast(false);
        setToastMessage('직업이 추가되었습니다');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      },
      onError: (error: Error) => {
        setIsErrorToast(true);
        let errorMessage = '직업 담기에 실패했습니다. 다시 시도해주세요.';

        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.data) {
          const { message } = axiosError.response.data;
          if (message) {
            errorMessage = message;
          }
        }

        setToastMessage(errorMessage);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        console.error(error);
      },
    });
  };

  const handleDetailClick = (jobId: number) => {
    navigate(`/jobinfo/${jobId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      <JobTitle />
      <div className="flex gap-4 no-scrollbar">
        {jobResults.map((job, index) => (
          <Card
            key={index}
            title={job.jobTitle}
            description={job.jobDescription}
            imageUrl={job.imageUrl}
            jobId={job.jobId}
            personality={job.reasons.personality}
            strong={job.reasons.strong}
            condition={job.reasons.condition}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            nickname={nickname}
            onClick={handleOpenModal}
            onDetailClick={handleDetailClick}
          />
        ))}
      </div>

      {isModalOpen && selectedJobId !== null && (
        <AddJobModal onClose={handleCloseModal} />
      )}

      <div className="mt-8 flex gap-2">
        {jobResults.map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-full transition-colors duration-300 ${
              hoveredIndex === index ? 'bg-purple-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
          <ToastModal
            icon={<Check className="h-6 w-6 text-white" />}
            text={toastMessage}
            width="w-[300px]"
            variant={isErrorToast ? 'error' : 'success'}
          />
        </div>
      )}
    </div>
  );
};

export default JobRecommendPage;
