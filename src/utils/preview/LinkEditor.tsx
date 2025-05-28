import { useRef, useState } from 'react';
import { LinkPreview } from './LinkPreview';

const urlRegex = /(https?:\/\/[^\sㄱ-ㅎㅏ-ㅣ가-힣]+)/g;

interface LinkEditorProps {
  readOnly?: boolean;
}

export default function LinkEditor({ readOnly = false }: LinkEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInput = () => {
    if (readOnly) return;
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
        contentEditable={!readOnly}
        onInput={handleInput}
        className="min-h-[40px] w-full max-w-[562px] rounded-[10px] border border-gray-300 p-2 text-xs focus:outline-none"
        placeholder="링크를 입력해보세요"
        suppressContentEditableWarning
      />

      {previewUrl && <LinkPreview url={previewUrl} />}
    </div>
  );
}
