import Container from '@pages/myTodo/components/todo/Container.tsx';
import BackIcon from '@assets/icons/back.svg?react';
import CautionIcon from '@assets/icons/caution.svg?react';
import ToggleButton from '@common/Toggle.tsx';
import { useMdIsPublicMutation } from '@hook/mydream/useMdIsPublicMutation';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMdTodoQuery } from '@hook/todo/useMdTodoQuery.ts';
import { useMdTodoDetail } from '@hook/todo/useMdTodoDetail';
import { useQuery } from '@tanstack/react-query';
import { TodoDetailData } from '@validation/mydream/todoDetailSchema';

const TodoListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { todoId, todoGroupId: urlTodoGroupId } = useParams<{
    todoId?: string;
    todoGroupId?: string;
  }>();

  const todoIdNum = todoId ? parseInt(todoId, 10) : undefined;
  const urlTodoGroupIdNum = urlTodoGroupId
    ? parseInt(urlTodoGroupId, 10)
    : undefined;

  const { data: todoData } = useMdTodoQuery();
  const todoGroupId: number | undefined =
    urlTodoGroupIdNum ?? todoData?.todoGroupId ?? undefined;

  const mdTodoDetail = useMdTodoDetail();
  const { mutate: togglePublicState } = useMdIsPublicMutation();

  const [isPublic, setIsPublic] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [initialDataSet, setInitialDataSet] = useState(false);

  const isMemoView = location.pathname.includes('/memo');
  const isReadOnly = isMemoView && !isEdit;

  const currentTodoItem = todoData?.todos?.find(
    (todo) => todo.todoId === todoIdNum
  );

  useEffect(() => {
    if (todoIdNum && currentTodoItem && !initialDataSet) {
      setTodoTitle(currentTodoItem.title || '');
      setInitialDataSet(true);
    }
  }, [todoIdNum, currentTodoItem, initialDataSet]);

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const isEditMode = pathParts.includes('edit');
    setIsEdit(isEditMode);
  }, [location.pathname]);

  const { data: todoDetail, isLoading: isEditLoading } = useQuery({
    queryKey: ['todoDetail', todoIdNum, 'edit'],
    queryFn: async () => {
      try {
        if (!todoIdNum) return null;
        return await mdTodoDetail(todoIdNum);
      } catch (error) {
        console.error('Todo 상세 정보 조회 중 오류 발생:', error);

        if (currentTodoItem) {
          return {
            todoId: todoIdNum,
            title: currentTodoItem.title || '',
            isPublic: false,
            memoText: '',
            images: [],
          };
        }

        return null;
      }
    },
    enabled: !!todoIdNum,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  const { data: myMemoDetail, isLoading: isMyMemoLoading } = useQuery({
    queryKey: ['myTodoDetail', todoIdNum, 'memo'],
    queryFn: async () => {
      try {
        if (!todoIdNum) return null;
        return await mdTodoDetail(todoIdNum);
      } catch (error) {
        console.error('내 메모 조회 중 오류 발생:', error);
        alert('메모를 불러올 수 없습니다: ' + (error as Error).message);
        navigate(-1);
        return null;
      }
    },
    enabled: !!todoIdNum && isMemoView && !isEdit,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (myMemoDetail && !isEdit && isMemoView) {
      setTodoTitle(myMemoDetail.title || '');
      setIsPublic(myMemoDetail.isPublic || false);
    }

    if (todoDetail && isEdit) {
      setTodoTitle(todoDetail.title || '');
      setIsPublic(todoDetail.isPublic || false);
    }
  }, [todoDetail, myMemoDetail, isEdit, isMemoView]);

  const handleToggle = (isPublic: boolean) => {
    if (isReadOnly) return;

    setIsPublic(isPublic);
    if (todoGroupId) {
      togglePublicState({ todoGroupId, isPublic });
    } else {
      console.error('todoGroupId가 없습니다.');
    }
  };

  const isLoading = isEditLoading || isMyMemoLoading;

  const customTodoDetail =
    todoDetail ||
    (todoIdNum && currentTodoItem
      ? {
          todoId: todoIdNum,
          title: currentTodoItem.title || '',
          isPublic: false,
          memoText: '',
          images: [],
        }
      : null);

  return (
    <div className="mx-[120px] mt-10 bg-gray-50 px-5 py-4">
      <div className="mb-4 flex max-w-[1010px] flex-col gap-2">
        <div className="flex items-center gap-2 self-start">
          <BackIcon className="cursor-pointer" onClick={() => navigate(-1)} />
          <input
            placeholder="할일을 입력해주세요"
            className="w-[974px] rounded-[10px] border border-gray-200 bg-white px-[20px] py-[10px] text-gray-900 font-T05-SB"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            readOnly={isReadOnly}
            disabled={isReadOnly}
          />
        </div>

        <div className="flex content-center items-center gap-1 self-end text-gray-500">
          <CautionIcon className="h-6 w-6" />
          <span className="text-gray-500 font-B02-M">공개</span>
          <ToggleButton
            initialState={isPublic}
            todoGroupId={todoGroupId}
            onToggle={handleToggle}
            disabled={isReadOnly}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] w-full items-center justify-center">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      ) : (
        <Container
          todoTitle={todoTitle}
          isPublic={isPublic}
          todoGroupId={todoGroupId}
          todoId={todoIdNum}
          isEdit={isEdit}
          todoDetail={customTodoDetail as TodoDetailData | null}
          memoDetail={myMemoDetail as TodoDetailData | null}
          isMemoView={isMemoView}
        />
      )}
    </div>
  );
};

export default TodoListPage;
