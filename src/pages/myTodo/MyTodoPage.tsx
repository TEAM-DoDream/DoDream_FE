import { Outlet } from 'react-router-dom';
import SidebarLayout from '@outlet/SidebarLayout.tsx';

const MyTodoPage = () => {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
};

export default MyTodoPage;
