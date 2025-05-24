import Warning from '@assets/images/warning.webp';
const NoDataSideBar = () => {
  return (
    <div className="mt-[66px] flex h-[752px] w-[444px] flex-col items-start rounded-[30px] bg-white p-[30px]">
      <div className="flex h-[552px] w-full flex-col items-center justify-center rounded-[30px] bg-white py-10">
        <div className="text-center text-gray-900 font-T03-B">
          {' '}
          아직 함께 준비하는 <br />
          유저가 많지 않아요
        </div>

        <img
          src={Warning}
          alt="데이터 없을시 경고 이미지"
          className="mt-[50px] h-[151px] w-[130px]"
        />

        <div className="mt-[30px] text-center text-gray-500 font-T05-SB">
          {' '}
          더 많은 유저가 참여하면, <br /> 서로의 할일 목록을 확인할 수
          있어요!{' '}
        </div>
      </div>
    </div>
  );
};

export default NoDataSideBar;
