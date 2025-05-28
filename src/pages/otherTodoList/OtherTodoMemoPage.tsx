import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemoQuery } from '@hook/mydream/useGetMemo';
import BackIcon from '@assets/icons/back.svg?react';
import LoadingSpinner from '@common/LoadingSpinner';
import MyEditor from '@pages/myTodo/components/todo/MyEditor';

const OtherTodoMemoPage = () => {
  const { todoId } = useParams<{ todoId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: memoData,
    isLoading: isMemoLoading,
    error,
  } = useMemoQuery(Number(todoId) || 0, {
    enabled: !!todoId,
    retry: false,
  });

  useEffect(() => {
    if (!isMemoLoading) {
      setIsLoading(false);
    }

    if (error) {
      alert('메모를 불러오는 데 실패했습니다. 다시 시도해주세요.');
      navigate(-1);
    }
  }, [isMemoLoading, error, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading || isMemoLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
        <LoadingSpinner />
      </div>
    );
  }

  if (!memoData) {
    return (
      <div className="flex min-h-screen flex-col items-center px-4">
        <div className="w-full max-w-[1010px] pt-[40px]">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-900 font-T05-SB"
            >
              <BackIcon />
              뒤로 가기
            </button>
          </div>
          <div className="mt-[30px] rounded-[30px] border border-gray-300 bg-white p-[30px]">
            <div className="py-10 text-center text-gray-500 font-B01-M">
              메모를 불러올 수 없습니다.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-full max-w-[1010px] pt-[40px]">
        <div className="mb-6 flex items-center justify-start gap-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-900 font-T05-SB"
            >
              <BackIcon />
            </button>
          </div>
          <input
            placeholder="할일을 입력해주세요"
            className="w-[974px] rounded-[10px] border border-gray-200 bg-white px-[20px] py-[10px] text-gray-900 font-T05-SB"
            value={memoData.title}
            disabled={true}
          />
        </div>

        <div className="container flex w-full flex-col items-center gap-5 rounded-[30px] bg-gray-100 p-[20px]">
          <div className="flex w-full items-stretch justify-center gap-[20px]">
            <div className="flex-1">
              <MyEditor
                value={memoData.memoText}
                onChange={() => {}}
                readOnly={true}
                // link={memoData.link}
              />
            </div>
            <div className="flex-1">
              <div className="flex h-full w-full flex-col overflow-y-auto rounded-2xl bg-white p-[20px]">
                <div className="flex w-full items-center justify-between">
                  <h2 className="font-T05-SB">이미지</h2>
                </div>
                <div className="mt-4 flex flex-1 flex-col gap-3">
                  {!memoData.images || memoData.images.length === 0 ? (
                    <span className="text-gray-500 font-B02-M">
                      첨부된 이미지가 없어요
                    </span>
                  ) : (
                    memoData.images.map((image, idx) => (
                      <div key={image.imageId} className="relative w-full">
                        <img
                          src={image.imageUrl}
                          alt={`uploaded-${idx}`}
                          className="w-full rounded-lg border border-gray-200"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherTodoMemoPage;
