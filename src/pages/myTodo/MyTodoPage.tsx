import { Link, Outlet, useLocation } from 'react-router-dom';

const MyTodoPage = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex">
      <aside className="fixed left-0 h-screen w-[200px] bg-white">
        <nav className="gap-[10px] py-10">
          <ul className="flex flex-col gap-[10px] px-[10px] py-2">
            <li>
              <Link
                to="list"
                className={`flex w-full items-center rounded-2xl px-[18px] py-[14px] font-B01-B ${
                  pathname.includes('list')
                    ? 'bg-purple-100 text-purple-500'
                    : 'text-gray-400 hover:text-purple-500'
                }`}
              >
                할일 목록
              </Link>
            </li>
            <li>
              <Link
                to="scrap"
                className={`flex w-full items-center rounded-2xl px-[18px] py-[14px] font-B01-B ${
                  pathname.includes('scrap')
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

      <main className="ml-[200px] flex-1 bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MyTodoPage;
