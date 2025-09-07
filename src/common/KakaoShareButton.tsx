import KakaoIcon from '@assets/icons/landing/kakao.svg?react';

type KakaoShareButtonProps = {
  onClick?: () => void;
  className?: string;
  fixed?: boolean; // 고정 하단 바 형태로 노출
  offsetBottomPx?: number;
};

// Kakao SDK 로더
const loadKakao = (key: string) =>
  new Promise<void>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.Kakao) {
      if (!w.Kakao.isInitialized()) w.Kakao.init(key);
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js';
    s.integrity =
      'sha384-WAtVcQYcmTO/N+C1N+1m6Gp8qxh+3NlnP7X1U7qP6P5dQY/MsRBNTh+e1ahJrkEm';
    s.crossOrigin = 'anonymous';
    s.onload = () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Kakao.init(key);
        resolve();
      } catch (e) {
        reject(e);
      }
    };
    s.onerror = reject;
    document.head.appendChild(s);
  });

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
      onClick={async () => {
        if (onClick) return onClick();
        const jsKey = import.meta.env.VITE_KAKAO_JS_KEY as string;
        if (!jsKey) {
          console.warn('VITE_KAKAO_JS_KEY is not set.');
          return;
        }
        await loadKakao(jsKey);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Kakao = (window as any).Kakao;
        const templateId = Number(import.meta.env.VITE_KAKAO_TEMPLATE_ID);
        const shareUrl = 'https://www.dodream.site/landing';
        try {
          if (templateId) {
            Kakao.Share.sendCustom({
              templateId,
              templateArgs: { url: shareUrl },
            });
          } else {
            Kakao.Share.sendDefault({
              objectType: 'feed',
              content: {
                title: '두드림 – 내게 딱 맞는 직업 찾기',
                description: '직업/학원/구직 정보를 한 곳에서!',
                imageUrl: 'https://www.dodream.site/og-image.png',
                link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
              },
              buttons: [
                {
                  title: '두드림 열기',
                  link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
                },
              ],
            });
          }
        } catch (e) {
          console.error('Kakao share failed', e);
          // Fallback: Web Share API or clipboard copy
          try {
            if (navigator.share) {
              await navigator.share({
                title: '두드림 – 내게 딱 맞는 직업 찾기',
                text: '직업/학원/구직 정보를 한 곳에서!',
                url: shareUrl,
              });
              return;
            }
          } catch {
            // ignore and continue to clipboard
          }
          try {
            await navigator.clipboard.writeText(shareUrl);
            alert(
              '카카오 공유가 불가능하여 링크를 클립보드에 복사했습니다. 붙여넣기로 공유해 주세요.'
            );
          } catch (err) {
            console.error('Clipboard write failed', err);
          }
        }
      }}
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
