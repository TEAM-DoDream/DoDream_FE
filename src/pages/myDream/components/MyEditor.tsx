import { useState } from 'react';
import LinkEditor from '@utils/preview/LinkEditor.tsx';
import CautionIcon from '@assets/icons/caution.svg?react';

const MAX_LENGTH = 5000;

const MyEditor = () => {
  const [value, setValue] = useState('');

  return (
    <div className="flex h-[725px] w-[582px] flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6">
      <div>
        <div className={'flex items-center justify-between'}>
          <h2 className="text-lg font-bold text-gray-900">메모하기</h2>

          <div className="mt-2 text-right text-sm text-gray-400">
            {value.length}/{MAX_LENGTH}
          </div>
        </div>
        <p className="mb-4 mt-1 flex items-center text-sm text-gray-400">
          <CautionIcon />
          하나의 메모당, 하나의 링크만 붙일 수 있어요
        </p>
      </div>

      <textarea
        className="h-[520px] w-full resize-none overflow-y-auto rounded-lg border border-gray-300 p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        maxLength={MAX_LENGTH}
        placeholder="자유롭게 메모를 입력해주세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div>
        <h2 className="text-lg font-bold text-gray-900">링크 미리보기</h2>
        <LinkEditor />
      </div>
    </div>
  );
};

export default MyEditor;
