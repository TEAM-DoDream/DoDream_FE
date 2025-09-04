import DropDownIcon from '@assets/icons/drop_down.svg?react';
import clsx from 'clsx';
import { useDropdown } from '@hook/useDropdown';
import { useEffect, useState } from 'react';
import { useGetCommunityQuery } from '@hook/community/query/useGetCommunityQuery';

export interface CommunityDropdownProps<T extends string = string> {
  options: T[];
  value: T | '';
  onSelect: (value: T) => void;
  placeholder?: string;
  className?: string;
}

export default function CommunityDropdown<T extends string = string>({
  options,
  value,
  onSelect,
  placeholder = '선택',
  className,
}: CommunityDropdownProps<T>) {
  const { isOpen, toggle, ref } = useDropdown<T>();
  const [selected, setSelected] = useState<T | ''>(value || (options[0] ?? ''));
  const [userSelected, setUserSelected] = useState<boolean>(false);
  const [initializedFromApi, setInitializedFromApi] = useState<boolean>(false);
  const { data: communityData } = useGetCommunityQuery();

  useEffect(() => {
    if (!initializedFromApi) return; // API 초기 반영 전에는 옵션/외부값으로 덮어쓰지 않음
    // 부모가 초기 표시용으로 전달한 첫 옵션 값은 무시하고, 실제 변경만 반영
    if (value && value !== (options[0] as T)) {
      setSelected(value);
      return;
    }
    if (!userSelected) {
      setSelected((prev) => prev || (options[0] ?? ''));
    }
  }, [value, options, userSelected, initializedFromApi]);

  // 최초 렌더 시 API 데이터의 첫 값을 기본값으로 사용 (외부 value가 없을 때)
  useEffect(() => {
    const raw = (communityData as { data?: unknown } | undefined)?.data;
    let apiDefault: T | undefined;
    if (typeof raw === 'string') {
      apiDefault = raw as T;
    } else if (Array.isArray(raw)) {
      const first = (raw as { jobName?: string }[])[0]?.jobName;
      if (typeof first === 'string') apiDefault = first as T;
    }

    // 최초 1회: API 값으로 초기화하고 이후에는 사용자의 선택/외부값을 우선
    if (!initializedFromApi && apiDefault) {
      setSelected(apiDefault);
      setInitializedFromApi(true);
    }
  }, [communityData, initializedFromApi]);

  const label = (selected || placeholder) as string;
  const shouldScroll = options.length > 8;

  return (
    <div ref={ref} className={clsx('relative', className)}>
      {/* Toggle */}
      <div className="flex flex-row items-center gap-[18px]" onClick={toggle}>
        <div className="text-purple-500 font-T02-B"> {label} </div>
        <DropDownIcon
          className={clsx(
            'h-[30px] w-[30px] cursor-pointer text-[#A1A6B5] transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </div>

      {isOpen && (
        <ul
          className={clsx(
            'absolute left-0 top-full z-10 mt-[14px] w-max min-w-[200px] rounded-2xl border bg-white shadow-shadow4',
            shouldScroll ? 'max-h-[540px] overflow-y-auto' : 'overflow-visible'
          )}
        >
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                setSelected(opt);
                setUserSelected(true);
                onSelect(opt);
                toggle();
              }}
              className={clsx(
                'cursor-pointer px-5 py-4 font-B01-M hover:text-purple-500',
                selected === opt ? 'text-purple-500' : 'text-gray-400'
              )}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
