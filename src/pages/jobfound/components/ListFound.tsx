import { useEffect } from 'react';
import Checker from '@assets/images/checker.png';
import { JobRequest, useJobQuery } from '@hook/useJobQuery';
import LoadingSpinner from '@common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useFilterStore } from '@store/filterStore';
import UserIcon from '@assets/icons/profile.svg?react';

interface ListFoundProps {
  page: number;
  setTotalPages: (total: number) => void;
}

const ListFound = ({ page, setTotalPages }: ListFoundProps) => {
  const { require, workTime, bodyActivity } = useFilterStore();

  const { data, isLoading, error } = useJobQuery(
    page,
    require,
    workTime,
    bodyActivity
  );
  const jobs: JobRequest[] = data?.content ?? [];
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data?.totalPages]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="text-center text-gray-500 font-B02-M">
        에러가 발생했어요.
      </div>
    );

  const sortedJobs = [...jobs].sort((a, b) =>
    a.jobName.localeCompare(b.jobName, 'ko')
  );

  return (
    <div className="grid grid-cols-3 gap-6 px-9 py-[60px]">
      {sortedJobs.length === 0 ? (
        <div className="col-span-3 text-center text-gray-500 font-B02-M">
          해당 조건에 맞는 직업이 없어요.
        </div>
      ) : (
        sortedJobs.map((item: JobRequest) => {
          return (
            <div
              key={item.jobId}
              className="mb-4 flex items-center justify-center rounded-[30px] border border-gray-300 bg-white pb-[30px]"
            >
              <div className="flex w-full cursor-pointer flex-col items-start">
                <img
                  src={item.imageUrl || Checker}
                  alt={item.jobName}
                  className="h-[240px] w-full rounded-t-[30px] object-cover"
                  onClick={() => navigate(`/jobinfo/${item.jobId}`)}
                />

                <div className="mt-5 w-full px-[30px]">
                  <div
                    className="mt-[6px] text-gray-900 font-T04-SB"
                    onClick={() => navigate(`/jobinfo/${item.jobId}`)}
                  >
                    {item.jobName}
                  </div>
                  <div className="mt-[10px] truncate text-gray-500 font-B02-M">
                    {item.jobDescription}
                  </div>

                  <div className="mt-5 flex flex-row items-center gap-[9px]">
                    <UserIcon className="h-6 w-6" />
                    <div className="text-gray-500 font-B03-M">
                      {' '}
                      {item.todoGroupNum}명이 준비중{' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ListFound;
