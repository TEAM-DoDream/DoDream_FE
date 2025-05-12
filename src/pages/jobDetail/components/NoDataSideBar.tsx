import Warning from '@assets/images/warning.webp';
const NoDataSideBar = () => {
  return (
    <div className="flex h-[971px] w-[606px] items-start justify-center pl-[102px] pt-[66px]">
      <div className="flex h-[592px] w-full flex-col items-start justify-center rounded-[30px] bg-gray-100 p-5">
        <div className="flex h-[552px] w-full flex-col items-center justify-center rounded-[30px] bg-white py-10">
          <div className="text-center text-gray-900 font-T03-B">
            {' '}
            아직 함께 준비하는 유저가 <br />
            많지 않아요
          </div>

          <div className="mb-[30px] mt-[10px] text-center text-gray-500 font-T05-SB">
            {' '}
            더 많은 유저가 참여하면, <br /> 서로의 할일 목록을 확인할 수
            있어요!{' '}
          </div>

          <img
            src={Warning}
            alt="데이터 없을시 경고 이미지"
            className="h-[151px] w-[130px]"
          />
        </div>
      </div>
    </div>
  );
};

export default NoDataSideBar;
