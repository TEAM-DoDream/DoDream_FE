import PurpleHeartIcon from '@assets/icons/fullheart.svg?react';
import { ScrapTrainingItem } from '@validation/scrap/scrapSchema';
import { ScrapRecruitItem } from '@validation/scrap/scrapRecruitSchema';

interface ScrappedItemCardProps {
  item: ScrapTrainingItem | ScrapRecruitItem;
  type: 'edu' | 'job';
  onCardClick?: (item: ScrapTrainingItem | ScrapRecruitItem) => void;
  onLikeClick?: (item: ScrapTrainingItem | ScrapRecruitItem) => void;
  isDeleting?: boolean;
}

const ScrappedItemCard = ({
  item,
  type,
  onCardClick,
  onLikeClick,
  isDeleting = false,
}: ScrappedItemCardProps) => {
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(item);
    } else if (type === 'edu' && 'titleLink' in item) {
      window.open(item.titleLink, '_blank', 'noopener,noreferrer');
    } else if (type === 'job' && 'url' in item) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDeleting && onLikeClick) {
      onLikeClick(item);
    }
  };

  const renderTags = () => {
    if (type === 'edu' && 'address' in item) {
      return [
        item.address,
        'trprDegr' in item && item.trprDegr ? '' : '',
        'traDuration' in item && item.traDuration ? `${item.traDuration}` : '',
      ].filter(Boolean);
    } else if (type === 'job') {
      return [
        'locationName' in item ? item.locationName : '',
        'jobTypeName' in item ? item.jobTypeName : '',
        'experienceLevel' in item ? item.experienceLevel : '',
      ].filter(Boolean);
    }
    return [];
  };

  const renderSubtitle = () => {
    if (type === 'edu' && 'subTitle' in item) {
      return item.subTitle;
    } else if (type === 'job' && 'companyName' in item) {
      return item.companyName;
    }
    return '';
  };

  const displayCost =
    type === 'edu' &&
    'realMan' in item &&
    item.realMan &&
    item.realMan !== '0' &&
    item.realMan.replace(/[^0-9]/g, '') !== '0';

  return (
    <div
      onClick={handleCardClick}
      className="flex h-[330px] w-full cursor-pointer flex-col justify-between rounded-[30px] border border-gray-200 bg-white p-6 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-start justify-between">
        {type === 'job' && 'deadline' in item && (
          <span className="rounded-[10px] bg-purple-100 px-3 py-1 text-purple-500 font-B01-B">
            {item.deadline === 'D-0' ? 'D-day' : item.deadline}
          </span>
        )}
        <button
          type="button"
          onClick={handleLikeClick}
          aria-label="스크랩 취소"
          disabled={isDeleting}
          className={isDeleting ? 'cursor-not-allowed opacity-50' : 'ml-auto'}
        >
          <PurpleHeartIcon
            className={`h-6 w-6 ${
              isDeleting
                ? 'text-gray-400'
                : 'text-purple-500 hover:text-purple-700'
            }`}
          />
        </button>
      </div>

      <div>
        <div className="mt-[12px] text-gray-500 font-B03-M">
          {renderSubtitle()}
        </div>

        <h3
          className="mt-[12px] truncate text-black font-T04-SB"
          title={item.title}
        >
          {item.title}
        </h3>

        <div className="mt-[16px] flex flex-wrap gap-1">
          {renderTags().map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="rounded-md px-2 py-1 text-gray-500 font-B03-M"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        {displayCost && type === 'edu' && 'realMan' in item && (
          <div className="rounded-[10px] bg-purple-50 px-4 py-2">
            <span className="text-purple-500 font-B01-B">{item.realMan}</span>
          </div>
        )}

        {type === 'job' && 'expiration-date' in item && (
          <div className="ml-auto text-sm text-gray-500 font-B03-M">
            마감일 <span className="mx-1 text-gray-300">|</span>{' '}
            <span className="text-purple-500">{item['expiration-date']}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrappedItemCard;
