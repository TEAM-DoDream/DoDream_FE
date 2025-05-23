import { ReactNode } from 'react';

interface ToastProps {
  text: string | ReactNode;
  icon?: ReactNode;
  undoText?: string;
  onUndo?: () => void;
  width?: string;
}

const ToastModal = ({
  text,
  icon,
  undoText,
  onUndo,
  width = 'min-w-[320px]',
}: ToastProps) => {
  return (
    <div
      className={`flex items-center justify-between rounded-full bg-gray-800 px-[24px] py-[14px] shadow-shadow4 ${width}`}
    >
      <div className="flex items-center gap-[10px]">
        {icon && <div className="text-white">{icon}</div>}
        <div className="whitespace-nowrap text-sm text-white font-T05-SB">
          {text}
        </div>
      </div>

      {onUndo && (
        <button
          onClick={onUndo}
          className="text-gray-300 underline underline-offset-1 transition font-T05-SB hover:text-white"
        >
          {undoText || ''}
        </button>
      )}
    </div>
  );
};

export default ToastModal;
