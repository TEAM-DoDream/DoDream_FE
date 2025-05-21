import Pencil from '@assets/icons/pencil.svg?react';
import { useState } from 'react';
import FloatingModal from './modal/FloatingModal';
import ToastModal from './modal/ToastModal';
import Info from '@assets/icons/info.svg?react';
import Cancel from '@assets/icons/whiteCancel.svg?react';

const FloatingButton = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddTask = (task: { text: string; category: string }) => {
    console.log('추가됨:', task);
    setIsModal(false);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <div>
      <button
        className="fixed bottom-[50px] right-[80px] flex h-[102px] items-center gap-[10px] rounded-[28px] bg-purple-500 px-[30px] shadow-shadow4 transition-colors hover:bg-purple-600"
        onClick={() => setIsModal(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="cursor-pointer text-white font-T02-B"
          onClick={() => setIsModal(false)}
        >
          {isModal
            ? '할일 추가 닫기'
            : isHovered
              ? '바로 할 일 추가'
              : '할 일 추가하기'}
        </div>
        {isModal ? <Cancel /> : <Pencil />}
      </button>

      {isModal && (
        <div className="fixed inset-0 z-50" onClick={() => setIsModal(false)}>
          <div
            className="absolute bottom-[202px] right-[80px]"
            onClick={(e) => e.stopPropagation()}
          >
            <FloatingModal
              onClose={() => setIsModal(false)}
              onAddTask={handleAddTask}
            />
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed right-[564px] top-[100px] z-50">
          <ToastModal
            icon={<Info className="text-white" />}
            text="할일 목록이 추가되었습니다"
          />
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
