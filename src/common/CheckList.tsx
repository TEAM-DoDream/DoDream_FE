import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Check from '@assets/icons/check.svg?react';
import SaveIcon from '@assets/icons/save.svg?react';
import ReWriteIcon from '@assets/icons/edit-write.svg?react';
import TrashIcon from '@assets/icons/delete-trash.svg?react';
import ToastModal from './modal/ToastModal';
import Info from '@assets/icons/info.svg?react';
import { useDeleteTodoMutation } from '@hook/todo/useDeleteTodoMutation';
import { ReactTagManager } from 'react-gtm-ts';
import { useAddTodoMutation } from '@hook/todo/useAddTodoMutation.ts';
import Plus from '@assets/icons/plus.svg?react';
import { useUpdateTodoMutation } from '@hook/todo/useUpdateTodoMutation.ts';

type ChecklistItem =
  | string
  | {
      id?: number;
      text: string;
    };

interface CheckListProps {
  lists: ChecklistItem[];
  checkedIds?: number[];
  className?: string;
  onChange?: (checkedIds: number[]) => void;
  showAddButton?: boolean;
}

const CheckList = ({
  lists,
  checkedIds = [],
  className = '',
  onChange,
  showAddButton,
}: CheckListProps) => {
  const location = useLocation();
  const isMyToPage = location.pathname.startsWith('/mytodo/list');
  const { mutate: updateTodo } = useUpdateTodoMutation();
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

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const deleteTodoMutation = useDeleteTodoMutation();
  const { mutate } = useAddTodoMutation();
  const toggleCheck = (id?: number) => {
    if (id === undefined) return;
    let next: number[];
    if (checkedIds.includes(id)) {
      next = checkedIds.filter((x) => x !== id);
    } else {
      next = [...checkedIds, id];
    }
    onChange?.(next);

    ReactTagManager.action({
      event: 'my_todo_check',
      clickText: '할 일 체크 시',
    });
  };

  const handleSaveEdit = () => {
    if (editIndex === null) return;
    const item = listItems[editIndex];
    const trimmedText = editText.trim();
    if (!trimmedText) return;

    if (item.id) {
      updateTodo({
        todoId: item.id,
        todoTitle: trimmedText,
      });

      const updatedItems = [...listItems];
      updatedItems[editIndex] = { ...item, text: trimmedText };
      setListItems(updatedItems);
      setEditIndex(null);
      setEditText('');
      return;
    }

    mutate(
      { todoTitle: trimmedText },
      {
        onSuccess: (res) => {
          const newId = res.data.todoId;
          const updatedItems = [...listItems];
          updatedItems[editIndex] = {
            id: newId,
            text: trimmedText,
          };
          setListItems(updatedItems);
          setEditIndex(null);
          setEditText('');
        },
        onError: () => {
          alert('할 일 추가에 실패했습니다.');
        },
      }
    );
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
    setEditIndex(index);
    setEditText(item.text);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditText('');
  };

  return (
    <div className={className}>
      {listItems.map(({ text, id }, idx) => {
        const done = id !== undefined && checkedIds.includes(id);
        const isEditing = editIndex === idx;

        return (
          <div
            key={id ?? idx}
            className="group flex w-full max-w-[940px] items-center justify-between gap-2 rounded-lg px-2 py-1 hover:bg-gray-50"
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
              {isEditing ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-[622px] rounded-md border border-gray-300 px-3 py-2 text-gray-800 font-B02-M"
                  autoFocus
                  placeholder="새로운 할 일을 입력하세요"
                />
              ) : (
                <div
                  className={`w-[622px] truncate font-B02-M ${
                    done ? 'text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {text}
                </div>
              )}
            </div>

            <div className="ml-auto flex min-w-fit items-center gap-[5px]">
              {isMyToPage && (
                <div className="flex flex-row gap-[5px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => {
                          handleSaveEdit();
                          ReactTagManager.action({
                            event: 'edit_todo_click',
                            source_page: '7.1.3',
                            trigger_method: 'inline',
                            click_text: '저장',
                          });
                        }}
                        className="flex items-center gap-[6px] rounded-[10px] bg-gray-100 px-3 py-2 text-gray-500 font-B03-SB"
                      >
                        <SaveIcon className="h-[18px] w-[18px] text-purple-500" />
                        저장
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-[6px] rounded-[10px] bg-gray-100 px-3 py-2 text-gray-500 font-B03-SB"
                      >
                        <TrashIcon className="h-[18px] w-[18px]" />
                        취소
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              )}
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
      {showAddButton && (
        <button
          className="flex w-full items-center justify-center gap-[6px] rounded-2xl bg-purple-500 py-[14px] text-white font-T05-SB hover:bg-purple-600"
          onClick={() => {
            const newItem = { text: '' };
            const newList = [...listItems, newItem];
            setListItems(newList);
            setEditIndex(newList.length - 1);
            setEditText('');
            ReactTagManager.action({
              event: 'my_todo_add',
              category: '할 일 목록',
              clickText:
                '[나의 할일] 페이지> 할 일 작성 [추가하기] 버튼 클릭 시 ',
            });
          }}
        >
          <Plus className="h-6 w-6" />
          추가하기
        </button>
      )}
    </div>
  );
};

export default CheckList;
