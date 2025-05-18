import MyEditor from '@pages/myDream/components/MyEditor.tsx';
import ImgUpload from '@pages/myDream/components/ImgUpload.tsx';

const Container = () => {
  return (
    <div
      className={
        'container flex h-[785px] w-[1010px] items-center justify-center gap-[20px] rounded-[30px] bg-gray-100'
      }
    >
      <MyEditor />
      <ImgUpload />
    </div>
  );
};

export default Container;
