import MyEditor from '@pages/myDream/components/MyEditor.tsx';
import ImgUpload from '@pages/myDream/components/ImgUpload.tsx';

const Container = () => {
  return (
    <div className="container flex w-[1010px] flex-col items-center gap-5 rounded-[30px] bg-gray-100 p-[20px]">
      <div className="flex w-full items-center justify-center gap-[20px]">
        <MyEditor />
        <ImgUpload />
      </div>

      <div className="flex h-12 w-[960px] items-center justify-center">
        <button className="flex h-12 w-full items-center justify-center rounded-[16px] bg-purple-500 py-[14px] text-white font-T05-SB">
          메모 저장하기
        </button>
      </div>
    </div>
  );
};

export default Container;
