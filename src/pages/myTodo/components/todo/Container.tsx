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
  link?: string;
  images: { imageId: number; imageUrl: string }[];
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
  const [link, setLink] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(todoTitle);
  const [isTodoTitleEmpty, setIsTodoTitleEmpty] = useState(false);
  const { mutate: addMemo } = useAddMemoMutation();
  const { mutate: updateMemo } = useUpdateMemoMutation();
  const [existingImages, setExistingImages] = useState<
    { imageId: number; imageUrl: string }[]
  >([]);
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

  const isReadOnly = isMemoView && !isEdit;

  useEffect(() => {
    setIsTodoTitleEmpty(!title.trim());
  }, [title]);

  useEffect(() => {
    setDeletedImageIds([]);

    if (!isEdit && memoDetail) {
      setMemoText(memoDetail.memoText || '');
      setLink(memoDetail.link || '');
      setTitle(memoDetail.title || '');
      if (memoDetail.images) {
        setExistingImages(memoDetail.images);
      }
    } else if (isEdit && todoDetail) {
      setMemoText(todoDetail.memoText || '');
      setLink(todoDetail.link || '');
      setTitle(todoDetail.title || '');
      if (todoDetail.images) {
        setExistingImages(todoDetail.images);
      }
    }
  }, [isEdit, memoDetail, todoDetail]);

  useEffect(() => {
    setTitle(todoTitle);
  }, [todoTitle]);

  const handleMemoTextChange = (text: string) => {
    setMemoText(text);
  };

  // const handleLinkChange = (url: string) => {
  //   console.log('링크 변경:', url);
  //   setLink(url);
  // };

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
  };

  const handleDeleteExistingImage = (imageId: number) => {
    // 화면에서 이미지 제거
    setExistingImages((prev) => prev.filter((img) => img.imageId !== imageId));

    // 삭제할 이미지 ID 추적
    setDeletedImageIds((prev) => [...prev, imageId]);
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
          link: link || undefined,
          images: images.length > 0 ? images : undefined,
          deleteImageIds:
            deletedImageIds.length > 0 ? deletedImageIds : undefined,
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
          link: link || undefined,
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
          <ImgUpload
            onImagesChange={handleImagesChange}
            readOnly={isReadOnly}
            existingImages={existingImages}
            onDeleteExistingImage={
              !isReadOnly ? handleDeleteExistingImage : undefined
            }
          />
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
