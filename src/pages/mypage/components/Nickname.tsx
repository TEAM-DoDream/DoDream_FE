import { useState, useEffect } from 'react';
import Edit from '@assets/icons/edit-nickname.svg?react';
import { useEditNicknameMutation } from '@hook/mypage/useEditNicknameMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@store/useUserStore';
import { useDuplicateNicknameMutation } from '@hook/useSignup';

interface Props {
  nickname: string;
  onMessageVisibleChange?: (visible: boolean) => void;
}

const Nickname = ({ nickname, onMessageVisibleChange }: Props) => {
  const [tempNickname, setTempNickname] = useState(nickname);
  const [isEditing, setIsEditing] = useState(false);
  const [isDuplicateCheckNeeded, setIsDuplicateCheckNeeded] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const { mutate: editNickname } = useEditNicknameMutation();
  const { mutate: checkNickname } = useDuplicateNicknameMutation();
  const queryClient = useQueryClient();
  const setNickname = useUserStore((state) => state.setNickname);

  useEffect(() => {
    setTempNickname(nickname);
  }, [nickname]);

  useEffect(() => {
    const changed = tempNickname !== nickname;
    setIsDuplicateCheckNeeded(changed);
    setMessage('');
    setMessageType('');
  }, [tempNickname, nickname]);

  useEffect(() => {
    onMessageVisibleChange?.(!!message);
  }, [message, onMessageVisibleChange]);

  const handleDuplicateCheck = () => {
    if (!tempNickname.trim()) {
      setMessage('닉네임을 입력해주세요.');
      setMessageType('error');
      return;
    }

    checkNickname(tempNickname, {
      onSuccess: (res) => {
        if (res.data.duplicated) {
          setMessage('이미 있는 닉네임이에요');
          setMessageType('error');
        } else {
          setMessage('사용할 수 있는 닉네임이에요');
          setMessageType('success');
          setIsDuplicateCheckNeeded(false);
        }
      },
      onError: () => {
        setMessage('이미 사용 중인 닉네임이에요');
        setMessageType('error');
      },
    });
  };

  const handleSave = () => {
    if (!tempNickname.trim()) {
      setMessage('닉네임을 입력해주세요.');
      setMessageType('error');
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
      <div className="relative w-fit">
        <div className="flex items-center space-x-3">
          <input
            className="flex h-11 w-[200px] items-center rounded-[10px] border border-purple-500 bg-gray-50 px-5 py-[11px] text-gray-900 font-B01-M focus:border-purple-500"
            value={tempNickname}
            placeholder="닉네임을 입력해주세요"
            onChange={(e) => setTempNickname(e.target.value)}
          />
          <button
            className="flex items-center rounded-[10px] border border-purple-500 px-[10px] py-2 text-purple-500 font-B03-M"
            onClick={() => setIsEditing(false)}
          >
            취소
          </button>
          {isDuplicateCheckNeeded ? (
            <button
              className="ml-1 flex items-center rounded-[10px] bg-purple-500 px-[10px] py-2 text-white font-B03-M"
              onClick={handleDuplicateCheck}
            >
              중복확인
            </button>
          ) : (
            <button
              className="ml-1 flex items-center rounded-[10px] bg-purple-500 px-[10px] py-2 text-white font-B03-M"
              onClick={handleSave}
            >
              저장
            </button>
          )}
        </div>

        {message && (
          <p
            className={`absolute left-0 top-full mt-5 font-B02-M ${
              messageType === 'success' ? 'text-success' : 'text-warning'
            }`}
          >
            {message}
          </p>
        )}
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
