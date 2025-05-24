import RefreshIcon from '@assets/icons/refresh_icon.svg?react';
import clsx from 'clsx';

interface ResetButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export default function ResetButton({
  onClick,
  label = '필터 초기화',
  className,
}: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-1 rounded-full bg-gray-500 px-4 py-2 text-sm text-white',
        className
      )}
    >
      {label} <RefreshIcon />
    </button>
  );
}
