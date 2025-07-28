import Button from '@common/Button';
import { useJobSelectIdMutation } from '@hook/jobselect/useJobSelectIdMutation.ts';

interface ModalProps {
  onClose: () => void;
  jobId: number;
}

const Modal = ({ onClose, jobId }: ModalProps) => {
  const { mutate: saveJob } = useJobSelectIdMutation();
  const handleSave = () => {
    saveJob(jobId, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#121212]/[0.5]">
      <div className="flex w-[564px] flex-col items-center justify-center rounded-[30px] bg-white px-[30px] pb-[30px] pt-10">
        <div className="text-gray-900 font-T03-B">직업을 변경하시겠습니까?</div>
        <div className="mt-[10px] text-gray-500 font-T05-SB">
          이전 직업에 대한 할 일 목록은 삭제됩니다.
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
            onClick={() => handleSave()}
            color="primary"
            className="flex w-full items-center justify-center rounded-[14px] px-10 py-[18px] text-purple-100 font-T05-SB"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
