import Like from '@assets/icons/like.svg?react';
import { ScrapTrainingItem } from '@validation/scrap/scrapSchema';

interface ScrappedItemCardProps {
  item: ScrapTrainingItem;
  onCardClick?: (item: ScrapTrainingItem) => void;
  onLikeClick?: (item: ScrapTrainingItem) => void;
  isDeleting?: boolean;
}

const ScrappedItemCard = ({
  item,
  onCardClick,
  onLikeClick,
  isDeleting = false,
}: ScrappedItemCardProps) => {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(item);
    } else if (item.titleLink) {
      window.open(item.titleLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDeleting && onLikeClick) {
      onLikeClick(item);
    }

    console.log('Like clicked for:', item.scrapId);
  };

  const tags = [
    item.address,
    item.trprDegr ? `` : '',
    item.traDuration ? `${item.traDuration}` : '',
  ].filter(Boolean);

  const displayCost =
    item.realMan &&
    item.realMan !== '0' &&
    item.realMan.replace(/[^0-9]/g, '') !== '0';

  return (
    <div
      onClick={handleCardClick}
      className="flex h-[330px] w-full cursor-pointer flex-col justify-between rounded-[30px] border border-gray-200 bg-white p-6 transition-shadow hover:shadow-[0px_4px_12px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-start justify-end">
        <button
          type="button"
          onClick={handleLikeClick}
          aria-label="스크랩 취소"
          disabled={isDeleting}
          className={isDeleting ? 'cursor-not-allowed opacity-50' : ''}
        >
          <Like
            className={`h-6 w-6 ${isDeleting ? 'text-gray-400' : 'text-purple-500 hover:text-purple-700'}`}
          />
        </button>
      </div>

      <div>
        <div className="mt-[12px] text-gray-500 font-B03-M">
          {item.subTitle}
        </div>

        <h3
          className="mt-[12px] truncate text-black font-T04-SB"
          title={item.title}
        >
          {item.title}
        </h3>

        <div className="mt-[16px] flex flex-wrap gap-0.5">
          {tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="whitespace-nowrap px-2 py-1 text-gray-500 font-B03-M"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex justify-end">
        {displayCost && (
          <div className="rounded-[10px] bg-purple-50 px-4 py-2">
            <span className="text-purple-500 font-B01-B">{item.realMan}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrappedItemCard;
