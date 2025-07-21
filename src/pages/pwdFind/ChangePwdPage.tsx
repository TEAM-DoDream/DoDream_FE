import { useState } from 'react';
import { Input } from '@common/Input.tsx';
import Button from '@common/Button.tsx';

const ChangePwdPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-[428px] flex-col items-start justify-center md:mt-16 lg:mt-24">
        <div className="mb-2 text-lg text-gray-800 font-T01-B">
          비밀번호 재설정
        </div>

        <div className="mb-[50px] text-gray-800 font-B02-M">
          8~16자 영문 대소문자, 숫자, 특수문자를 포함해야합니다.
        </div>

        <div className="mb-1 text-gray-600 font-B01-M">비밀번호</div>
        <Input
          value={password}
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
          className="mb-1 h-14 w-full font-B02-M"
          isPassword
        />

        <div className="mb-4 text-gray-500 font-B03-M">
          8~16자/영문 대소문자, 숫자, 특수문자 조합
        </div>

        <div className="mb-1 text-gray-600 font-B01-M">비밀번호 확인</div>
        <Input
          value={confirmPwd}
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setConfirmPwd(e.target.value)}
          className="mb-1 h-14 w-full font-B02-M"
          isPassword
        />

        <div className="mt-[50px] h-[52px] w-full font-T05-SB">
          <Button
            text="비밀번호 변경하기"
            className="bg-primary-500 h-full w-full p-[11px] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePwdPage;
