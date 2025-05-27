import Pagination from '@common/Pagination';
import {  ScrapTrainingItem } from '@validation/scrap/scrapSchema'; 
import ScrappedItemCard from './ScrappedItemCard';

interface Props {
  jobs: ScrapTrainingItem[];
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const ScrapListSection = ({ jobs, currentPage, onPageChange, totalPages }: Props) => {
  const handleCardClick = (item: ScrapTrainingItem) => {
    console.log('Card clicked:', item);
    if (item.titleLink) {
      window.open(item.titleLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLikeClick = (item: ScrapTrainingItem) => {
    console.log('Like clicked (attempt to unscrap):', item.scrapId);
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
