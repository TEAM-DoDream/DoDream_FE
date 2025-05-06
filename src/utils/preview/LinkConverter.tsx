import { LinkPreview } from './LinkPreview';

const urlRegex = /(https?:\/\/[^\sㄱ-ㅎㅏ-ㅣ가-힣]+)/g;

export default function LinkConverter({ text }: { text: string }) {
  const parts = text.split(urlRegex);

  return (
    <div className="space-y-4">
      {parts.map((part, i) => {
        if (urlRegex.test(part)) {
          return (
            <div key={i}>
              {/* 1) 클릭 가능한 원본 URL */}
              <a
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {part}
              </a>
              {/* 2) 그리고 미리보기 카드 */}
              <LinkPreview url={part} />
            </div>
          );
        } else {
          return <span key={i}>{part}</span>;
        }
      })}
    </div>
  );
}
