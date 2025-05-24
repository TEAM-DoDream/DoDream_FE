import { useState } from 'react';
import GoIcon from '@assets/icons/go.svg?react';
import Number1 from '@assets/icons/number.svg?react';
import Number2 from '@assets/icons/number2.svg?react';

interface FloatingModalProps {
  onClose: () => void;
  onAddTask: (task: { text: string; category: string }) => void;
}

const FloatingModal = ({ onClose, onAddTask }: FloatingModalProps) => {
  const [taskText, setTaskText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('요양보호사');

  const categories = ['요양보호사', '수의테크니션', '심리상담사', '사회복지사'];

  const handleSubmit = () => {
    if (taskText.trim()) {
      onAddTask({ text: taskText, category: selectedCategory });
      console.log('제출됨');
      setTaskText('');
      onClose();
    }
  };

  return (
    <div className="fixed bottom-[166px] right-[80px] z-50 w-full max-w-[476px] rounded-[30px] bg-white p-[26px] shadow-shadow4">
      <div className="flex flex-col">
        <div className="flex w-full flex-row justify-between">
          <div className="text-lg text-black font-T05-SB">나의 할 일</div>
          <div className="flex h-[38px] flex-row items-center justify-center gap-[6px] rounded-lg border-[1.4px] border-purple-500 bg-white px-2 text-purple-500 font-B02-B">
            나의 할일 가기
            <GoIcon />
          </div>
        </div>

        <div className="mt-[30px] flex flex-col overflow-x-auto no-scrollbar">
          <div className="mb-4 flex flex-row items-center gap-2">
            <Number1 />
            <div className="text-black font-T05-SB">
              {' '}
              할 일 추가할 직업을 선택해주세요{' '}
            </div>
          </div>

          <div className="flex flex-nowrap gap-2 pb-[30px]">
            {categories.map((label, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCategory(label)}
                className={`cursor-pointer whitespace-nowrap rounded-[10px] p-2 font-B03-SB ${
                  selectedCategory === label
                    ? 'border-[0.8px] border-purple-500 bg-purple-100 text-purple-500 shadow-shadow2'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <Number2 />
              <div className="text-black font-T05-SB">
                나의 할 일에 추가할 내용을 작성해주세요
              </div>
            </div>

            <textarea
              placeholder="예) 이력서 양식 다운로드하고 내용 적어보기"
              className="h-[140px] w-full resize-none rounded-[20px] border border-gray-200 bg-gray-50 p-5 text-gray-900 font-B03-M placeholder:text-gray-500 placeholder:font-B02-M focus:border-purple-500 focus:outline-none"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </div>
        </div>

        <button
          className="mt-5 h-[60px] w-full rounded-2xl bg-purple-500 py-[11px] text-white font-T05-SB hover:bg-purple-600"
          onClick={handleSubmit}
        >
          추가하기
        </button>
      </div>
    </div>
  );
};

export default FloatingModal;
