import { useState } from 'react';
import ReadyContent from './TabContent/ReadyContent';

type Tab = {
  key: 'ready' | 'start' | 'challenge';
  label: string;
  content: React.ReactNode;
};

const tabs: Tab[] = [
  {
    key: 'ready',
    label: '씨앗 단계',
    content: <ReadyContent />,
  },
  { key: 'start', label: '새싹 단계', content: <div>새싹 단계 내용</div> },
  {
    key: 'challenge',
    label: '꿈나무 단계',
    content: <div>꿈나무 단계 내용</div>,
  },
];

const DetailTab = () => {
  const [active, setActive] = useState<Tab['key']>('ready');

  return (
    <div className="mt-[34px] w-full">
      <div
        role="tablist"
        className="flex items-end border-b-[1.4px] border-gray-300"
      >
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              onClick={() => setActive(t.key)}
              className={[
                'relative px-4 py-[10px]',
                isActive
                  ? 'text-purple-500 font-B02-SB'
                  : 'text-gray-400 font-B02-M',
              ].join(' ')}
            >
              {t.label}

              <span
                aria-hidden
                className={[
                  'absolute -bottom-[1px] left-0 right-0 h-[3px]',
                  isActive ? 'bg-purple-500' : 'bg-transparent',
                ].join(' ')}
              />
            </button>
          );
        })}
      </div>

      <div className="pt-6">{tabs.find((t) => t.key === active)?.content}</div>
    </div>
  );
};

export default DetailTab;
