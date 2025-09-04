import { useState } from 'react';
import {
  useJobTodoCategory,
  JobTodoCategoryProps,
} from '@hook/jobinfo/useJobTodoCategory';
import ReadyContent from './TabContent/ReadyContent';
import SproutContent from './TabContent/SproutContent';
import TreeContents from './TabContent/TreeContents';

type TabKey = 'ready' | 'start' | 'challenge';

type Tab = {
  key: TabKey;
  label: string;
};

const tabs: Tab[] = [
  { key: 'ready', label: '씨앗 단계' },
  { key: 'start', label: '새싹 단계' },
  { key: 'challenge', label: '꿈나무 단계' },
];

const category: Record<TabKey, string> = {
  ready: 'SEED',
  start: 'SPROUT',
  challenge: 'TREE',
};

const DetailTab = ({ jobId }: { jobId: number }) => {
  const [active, setActive] = useState<TabKey>('ready');

  const { data, isLoading, isError, error } = useJobTodoCategory(
    Number(jobId),
    category[active]
  );

  const renderContent = () => {
    if (!jobId) return;
    if (isLoading) return <p className="text-gray-500">불러오는 중…</p>;
    if (isError)
      return <p className="text-red-500">{(error as Error)?.message}</p>;

    switch (active) {
      case 'ready':
        return (
          <ReadyContent
            jobId={Number(jobId)}
            data={data as JobTodoCategoryProps}
          />
        );
      case 'start':
        return (
          <SproutContent
            jobId={Number(jobId)}
            data={data as JobTodoCategoryProps}
          />
        );
      case 'challenge':
        return (
          <TreeContents
            jobId={Number(jobId)}
            data={data as JobTodoCategoryProps}
          />
        );
      default:
        return null;
    }
  };

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

      <div className="pt-6">{renderContent()}</div>
    </div>
  );
};

export default DetailTab;
