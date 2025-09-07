import { Outlet } from 'react-router-dom';

const BlankLayout = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default BlankLayout;
