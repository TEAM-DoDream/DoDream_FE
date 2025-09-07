import KakaoIcon from '@assets/icons/landing/kakao.svg?react';

type KakaoShareButtonProps = {
  onClick?: () => void;
  className?: string;
  fixed?: boolean; // 고정 하단 바 형태로 노출
  offsetBottomPx?: number;
};

// 328 width container 기준: 좌우 padding 18px, 상하 18px, 세로 여백 90px
const KakaoShareButton = ({
  onClick,
  className,
  fixed = true,
  offsetBottomPx = 24,
}: KakaoShareButtonProps) => {
  const bottomWithSafeArea = `calc(${offsetBottomPx}px + env(safe-area-inset-bottom))`;
  const base =
    'flex w-[328px] items-center justify-center rounded-[16px] px-[18px] py-[18px]';
  const layout = fixed
    ? `fixed left-1/2 -translate-x-1/2 z-[9999] ${base}`
    : `mx-auto mt-[58px] ${base}`;
  // 시안 색상(카카오 노란색 계열)
  const styles = 'bg-[#FFD400] text-gray-900 shadow-lg';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${layout} ${styles} ${className ?? ''}`}
      style={fixed ? { bottom: bottomWithSafeArea } : undefined}
    >
      <div className="flex w-full items-center justify-center gap-3">
        <KakaoIcon className="h-[25px] w-[25px]" />
        <span className="text-[18px] font-[600] leading-[26px]">
          카카오톡에 링크 보내기
        </span>
      </div>
    </button>
  );
};

export default KakaoShareButton;
