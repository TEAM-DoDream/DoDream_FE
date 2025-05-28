import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Check from '@assets/icons/check.svg?react';
import MemoIcon from '@assets/icons/memo.svg?react';
import ReWriteIcon from '@assets/icons/edit-write.svg?react';
import TrashIcon from '@assets/icons/delete-trash.svg?react';
import ToastModal from './modal/ToastModal';
import Info from '@assets/icons/info.svg?react';
import { useDeleteTodoMutation } from '@hook/todo/useDeleteTodoMutation';

type ChecklistItem =
  | string
  | {
      id?: number;
      text: string;
      hasMemo?: boolean;
    };

interface CheckListProps {
  lists: ChecklistItem[];
  checkedIds?: number[];
  className?: string;
  onChange?: (checkedIds: number[]) => void;
}

const CheckList = ({
  lists,
  checkedIds = [],
  className = '',
  onChange,
}: CheckListProps) => {
  const navigate = useNavigate();
  const normalized = lists.map((item) =>
    typeof item === 'string' ? { text: item } : item
  );

  const [listItems, setListItems] = useState(normalized);
  const [showToast, setShowToast] = useState(false);
  const [lastDeleted, setLastDeleted] = useState<{
    item: { id?: number; text: string; hasMemo?: boolean };
    index: number;
    checked: boolean;
  } | null>(null);

  const deleteTodoMutation = useDeleteTodoMutation();

  const toggleCheck = (id?: number) => {
    if (id === undefined) return;
    let next: number[];
    if (checkedIds.includes(id)) {
      next = checkedIds.filter((x) => x !== id);
    } else {
      next = [...checkedIds, id];
    }
    onChange?.(next);
  };

  const handleDelete = (index: number) => {
    const deleted = listItems[index];
    const deletedId = deleted.id;
    const wasChecked = deletedId ? checkedIds.includes(deletedId) : false;

    if (deletedId) {
      deleteTodoMutation.mutate({ todoId: deletedId });
    }

    const newItems = [...listItems];
    newItems.splice(index, 1);
    setListItems(newItems);

    if (deletedId) {
      onChange?.(checkedIds.filter((x) => x !== deletedId));
    }

    setLastDeleted({ item: deleted, index, checked: wasChecked });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setLastDeleted(null);
    }, 2500);
  };

  const handleUndo = () => {
    if (!lastDeleted) return;
    const { item, index, checked } = lastDeleted;

    const newItems = [...listItems];
    newItems.splice(index, 0, item);
    setListItems(newItems);

    if (item.id !== undefined) {
      let next = [...checkedIds];
      if (checked) next.push(item.id);
      else next = next.filter((x) => x !== item.id);
      onChange?.(next);
    }

    setShowToast(false);
    setLastDeleted(null);
  };

  const handleEdit = (index: number) => {
    const item = listItems[index];
    if (item.id) {
      navigate(`/mytodo/edit/${item.id}`);
    }
  };

  const handleViewMemo = (index: number) => {
    const item = listItems[index];
    if (item.id) {
      navigate(`/mytodo/memo/${item.id}`);
    }
  };

  return (
    <div className={className}>
      {listItems.map(({ text, hasMemo, id }, idx) => {
        const done = id !== undefined && checkedIds.includes(id);

        return (
          <div
            key={id ?? idx}
            className="group flex w-full items-center justify-between gap-2 py-1 px-2 rounded-lg hover:bg-gray-50"
          >
            <div className="flex w-full items-center gap-2">
              <div
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg border ${
                  done
                    ? 'border-purple-300 bg-purple-150 text-purple-600'
                    : 'border-gray-300 bg-gray-100 text-transparent'
                } cursor-pointer transition-colors duration-150`}
                onClick={() => toggleCheck(id)}
              >
                {done && <Check className="h-[19px] w-[19px]" />}
              </div>
              <span
                className={`truncate font-B02-M ${
                  done ? 'text-gray-500' : 'text-gray-800'
                }`}
              >
                {text}
              </span>
            </div>

            <div className="ml-auto flex min-w-fit items-center gap-[5px]">
              {hasMemo && (
                <button 
                  className="flex items-center gap-[6px] rounded-[10px] bg-purple-100 px-3 py-2 text-purple-500 font-B03-SB"
                  onClick={() => handleViewMemo(idx)}
                >
                  <MemoIcon className="h-[18px] w-[18px] text-purple-500" />
                  메모
                </button>
              )}
              <div className="flex flex-row gap-[5px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <button
                  onClick={() => handleEdit(idx)}
                  className="flex items-center gap-[6px] rounded-[10px] bg-gray-100 px-3 py-2 text-gray-500 font-B03-SB"
                >
                  <ReWriteIcon className="h-[18px] w-[18px]" />
                  편집
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="flex items-center gap-[6px] rounded-[10px] bg-gray-100 px-3 py-2 text-gray-500 font-B03-SB"
                >
                  <TrashIcon className="h-[18px] w-[18px]" />
                  삭제
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {showToast && lastDeleted && (
        <div className="fixed top-[130px] z-50 items-center">
          <ToastModal
            icon={<Info className="h-6 w-6 text-white" />}
            text="할일 목록 1개가 삭제되었습니다"
            undoText="삭제취소"
            onUndo={handleUndo}
            width="w-[469px]"
          />
        </div>
      )}
    </div>
  );
};

export default CheckList;
