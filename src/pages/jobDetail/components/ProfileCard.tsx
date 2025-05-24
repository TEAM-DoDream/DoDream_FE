import DefaultImage from '@assets/images/profile.png';
import Button from '@common/Button';
import CheckList from '@common/CheckList';
import Divider from '@common/Divider';
import { useJobOtherQuery } from '@hook/useJobQuery';
import { useNavigate, useParams } from 'react-router-dom';
import NoDataSideBar from './NoDataSideBar';
import LoadingSpinner from '@common/LoadingSpinner';

const ProfileCard = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();

  if (!jobId) return <div>존재하지 않는 직업입니다.</div>;

  const { data: DreamerList, isLoading } = useJobOtherQuery(Number(jobId));

  if (isLoading) return <LoadingSpinner />;

  if (!DreamerList || DreamerList.length === 0) return <NoDataSideBar />;

  return (
    <div className="mt-[66px] flex h-auto w-[444px] flex-col items-start rounded-[30px] bg-white p-[30px]">
      <div className="mb-5 text-black font-T03-B">
        다른 드리머들은 <br />
        이렇게 준비하고 있어요
      </div>

      <div className="flex w-full flex-col gap-5">
        {DreamerList.map((dreamer, index) =>
          index === 0 ? (
            <div
              key={dreamer.todoGroupId}
              className="flex w-full cursor-pointer flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 bg-white p-[30px] hover:bg-gray-100"
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
                    ? dreamer.todos.map((todo) => todo.title)
                    : ['할일을 추가해주세요']
                }
                className="line-clamp-1 flex w-full flex-col gap-3 text-ellipsis"
              />
            </div>
          ) : (
            <div
              key={dreamer.todoGroupId}
              className="flex cursor-pointer flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 bg-white p-[30px] hover:bg-gray-100"
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
            </div>
          )
        )}
      </div>

      <Button
        text="더 보러가기"
        color="secondary"
        type="button"
        className="mt-10 flex w-full items-center justify-center rounded-2xl border border-purple-500 py-4 font-T05-SB hover:bg-purple-150"
        onClick={() => navigate(`/otherslist/${jobId}`)}
      />
    </div>
  );
};

export default ProfileCard;
