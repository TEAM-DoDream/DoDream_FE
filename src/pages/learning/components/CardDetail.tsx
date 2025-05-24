import CancelIcon from '@assets/icons/cross.svg?react';
import HeartIcon from '@assets/icons/like.svg?react';

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
  const details = [
    {
      label: '지역',
      value: item.address,
      color: 'text-gray-900',
    },
    {
      label: '기관명',
      value: item.subTitle,
      color: 'text-gray-900',
    },
    {
      label: '교육기간',
      value: `${item.traStartDate} ~ ${item.traEndDate}`,
      color: 'text-gray-900',
    },
    {
      label: '교육기간(일수)',
      value: item.traDuration,
      color: 'text-gray-900',
    },
  ];

  return (
    <div
      className="relative w-full max-w-2xl rounded-2xl bg-white px-6 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        className="absolute right-4 top-4 rounded-[10px] hover:bg-gray-200"
        aria-label="닫기"
        onClick={onClose}
      >
        <CancelIcon className="h-8 w-8" />
      </button>

      <p className="mt-8 text-gray-500 font-B01-SB">{item.subTitle}</p>
      <h2 className="mt-2 text-gray-900 font-T02-B" id="modal-title">
        {item.title}
      </h2>

      <div className="mt-8 space-y-3 rounded-xl bg-gray-50 px-6 py-5 text-gray-600 font-B01-M">
        {details.map((detail, idx) => (
          <div key={idx} className="grid grid-cols-[100px_1fr] gap-x-4">
            <span className="text-gray-400">{detail.label}</span>
            <span className={`${detail.color} font-B01-SB`}>
              {detail.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-xl text-purple-500 font-T05-SB">
          수강료 {item.realMan}
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 rounded-xl border border-purple-500 bg-white px-[28px] py-[18px] text-purple-500 font-T05-SB hover:bg-purple-50">
            <HeartIcon className="h-5 w-5" />
            담기
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
