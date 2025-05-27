import Pagination from '@common/Pagination';
import { ScrapTrainingItem } from '@validation/scrap/scrapSchema';
import ScrappedItemCard from './ScrappedItemCard';
import { useDeleteScrapTrainingMutation } from '@hook/scrap/training/useDeleteScrapTrainingMutation.ts';

interface Props {
  jobs: ScrapTrainingItem[];
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const ScrapListSection = ({
  jobs,
  currentPage,
  onPageChange,
  totalPages,
}: Props) => {
  const { mutate: deleteScrapTraining, isPending: isDeleting } =
    useDeleteScrapTrainingMutation();

  const handleCardClick = (item: ScrapTrainingItem) => {
    console.log('Card clicked:', item);
    if (item.titleLink) {
      window.open(item.titleLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLikeClick = (item: ScrapTrainingItem) => {
    if (confirm('스크랩을 삭제하시겠습니까?')) {
      deleteScrapTraining(
        {
          trprId: item.trprId,
        },
        {
          onSuccess: () => {
            console.log('스크랩이 성공적으로 삭제되었습니다.');
          },
          onError: (error) => {
            console.error('스크랩 삭제 실패:', error);
            alert('스크랩 삭제에 실패했습니다. 다시 시도해주세요.');
          },
        }
      );
    }
  };

  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {jobs.map((job) => (
          <ScrappedItemCard
            key={job.scrapId}
            item={job}
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
