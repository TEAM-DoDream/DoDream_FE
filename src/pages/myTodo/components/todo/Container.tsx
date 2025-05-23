import MyEditor from '@pages/myTodo/components/todo/MyEditor.tsx';
import ImgUpload from '@pages/myTodo/components/todo/ImgUpload.tsx';

const Container = () => {
  return (
    <div className="container flex w-[1010px] flex-col items-center gap-5 rounded-[30px] bg-gray-100 p-[20px]">
      <div className="flex w-full items-stretch justify-center gap-[20px]">
        <div className="flex-1">
          <MyEditor />
        </div>
        <div className="flex-1">
          <ImgUpload />
        </div>
      </div>

      <div className="flex w-full items-stretch justify-center gap-[20px]">
        <button className="flex h-12 w-full items-center justify-center rounded-[16px] bg-purple-500 py-[14px] text-white font-T05-SB">
          메모 저장하기
        </button>
      </div>
    </div>
  );
};

export default Container;
