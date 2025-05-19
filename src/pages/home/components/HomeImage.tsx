import HomeCardImage from '@assets/images/homecard.png';
import LoginHomeCardImage from '@assets/images/loginhomecard.png';

export const HomeCard = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <img
        src={HomeCardImage}
        alt="홈카드"
        className="aspect-[789/379] h-[379px] w-[789px]"
      />
    </div>
  );
};

export const LoginHomeCard = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <img
        src={LoginHomeCardImage}
        alt="홈카드"
        className="aspect-[789/379] h-[379px] w-[789px]"
      />
    </div>
  );
};
