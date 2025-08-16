import BaseImage from '@assets/images/profile.png';
import Tag from '@common/Tag.tsx';

const Slider = () => {
  return (
    <div className="flex min-h-[108px] w-[664px] flex-col gap-[30px] rounded-[30px] bg-gray-50 p-[30px]">
      <p className="text-lg font-semibold leading-snug text-gray-900">
        ‘한국보건의료인국가시험원' 홈페이지 방문하여 자격요건, 시험 일정
        확인하기
      </p>

      <div className="flex items-center gap-3">
        <img
          src={BaseImage}
          alt="프로필이미지"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-gray-900 font-B03-M">{'금서짱'}</span>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <Tag context={'요양보호사'} fontClass={'font-B03-M'} />
            <Tag context={'새싹 단계인 사람'} fontClass={'font-B03-M'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
