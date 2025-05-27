import CancelIcon from '@assets/icons/cross.svg?react';
import HeartIcon from '@assets/icons/like.svg?react';
import { useScrapTrainingMutation, ScrapTrainingResponse } from '../../../hook/scrap/useScrapTrainingMutation';
import { useState } from 'react';
import { useAcademyFilterStore } from '@store/academyFilterStore';
import { useShallow } from 'zustand/react/shallow';

interface CardDetailProps {
  item: AcademyItem;
  onClose: () => void;
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

const CardDetail = ({ item, onClose }: CardDetailProps) => {
  const [isScraped, setIsScraped] = useState(false);
 const { mutate: scrapTraining, isPending: isScrapLoading } = useScrapTrainingMutation();
//  const { mutate: scrapTraining, isLoading: isScrapLoading } = useScrapTrainingMutation();

  const { trainingCourse } = useAcademyFilterStore(
    useShallow((s) => ({ trainingCourse: s.trainingCourse }))
  );
  const trainingType = trainingCourse || '이론 위주';
console.log(trainingType)
  const handleScrap = () => {
  if (isScrapLoading) return;
// +   if (isScrapLoading || isScraped) return;

    scrapTraining(
      {
        trprId: item.trprId,
        trprDegr: item.trprDegr,
        trainstCstId: item.trainstCstId,
        traStartDate: item.traStartDate,
        traEndDate: item.traEndDate,
        type: trainingType as '이론 위주' | '실습 위주',
      },
      {
        onSuccess: (response: ScrapTrainingResponse) => {
          if (response.success) {
            setIsScraped(true);
            alert('교육과정이 스크랩되었습니다.');
          } else {
            alert(response.message || '스크랩에 실패했습니다.');
          }
        },
        onError: (error) => {
          alert('스크랩 중 오류가 발생했습니다.');
          console.error('스크랩 오류:', error);
        },
      }
    );
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
        className="absolute right-4 top-4 hover:bg-gray-200 rounded-[10px]"
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
            disabled={isScrapLoading || isScraped}
            className={`
              flex items-center gap-2 rounded-xl border px-[28px] py-[18px] font-T05-SB
              ${isScraped
                ? 'bg-purple-300 text-white border-transparent cursor-default'
                : isScrapLoading
                ? 'bg-purple-100 text-purple-500 border-purple-300 cursor-wait'
                : 'bg-white text-purple-500 border-purple-500 hover:bg-purple-50'}
            `}
          >
            <HeartIcon className={`h-5 w-5 ${isScraped ? 'text-white' : ''}`} />
            {isScrapLoading
              ? '담는 중…'
              : isScraped
              ? '담기 완료'
              : '담기'}
          </button>

          <a
            href={item.titleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl bg-purple-500 px-[30px] py-[18px] text-white font-T05-SB hover:bg-purple-600"
          >
            고용24에서 보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
