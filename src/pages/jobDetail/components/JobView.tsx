import Recruit from '@utils/data/home/RecruitDummy';
import Arrow from '@assets/icons/arrow.svg?react';

interface JobViewProps {
  id: number;
  locationName: string;
  recruit: string;
  company: string;
  deadline: string;
}

interface JobViewComponentProps {
  job: string;
}

const JobView = ({ job }: JobViewComponentProps) => {
  return (
    <div className="mt-[70px] flex w-full flex-col items-start gap-[50px]">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="text-gray-900 font-T02-B"> {job}의 일자리 둘러보기</div>
        <div className="flex cursor-pointer flex-row items-center">
          <div className="text-gray-500 font-B02-SB"> 더 보러가기 </div>
          <Arrow className="h-9 w-9" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {[...Recruit].slice(0, 3).map((item: JobViewProps) => (
          <div
            key={item.id}
            className="flex h-auto w-full cursor-pointer flex-col items-start rounded-[30px] border-2 border-gray-200 p-[30px] hover:shadow-shadow2"
          >
            <div className="self-end rounded-[10px] bg-purple-100 px-[10px] py-2 text-purple-500 font-B01-B">
              {item.deadline}
            </div>

            <div className="text-gray-500 font-B03-M">{item.company}</div>

            <div className="mt-3 text-black font-T04-SB">{item.recruit}</div>

            <div className="mt-4 text-gray-500 font-B03-M">
              {item.locationName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobView;
