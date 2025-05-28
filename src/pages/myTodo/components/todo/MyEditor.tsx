import { useState, useEffect } from 'react';
import LinkEditor from '@utils/preview/LinkEditor.tsx';
import CautionIcon from '@assets/icons/caution.svg?react';
import AutoTextArea from '@pages/myTodo/components/todo/AutoTextArea.tsx';

const MAX_LENGTH = 5000;

interface MyEditorProps {
  value: string;
  onChange: (text: string) => void;
  readOnly?: boolean;
  link?: string;
  onLinkChange?: (url: string) => void;
}

const MyEditor = ({ value, onChange, readOnly = false, link = '', onLinkChange }: MyEditorProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  // LinkEditor에서 URL이 변경될 때 호출될 함수
  const handleLinkChange = (url: string) => {
    if (onLinkChange) {
      onLinkChange(url);
    }
  };

  return (
    <div className="flex h-full w-[602px] flex-col overflow-y-auto rounded-2xl border bg-white p-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">메모하기</h2>
          <div className="mt-2 text-right text-sm text-gray-400">
            {localValue.length}/{MAX_LENGTH}
          </div>
        </div>
        <p className="mb-4 mt-1 flex items-center text-sm text-gray-400">
          <CautionIcon className="mr-1 h-4 w-4" />
          하나의 메모당, 하나의 링크만 붙일 수 있어요
        </p>
      </div>
      <AutoTextArea
        value={localValue}
        onChange={handleChange}
        maxLength={MAX_LENGTH}
        readOnly={readOnly}
      />
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-900">링크 미리보기</h2>
        <LinkEditor readOnly={readOnly} initialUrl={link} onUrlChange={handleLinkChange} />
      </div>
    </div>
  );
};

export default MyEditor;
