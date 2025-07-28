import CancelIcon from '@assets/icons/cross.svg?react';
import PurpleHeartIcon from '@assets/icons/fullheart.svg?react';
import PurpleLike from '@assets/icons/purplelike.svg?react';
import { useState, useEffect } from 'react';
import { useAcademyFilterStore } from '@store/academyFilterStore';
import { useShallow } from 'zustand/react/shallow';
import { useScrapTrainingMutation } from '@hook/scrap/training/useScrapTrainingMutation';
import { ReactTagManager } from 'react-gtm-ts';

interface CardDetailProps {
  item: AcademyItem;
  onClose: () => void;
  isScrap?: boolean;
  onScrapClick?: () => void;
}

interface AcademyItem {
  address: string;
  realMan: string;
  subTitle: string;
  title: string;
  titleLink: string;
  traStartDate: string;
  traEndDate: string;
  traDuration: string;
  trainstCstId: string;
  trprDegr: string;
  trprId: string;
}

const CardDetail = ({
  item,
  onClose,
  isScrap: propIsScrap = false,
  onScrapClick,
}: CardDetailProps) => {
  const [isScraped, setIsScraped] = useState(propIsScrap);
  const { mutate: toggleScrap, isPending: isScrapLoading } =
    useScrapTrainingMutation();
  const isLoggedIn = !!localStorage.getItem('accessToken');

  useEffect(() => {
    setIsScraped(propIsScrap);
  }, [propIsScrap]);

  const { trainingCourse } = useAcademyFilterStore(
    useShallow((s) => ({ trainingCourse: s.trainingCourse }))
  );
  const trainingType = trainingCourse || '이론 위주';

  const handleScrap = () => {
    if (onScrapClick) {
      onScrapClick();
    } else {
      if (isScrapLoading || !isLoggedIn) return;

      toggleScrap(
        {
          trprId: item.trprId,
          trprDegr: item.trprDegr,
          trainstCstId: item.trainstCstId,
          traStartDate: item.traStartDate,
          traEndDate: item.traEndDate,
          type: trainingType as '이론 위주' | '실습 위주',
          isScrap: isScraped,
        },
        {
          onSuccess: (response) => {
            if (response.success) {
              setIsScraped(!isScraped);
            } else {
              alert(response.message || '스크랩 작업에 실패했습니다.');
            }
          },
          onError: (error) => {
            alert('스크랩 작업 중 오류가 발생했습니다.');
            console.error('스크랩 오류:', error);
          },
        }
      );
    }
  };

  const details = [
    { label: '지역', value: item.address },
    { label: '기관명', value: item.subTitle },
    { label: '교육기간', value: `${item.traStartDate} ~ ${item.traEndDate}` },
    { label: '교육기간(일수)', value: item.traDuration },
  ];

  return (
    <div className="relative w-full max-w-2xl rounded-2xl bg-white px-6 py-8">
      <button
        className="absolute right-4 top-4 rounded-[10px] hover:bg-gray-200"
        onClick={onClose}
      >
        <CancelIcon className="h-8 w-8 text-[#676F7B]" />
      </button>

      <p className="mt-8 text-gray-500 font-B01-SB">{item.subTitle}</p>
      <h2 className="mt-2 text-gray-900 font-T02-B">{item.title}</h2>

      <div className="mt-8 space-y-3 rounded-xl bg-gray-50 px-6 py-5 text-gray-600 font-B01-M">
        {details.map((d, i) => (
          <div key={i} className="grid grid-cols-[100px_1fr] gap-x-4">
            <span className="text-gray-400">{d.label}</span>
            <span className="text-gray-900 font-B01-SB">{d.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-xl text-purple-500 font-T05-SB">
          수강료 {item.realMan}
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleScrap}
            disabled={isScrapLoading || !isLoggedIn}
            className={`flex items-center gap-2 rounded-xl border px-[28px] py-[18px] text-purple-500 font-T05-SB ${
              !isLoggedIn
                ? 'cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400'
                : isScraped
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-purple-500 bg-white hover:bg-purple-50'
            } ${isScrapLoading ? 'cursor-wait opacity-70' : ''}`}
          >
            {isScraped ? (
              <PurpleHeartIcon
                className={`h-5 w-5 ${!isLoggedIn ? 'text-gray-400' : ''}`}
              />
            ) : (
              <PurpleLike
                className={`h-5 w-5 ${!isLoggedIn ? 'text-gray-400' : ''}`}
              />
            )}
            {isScrapLoading
              ? '처리 중...'
              : !isLoggedIn
                ? '담기'
                : isScraped
                  ? '담기 취소'
                  : '담기'}
          </button>

          <a
            href={item.titleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl bg-purple-500 px-[30px] py-[18px] text-white font-T05-SB hover:bg-purple-600"
            onClick={() => {
              localStorage.setItem('external_link_open_ts', String(Date.now()));
              ReactTagManager.action({
                event: 'external_link_open',
                category: '교육상세',
                link_url: item.titleLink,
                clickText: '고용24에서 보기',
              });
            }}
          >
            고용24에서 보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
