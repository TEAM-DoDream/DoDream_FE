import Cancel from '@assets/icons/bigcancel.svg?react';
import Like from '@assets/icons/purplelike.svg?react';

interface SelectModalProps<T> {
  item: T;
  onClose: () => void;
}

const SelectModal = <
  T extends {
    title: string;
    companyName: string;
    requiredEducationLevel: string;
    locationName: string;
    jobTypeName: string;
    deadline: string;
    'expiration-date': string;
  },
>({
  item,
  onClose,
}: SelectModalProps<T>) => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#121212]/[0.5]">
      <div className="flex w-full max-w-[778px] flex-col items-start justify-center rounded-[30px] bg-white p-[30px]">
        <div className="flex flex-col items-end justify-center self-stretch">
          <Cancel className="h-4 w-4 cursor-pointer" onClick={onClose} />
        </div>

        <div className="mt-1">
          <span className="flex rounded-[10px] bg-purple-100 px-3 py-2.5 text-purple-500 font-T04-SB">
            {item.deadline}
          </span>
        </div>

        <p className="mt-5 text-gray-500 font-B01-SB">{item.companyName}</p>
        <h2 className="mt-3 text-black font-T02-B" id="modal-title">
          {item.title}
        </h2>

        <div className="mt-[40px] w-full max-w-[718px] space-y-5 rounded-2xl bg-gray-100 p-[30px] text-gray-500 font-B01-M">
          <div className="flex flex-row gap-7">
            <span className="text-gray-500 font-B01-M">마감일</span>
            <span className="text-purple-500 font-B01-SB">
              {item['expiration-date']}
            </span>
          </div>

          <div className="flex flex-row gap-7">
            <span className="text-nowrap text-gray-500 font-B01-M">지역</span>
            <span className="w-full text-wrap break-words text-gray-900 font-B01-SB">
              {item.locationName}
            </span>
          </div>

          <div className="flex flex-row gap-7">
            <span className="text-gray-500 font-B01-M">학력</span>
            <span className="text-gray-900 font-B01-SB">
              {item.requiredEducationLevel}
            </span>
          </div>

          <div className="flex flex-row gap-7">
            <span className="text-gray-500 font-B01-M">고용형태</span>
            <span className="text-gray-900 font-B01-SB">
              {item.jobTypeName}
            </span>
          </div>
        </div>

        <div className="mt-[30px] flex flex-row items-end justify-end gap-4 self-stretch">
          <button className="flex items-center gap-3 rounded-[14px] border-[1.4px] border-purple-500 bg-white px-7 py-[18px] text-purple-500 font-T05-SB hover:bg-purple-100">
            <Like />
            담기
          </button>
          <button className="flex items-center justify-center rounded-[14px] bg-purple-500 px-[30px] py-[18px] text-white font-T05-SB hover:bg-purple-600">
            사람인에서 자세히 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
