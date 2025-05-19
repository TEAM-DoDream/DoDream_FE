import { useState } from 'react';
import LinkEditor from '@utils/preview/LinkEditor.tsx';
import CautionIcon from '@assets/icons/caution.svg?react';
import AutoTextArea from '@pages/myTodo/components/AutoTextArea.tsx';

const MAX_LENGTH = 5000;

const MyEditor = () => {
  const [value, setValue] = useState('');

  return (
    <div className="flex h-[725px] w-[602px] flex-col rounded-2xl border border-gray-200 bg-white p-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">메모하기</h2>
          <div className="mt-2 text-right text-sm text-gray-400">
            {value.length}/{MAX_LENGTH}
          </div>
        </div>
        <p className="mb-4 mt-1 flex items-center text-sm text-gray-400">
          <CautionIcon className="mr-1 h-4 w-4" />
          하나의 메모당, 하나의 링크만 붙일 수 있어요
        </p>
      </div>

      <AutoTextArea value={value} onChange={setValue} maxLength={MAX_LENGTH} />

      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-900">링크 미리보기</h2>
        <LinkEditor />
      </div>
    </div>
  );
};

export default MyEditor;
