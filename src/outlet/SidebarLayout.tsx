import Footer from '@common/Footer';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { pathname } = useLocation();
  const showFooter = pathname === '/mytodo/list';

  return (
    <div className="flex">
      <aside className="fixed left-0 h-screen w-[200px] bg-white">
        <nav className="py-10">
          <ul className="flex flex-col gap-2 px-4">
            <li>
              <Link
                to="/mytodo/list"
                className={`block w-full rounded-2xl px-4 py-3 text-left font-B01-B ${
                  pathname.includes('/mytodo/list') ||
                  pathname.includes('/mytodo/add')
                    ? 'bg-purple-100 text-purple-500'
                    : 'text-gray-400 hover:text-purple-500'
                }`}
              >
                할일 목록
              </Link>
            </li>
            <li>
              <Link
                to="/mytodo/scrap"
                className={`block w-full rounded-2xl px-4 py-3 text-left font-B01-B ${
                  pathname.includes('/mytodo/scrap')
                    ? 'bg-purple-100 text-purple-500'
                    : 'text-gray-400 hover:text-purple-500'
                }`}
              >
                스크랩
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="ml-[200px] flex min-h-screen w-full flex-col bg-gray-50">
        <div className="flex-1">{children}</div>
        {showFooter && <Footer />}
      </main>
    </div>
  );
};

export default SidebarLayout;
