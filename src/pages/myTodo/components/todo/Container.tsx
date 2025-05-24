import { useState } from 'react';
import MyEditor from '@pages/myTodo/components/todo/MyEditor.tsx';
import ImgUpload from '@pages/myTodo/components/todo/ImgUpload.tsx';
import { useAddMemoMutation } from '@hook/mydream/useAddMemoMutation';
import { useNavigate } from 'react-router-dom';

interface ContainerProps {
  todoTitle: string;
  isPublic: boolean;
  todoGroupId?: number;
}

const Container = ({ todoTitle, isPublic, todoGroupId }: ContainerProps) => {
  const navigate = useNavigate();
  const [memoText, setMemoText] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: addMemo } = useAddMemoMutation();

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

    if (!todoGroupId) {
      alert('todoGroupId가 없습니다.');
      return;
    }

    setIsSubmitting(true);
    
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
  };

  return (
    <div className="container flex w-[1010px] flex-col items-center gap-5 rounded-[30px] bg-gray-100 p-[20px]">
      <div className="flex w-full items-stretch justify-center gap-[20px]">
        <div className="flex-1">
          <MyEditor value={memoText} onChange={handleMemoTextChange} />
        </div>
        <div className="flex-1">
          <ImgUpload onImagesChange={handleImagesChange} />
        </div>
      </div>

      <div className="flex w-full items-stretch justify-center gap-[20px]">
        <button
          className={`flex h-12 w-full items-center justify-center rounded-[16px] ${
            isSubmitting ? 'bg-purple-300' : 'bg-purple-500 hover:bg-purple-600'
          } py-[14px] text-white font-T05-SB`}
          onClick={handleSaveMemo}
          disabled={isSubmitting}
        >
          {isSubmitting ? '저장 중...' : '메모 저장하기'}
        </button>
      </div>
    </div>
  );
};

export default Container;
