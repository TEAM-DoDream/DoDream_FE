import {
  JobViewRequest,
  useJobViewQuery,
  useNoJobViewQuery,
} from '@hook/useJobQuery';
import LoadingSpinner from '@common/LoadingSpinner';
import { useState } from 'react';
import SelectModal from '@common/modal/SelectModal';
import Button from '@common/Button';
import { useFilterStore } from '@store/filterStore';
import { useNavigate } from 'react-router-dom';

interface JobViewComponentProps {
  jobName: string;
}

const JobView = ({ jobName }: JobViewComponentProps) => {
  const [selectedItem, setSelectedItem] = useState<JobViewRequest | null>(null);
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const query = isLoggedIn ? useJobViewQuery : useNoJobViewQuery;
  const { data: jobView, isLoading, error } = query(jobName);
  const setSelection = useFilterStore((state) => state.setSelection);
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>에러가 발생했어요.</div>;

  return (
    <div className="mt-[66px] flex h-[748px] w-[444px] flex-col items-start rounded-[30px] bg-white p-[30px]">
      <div className="text-gray-900 font-T03-B">
        {' '}
        {jobName} <br /> 채용 정보
      </div>

      <div className="mt-[30px] flex w-full flex-col gap-5">
        {jobView && jobView.length > 0 ? (
          jobView.slice(0, 2).map((view) => (
            <div
              key={view.id}
              onClick={() => setSelectedItem(view)}
              className="flex w-full cursor-pointer flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 bg-white p-[30px] hover:bg-gray-100"
            >
              <div className="self-end rounded-[10px] bg-purple-100 px-[10px] py-2 text-purple-500 font-B01-B">
                {view.deadline}
              </div>
              <div className="text-gray-500 font-B03-M">{view.companyName}</div>
              <div className="mt-3 text-black font-T04-SB">{view.title}</div>
              <div className="mt-4 text-gray-500 font-B03-M">
                {view.locationName}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 font-B02-M">
            해당 직업에 대한 일자리가 없습니다.
          </div>
        )}
      </div>
      {selectedItem && (
        <SelectModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      <Button
        text="더 보러가기"
        color="secondary"
        type="button"
        className="mt-10 flex w-full items-center justify-center rounded-2xl border border-purple-500 py-4 font-T05-SB hover:bg-purple-150"
        onClick={() => {
          setSelection('job', jobName);
          navigate('/jobsearch');
        }}
      />
    </div>
  );
};

export default JobView;
