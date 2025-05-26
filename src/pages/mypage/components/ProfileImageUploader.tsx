import { useEffect, useRef, useState } from 'react';
import BaseImage from '@assets/images/profile.png';
import Camera from '@assets/icons/camera.svg?react';
import Trash from '@assets/icons/profile_delete.svg?react';
import { useUploadImageMutation } from '@hook/mypage/useUploadImage';

interface ProfileImageUploaderProps {
  imageUrl?: string;
}

const ProfileImageUploader = ({ imageUrl }: ProfileImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadImageMutation();

  const [imageSrc, setImageSrc] = useState(imageUrl || BaseImage);
  const isDefaultImage = imageSrc === BaseImage;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setImageSrc(localPreview);

    uploadMutation.mutate(file, {
      onSuccess: (response) => {
        const uploadedUrl = response.data?.data;
        if (uploadedUrl) {
          console.log(uploadedUrl);
          setImageSrc(uploadedUrl);
        } else {
          alert('업로드는 되었지만 이미지 URL을 받지 못했습니다.');
        }
      },
    });
  };

  useEffect(() => {
    if (imageUrl) setImageSrc(imageUrl);
  }, [imageUrl]);

  const handleResetImage = () => {
    setImageSrc(BaseImage);
  };

  return (
    <div className="relative h-[65px] w-[65px]">
      <img
        src={imageSrc || BaseImage}
        alt="기본이미지"
        className="h-full w-full rounded-full object-cover"
      />
      {isDefaultImage ? (
        <>
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-[7px] bg-white p-[5.5px] shadow-shadow2"
          >
            <Camera className="h-[11px] w-[11px]" />
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
            hidden
          />
        </>
      ) : (
        <button
          type="button"
          onClick={handleResetImage}
          className="absolute bottom-0 right-0 flex h-[22px] w-[22px] items-center justify-center rounded-[7px] bg-white p-[5.5px] shadow-shadow2"
        >
          <Trash className="h-[10px] w-[10px]" />
        </button>
      )}
    </div>
  );
};

export default ProfileImageUploader;
