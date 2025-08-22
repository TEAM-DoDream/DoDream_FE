import Seed from '@assets/icons/seed.svg?react';
import PrePareStepModal from '@common/modal/PrePareStepModal';
import { useGetInfo } from '@hook/mypage/useMypageQuery';
import { useState } from 'react';

const Prepare = () => {
  const [prepareStepModal, setIsPrePareStepModal] = useState(false);
  const { data: InfoData } = useGetInfo();

  return (
    <div className="mt-[22px] flex justify-between">
      <div className="flex items-center gap-5">
        <span className="text-gray-900 font-B01-B">준비 단계</span>
        <div className="flex flex-row gap-4">
          <div className="flex flex-row items-center gap-1 rounded-full border border-purple-500 bg-purple-100 px-3 py-2">
            <div className="text-purple-500 font-B03-M">
              {' '}
              {InfoData?.level} 단계
            </div>
            <Seed className="h-5 w-5" />
          </div>
        </div>
      </div>

      <button
        className="flex items-center rounded-[10px] bg-purple-500 px-[10px] py-2 text-white font-B03-M"
        onClick={() => setIsPrePareStepModal(true)}
      >
        변경
      </button>
      {prepareStepModal && (
        <PrePareStepModal
          onClose={() => setIsPrePareStepModal(false)}
          jobName={InfoData?.job.jobName}
        />
      )}
    </div>
  );
};

export default Prepare;
