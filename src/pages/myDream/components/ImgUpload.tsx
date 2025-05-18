import AddImgIcon from '@assets/icons/AddImg.svg?react';

const ImgUpload = () => {
  return (
    <div className={'h-[725px] w-[328px] rounded-2xl bg-white p-[20px]'}>
      <div className={'flex w-full items-center justify-between'}>
        <h2 className={'font-T05-SB'}>이미지</h2>
        <div
          className={
            'flex h-[42px] w-[116px] items-center justify-center rounded-[12px] bg-purple-500 text-white font-B03-SB'
          }
        >
          <AddImgIcon />
          <button>이미지 첨부</button>
        </div>
      </div>
      <div className={'mt-4 flex flex-col'}>
        <span className={'text-gray-500 font-B02-M'}>
          아직 첨부된 이미지가 없어요
        </span>
      </div>
    </div>
  );
};
export default ImgUpload;
