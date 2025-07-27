import { useState } from 'react';
// import { useFloatingAddJob } from '@hook/floating/FloatingAddJob';
import { useFloatingSubmitMutation } from '@hook/floating/FloatingButtonMutation';
import { useMdTodoQuery } from '@hook/todo/useMdTodoQuery';
import TwoArrow from '@assets/icons/stick_arrow.svg?react';
import CalendarIcon from '@assets/icons/floating_calendar.svg?react';
import Cursor from '@assets/icons/cursor.svg?react';
import { useNavigate } from 'react-router-dom';

interface FloatingModalProps {
  onClose: () => void;
  onAddTask: () => void;
}

const FloatingModal = ({ onClose, onAddTask }: FloatingModalProps) => {
  const [taskText, setTaskText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const navigate = useNavigate();

  // const { data: addjobs } = useFloatingAddJob();
  const { mutate } = useFloatingSubmitMutation();
  const { data: hasJob, isLoading } = useMdTodoQuery();

  const hasNoJob =
    isLoggedIn &&
    !isLoading &&
    hasJob &&
    Array.isArray(hasJob.todos) &&
    hasJob.todos.length === 0 &&
    !hasJob.todoGroupId;

  const handleSubmit = () => {
    if (
      !isLoggedIn ||
      !taskText.trim() ||
      selectedCategory === null ||
      hasNoJob
    )
      return;

    mutate(
      {
        todoGroupId: selectedCategory,
        todoTitle: taskText,
        isPublic: true,
      },
      {
        onSuccess: () => {
          setTaskText('');
          setSelectedCategory(null);
          onAddTask();
          onClose();
        },
        onError: (err) => {
          console.error('제출 실패', err);
          alert('할 일 추가에 실패했습니다. 다시 시도해주세요.');
        },
      }
    );
  };

  const isButtonActive = isLoggedIn && !!taskText.trim();

  return (
    <div className="fixed bottom-[166px] right-[80px] z-50 w-full max-w-[476px] rounded-[30px] bg-white p-[26px] shadow-shadow4">
      <div className="flex flex-col">
        <div className="flex w-full flex-row justify-between">
          <div className="text-black font-T03-B">바로 할일 추가</div>
        </div>

        <div className="mt-[30px] flex flex-col items-start">
          {hasNoJob ? (
            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex flex-row items-center gap-[31px] px-10 py-[7px]">
                <div className="relative inline-block">
                  <div className="flex h-[43px] items-center rounded-[12px] bg-purple-150 px-[18px] py-[8.68px] text-[16px] font-medium leading-[20px] text-purple-500 font-B03-M">
                    직업 담으러 가기
                  </div>
                  <div className="absolute -right-[10px] bottom-[-30px]">
                    <Cursor />
                  </div>
                </div>
                <TwoArrow />
                <CalendarIcon />
              </div>

              <div className="mt-4 text-[#000] font-T05-SB">
                {' '}
                하단의 버튼을 통해 먼저 직업을 담아주세요
              </div>

              <button
                className="mt-[52px] flex h-[60px] w-full items-center justify-center rounded-2xl bg-purple-150 py-[11px] text-purple-500 font-T05-SB"
                onClick={() => navigate('/jobselect')}
              >
                {' '}
                직업 담으러 가기
              </button>
            </div>
          ) : (
            <>
              <div className="flex w-full flex-col gap-4">
                <div className="text-black font-T05-SB">
                  나의 할 일에 추가할 내용을 작성해주세요
                </div>

                <textarea
                  placeholder="예) 이력서 양식 다운로드하고 내용 적어보기"
                  className="h-[140px] w-full resize-none rounded-[20px] border border-gray-200 bg-gray-50 p-5 text-gray-900 font-B03-M placeholder:text-gray-500 placeholder:font-B02-M focus:border-purple-500 focus:outline-none"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                />
              </div>

              <button
                className={`mt-5 h-[60px] w-full rounded-2xl py-[11px] font-T05-SB ${
                  isButtonActive
                    ? 'bg-purple-150 text-purple-500 hover:bg-purple-200'
                    : 'cursor-not-allowed bg-purple-150 text-white'
                }`}
                onClick={handleSubmit}
                disabled={!isButtonActive}
              >
                추가하기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingModal;
