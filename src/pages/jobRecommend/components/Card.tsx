import { useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  reason: string;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  nickname?: string | null;
}

const Card = ({
  title,
  description,
  imageUrl,
  reason,
  onHover,
  onLeave,
  nickname,
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
          className="h-[300px] w-full rounded-t-[30px] object-cover"
        />
        <div className="flex h-[180px] flex-col px-6 py-5">
          <h3
            data-testid="card-title"
            className="mb-1 text-xl text-gray-900 font-T02-B"
          >
            {title}
          </h3>
          <p
            data-testid="card-description"
            className="mb-6 text-gray-500 font-B02-M"
          >
            {description}
          </p>
          <div className="mt-auto cursor-pointer self-end text-gray-400 font-B03-M">
            상세정보 보기 →
          </div>
        </div>
      </div>

      <div
        data-testid="hover-content"
        className={`absolute inset-0 z-10 bg-white px-6 py-12 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h4
          data-testid="card-reason-title"
          className="mb-6 text-gray-900 font-T01-B"
        >
          <span>{title}</span>
          <div>추천 이유</div>
        </h4>
        <div className="space-y-4">
          <div data-testid="card-trait">
            <strong className="text-black font-B03-B">성향</strong>
            <p className="mt-2 text-gray-500 font-B03-M">
              사람을 직접 돕고 함께 일하는 걸 선호하는 ‘{nickname}’ 님과 잘
              맞아요.
            </p>
          </div>
          <div data-testid="card-strength">
            <strong className="text-black font-B03-B">강점</strong>
            <p className="mt-2 text-gray-500 font-B03-M">
              주변에서 말을 잘한다는 칭찬을 자주 듣는 ‘{nickname}’ 님은 따뜻한
              소통에 강점을 지녔어요.
            </p>
          </div>
          <div>
            <strong
              data-testid="card-condition"
              className="text-black font-B03-B"
            >
              조건
            </strong>
            <p className="mt-2 text-gray-500 font-B03-M">{reason}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-6">
          <button
            data-testid="card-save-button"
            className="rounded-[12px] bg-purple-100 px-10 py-4 text-purple-500 font-B03-SB"
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
