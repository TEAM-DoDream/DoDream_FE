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

  const [isPublic, setIsPublic] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const { mutate: togglePublicState } = useMdIsPublicMutation();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const isEditMode = pathParts.includes('edit');
    setIsEdit(isEditMode);
  }, [location.pathname]);

  const { data: todoDetail, isLoading } = useQuery({
    queryKey: ['todoDetail', todoIdNum],
    queryFn: () => (todoIdNum ? mdTodoDetail(todoIdNum) : null),
    enabled: !!todoIdNum && isEdit,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (todoDetail && isEdit) {
      setTodoTitle(todoDetail.title || '');
      setIsPublic(todoDetail.isPublic || false);
    }
  }, [todoDetail, isEdit]);

  const handleToggle = (isPublic: boolean) => {
    setIsPublic(isPublic);
    if (todoGroupId) {
      togglePublicState({ todoGroupId, isPublic });
    } else {
      console.error('todoGroupId가 없습니다.');
    }
  };

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
          />
        </div>

        <div className="flex content-center items-center gap-1 self-end text-gray-500">
          <CautionIcon className="h-6 w-6" />
          <span className={'text-gray-500 font-B02-M'}>공개</span>
          <ToggleButton
            initialState={isPublic}
            todoGroupId={todoGroupId}
            onToggle={handleToggle}
          />
        </div>
      </div>

      {isEdit && isLoading ? (
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
          todoDetail={todoDetail}
        />
      )}
    </div>
  );
};

export default TodoListPage;
