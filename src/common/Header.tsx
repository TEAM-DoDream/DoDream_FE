import Logo from '@assets/icons/mobileLogo.svg?react';
import Button from './Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@store/useUserStore';
import BaseImage from '@assets/images/profile.png';

interface ShowProps {
  type: 'show' | 'hide';
}

const NavItems = [
  {
    // 직업 탐색
    label: '직업 정보',
    path: '/jobfound',
    match: (pathname: string) =>
      (pathname.startsWith('/jobfound') && pathname !== '/jobsearch') ||
      pathname.startsWith('/others'),
  },
  //배움터 찾기
  { label: '학원 정보', path: '/learning' },
  // (구)일자리 찾기
  { label: '채용 정보', path: '/jobsearch' },

  //마이드림
  {
    label: '나의 할일',
    path: '/mytodo/list',
    match: (pathname: string) => pathname.startsWith('/mytodo'),
  },
];

const Header = ({ type }: ShowProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const accessToken = localStorage.getItem('accessToken');
  const nickname = useUserStore((state) => state.nickname);
  const profileImage = useUserStore((state) => state.userImage);
  const isLoggedIn = Boolean(accessToken);

  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-[120px] py-5">
      <div className="flex flex-row items-center gap-5">
        <Logo onClick={() => navigate('/')} className="cursor-pointer" />
        {NavItems.map(({ label, path, match }) => {
          const isActive = match ? match(pathname) : pathname === path;
          return (
            <Link
              key={label}
              to={path}
              className={`flex items-center justify-center rounded-[10px] px-[15px] py-[10px] font-B03-M ${
                isActive ? 'bg-purple-100 text-gray-900' : 'text-gray-600'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-row items-center justify-center gap-[10px]">
        <a
          href="https://substantial-scabiosa-c3a.notion.site/23bf45a40bd8802e9858edc8d7746a92"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer px-[15px] py-[10px] text-gray-500 underline font-B03-M"
        >
          두드림 사용설명서
        </a>
        {type === 'show' && !isLoggedIn && (
          <Button
            text="로그인"
            color="primary"
            className="flex h-[38px] items-center justify-center rounded-[10px] px-6 py-[10px]"
            onClick={() => navigate('/login')}
          />
        )}

        {type === 'show' && isLoggedIn && (
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => navigate('/mypage')}
          >
            <img
              src={profileImage || BaseImage}
              alt="프로필이미지"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-gray-900 font-B03-M">{nickname}님</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
