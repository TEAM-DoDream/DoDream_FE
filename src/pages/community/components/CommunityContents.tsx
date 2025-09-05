import { useState, useMemo } from 'react';
import Bookmark from '@assets/icons/bookmark.svg?react';
import LoadingSpinner from '@common/LoadingSpinner';
import { useCommunityAddTodoMutation } from '@hook/community/useCommunityAddTodoMutation';
import { useDeleteCommunityTodosMutation } from '@hook/community/useDeleteCommunityTodos';
import ToastModal from '@common/modal/ToastModal';
import Info from '@assets/icons/info.svg?react';

type CommunityItem = {
  id: number;
  name: string;
  level: string;
  imageUrl?: string;
  dDay?: string;
  description: string;
  saveCount: number;
  isSaved: boolean;
};

type Props = {
  items: CommunityItem[] | undefined;
  activeLevel?: '전체' | '씨앗' | '새싹' | '꿈나무';
  sort?: '최신순' | '인기순';
};

const normalizeLevel = (s: string) => s.replace(' 단계', '');

const CommunityContents = ({
  items,
  activeLevel = '전체',
  sort = '최신순',
}: Props) => {
  const [added, setAdded] = useState<Record<number, boolean>>({});
  const addTodoMutation = useCommunityAddTodoMutation();
  const deleteTodoMutation = useDeleteCommunityTodosMutation();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const filtered = useMemo(() => {
    if (!items) return [];
    if (activeLevel === '전체') return items;
    return items.filter((x) => normalizeLevel(x.level) === activeLevel);
  }, [items, activeLevel]);

  const sorted = useMemo(() => {
    const base = [...filtered];
    if (sort === '인기순') base.sort((a, b) => b.saveCount - a.saveCount);
    return base;
  }, [filtered, sort]);

  const toggleAdd = (id: number, isAdded: boolean) => {
    if (isAdded) {
      deleteTodoMutation.mutate(
        { id },
        {
          onSuccess: () => {
            setAdded((prev) => ({ ...prev, [id]: false }));
            setToastMessage('할일이 취소되었습니다.');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
          },
          onError: () => {
            alert('추가 취소에 실패했어요.');
          },
        }
      );
    } else {
      addTodoMutation.mutate(
        { id },
        {
          onSuccess: () => {
            setShowToast(true);
            setAdded((prev) => ({ ...prev, [id]: true }));
            setToastMessage('할일이 추가되었습니다.');
            setTimeout(() => {
              setShowToast(false);
            }, 2500);
          },
          onError: () => {
            alert('내 할일 추가에 실패했어요.');
          },
        }
      );
    }
  };

  if (!items) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="mt-7 flex items-center justify-center text-gray-500 font-B02-M">
        조건에 맞는 투두가 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-7 flex flex-col">
      {sorted.map((post) => {
        const isAdded =
          typeof added[post.id] === 'boolean' ? added[post.id] : post.isSaved;
        const tag = normalizeLevel(post.level);

        return (
          <div
            key={post.id}
            className="flex w-full flex-col border-b border-gray-200 py-5"
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-[9px]">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.name}
                    className="h-[30px] w-[30px] rounded-full object-cover"
                  />
                ) : (
                  <div className="h-[30px] w-[30px] rounded-full bg-gray-200" />
                )}
                <span className="text-gray-600 font-B02-M">{post.name}</span>
                <span className="rounded-lg bg-purple-100 p-[6px] text-purple-500 font-C01-R">
                  {tag}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleAdd(post.id, isAdded)}
                className={
                  isAdded
                    ? 'p-2 text-purple-500 font-B03-SB'
                    : 'flex items-center justify-center rounded-[10px] bg-purple-500 p-2 text-purple-50 font-B03-SB'
                }
              >
                {isAdded ? '추가 취소하기' : '내 할일에 추가'}
              </button>
            </div>

            <div
              className={`mt-[22px] ${
                isAdded
                  ? 'ml-10 rounded-[14px] bg-purple-100 px-4 py-5'
                  : 'pl-10'
              }`}
            >
              <span className="break-words text-black font-B01-SB">
                {post.description}
              </span>
              {post.dDay && (
                <span className="ml-[10px] whitespace-nowrap text-gray-500 font-C01-R">
                  {post.dDay}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-row items-center pl-10">
              <div className="flex items-center gap-[6px]">
                <Bookmark />
                <div className="text-purple-600 font-B03-SB">
                  {post.saveCount}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {showToast && (
        <div className="fixed top-[100px] z-50 items-center">
          <ToastModal
            icon={<Info className="h-[26px] w-[26px] text-white" />}
            text={toastMessage}
            width="w-[274px]"
          />
        </div>
      )}
    </div>
  );
};

export default CommunityContents;
