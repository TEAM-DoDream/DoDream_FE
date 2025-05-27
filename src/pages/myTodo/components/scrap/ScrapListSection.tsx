import Pagination from '@common/Pagination';
import { ScrapTrainingItem } from '@validation/scrap/scrapSchema';
import { ScrapRecruitItem } from '@validation/scrap/scrapRecruitSchema';
import ScrappedItemCard from './ScrappedItemCard';
import { useDeleteScrapTrainingMutation } from '@hook/scrap/training/useDeleteScrapTrainingMutation.ts';
import { useDeleteScrapRecruitMutation } from '@hook/scrap/recruit/useDeleteScrapRecruitMutation.ts';

interface Props {
  jobs: ScrapTrainingItem[] | ScrapRecruitItem[];
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  type?: 'job' | 'edu';
}

const ScrapListSection = ({
  jobs,
  currentPage,
  onPageChange,
  totalPages,
  type = 'edu',
}: Props) => {
  const { mutate: deleteScrapTraining, isPending: isDeletingTraining } =
    useDeleteScrapTrainingMutation();
  
  const { mutate: deleteScrapRecruit, isPending: isDeletingRecruit } =
    useDeleteScrapRecruitMutation();

  const isDeleting = type === 'edu' ? isDeletingTraining : isDeletingRecruit;

  const handleCardClick = (item: ScrapTrainingItem | ScrapRecruitItem) => {
    if (type === 'edu') {
      const trainingItem = item as ScrapTrainingItem;
      if (trainingItem.titleLink) {
        window.open(trainingItem.titleLink, '_blank', 'noopener,noreferrer');
      }
    } else {
      const recruitItem = item as ScrapRecruitItem;
      if (recruitItem.url) {
        window.open(recruitItem.url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleLikeClick = (item: ScrapTrainingItem | ScrapRecruitItem) => {
    if (confirm('스크랩을 삭제하시겠습니까?')) {
      if (type === 'edu') {
        deleteScrapTraining(
          {
            trprId: (item as ScrapTrainingItem).trprId,
          },
          {
            onSuccess: () => {
              console.log('교육 스크랩이 성공적으로 삭제되었습니다.');
            },
            onError: (error) => {
              console.error('교육 스크랩 삭제 실패:', error);
              alert('스크랩 삭제에 실패했습니다. 다시 시도해주세요.');
            },
          }
        );
      } else {
        deleteScrapRecruit(
          {
            id: (item as ScrapRecruitItem).id,
          },
          {
            onSuccess: () => {
              console.log('채용 스크랩이 성공적으로 삭제되었습니다.');
            },
            onError: (error) => {
              console.error('채용 스크랩 삭제 실패:', error);
              alert('스크랩 삭제에 실패했습니다. 다시 시도해주세요.');
            },
          }
        );
      }
    }
  };

  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {jobs.map((job) => (
          <ScrappedItemCard
            key={job.scrapId}
            item={job}
            type={type}
            onCardClick={handleCardClick}
            onLikeClick={handleLikeClick}
            isDeleting={isDeleting}
          />
        ))}
      </div>
      {totalPages > 0 && (
        <div className="mx-auto mb-[80px] mt-[30px] w-fit">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={onPageChange}
          />
        </div>
      )}
    </>
  );
};
export default ScrapListSection;
