import { useRef, useState, useEffect } from 'react';
import AddImgIcon from '@assets/icons/AddImg.svg?react';
import TrashIcon from '@assets/icons/delete-trash.svg?react';

interface ImageType {
  imageId: number;
  imageUrl: string;
}

interface ImgUploadProps {
  onImagesChange: (images: File[]) => void;
  readOnly?: boolean;
  existingImages?: ImageType[];
}

const ImgUpload = ({
  onImagesChange,
  readOnly = false,
  existingImages = [],
}: ImgUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [fileImages, setFileImages] = useState<File[]>([]);

  useEffect(() => {
    onImagesChange(fileImages);
  }, [fileImages, onImagesChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    setFileImages((prev) => [...prev, ...newFiles]);

    const newPreviewImages: string[] = [];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          newPreviewImages.push(reader.result as string);
          if (newPreviewImages.length === newFiles.length) {
            setPreviewImages((prev) => [...prev, ...newPreviewImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (index: number) => {
    if (readOnly) return;
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFileImages((prev) => prev.filter((_, i) => i !== index));
  };

  const hasImages = previewImages.length > 0 || existingImages.length > 0;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto rounded-2xl bg-white p-[20px]">
      <div className="flex w-full items-center justify-between">
        <h2 className="font-T05-SB">이미지</h2>
        {!readOnly && (
          <div
            className="flex h-[42px] w-[116px] cursor-pointer items-center justify-center rounded-[12px] bg-purple-100 text-purple-500 font-B03-SB"
            onClick={() => inputRef.current?.click()}
          >
            <AddImgIcon stroke={'#8173FF'} />
            <button className="ml-1">이미지 첨부</button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={readOnly}
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-3">
        {!hasImages ? (
          <span className="text-gray-500 font-B02-M">
            아직 첨부된 이미지가 없어요
          </span>
        ) : (
          <div className="flex flex-col gap-3">
            {existingImages.map((img, idx) => (
              <div key={`existing-${idx}`} className="relative w-full">
                <img
                  src={img.imageUrl}
                  alt={`이미지 ${idx + 1}`}
                  className="w-full rounded-lg border border-gray-200"
                />
              </div>
            ))}

            {previewImages.map((src, idx) => (
              <div key={`new-${idx}`} className="relative w-full">
                <img
                  src={src}
                  alt={`이미지 ${existingImages.length + idx + 1}`}
                  className="w-full rounded-lg border border-gray-200"
                />
                {!readOnly && (
                  <button
                    onClick={() => handleDelete(idx)}
                    className="absolute right-2 top-2 flex items-center gap-1 rounded-[10px] bg-white px-3 py-1 text-gray-500 shadow font-B03-SB hover:bg-gray-200"
                  >
                    <TrashIcon className="h-4 w-4" />
                    삭제
                  </button>
                )}
              </div>
            ))}

            {!readOnly &&
              existingImages.length > 0 &&
              previewImages.length > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  새 이미지를 업로드하면 기존 이미지는 대체됩니다.
                </p>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgUpload;
