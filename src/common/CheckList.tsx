import { useState, useEffect } from 'react';
import Check from '@assets/icons/check.svg?react';
import MemoIcon from '@assets/icons/memo.svg?react';
import ReWriteIcon from '@assets/icons/edit-write.svg?react';
import TrashIcon from '@assets/icons/delete-trash.svg?react';
import ToastModal from './modal/ToastModal';
import Info from '@assets/icons/info.svg?react';

type ChecklistItem = string | { text: string; hasMemo?: boolean };

interface CheckListProps {
  lists: ChecklistItem[];
  defaultCheckedList?: boolean[];
  className?: string;
  onChange?: (checkedList: boolean[]) => void;
}

const CheckList = ({
  lists,
  defaultCheckedList,
  className = '',
  onChange,
}: CheckListProps) => {
  const normalized = lists.map((item) =>
    typeof item === 'string' ? { text: item } : item
  );

  const [listItems, setListItems] = useState(normalized);
  const [checkedList, setCheckedList] = useState<boolean[]>(
    defaultCheckedList ?? new Array(normalized.length).fill(false)
  );
  const [showToast, setShowToast] = useState<boolean>(false);
  const [lastDeleted, setLastDeleted] = useState<{
    item: { text: string; hasMemo?: boolean };
    index: number;
    checked: boolean;
  } | null>(null);

  useEffect(() => {
    if (onChange) {
      onChange(checkedList);
    }
  }, [checkedList, onChange]);

  const toggleCheck = (index: number) => {
    const newList = [...checkedList];
    newList[index] = !newList[index];
    setCheckedList(newList);
  };

  const handleDelete = (index: number) => {
    const deletedItem = listItems[index];
    const deletedChecked = checkedList[index];

    const newItems = [...listItems];
    newItems.splice(index, 1);
    setListItems(newItems);

    const newChecked = [...checkedList];
    newChecked.splice(index, 1);
    setCheckedList(newChecked);

    setLastDeleted({ item: deletedItem, index, checked: deletedChecked });
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setLastDeleted(null);
    }, 2500);
  };

  const handleUndoDelete = () => {
    if (!lastDeleted) return;

    const newItems = [...listItems];
    newItems.splice(lastDeleted.index, 0, lastDeleted.item);
    setListItems(newItems);

    const newChecked = [...checkedList];
    newChecked.splice(lastDeleted.index, 0, lastDeleted.checked);
    setCheckedList(newChecked);

    setShowToast(false);
    setLastDeleted(null);
  };

  return (
    <div className={className}>
      {listItems.map(({ text, hasMemo }, index) => {
        const done = checkedList[index];
        return (
          <div
            key={index}
            className="flex w-full items-center justify-between gap-2"
          >
            <div className="flex w-full items-center gap-2">
              <div
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg border ${
                  done
                    ? 'border-purple-300 bg-purple-150 text-purple-600'
                    : 'border-gray-300 bg-gray-100 text-transparent'
                } cursor-pointer transition-colors duration-150`}
                onClick={() => toggleCheck(index)}
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

            {hasMemo && (
              <div className="group ml-auto flex min-w-fit items-center gap-[5px]">
                <button className="flex items-center gap-[6px] rounded-[10px] bg-purple-100 px-3 py-2 text-purple-500 font-B03-SB">
                  <MemoIcon className="h-[18px] w-[18px] text-purple-500" />
                  메모
                </button>

                <div className="flex flex-row gap-[5px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <button className="flex items-center gap-[6px] rounded-[10px] bg-gray-100 px-3 py-2 text-gray-500 font-B03-SB">
                    <ReWriteIcon className="h-[18px] w-[18px]" />
                    편집
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="flex items-center gap-[6px] rounded-[10px] bg-gray-100 px-3 py-2 text-gray-500 font-B03-SB"
                  >
                    <TrashIcon className="h-[18px] w-[18px]" />
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {showToast && (
        <div className="fixed top-[130px] z-50 items-center">
          <ToastModal
            icon={<Info className="h-6 w-6 text-white" />}
            text="할일목록 1개가 삭제되었습니다"
            undoText="삭제취소"
            onUndo={handleUndoDelete}
            width="w-[469px]"
          />
        </div>
      )}
    </div>
  );
};

export default CheckList;
