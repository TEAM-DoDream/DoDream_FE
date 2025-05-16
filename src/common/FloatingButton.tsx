import Pencil from '@assets/icons/pencil.svg?react';
import { useState } from 'react';
import FloatingModal from './modal/FloatingModal';
import ToastModal from './modal/ToastModal';
import Info from '@assets/icons/info.svg?react';

const FloatingButton = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

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
        className="fixed bottom-[60px] right-[60px] flex h-20 w-20 items-center rounded-[28px] bg-purple-500 p-5 shadow-shadow2 transition-colors hover:shadow-shadow4"
        onClick={() => setIsModal(true)}
      >
        <Pencil />
      </button>

      {isModal && (
        <div className="fixed inset-0 z-50" onClick={() => setIsModal(false)}>
          <div
            className="absolute bottom-[140px] right-[60px]"
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
