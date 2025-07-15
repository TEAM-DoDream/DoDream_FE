import Check from '@assets/icons/check.svg?react';

interface CheckBoxProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
  labelClassName?: string;
}

const CheckBox = ({
  checked,
  onToggle,
  label,
  labelClassName = 'text-gray-900',
}: CheckBoxProps) => {
  return (
    <div
      className="flex cursor-pointer flex-row items-center gap-[10px]"
      onClick={onToggle}
    >
      <div
        className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg border ${
          checked
            ? 'border-purple-300 bg-purple-150'
            : 'border-gray-300 bg-gray-100'
        }`}
      >
        {checked && <Check className="h-[19px] w-[19px]" />}
      </div>
      <div className={labelClassName}>{label}</div>
    </div>
  );
};

export default CheckBox;
