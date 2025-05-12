import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddJobModal from '@common/modal/AddJobModal.tsx';
import Card from '@pages/jobRecommend/components/Card.tsx';
import JobTitle from '@pages/jobRecommend/components/JobTitle.tsx';

interface JobData {
  jobTitle: string;
  jobDescription: string;
  imageUrl: string;
  reasons: {
    personality?: string;
    condition?: string;
    strong?: string;
  };
}

const JobRecommendPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nickname = localStorage.getItem('nickname');

  const jobResults: JobData[] = location.state;

  useEffect(() => {
    if (!jobResults || jobResults.length === 0) {
      alert('추천 결과가 존재하지 않습니다.');
      navigate('/');
    }
  }, [jobResults, navigate]);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
            personality={job.reasons.personality}
            strong={job.reasons.strong}
            condition={job.reasons.condition}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            nickname={nickname}
            onClick={handleOpenModal}
          />
        ))}
      </div>

      {isModalOpen && <AddJobModal onClose={handleCloseModal} />}
      <div className="mt-8 flex gap-2">
        {jobResults.map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-full transition-colors duration-300 ${
              hoveredIndex === index ? 'bg-purple-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendPage;
