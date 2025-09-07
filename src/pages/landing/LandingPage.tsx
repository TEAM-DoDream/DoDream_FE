import MobileFrame from '@common/MobileFrame';
import MobileLogo from '@assets/icons/mobileLogo.svg?react';
import LandingHeroImg from '@assets/images/landing/9.png';
import LandingBubbleImg from '@assets/images/landing/10.png';
import Card1 from '@assets/images/landing/1.png';
import Card2 from '@assets/images/landing/2.png';
import LandingImg3 from '@assets/images/landing/3.png';
import LandingImg4 from '@assets/images/landing/4.png';
import LandingImg5 from '@assets/images/landing/5.png';
import LandingImg6 from '@assets/images/landing/6.png';
import ScrollTopButton from '@common/ScrollTopButton';
import KakaoShareButton from '@common/KakaoShareButton';
import InfoIcon from '@assets/icons/info.svg?react';

const LandingPage = () => {
  return (
    <MobileFrame className="mt-4 bg-gray-100">
      <main className="flex min-h-screen flex-col items-center justify-start pt-0">
        {/* Top bar (mobile header) */}
        <div className="z-10 flex h-[50px] w-full items-center justify-center bg-white">
          <MobileLogo className="h-[28px] w-[81px]" />
        </div>

        {/* Content area with gray-100 background */}
        <div className="flex w-full flex-1 flex-col items-center bg-gray-100">
          {/* Gradient rounded card */}
          <div className="z-10 mt-6 h-[505px] w-[328px] overflow-hidden rounded-[24px] border border-gray-200 shadow-sm">
            <div className="relative h-full w-full bg-[linear-gradient(180deg,#E8E6FF_0%,#B7AEFF_100%)]">
              <div className="px-6 pt-8 text-center">
                <p className="font-T02-M text-[14px] leading-[22px] text-white/90">
                  내게 딱 맞는 직업은 뭘까?
                </p>
                <p className="mt-4 text-[28px] leading-[40px] text-white font-T02-B">
                  인생 2막의 시작은
                  <br />
                  두드림과 함께 하세요!
                </p>
              </div>
              {/* Bottom white overlay inside the card with info notes */}
              <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-white/40">
                <div className="h-full w-full px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-800">
                    <InfoIcon className="h-5 w-5 shrink-0 text-gray-700" />
                    <p className="flex-1 text-[14px] font-[600] leading-[22px]">
                      두드림은 PC 웹에서만 이용 가능해요
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-gray-800">
                    <InfoIcon className="h-5 w-5 shrink-0 text-gray-700" />
                    <p className="mt-2 flex-1 text-[14px] font-[600] leading-[22px]">
                      카카오톡에 링크 보내기 버튼을 누른 뒤, PC로 접속해보세요!
                    </p>
                  </div>
                </div>
              </div>
              <img
                src={LandingHeroImg}
                alt="landing-hero"
                className="absolute bottom-[140px] left-1/2 z-10 h-[200px] w-[200px] -translate-x-1/2"
              />
            </div>
          </div>

          {/* Second headline */}
          <p className="mt-10 w-[328px] text-[20px] font-[700] leading-[28px] text-gray-900">
            퇴직 후 , 나에게 꼭 맞는
            <br />
            두번째 커리어는?
          </p>

          {/* White rounded card under gradient card */}
          <div className="relative mt-10 h-[295px] w-[328px] rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
            {/* Bubble image bottom center */}
            <img
              src={LandingBubbleImg}
              alt="landing-bubble"
              className="absolute bottom-0 left-1/2 h-[120px] w-auto -translate-x-1/2"
            />
            {/* Text bubbles */}
            <div className="flex flex-col items-start gap-3">
              <div className="inline-flex h-[36px] max-w-full items-center rounded-[100px] bg-gray-100 px-4 py-6">
                <span className="text-[13px] leading-[24px] text-gray-500">
                  아이들을 다 키우고 나니 어떤 일을 해야할지 모르겠어
                </span>
              </div>
              <div className="inline-flex h-[36px] max-w-full items-center self-center rounded-[100px] bg-gray-100 px-4 py-3">
                <span className="text-[13px] leading-[24px] text-gray-500">
                  체력이 많이 들지 않는 직업은 없을까?
                </span>
              </div>
              <div className="inline-flex h-[36px] max-w-full items-center rounded-[100px] bg-gray-100 px-4 py-3">
                <span className="text-[13px] leading-[24px] text-gray-500">
                  어떤 것부터 준비해야 할까?
                </span>
              </div>
            </div>
          </div>

          {/* CTA headline */}
          <p className="mt-10 w-[328px] text-center text-[22px] font-[700] text-gray-900">
            두드림에서 나에게 딱 맞는
            <br />
            직업을 추천받아보세요!
          </p>

          {/* Overlapping cards illustration */}
          <div className="relative mt-6 h-[220px] w-[328px]">
            <img
              src={Card2}
              alt="card-2"
              className="absolute right-[24px] top-4 z-0 h-[200px] w-auto rotate-[6deg] rounded-[20px]"
            />
            <img
              src={Card1}
              alt="card-1"
              className="absolute left-[24px] top-0 z-10 h-[220px] w-auto -rotate-[6deg] rounded-[20px]"
            />
          </div>

          {/* Helper message */}
          <p className="mt-8 w-[328px] text-center text-[22px] font-[700] text-gray-900">
            혼자 준비하려니 막막하셨나요?
          </p>
          <p className="font-T02-M mt-3 w-[328px] text-center text-[14px] leading-[22px] text-gray-700">
            같이 준비하는 드리머들의 할 일을 보며
            <br />내 할 일을 작성해보세요
          </p>

          {/* Illustration 3 and copy */}
          <div className="mt-6 w-[328px]">
            <img
              src={LandingImg3}
              alt="landing-3"
              className="mx-auto h-auto w-full"
            />
          </div>
          <p className="mt-6 w-[328px] text-center text-[22px] font-[700] text-gray-900">
            두드림과 함께 해봐요!
          </p>
          <p className="font-T02-M mt-3 w-[328px] text-center text-[14px] leading-[22px] text-gray-700">
            두드림에서 직업,학원,구직 정보까지
            <br />
            필요한 정보를 함께 모아보세요
          </p>

          {/* Illustration 4 */}
          <div className="mt-6 w-[200px]">
            <img
              src={LandingImg4}
              alt="landing-4"
              className="mx-auto h-auto w-full"
            />
          </div>

          {/* Illustration 5,6 */}
          <div className="mt-6 w-[320px]">
            <img
              src={LandingImg5}
              alt="landing-5"
              className="mx-auto h-auto w-full"
            />
          </div>
          <div className="mb-14 mt-6 w-[320px]">
            <img
              src={LandingImg6}
              alt="landing-6"
              className="mx-auto h-auto w-full"
            />
          </div>
        </div>
      </main>
      <ScrollTopButton offsetBottomPx={100} showAfter={0} withinMobileFrame />
      <KakaoShareButton fixed offsetBottomPx={24} />
    </MobileFrame>
  );
};

export default LandingPage;
