import Cancel from '@assets/icons/bigcancel.svg?react';
import Button from '@common/Button';
import Divider from '@common/Divider';
import { Input } from '@common/Input';
import { useState } from 'react';

interface PasswordChangeModalProps {
  onClose: () => void;
}

const PasswordChangeModal = ({ onClose }: PasswordChangeModalProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#121212]/[0.5]">
      <div className="flex w-[511px] flex-col items-start rounded-[30px] bg-white p-[30px]">
        <div className="flex w-full justify-between">
          <div className="text-black font-T03-B">비밀번호 변경 </div>
          <Cancel className="cursor-pointer text-gray-500" onClick={onClose} />
        </div>

        <Divider className="mt-4" />

        <div className="flex w-full flex-col items-end gap-10">
          <div className="mt-10 flex w-full flex-col gap-6">
            <Input
              inputtitle="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              isPassword
              className="h-[68px] w-full font-B02-M"
              undertext={'8~16자/영문 대소문자,숫자,특수문자 조합'}
              minLength={8}
              maxLength={16}
            />

            <Input
              inputtitle="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              isPassword
              className="h-[68px] w-full font-B02-M"
              minLength={8}
              maxLength={16}
            />
          </div>

          <Button
            text="완료"
            color="primary"
            className="flex items-center justify-end rounded-[14px] px-[30px] py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
