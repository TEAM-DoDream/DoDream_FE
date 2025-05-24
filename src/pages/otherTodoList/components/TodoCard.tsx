import { useState } from 'react';
import CheckIcon from '@assets/icons/check.svg?react';
import MemoIcon from '@assets/icons/memo.svg?react';
import ReWriteIcon from '@assets/icons/edit-write.svg?react';
import TrashIcon from '@assets/icons/delete-trash.svg?react';

interface TodoItem {
  todoId: number;
  title: string;
  completed: boolean;
  isMemoExist: boolean;
  isPublic: boolean;
}

interface TodoCardProps {
  title?: string;
  todos: TodoItem[];
  showAddButton?: boolean;
  disableHover?: boolean;
}

const TodoCard = ({
  title,
  todos,
  showAddButton = false,
  disableHover = false,
}: TodoCardProps) => {
  const [todoList, setTodoList] = useState(todos);

  const toggleCheck = (index: number) => {
    setTodoList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="flex flex-col justify-between rounded-[30px] border border-gray-300 bg-white p-[30px]">
      <div className="mb-4 border-b border-gray-300 pb-4 text-black font-T05-SB">
        {title}
      </div>

      <ul className="w-full flex-grow space-y-4">
        {todoList.map((item, index) => (
          <li
            key={index}
            className={`flex items-center px-2 py-1 ${
              disableHover ? '' : 'group'
            }`}
          >
            <div
              onClick={() => toggleCheck(index)}
              className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] border ${
                item.completed
                  ? 'border-purple-300 bg-purple-150'
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

            <div className="flex min-w-fit items-center gap-2">
              {item.isMemoExist && (
                <button className="flex items-center gap-1 rounded-xl bg-purple-100 px-4 py-2 text-purple-500 font-B03-SB">
                  <MemoIcon className="h-4 w-4 text-purple-500" />
                  메모
                </button>
              )}

              <div
                className={`flex items-center gap-2 transition-opacity duration-200 ${
                  disableHover
                    ? 'invisible opacity-0'
                    : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
                }`}
              >
                <button className="flex items-center gap-1 rounded-xl bg-gray-100 px-4 py-2 text-gray-500 font-B03-SB">
                  <ReWriteIcon className="h-4 w-4" /> 편집
                </button>
                <button className="flex items-center gap-1 rounded-xl bg-gray-100 px-4 py-2 text-gray-500 font-B03-SB">
                  <TrashIcon className="h-4 w-4" />
                  삭제
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {showAddButton && (
        <div className="mt-6 flex w-full items-center">
          <button className="w-full rounded-2xl bg-purple-100 py-3 text-center text-purple-600 font-B03-M hover:bg-purple-200">
            + 추가하기
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
