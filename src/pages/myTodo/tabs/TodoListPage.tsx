import Container from '@pages/myDream/components/Container.tsx';
import BackIcon from '@assets/icons/back.svg?react';
import CautionIcon from '@assets/icons/caution.svg?react';
import ToggleButton from '@common/Toggle.tsx';

const TodoListPage = () => {
  return (
    <div className="mx-auto bg-gray-50 px-5 py-4">
      <div className="mb-4 flex max-w-[1010px] flex-col gap-2">
        <div className="flex items-center gap-2 self-start">
          <BackIcon />
          <input
            placeholder="할일을 입력해주세요"
            className="w-[974px] rounded-[10px] border border-gray-200 bg-white px-[20px] py-[10px] text-gray-300 font-T05-SB"
          />
        </div>

        <div className="flex content-center items-center gap-1 self-end text-gray-500">
          <CautionIcon className="h-6 w-6" />
          <span className={'text-gray-500 font-B02-M'}>공개</span>
          <ToggleButton />
        </div>
      </div>

      <Container />
    </div>
  );
};

export default TodoListPage;
