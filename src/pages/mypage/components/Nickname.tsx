import { useState, useEffect } from 'react';
import Edit from '@assets/icons/edit-nickname.svg?react';
import { useEditNicknameMutation } from '@hook/mypage/useEditNicknameMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@store/useUserStore';

interface Props {
  nickname: string;
}

const Nickname = ({ nickname }: Props) => {
  const [tempNickname, setTempNickname] = useState(nickname);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: editNickname } = useEditNicknameMutation();
  const queryClient = useQueryClient();
  const setNickname = useUserStore((state) => state.setNickname);

  useEffect(() => {
    setTempNickname(nickname);
  }, [nickname]);

  const handleSave = () => {
    if (!tempNickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    editNickname(
      { newNickName: tempNickname },
      {
        onSuccess: () => {
          setNickname(tempNickname);
          setIsEditing(false);
          queryClient.invalidateQueries({ queryKey: ['Mypage'] });
        },
      }
    );
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-3">
        <input
          className="flex h-11 w-[166px] items-center rounded-[10px] border border-purple-500 bg-gray-100 px-5 py-[11px] text-gray-900 font-B01-M"
          value={tempNickname}
          onChange={(e) => setTempNickname(e.target.value)}
        />
        <button
          className="flex items-center rounded-[10px] border border-gray-900 px-[10px] py-2 text-gray-900 font-B03-M"
          onClick={() => setIsEditing(false)}
        >
          취소
        </button>
        <button
          className="ml-1 flex items-center rounded-[10px] bg-gray-900 px-[10px] py-2 text-white font-B03-M"
          onClick={handleSave}
        >
          저장
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <span className="text-gray-900 font-T04-B">{nickname} 님</span>
      <div
        className="flex cursor-pointer items-center rounded-[6px] bg-white p-[6px] shadow-shadow2"
        onClick={() => setIsEditing(true)}
      >
        <Edit />
      </div>
    </div>
  );
};

export default Nickname;
