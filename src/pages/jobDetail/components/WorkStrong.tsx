import Info from '@assets/icons/info.svg?react';
import Divider from '@common/Divider';

interface JobIntensityProps {
  physical: string;
  stress: string;
  relationship: string;
}

const WorkStrong = ({ physical, stress, relationship }: JobIntensityProps) => {
  return (
    <div className="mt-5 flex h-[288px] w-[712px] flex-col items-start rounded-[30px] border border-gray-300 bg-white px-[30px] pb-[30px] pt-10">
      <div className="text-gray-900 font-T03-B"> 업무 강도 </div>
      <Divider className="my-[30px]" />

      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-[56px]">
          <div className="text-gray-500 font-B01-M"> 직무 활동량</div>
          <div className="flex flex-row gap-[10px]">
            <div className="text-gray-900 font-B01-M">{physical}</div>
            <Info className="text-[#A1A6B5]" />
          </div>
        </div>

        <div className="flex flex-row items-center gap-[26px]">
          <div className="text-gray-500 font-B01-M"> 정신적 스트레스</div>
          <div className="flex flex-row gap-[10px]">
            <div className="text-gray-900 font-B01-M">{stress}</div>
            <Info className="text-[#A1A6B5]" />
          </div>
        </div>

        <div className="flex flex-row items-center gap-[42px]">
          <div className="text-gray-500 font-B01-M"> 대인관계 빈도</div>
          <div className="flex flex-row gap-[10px]">
            <div className="text-gray-900 font-B01-M">{relationship}</div>
            <Info className="text-[#A1A6B5]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkStrong;
