import { useState } from 'react';
import TodoList from './TodoList';
import SidebarLayout from '@outlet/SidebarLayout';

const Mydream = () => {
  const [selected, setSelected] = useState<'todo' | 'scrap'>('todo');

  return (
    <SidebarLayout selected={selected} setSelected={setSelected}>
      {selected === 'todo' && <TodoList />}
    </SidebarLayout>
  );
};

export default Mydream;
