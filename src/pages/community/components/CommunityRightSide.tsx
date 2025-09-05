import { useState, useMemo } from 'react';
import DropDownIcon from '@assets/icons/drop_down.svg?react';
import CommunityContents from './CommunityContents';
import { useCommunityStore } from '@store/useCommunityStore';
import { useCommunityGetTodo } from '@hook/community/query/useCommunityGetTodo';
import LoadingSpinner from '@common/LoadingSpinner';
import { useInfiniteScroll } from '@hook/community/useInfinityScroll';

type Level = '전체' | '씨앗' | '새싹' | '꿈나무';
type Sort = '최신순' | '인기순';

const levels: { value: Level; label: string; api: string }[] = [
  { value: '전체', label: '전체', api: '' },
  { value: '씨앗', label: '1단계: 씨앗', api: '씨앗 단계' },
  { value: '새싹', label: '2단계: 새싹', api: '새싹 단계' },
  { value: '꿈나무', label: '3단계: 꿈나무', api: '꿈나무 단계' },
];

const sortOptions: Sort[] = ['최신순', '인기순'];
const toApiLevel = (v: Level) => levels.find((l) => l.value === v)?.api ?? '';

const CommunityRightSide = () => {
  const { selectedJobName } = useCommunityStore();

  const [active, setActive] = useState<Level>('전체');
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState<Sort>('최신순');

  const size = 10;

  const { data, isLoading, isError, isFetching, fetchNextPage, hasNextPage } =
    useCommunityGetTodo({
      jobName: selectedJobName,
      level: toApiLevel(active),
      sort,
      size,
    });

  const items = useMemo(
    () => data?.pages.flatMap((p) => p.content) ?? [],
    [data]
  );

  const Observer = useInfiniteScroll<HTMLDivElement>({
    onIntersect: () => fetchNextPage(),
    enabled: !!hasNextPage && !isFetching && !isLoading && !isError,
    rootMargin: '200px',
  });

  const handleSelect = (option: Sort) => {
    setSort(option);
    setIsOpen(false);
  };

  return (
    <div className="mt-[95px] flex w-full flex-col rounded-[30px] bg-white p-[30px]">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          {levels.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`rounded-[10px] p-2 font-B03-SB ${
                active === value
                  ? 'bg-purple-100 text-purple-500'
                  : 'bg-gray-100 text-gray-500'
              }`}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex cursor-pointer flex-row items-center gap-2 p-[10px]"
            type="button"
            aria-expanded={isOpen}
          >
            <span className="text-gray-900 font-B02-M">{sort}</span>
            <DropDownIcon className="h-4 w-4 text-gray-700" />
          </button>

          {isOpen && (
            <div className="absolute right-[10px] mt-[5px] w-[192px] rounded-2xl border-[1.4px] border-gray-200 bg-white shadow-shadow4">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full cursor-pointer px-5 py-6 text-left ${
                    sort === option
                      ? 'text-purple-500 font-B01-SB'
                      : 'text-gray-400 font-B01-M'
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading && isFetching && items.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isError && <p className="mt-6 text-red-500">에러가 발생했습니다</p>}

      {items.length > 0 && (
        <CommunityContents items={items} activeLevel={active} sort={sort} />
      )}

      <div ref={Observer} className="h-10" />

      {!hasNextPage && items.length > 0 && (
        <p className="text-center text-gray-500"> 마지막 할 일 입니다.</p>
      )}
    </div>
  );
};

export default CommunityRightSide;
