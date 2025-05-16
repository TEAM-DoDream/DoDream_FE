import CancelIcon from '@assets/icons/cross.svg?react';
import HeartIcon from '@assets/icons/like.svg?react';
import { useRecruitDetailQuery } from '@hook/useRecruitDetailQuery.ts';

interface CardDetailProps {
  id: string;
  onClose: () => void;
}

const CardDetail = ({ id, onClose }: CardDetailProps) => {
  const { data, isLoading } = useRecruitDetailQuery(id);

  if (isLoading || !data) return null;

  const details = [
    {
      label: '마감일',
      value: data['expiration-date'],
      color: 'text-purple-500',
    },
    { label: '지역', value: data.locationName, color: 'text-gray-900' },
    {
      label: '학력',
      value: data.requiredEducationLevel,
      color: 'text-gray-900',
    },
    { label: '고용형태', value: data.jobTypeName, color: 'text-gray-900' },
  ];

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
          {data.deadline === 'D-0' ? 'D-day' : data.deadline}
        </span>
      </div>

      <p className="mt-8 text-gray-500 font-B01-SB">{data.companyName}</p>
      <h2 className="mt-2 text-gray-900 font-T02-B">{data.title}</h2>

      <div className="mt-8 space-y-3 rounded-xl bg-gray-50 px-6 py-5 text-gray-600 font-B01-M">
        {details.map((d, idx) => (
          <div key={idx} className="grid grid-cols-[80px_1fr] gap-x-4">
            <span className="text-gray-400">{d.label}</span>
            <span className={`${d.color} font-B01-SB`}>{d.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button className="flex items-center gap-2 rounded-xl border border-purple-500 bg-white px-[28px] py-[18px] text-purple-500 font-T05-SB hover:bg-purple-50">
          <HeartIcon className="h-5 w-5" />
          담기
        </button>
        <a
          href={data.url}
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
