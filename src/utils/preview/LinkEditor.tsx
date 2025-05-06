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
    <div className="space-y-4">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[100px] w-full rounded border p-3 text-sm focus:outline-none"
        placeholder="링크를 입력해보세요"
        suppressContentEditableWarning
      />

      {previewUrl && <LinkPreview url={previewUrl} />}
    </div>
  );
}
