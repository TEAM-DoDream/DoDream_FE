import { useState } from 'react';
import MemoIcon from '@assets/icons/memo.svg?react'; // 메모 아이콘용

interface TodoItem {
  text: string;
  checked: boolean;
}

interface TodoCardProps {
  title?: string;
  todos: TodoItem[];
}

const TodoCard = ({ title, todos }: TodoCardProps) => {
  const [todoList, setTodoList] = useState(todos);

  const toggleCheck = (index: number) => {
    setTodoList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="rounded-[30px] border border-gray-300 bg-white p-6">
      {/* 상단 제목 */}
      <h3 className="mb-4 border-b border-gray-200 pb-3 text-lg font-bold text-purple-500">
        {title}
      </h3>

      {/* 할 일 목록 */}
      <ul className="space-y-4">
        {todoList.map((item, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(index)}
                className="h-5 w-5 accent-purple-500"
              />
              <span
                className={`text-sm ${
                  item.checked ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}
              >
                {item.text}
              </span>
            </div>

            {/* 메모 버튼을 텍스트에 가깝게 */}
            <button className="flex items-center gap-1 rounded-xl bg-black px-3 py-1.5 text-xs text-white">
              <MemoIcon className="h-4 w-4" />
              메모
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCard;
