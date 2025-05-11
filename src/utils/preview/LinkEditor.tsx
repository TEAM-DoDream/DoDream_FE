import { useRef, useState } from 'react';
import { LinkPreview } from './LinkPreview';

const urlRegex = /(https?:\/\/[^\sㄱ-ㅎㅏ-ㅣ가-힣]+)/g;

export default function LinkEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInput = () => {
    const content = editorRef.current?.innerText || '';
    const match = content.match(urlRegex);
    if (match && match[0] !== previewUrl) {
      setPreviewUrl(match[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[60px] w-full max-w-[300px] rounded-sm border border-gray-300 p-2 text-xs focus:outline-none"
        placeholder="링크를 입력해보세요"
        suppressContentEditableWarning
      />

      {previewUrl && <LinkPreview url={previewUrl} />}
    </div>
  );
}
