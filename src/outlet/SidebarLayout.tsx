import { ReactNode } from 'react';

interface SidebarProps {
  selected: 'todo' | 'scrap';
  setSelected: (tab: 'todo' | 'scrap') => void;
  children: ReactNode;
}

const SidebarLayout = ({ selected, setSelected, children }: SidebarProps) => {
  return (
    <div className="flex">
      <aside className="fixed left-0 h-screen w-[200px] bg-white">
        <nav className="gap-[10px] py-10">
          <ul className="flex flex-col gap-[10px] px-[10px] py-2">
            <li>
              <button
                onClick={() => setSelected('todo')}
                className={`flex w-full items-center rounded-2xl px-[18px] py-[14px] font-B01-B ${
                  selected === 'todo'
                    ? 'bg-purple-100 text-purple-500'
                    : 'text-gray-400 hover:text-purple-500'
                }`}
              >
                할일 목록
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelected('scrap')}
                className={`flex w-full items-center rounded-2xl px-[18px] py-[14px] font-B01-B ${
                  selected === 'scrap'
                    ? 'bg-purple-100 text-purple-500'
                    : 'text-gray-400 hover:text-purple-500'
                }`}
              >
                스크랩
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="ml-[200px] h-screen flex-1 bg-gray-100">{children}</main>
    </div>
  );
};

export default SidebarLayout;
