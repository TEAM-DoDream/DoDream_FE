import { useState } from 'react';
import CheckIcon from '@assets/icons/check.svg?react';
import MemoIcon from '@assets/icons/memo.svg?react';
import ReWriteIcon from '@assets/icons/edit-write.svg?react';
import TrashIcon from '@assets/icons/delete-trash.svg?react';
import Divider from '@common/Divider.tsx';

interface TodoItem {
  text: string;
  checked: boolean;
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
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="flex flex-col justify-between rounded-[30px] border border-gray-300 bg-white p-6">
      <h3 className="border-gray-200 pb-3 text-purple-500 font-T05-SB">
        {title}
      </h3>
      <Divider className="-mx-6 mb-4" />
      <ul className="flex-grow space-y-4">
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
                item.checked
                  ? 'border-purple-300 bg-purple-150'
                  : 'border-gray-300 bg-gray-100'
              }`}
            >
              {item.checked && <CheckIcon className="h-4 w-8 text-white" />}
            </div>

            <div className="flex flex-1 items-center gap-3 pl-3">
              <span
                className={`font-B01-M ${
                  item.checked ? 'text-gray-500' : 'text-gray-900'
                }`}
              >
                {item.text}
              </span>
            </div>

            <div className="flex min-w-fit items-center gap-2">
              {index % 2 === 1 && (
                <button className="flex items-center gap-1 rounded-xl bg-black px-3 py-1.5 text-white font-B03-SB">
                  <MemoIcon className="h-4 w-4" />
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
                <button className="flex items-center gap-1 rounded-xl bg-gray-100 px-3 py-1.5 text-gray-500 font-B03-SB">
                  <ReWriteIcon className="h-4 w-4" /> 편집
                </button>
                <button className="flex items-center gap-1 rounded-xl bg-gray-100 px-3 py-1.5 text-gray-500 font-B03-SB">
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
