import { useEffect, useState } from 'react';
import UpIcon from '@assets/icons/up.svg?react';

type ScrollTopButtonProps = {
  showAfter?: number; // pixels scrolled before showing
  offsetBottomPx?: number;
  offsetRightPx?: number;
  withinMobileFrame?: boolean; // 모바일 프레임(360~390px) 안쪽에 위치
};

const ScrollTopButton = ({
  showAfter = 200,
  offsetBottomPx = 24,
  offsetRightPx = 24,
  withinMobileFrame = true,
}: ScrollTopButtonProps) => {
  const [visible, setVisible] = useState(false);
  const [rightOffset, setRightOffset] = useState<number>(offsetRightPx);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfter);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  // 뷰포트 너비 변화에 따라 모바일 프레임(360~390px) 내부 우측으로 정렬
  useEffect(() => {
    if (!withinMobileFrame) {
      setRightOffset(offsetRightPx);
      return;
    }
    const computeRight = () => {
      const vw = window.innerWidth;
      const frameWidth = Math.max(360, Math.min(390, vw));
      const gutter = Math.max(0, (vw - frameWidth) / 2);
      setRightOffset(gutter + offsetRightPx);
    };
    computeRight();
    window.addEventListener('resize', computeRight);
    return () => window.removeEventListener('resize', computeRight);
  }, [offsetRightPx, withinMobileFrame]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bottomWithSafeArea = `calc(${offsetBottomPx}px + env(safe-area-inset-bottom))`;

  return (
    <button
      aria-label="scroll-to-top"
      onClick={handleClick}
      className={`fixed z-[9999] flex h-[42px] w-[42px] items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition-opacity duration-200 hover:shadow-xl ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ bottom: bottomWithSafeArea, right: rightOffset }}
    >
      <UpIcon className="h-5 w-5 text-gray-400" />
    </button>
  );
};

export default ScrollTopButton;
