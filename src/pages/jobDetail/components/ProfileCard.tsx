import Checker from '@assets/images/checker.png';
import Button from '@common/Button';
import CheckList from '@common/CheckList';
import Divider from '@common/Divider';

const todotext = [
  '아롱이 병원에ㅇㅇㅇ 들렀을 때, 늘 친절하신 간호 선생님께 취업 경로 살짝 여쭤보기',
  '요즘 정부지원 교육 많다던데, 중랑구 복지센터에 전화해서 “교육 중에 동물 관련된 것도 있나요?” 물어보기.',
];

const ProfileCard = () => {
  return (
    <div className="mt-[66px] flex h-[752px] w-[444px] flex-col items-start rounded-[30px] bg-white p-[30px]">
      <div className="text-black font-T03-B">
        {' '}
        다른 드리머들은 <br />
        이렇게 준비하고 있어요
      </div>
      <div className="flex w-full flex-col gap-5">
        <div className="mt-[30px] flex w-full cursor-pointer flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 bg-white p-[30px] hover:bg-gray-100">
          <div className="flex flex-row gap-5">
            <img
              src={Checker}
              alt="사용자이미지"
              className="h-[90px] w-[90px] rounded-full"
            />

            <div className="flex flex-col">
              <div className="text-gray-900 font-T05-SB"> 고라니</div>
              <div className="mt-[6px] text-gray-500 font-C01-M">
                {' '}
                49일째 꿈꾸는 중
              </div>

              <div className="mt-[10px] flex flex-row gap-[10px]">
                <div className="flex items-center justify-center rounded-[10px] bg-purple-100 p-2 text-purple-500 font-B03-SB">
                  요양보호사
                </div>
                <div className="flex items-center justify-center rounded-[10px] bg-gray-100 p-2 text-gray-500 font-B03-SB">
                  할일 12개
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-row gap-[10px]">
            <div className="text-gray-500 font-B02-M"> 거주지</div>
            <div className="text-gray-800 font-B02-SB"> 대전 광역시 서구</div>
          </div>

          <Divider className="mb-6 mt-4" />

          <CheckList
            lists={todotext}
            className="line-clamp-1 flex w-full flex-col gap-3 text-ellipsis"
          />
        </div>

        <div className="flex flex-col items-start rounded-[30px] border-[1.2px] border-gray-300 bg-white p-[30px]">
          <div className="flex flex-row gap-5">
            <img
              src={Checker}
              alt="사용자이미지"
              className="h-[90px] w-[90px] rounded-full"
            />

            <div className="flex flex-col">
              <div className="text-gray-900 font-T05-SB"> 금서짱 </div>
              <div className="mt-[6px] text-gray-500 font-C01-M">
                {' '}
                49일째 꿈꾸는 중
              </div>

              <div className="mt-[10px] flex flex-row gap-[10px]">
                <div className="flex items-center justify-center rounded-[10px] bg-purple-100 p-2 text-purple-500 font-B03-SB">
                  요양보호사
                </div>
                <div className="flex items-center justify-center rounded-[10px] bg-gray-100 p-2 text-gray-500 font-B03-SB">
                  할일 12개
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        text={'더 보러가기'}
        color="secondary"
        type="button"
        className="mt-10 flex w-full items-center justify-center rounded-2xl border border-purple-500 py-4 font-T05-SB hover:bg-purple-150"
      />
    </div>
  );
};

export default ProfileCard;
