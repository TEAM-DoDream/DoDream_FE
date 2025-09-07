import React from 'react';

type MobileFrameProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * 모바일 전용 프레임: 360px 기준, 390px까지 확장
 * - 아주 작은 화면에서는 가로 스크롤을 방지하기 위해 w-full
 * - min-[360px] 이상에서 360px 고정, min-[391px] 이상에서 390px 고정
 * - 안전 영역(inset) 반영
 */
const MobileFrame = ({ children, className }: MobileFrameProps) => {
  const baseClass =
    'mx-auto w-full max-w-[390px] min-[360px]:w-[360px] min-[391px]:w-[390px] min-h-screen bg-white';
  const paddingClass = 'px-4';

  return (
    <div className="flex w-full justify-center">
      <div
        className={`${baseClass} ${paddingClass}${className ? ` ${className}` : ''}`}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
