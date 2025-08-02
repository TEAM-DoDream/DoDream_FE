import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@common/Button';
import { useJobSelectIdMutation } from '@hook/jobselect/useJobSelectIdMutation.ts';
import ToastModal from '@common/modal/ToastModal.tsx';
import { ReactTagManager } from 'react-gtm-ts';

interface ModalProps {
  onClose: () => void;
  jobId: number;
  onConfirm?: () => void;
  isFirstJob?: boolean;
}

const Modal: React.FC<ModalProps> = ({ onClose, jobId, onConfirm, isFirstJob = false }) => {
  const navigate = useNavigate();
  const saveJob = useJobSelectIdMutation();
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      saveJob.mutate(jobId, {
        onSuccess: () => {
          ReactTagManager.action({
            event: 'job_select',
            job_id: jobId,
            category: 'JobSelect',
            clickText: '직업 담기',
          });
          onClose();
          navigate('/', { state: { toast: '직업이 변경되었습니다' } });
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2000);
        },
      });
    }
  };

  const getModalContent = () => {
    if (isFirstJob) {
      return {
        title: '직업을 선택하시겠습니까?',
        description: '선택한 직업을 바탕으로 나만의 할 일을 작성할 수 있어요.',
        toastMessage: '직업이 추가되었습니다'
      };
    } else {
      return {
        title: '직업을 변경하시겠습니까?',
        description: '이전 직업에 대한 할 일 목록은 삭제됩니다.',
        toastMessage: '직업이 변경되었습니다'
      };
    }
  };

  const { title, description, toastMessage } = getModalContent();

  return (
    <>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#121212]/[0.5]">
        <div className="flex w-[564px] flex-col items-center justify-center rounded-[30px] bg-white px-[30px] pb-[30px] pt-10">
          <div className="text-gray-900 font-T03-B">{title}</div>
          <div className="mt-[10px] text-gray-500 font-T05-SB">
            {description}
          </div>
          <div className="mt-[30px] flex w-full flex-row gap-5">
            <Button
              text="취소"
              color="secondary"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-[14px] border-[1.4px] border-purple-500 bg-white px-10 py-[18px] text-purple-500 font-T05-SB"
            />
            <Button
              text="확인"
              onClick={handleSave}
              color="primary"
              className="flex w-full items-center justify-center rounded-[14px] px-10 py-[18px] text-white font-T05-SB"
            />
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2 transform">
          <ToastModal text={toastMessage} />
        </div>
      )}
    </>
  );
};

export default Modal;
