import CheckIcon from '@assets/icons/check.svg?react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@common/LoadingSpinner';
import { useMemoQuery } from '@hook/mydream/useGetMemo';
import BookMarkIcon from '@assets/icons/bookmark.svg?react';
import { useCommunityAddTodoMutation } from '@hook/community/useCommunityAddTodoMutation';
import { useDeleteCommunityTodosMutation } from '@hook/community/useDeleteCommunityTodos';
import ToastModal from '@common/modal/ToastModal';
import Info from '@assets/icons/info.svg?react';

interface TodoItem {
  todoId: number;
  title: string;
  completed: boolean;
  isPublic: boolean;
  saveCount?: number;
  isSaved?: boolean;
}

interface TodoCardProps {
  title?: string;
  todos: TodoItem[];
}

const OtherTodoCard = ({ todos }: TodoCardProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [added, setAdded] = useState<Record<number, boolean>>({});
  const addTodoMutation = useCommunityAddTodoMutation();
  const deleteTodoMutation = useDeleteCommunityTodosMutation();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleAdd = (id: number, isAdded: boolean) => {
    if (isAdded) {
      deleteTodoMutation.mutate(
        { id },
        {
          onSuccess: () => {
            setAdded((prev) => ({ ...prev, [id]: false }));
            setToastMessage('할일이 취소되었습니다.');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
          },
          onError: () => {
            alert('추가 취소에 실패했어요.');
          },
        }
      );
    } else {
      addTodoMutation.mutate(
        { id },
        {
          onSuccess: () => {
            setShowToast(true);
            setAdded((prev) => ({ ...prev, [id]: true }));
            setToastMessage('할일이 추가되었습니다.');
            setTimeout(() => {
              setShowToast(false);
            }, 2500);
          },
          onError: () => {
            alert('내 할일 추가에 실패했어요.');
          },
        }
      );
    }
  };

  const {
    data,
    isLoading: isMemoLoading,
    isError,
  } = useMemoQuery(selectedTodoId || 0, {
    enabled: !!selectedTodoId,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setSelectedTodoId(null);
      setIsLoading(false);
    }

    if (isError) {
      console.error('메모를 불러오는 데 실패했습니다:', isError);
      alert('메모를 불러오는 데 실패했습니다. 다시 시도해주세요.');
      setSelectedTodoId(null);
      setIsLoading(false);
    }
  }, [data, isError, selectedTodoId, navigate]);

  return (
    <div className="flex flex-col justify-between rounded-[30px] border border-gray-300 bg-white p-[30px]">
      {(isLoading || isMemoLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
          <LoadingSpinner />
        </div>
      )}

      <ul className="w-full flex-grow space-y-4">
        {todos.map((item, index) => {
          const isAdded =
            typeof added[item.todoId] === 'boolean'
              ? added[item.todoId]
              : item.isSaved || false;

          return (
            <li
              key={index}
              className={`flex items-center justify-between px-2 py-1`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] border ${
                    item.completed
                      ? 'border-gray-500 bg-gray-300'
                      : 'border-gray-300 bg-gray-100'
                  }`}
                >
                  {item.completed && (
                    <CheckIcon className="h-4 w-8 text-white" />
                  )}
                </div>

                <span
                  className={`font-B01-M ${
                    item.completed ? 'text-gray-500' : 'text-gray-900'
                  }`}
                >
                  {item.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-purple-500">
                  <BookMarkIcon className="h-[18px] w-[18px]" />
                  <span className="text-sm font-B03-SB">
                    {item.saveCount || 0}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleAdd(item.todoId, isAdded)}
                  className={
                    isAdded
                      ? 'p-2 text-purple-500 font-B03-SB'
                      : 'flex items-center justify-center rounded-[10px] bg-purple-500 p-2 text-purple-50 font-B03-SB'
                  }
                >
                  {isAdded ? '추가 취소하기' : '내 할일에 추가'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {showToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <ToastModal
            icon={<Info className="h-[26px] w-[26px] text-white" />}
            text={toastMessage}
            width="w-[274px]"
          />
        </div>
      )}
    </div>
  );
};

export default OtherTodoCard;
