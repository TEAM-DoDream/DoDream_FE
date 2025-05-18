import { useEffect, useRef } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const AutoTextArea = ({ value, onChange, maxLength = 5000 }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="자유롭게 메모를 입력해주세요"
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      rows={2}
    />
  );
};

export default AutoTextArea;
