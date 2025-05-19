import { useState, useRef, useEffect } from 'react';
import DropDownIcon from '@assets/icons/drop_down.svg?react';

const CustomSortDropdown = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const options = ['최신순', '오래된 순'];

  return (
    <div
      className="relative ml-4 flex h-[50px] w-[100px] content-center"
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-4 text-gray-900 font-B01-M"
      >
        {value}
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <DropDownIcon className={'h-5 w-5'} />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-2 h-[142px] w-[192px] rounded-xl bg-white py-2 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              disabled={opt === value}
              className={`h-[70px] w-full px-4 py-2 text-left text-gray-400 font-B01-M ${
                opt === value
                  ? 'cursor-default text-purple-500'
                  : 'hover:bg-gray-100 hover:text-purple-500'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSortDropdown;
