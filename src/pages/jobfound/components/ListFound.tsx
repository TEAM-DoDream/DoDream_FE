import { useState } from 'react';
import PlusIcon from '@assets/icons/plus.svg?react';
import Checker from '@assets/images/checker.png';
import Button from '@common/Button';
import AddJobModal from '@common/modal/AddJobModal';
import { JobRequest, useJobQuery } from '@hook/useJobQuery';
import LoadingSpinner from '@common/LoadingSpinner';
import FoundJobs from '@utils/data/jobfound/JobFoundDummy';
import { useNavigate } from 'react-router-dom';

interface ListFoundProps {
  page: number;
}

const ListFound = ({ page }: ListFoundProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const { data, isLoading, error } = useJobQuery(page);
  const jobs: JobRequest[] = data?.content ?? [];
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div>에러가 발생했어요.</div>;

  const sortedJobs = [...jobs].sort((a, b) =>
    a.jobName.localeCompare(b.jobName, 'ko')
  );

  return (
    <div className="grid grid-cols-3 gap-[50px] px-9 py-[60px]">
      {sortedJobs.map((item: JobRequest) => {
        const dummy = FoundJobs.find((f) => f.id === item.jobId);
        const users = dummy?.userProfiles ?? [];
        const userCount = users.length;
        const maxUsers = 3;

        return (
          <div
            key={item.jobId}
            className="flex cursor-pointer flex-col items-start"
            onClick={() => navigate(`/jobinfo/${item.jobId}`)}
          >
            <img
              src={item.imageUrl || Checker}
              alt={item.jobName}
              className="h-[240px] w-[360px] rounded-2xl object-cover"
            />

            <div className="mt-[14px] w-[360px]">
              <div className="flex flex-row text-purple-500 font-B02-SB">
                {item.requiredCertification},{item.workTimeInfo},
                {item.physicalInfo}
              </div>
              <div className="mt-[6px] text-gray-900 font-T04-SB">
                {item.jobName}
              </div>
              <div className="mt-[10px] truncate text-gray-500 font-B02-M">
                {item.jobDescription}
              </div>

              <div className="mt-[18px] flex w-full items-center justify-between">
                <div className="flex max-w-[126px] items-center -space-x-2">
                  {users.slice(0, maxUsers).map((user) => (
                    <img
                      key={user.id}
                      src={user.avatar}
                      alt={`${user.id}`}
                      className="h-[38px] w-[38px] rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  {userCount > maxUsers && (
                    <div className="my-[5px] flex h-7 w-9 items-center justify-center rounded-full bg-black p-[6px]">
                      <div className="flex flex-row items-center justify-center gap-[2px]">
                        <div className="mt-[2px] text-white font-C01-M">
                          {userCount - maxUsers}
                        </div>
                        <PlusIcon />
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  text="담기"
                  color="primary"
                  type="submit"
                  className="h-[42px] w-[116px] rounded-[10px] font-B03-SB"
                  onClick={() => {
                    setSelectedJob(item.jobId);
                    setIsModalOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {isModalOpen && selectedJob && (
        <AddJobModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ListFound;
