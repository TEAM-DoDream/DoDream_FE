import CancelIcon from '@assets/icons/cross.svg?react';
import HeartIcon from '@assets/icons/like.svg?react';
import PurpleLike from '@assets/icons/purplelike.svg?react';
import { RecruitItem } from '@validation/recruit/recruitSchema.ts';
import { useScrapRecruitMutation } from '@hook/scrap/recruit/useScrapRecruitMutation.ts';
import { useScrapCheckQuery } from '@hook/scrap/useScrapCheckQuery';
import { useState, useEffect } from 'react';

interface CardDetailProps {
  item: RecruitItem;
  onClose: () => void;
  isScrap?: boolean;
}

const CardDetail = ({
  item,
  onClose,
  isScrap: propIsScrap,
}: CardDetailProps) => {
  const [isScrap, setIsScrap] = useState(propIsScrap || false);
  const { mutate: scrapRecruit } = useScrapRecruitMutation();
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const { data: scrapCheckData } = useScrapCheckQuery({
    category: 'RECRUIT',
    idList: [item.id],
  });

  useEffect(() => {
    if (scrapCheckData?.data && scrapCheckData.data.length > 0) {
      setIsScrap(scrapCheckData.data[0].isScrap);
    } else if (propIsScrap !== undefined) {
      setIsScrap(propIsScrap);
    }
  }, [scrapCheckData, propIsScrap]);

  const details = [
    {
      label: '마감일',
      value: item.deadline,
      color: 'text-purple-500',
    },
    { label: '지역', value: item.locationName, color: 'text-gray-900' },
    {
      label: '학력',
      value: item.requiredEducationLevel,
      color: 'text-gray-900',
    },
    { label: '고용형태', value: item.jobTypeName, color: 'text-gray-900' },
  ];

  const handleScrap = () => {
    if (!isLoggedIn) return;

    scrapRecruit(
      { id: item.id, isScrap },
      {
        onSuccess: (response) => {
          setIsScrap(response.data.isScrap);
        },
      }
    );
  };

  return (
    <div className="relative w-full max-w-2xl rounded-2xl bg-white px-6 py-8">
      <button
        className="absolute right-4 top-4 rounded-[10px] hover:bg-gray-200"
        aria-label="닫기"
        onClick={onClose}
      >
        <CancelIcon className="h-8 w-8" />
      </button>

      <div className="mt-2">
        <span className="rounded-md bg-purple-100 px-3 py-2.5 text-purple-500 font-T04-SB">
          {item.deadline === 'D-0' ? 'D-day' : item.deadline}
        </span>
      </div>

      <p className="mt-8 text-gray-500 font-B01-SB">{item.companyName}</p>
      <h2 className="mt-2 text-gray-900 font-T02-B">{item.title}</h2>

      <div className="mt-8 space-y-3 rounded-xl bg-gray-50 px-6 py-5 text-gray-600 font-B01-M">
        {details.map((d, idx) => (
          <div key={idx} className="grid grid-cols-[80px_1fr] gap-x-4">
            <span className="text-gray-400">{d.label}</span>
            <span className={`${d.color} font-B01-SB`}>{d.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          className={`flex items-center gap-2 rounded-xl border px-[28px] py-[18px] font-T05-SB ${
            !isLoggedIn
              ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400'
              : isScrap
                ? 'border-purple-500 bg-purple-50 text-purple-500'
                : 'border-purple-500 bg-white text-purple-500 hover:bg-purple-50'
          }`}
          onClick={handleScrap}
          disabled={!isLoggedIn}
        >
          {isScrap ? (
            <PurpleLike
              className={`h-5 w-5 ${!isLoggedIn ? 'text-gray-400' : ''}`}
            />
          ) : (
            <HeartIcon
              className={`h-5 w-5 ${!isLoggedIn ? 'text-gray-400' : ''}`}
            />
          )}
          {!isLoggedIn ? '담기' : isScrap ? '담기 취소' : '담기'}
        </button>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-xl bg-purple-500 px-[30px] py-[18px] text-white font-T05-SB hover:bg-purple-600"
        >
          사람인에서 자세히 보기
        </a>
      </div>
    </div>
  );
};

export default CardDetail;
