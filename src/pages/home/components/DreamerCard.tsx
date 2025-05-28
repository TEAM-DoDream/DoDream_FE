import Divider from '@common/Divider';
import CheckList from '@common/CheckList';
import BaseImage from '@assets/images/profile.png';
import { useNavigate } from 'react-router-dom';

interface DreamerCardProps {
  todogroupId: number;
  memberNickname: string;
  profileImage: string;
  regionName: string;
  daysAgo: number;
  jobName: string;
  todoCount: number;
  todos: {
    todoId: number;
    title: string;
    completed: boolean;
  }[];
}

const DreamerCard = ({
  regionName,
  jobName,
  memberNickname,
  daysAgo,
  todoCount,
  profileImage,
  todos,
  todogroupId,
}: DreamerCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex h-auto w-[384px] flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 bg-white p-[30px] transition-shadow hover:shadow-shadow2"
      onClick={() => navigate(`/otherslist/${todogroupId}`)}
    >
      <div className="flex flex-row gap-5">
        <img
          src={profileImage || BaseImage}
          alt="프로필이미지"
          className="h-[90px] w-[90px] rounded-full"
        />

        <div className="flex flex-col gap-[6px]">
          <span className="text-gray-900 font-T05-SB">{memberNickname}</span>
          <span className="text-gray-500 font-C01-M">
            {daysAgo}일째 꿈꾸는 중
          </span>

          <div className="mt-1 flex items-center justify-center gap-[10px]">
            <div className="rounded-[10px] bg-purple-100 p-2 text-purple-500 font-B03-SB">
              {jobName}
            </div>

            <div className="rounded-[10px] bg-gray-100 p-2 text-gray-500 font-B03-SB">
              할일 {todoCount}개
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 mt-6 flex flex-row items-center justify-center gap-[10px]">
        <span className="text-gray-500 font-B02-M">지역</span>
        {regionName ? (
          <span className="text-gray-800 font-B02-SB">{regionName}</span>
        ) : (
          <span className="text-gray-500 font-B02-SB">
            등록된 지역이 없어요
          </span>
        )}
      </div>

      <Divider />

      <div className="mt-6 flex w-full flex-col gap-3">
        {todos.length === 0 ? (
          <span className="text-gray-500 font-B02-M">
            작성된 할일 목록이 없어요
          </span>
        ) : (
          <CheckList
            lists={
              todos.length > 0
                ? todos.map((todo) => todo.title)
                : ['할 일이 없습니다.']
            }
            className="flex w-full flex-col gap-3"
          />
        )}
      </div>
    </div>
  );
};

export default DreamerCard;
