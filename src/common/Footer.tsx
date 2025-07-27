import Divider from '@assets/icons/shortDivider.svg?react';
const Footer = () => {
  return (
    <div className="bottom-0 flex h-[130px] flex-col items-center justify-center border-t border-gray-300 bg-white py-6">
      <div className="flex flex-row items-center gap-[9px] text-gray-500 font-B02-SB">
        <a
          href="https://substantial-scabiosa-c3a.notion.site/23df45a40bd880d0993bd9633f8eb2fa"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          개인정보처리방침
        </a>
        <Divider />
        <a
          href="https://substantial-scabiosa-c3a.notion.site/23df45a40bd88095bcc2cde291110ee8"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          이용약관
        </a>
        <Divider />
        <a
          href="https://forms.gle/kYUHuiK3SzmUEQLf9"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          문의하기
        </a>
      </div>

      <div className="mt-[13px] text-center text-gray-400 font-B01-SB">
        인생의 제 2막을 향한, 두드림
      </div>
      <div className="mt-1 text-center text-gray-400 font-B01-M">
        두둠칫팀 teamdodream.dev@gmail.com
      </div>
    </div>
  );
};

export default Footer;
