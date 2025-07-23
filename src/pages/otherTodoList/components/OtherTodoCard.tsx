import CheckIcon from '@assets/icons/check.svg?react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@common/LoadingSpinner';
import { useMemoQuery } from '@hook/mydream/useGetMemo';

interface TodoItem {
  todoId: number;
  title: string;
  completed: boolean;

  isPublic: boolean;
}

interface TodoCardProps {
  title?: string;
  todos: TodoItem[];
}

const OtherTodoCard = ({ todos }: TodoCardProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

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
        {todos.map((item, index) => (
          <li key={index} className={`flex items-center px-2 py-1`}>
            <div
              className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] border ${
                item.completed
                  ? 'border-gray-500 bg-gray-300'
                  : 'border-gray-300 bg-gray-100'
              }`}
            >
              {item.completed && <CheckIcon className="h-4 w-8 text-white" />}
            </div>

            <div className="flex flex-1 items-center gap-3 pl-3">
              <span
                className={`font-B01-M ${
                  item.completed ? 'text-gray-500' : 'text-gray-900'
                }`}
              >
                {item.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OtherTodoCard;
