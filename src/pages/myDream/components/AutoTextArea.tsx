import { useEffect, useRef, useState } from 'react';
import OutLinkIcon from '@assets/icons/OutLink.svg?raw';
import TrashIcon from '@assets/icons/delete-trash.svg?raw';

interface Props {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const youtubeRegex =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;

export default function AutoTextArea({
  value,
  onChange,
  maxLength = 5000,
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerText !== value) {
      editorRef.current.innerText = value;
    }
  }, [value]);

  const handleInput = () => {
    if (!editorRef.current) return;
    const txt = editorRef.current.innerText;
    if (txt.length <= maxLength) onChange(txt);
    const m = txt.match(youtubeRegex);
    setVideoId(m ? m[1] : null);
  };

  const removeVideo = () => {
    if (!editorRef.current) return;
    setVideoId(null);

    editorRef.current
      .querySelectorAll('div[data-youtube-wrapper]')
      .forEach((el) => el.remove());
    onChange(editorRef.current.innerText.trim());
  };

  useEffect(() => {
    if (!editorRef.current || !videoId) return;

    if (editorRef.current.querySelector(`iframe[src*="${videoId}"]`)) return;

    const wrapper = document.createElement('div');
    wrapper.dataset.youtubeWrapper = 'true';
    wrapper.className = 'relative my-4';

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = '100%';
    iframe.height = '315';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.className = 'rounded-lg';
    wrapper.appendChild(iframe);

    const overlay = document.createElement('div');
    overlay.className = 'absolute top-2 right-2 flex gap-2  ';

    const openBtn = document.createElement('button');
    openBtn.type = 'button';
    openBtn.innerHTML = `${OutLinkIcon}<span class="ml-1">브라우저에서 열기</span>`;
    openBtn.className =
      'flex items-center gap-1 bg-white px-4 py-2 rounded-[10px] font-B03-SB text-gray-500 hover:bg-gray-200';
    openBtn.onclick = () =>
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    overlay.appendChild(openBtn);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.innerHTML = `${TrashIcon}<span class="ml-1">삭제</span>`;
    delBtn.className =
      'flex items-center gap-1 bg-white px-4 py-2 rounded-[10px] font-B03-SB text-gray-500 hover:bg-gray-200';
    delBtn.onclick = removeVideo;
    overlay.appendChild(delBtn);
    wrapper.appendChild(overlay);

    const spacer = document.createElement('div');
    spacer.innerHTML = '<br/>';
    wrapper.appendChild(spacer);

    editorRef.current.appendChild(wrapper);

    const sel = window.getSelection();
    const rng = document.createRange();
    rng.selectNodeContents(editorRef.current);
    rng.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(rng);
  }, [videoId]);

  return (
    <div className="w-full">
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="min-h-[48px] w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        suppressContentEditableWarning
        style={{ whiteSpace: 'pre-wrap', overflowY: 'auto' }}
        data-placeholder="자유롭게 메모를 입력하세요"
      />
    </div>
  );
}
