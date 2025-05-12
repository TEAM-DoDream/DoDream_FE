import { useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  personality?: string;
  strong?: string;
  condition?: string;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  nickname?: string | null;
}

const Card = ({
  title,
  description,
  imageUrl,
  personality,
  condition,
  onHover,
  onClick,
  onLeave,
  strong,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-testid="card-container"
      className="relative h-[480px] w-[372px] overflow-hidden rounded-[30px] border border-gray-200 transition-transform duration-300 ease-in-out hover:-translate-y-6 hover:scale-105 hover:drop-shadow-2xl"
      onMouseEnter={() => {
        setIsHovered(true);
        onHover?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onLeave?.();
      }}
    >
      <div className="absolute inset-0">
        <img
          data-testid="card-image"
          src={imageUrl}
          alt={title}
          className="aspect-[3/2] w-full rounded-t-[30px] bg-amber-400 object-cover"
        />
        <div className="flex h-[180px] flex-col px-6 py-5">
          <h3
            data-testid="card-title"
            className="mb-1 text-xl text-gray-900 font-T02-B"
          >
            {title}
          </h3>
          <div>
            <p
              data-testid="card-description"
              className="mb-6 line-clamp-5 text-gray-500 font-B02-M"
            >
              {description}
            </p>
          </div>
          <div className="mt-auto cursor-pointer self-end text-gray-400 font-B03-M">
            상세정보 보기 →
          </div>
        </div>
      </div>

      <div
        data-testid="hover-content"
        className={`absolute inset-0 z-10 flex flex-col bg-white px-6 py-8 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex-grow">
          <h4
            data-testid="card-reason-title"
            className="mb-4 text-gray-900 font-T01-B"
          >
            <span>{title}</span>
            <div>추천 이유</div>
          </h4>

          <div className="space-y-3">
            {personality && (
              <div data-testid="card-trait">
                <strong className="text-black font-B03-B">성향</strong>
                <p className="mt-1 line-clamp-2 text-gray-500 font-B03-M">
                  {personality}
                </p>
              </div>
            )}
            {strong && (
              <div data-testid="card-strength">
                <strong className="text-black font-B03-B">강점</strong>
                <p className="mt-1 line-clamp-2 text-gray-500 font-B03-M">
                  {strong}
                </p>
              </div>
            )}
            {condition && (
              <div>
                <strong className="text-black font-B03-B">조건</strong>
                <p className="mt-1 line-clamp-2 text-gray-500 font-B03-M">
                  {condition}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-6">
          <button
            data-testid="card-save-button"
            className="rounded-[12px] bg-purple-100 px-10 py-4 text-purple-500 font-B03-SB"
            onClick={onClick}
          >
            담기
          </button>
          <button
            data-testid="card-detail-button"
            className="rounded-[12px] bg-purple-500 px-14 py-4 text-white font-B03-SB"
          >
            상세정보 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
