import BaseImage from '@assets/images/profile.png';
import Tag from '@common/Tag.tsx';

interface SliderProps {
  text: string;
  user: string;
  tags: string[];
}

const Slider = ({ text, user, tags }: SliderProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-[10px] rounded-[30px] bg-gray-50 p-[30px]">
      <p className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-relaxed text-gray-900">
        {text}
      </p>

      <div className="flex items-center gap-3">
        <img
          src={BaseImage}
          alt="프로필이미지"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-gray-900 font-B03-M">{user}</span>
        <div className="flex flex-col">
          <div className="flex gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} context={tag} fontClass={'font-B03-M'} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
