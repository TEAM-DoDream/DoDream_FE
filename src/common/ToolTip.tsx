import ToolTipImg from '@assets/images/speak.png';
import Cancel from '@assets/icons/bigcancel.svg?react';

interface ToolTipProps {
  text: string;
  onClose?: () => void;
}

const ToolTip = ({ text, onClose }: ToolTipProps) => {
  return (
    <div className="absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2">
      <div className="relative h-[42px] w-[351px]">
        <img
          src={ToolTipImg}
          alt="툴팁 배경"
          className="absolute inset-0 h-[42px] w-full object-cover"
        />

        <p className="absolute inset-0 z-10 ml-[29px] flex items-center text-white font-B03-M">
          {text}
        </p>

        <button
          onClick={onClose}
          className="absolute right-[9px] top-1/2 z-10 -translate-y-1/2"
        >
          <Cancel className="h-4 w-4 text-[#FFFFFF]" />
        </button>
      </div>
    </div>
  );
};

export default ToolTip;
