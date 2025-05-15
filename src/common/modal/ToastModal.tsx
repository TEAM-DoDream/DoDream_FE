import { ReactNode } from 'react';

interface ToastProps {
  text: string;
  icon?: ReactNode;
}

const ToastModal = ({ text, icon }: ToastProps) => {
  return (
    <div className="flex items-center justify-center gap-[10px] rounded-full bg-gray-800 px-[30px] py-5 shadow-shadow4">
      {icon && <div>{icon}</div>}
      <div className="text-white font-T05-SB">{text}</div>
    </div>
  );
};

export default ToastModal;
