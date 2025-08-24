import DefaultImage from '@assets/images/profile.png';
import CheckList from '@common/CheckList';
import Divider from '@common/Divider';
import { useJobOtherQuery } from '@hook/useJobQuery';
import { useNavigate } from 'react-router-dom';
import NoDataSideBar from './NoDataSideBar';
import LoadingSpinner from '@common/LoadingSpinner';
import Arrow from '@assets/icons/arrow.svg?react';

type ProfileCardProps = {
  jobId: number;
  jobName?: string;
};

const ProfileCard = ({ jobId, jobName }: ProfileCardProps) => {
  const navigate = useNavigate();
  const { data: DreamerList, isLoading } = useJobOtherQuery(jobId);

  if (isLoading) return <LoadingSpinner />;
  if (!DreamerList || DreamerList.length === 0)
    return (
      <div className="flex items-center justify-center text-black font-T03-B">
        {' '}
        연관 드리머가 없습니다{' '}
      </div>
    );

  const list = jobName
    ? DreamerList.filter((d) => d.jobName === jobName)
    : DreamerList;

  if (list.length === 0) return <NoDataSideBar />;

  return (
    <div className="mt-[110px] flex w-full flex-col items-start justify-center">
      <div className="mb-[50px] flex w-full flex-row items-center justify-between">
        <div className="text-gray-900 font-T02-B">연관 드리머</div>
        <div
          className="flex cursor-pointer flex-row items-center text-gray-500 font-B02-SB"
          onClick={() => navigate(`/others/${jobId}`)}
        >
          더 보러가기
          <Arrow />
        </div>
      </div>

      <div className="flex w-full flex-row gap-5">
        {list.slice(0, 3).map((dreamer) => (
          <div
            key={dreamer.todoGroupId}
            className="flex w-[385px] cursor-pointer flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 bg-white p-[30px] hover:bg-gray-100"
            onClick={() => navigate(`/otherslist/${dreamer.todoGroupId}`)}
          >
            <div className="flex flex-row gap-5">
              <img
                src={dreamer.profileImage || DefaultImage}
                alt="사용자이미지"
                className="h-[90px] w-[90px] rounded-full"
              />
              <div className="flex flex-col">
                <div className="text-gray-900 font-T05-SB">
                  {dreamer.memberNickname}
                </div>
                <div className="mt-[6px] text-gray-500 font-C01-M">
                  {dreamer.daysAgo}일째 꿈꾸는 중
                </div>
                <div className="mt-[10px] flex flex-row gap-[10px]">
                  <div className="flex items-center justify-center rounded-[10px] bg-purple-100 p-2 text-purple-500 font-B03-SB">
                    {dreamer.jobName}
                  </div>
                  <div className="flex items-center justify-center rounded-[10px] bg-gray-100 p-2 text-gray-500 font-B03-SB">
                    할일 {dreamer.todoCount}개
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-row gap-[10px]">
              <div className="text-gray-500 font-B02-M">거주지</div>
              <div className="text-gray-800 font-B02-SB">
                {dreamer.regionName}
              </div>
            </div>

            <Divider className="mb-6 mt-4" />
            <CheckList
              lists={
                dreamer.todos.length > 0
                  ? dreamer.todos.map((t) => t.title)
                  : ['할일을 추가해주세요']
              }
              className="line-clamp-1 flex w-full flex-col gap-3 text-ellipsis"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
