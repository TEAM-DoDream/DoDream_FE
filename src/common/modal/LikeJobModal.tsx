import Cancel from '@assets/icons/bigcancel.svg?react';
import Divider from '@common/Divider';
import Warning from '@assets/icons/warning.svg?react';
import { useState } from 'react';
import SmallCancel from '@assets/icons/purplecancel.svg?react';
import Button from '@common/Button';

interface LikeJonModalProps {
  onClose: () => void;
}

const LikeJobModal = ({ onClose }: LikeJonModalProps) => {
  const [tags, setTags] = useState([
    '요양보호사',
    '요양보호사',
    '요양보호사',
    '요양보호사',
    '요양보호사',
    '요양보호사',
  ]);

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#121212]/[0.5]">
      <div className="flex w-[420px] flex-col items-start rounded-[30px] bg-white px-[30px] py-10">
        <div className="flex w-full justify-between">
          <div className="text-black font-T03-B">관심직업 </div>
          <Cancel className="cursor-pointer text-gray-500" onClick={onClose} />
        </div>

        <Divider className="mt-[30px]" />

        <div className="mt-3 flex flex-row gap-[10px]">
          <Warning className="h-5 w-5" />
          <div className="text-gray-500 font-B02-M">
            {' '}
            담은 직업을 삭제하시면 [나의 할 일]에 포함되어 있는 할 일 목록들이
            모두 삭제됩니다{' '}
          </div>
        </div>

        <div className="flex w-full flex-col items-end gap-10">
          <div className="mt-6 grid w-full grid-cols-3 gap-x-4 gap-y-4">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-between rounded-full border border-purple-500 bg-purple-100 px-3 py-2 text-purple-500 font-B03-M hover:bg-purple-150"
              >
                <span>{tag}</span>
                <button onClick={() => removeTag(index)}>
                  <SmallCancel />
                </button>
              </div>
            ))}
          </div>

          <Button
            text="저장"
            color="primary"
            className="flex items-center justify-end rounded-[14px] px-[30px] py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default LikeJobModal;
