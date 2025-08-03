import { useLocation } from 'react-router-dom';
import FloatingButton from '@common/FloatingButton';
import Header from '@common/Header';
import { Outlet } from 'react-router-dom';

const ShowLayout = () => {
  const location = useLocation();

  const excludedRoutes = [
    '/jobselect',
    '/onboard',
    '/jobrecommend',
    '/mytodo/list',
    '/mytodo/scrap',
    '/mypage',
    '/mytodo/scrap/edu',
    '/mytodo/scrap/job',
  ];

  const shouldShowFloatingButton = !excludedRoutes.includes(location.pathname);

  return (
    <div className="grid min-h-screen w-full grid-rows-[80px_1fr] bg-white">
      <div>
        <Header type="show" />
      </div>
      <main className="w-full">
        <Outlet />
        {shouldShowFloatingButton && <FloatingButton />}
      </main>
    </div>
  );
};

export default ShowLayout;
