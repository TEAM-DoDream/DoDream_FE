import { useState, useEffect } from 'react';
import { useAddMemoMutation } from '@hook/mydream/useAddMemoMutation';
import { useUpdateMemoMutation } from '@hook/mydream/useUpdateMemoMutation';
import { useNavigate } from 'react-router-dom';
import MyEditor from './MyEditor';
import ImgUpload from './ImgUpload';

interface TodoDetailType {
  todoId: number;
  title: string;
  isPublic: boolean;
  memoText: string;
  images: { imageUrl: string }[];
}

interface ContainerProps {
  todoTitle: string;
  isPublic: boolean;
  todoGroupId?: number;
  todoId?: number;
  isEdit?: boolean;
  todoDetail?: TodoDetailType | null;
  memoDetail?: TodoDetailType | null;
  isMemoView?: boolean;
}

const Container = ({
  todoTitle,
  isPublic,
  todoGroupId,
  todoId,
  isEdit = false,
  todoDetail,
  memoDetail,
  isMemoView = false,
}: ContainerProps) => {
  const navigate = useNavigate();
  const [memoText, setMemoText] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(todoTitle);
  const [isTodoTitleEmpty, setIsTodoTitleEmpty] = useState(false);
  const { mutate: addMemo } = useAddMemoMutation();
  const { mutate: updateMemo } = useUpdateMemoMutation();

  useEffect(() => {
    setIsTodoTitleEmpty(!title.trim());
  }, [title]);

  useEffect(() => {
    if (!isEdit && memoDetail) {
      setMemoText(memoDetail.memoText || '');
      setTitle(memoDetail.title || '');
    }
    else if (isEdit && todoDetail) {
      setMemoText(todoDetail.memoText || '');
      setTitle(todoDetail.title || '');
    }
  }, [isEdit, memoDetail, todoDetail]);

  useEffect(() => {
    setTitle(todoTitle);
  }, [todoTitle]);

  const handleMemoTextChange = (text: string) => {
    setMemoText(text);
  };

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
  };

  const handleSaveMemo = () => {
    if (!todoTitle.trim()) {
      alert('할일 제목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    if (isEdit && todoId) {
      updateMemo(
        {
          todoId,
          todoTitle,
          isPublic,
          memoText: memoText || undefined,
          images: images.length > 0 ? images : undefined,
        },
        {
          onSuccess: () => {
            alert('메모가 업데이트되었습니다.');
            navigate('/mytodo');
          },
          onError: (error) => {
            console.error('메모 업데이트 중 오류 발생:', error);
            alert('메모 업데이트에 실패했습니다.');
            setIsSubmitting(false);
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    } else {
      if (!todoGroupId) {
        alert('todoGroupId가 없습니다.');
        setIsSubmitting(false);
        return;
      }

      addMemo(
        {
          todoGroupId,
          todoTitle,
          isPublic,
          memoText: memoText || undefined,
          images: images.length > 0 ? images : undefined,
        },
        {
          onSuccess: () => {
            alert('메모가 저장되었습니다.');
            navigate('/mytodo');
          },
          onError: (error) => {
            console.error('메모 저장 중 오류 발생:', error);
            alert('메모 저장에 실패했습니다.');
            setIsSubmitting(false);
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    }
  };

  const isReadOnly = isMemoView && !isEdit;

  return (
    <div className="container flex w-[1010px] flex-col items-center gap-5 rounded-[30px] bg-gray-100 p-[20px]">
      <div className="flex w-full items-stretch justify-center gap-[20px]">
        <div className="flex-1">
          <MyEditor
            value={memoText}
            onChange={handleMemoTextChange}
            readOnly={isReadOnly}
          />
        </div>
        <div className="flex-1">
          <ImgUpload onImagesChange={handleImagesChange} />
          {isEdit &&
            todoDetail?.images &&
            todoDetail.images.length > 0 && (
              <div className="mt-4 rounded-lg bg-white p-3">
                <h3 className="mb-2 text-gray-900 font-B01-SB">기존 이미지</h3>
                <div className="flex flex-wrap gap-2">
                  {todoDetail.images.map((img, index) => (
                    <div
                      key={index}
                      className="relative h-16 w-16 overflow-hidden rounded-md"
                    >
                      <img
                        src={img.imageUrl}
                        alt={`기존 이미지 ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  새 이미지를 업로드하면 기존 이미지는 대체됩니다.
                </p>
              </div>
            )}
        </div>
      </div>

      <div className="flex w-full items-stretch justify-center gap-[20px]">
        <button
          className={`flex h-12 w-full items-center justify-center rounded-[16px] ${
            isSubmitting || isTodoTitleEmpty || isReadOnly
              ? 'bg-purple-300'
              : 'bg-purple-500 hover:bg-purple-600'
          } py-[14px] text-white font-T05-SB`}
          onClick={handleSaveMemo}
          disabled={isSubmitting || isTodoTitleEmpty || isReadOnly}
        >
          {isSubmitting
            ? '저장 중...'
            : isEdit
              ? '메모 수정하기'
              : isReadOnly
                ? '메모 보기'
                : '메모 저장하기'}
        </button>
      </div>
    </div>
  );
};

export default Container;
