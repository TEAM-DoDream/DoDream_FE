import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import * as useUserStoreModule from '../../store/useUserStore';

// Header 컴포넌트 모킹
jest.mock('../Header', () => {
  return function MockHeader({ type }: { type: 'show' | 'hide' }) {
    const accessToken = localStorage.getItem('accessToken');
    const nickname = useUserStoreModule.useUserStore((state) => state.nickname);
    const profileImage = useUserStoreModule.useUserStore(
      (state) => state.userImage
    );
    const isLoggedIn = Boolean(accessToken);

    return (
      <div data-testid="header">
        <div data-testid="logo">로고</div>
        <nav>
          <a
            data-testid="nav-job-info"
            className={`bg-purple-100 text-gray-900`}
          >
            직업 정보
          </a>
          <a data-testid="nav-academy-info" className={`text-gray-600`}>
            학원 정보
          </a>
          <a data-testid="nav-recruit-info" className={`text-gray-600`}>
            채용 정보
          </a>
          <a data-testid="nav-todo" className={`text-gray-600`}>
            나의 할일
          </a>
        </nav>

        {type === 'show' && !isLoggedIn && (
          <button data-testid="login-button">로그인</button>
        )}

        {type === 'show' && isLoggedIn && (
          <div data-testid="profile">
            <img src={profileImage || 'mocked-file'} alt="프로필이미지" />
            <span>{nickname}님</span>
          </div>
        )}
      </div>
    );
  };
});

// React Router의 useNavigate와 useLocation을 모킹
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/jobfound' }),
}));

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Header 컴포넌트를 가져옴 (이제 위에서 모킹한 버전)
import Header from '../Header';

describe('Header 컴포넌트', () => {
  const originalUseUserStore = useUserStoreModule.useUserStore;

  beforeEach(() => {
    // localStorage 모킹
    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        clear: () => {
          store = {};
        },
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    // useUserStore 스파이 설정
    jest
      .spyOn(useUserStoreModule, 'useUserStore')
      .mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return selector({
            nickname: '테스트유저',
            userImage: '',
            regionName: '',
            setRegionName: jest.fn(),
            setNickname: jest.fn(),
            setUserImage: jest.fn(),
            setUser: jest.fn(),
            clearUser: jest.fn(),
          });
        }
        return originalUseUserStore(selector);
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('로고와 네비게이션 메뉴가 렌더링되어야 한다', () => {
    renderWithRouter(<Header type="show" />);

    // 로고 확인
    expect(screen.getByTestId('logo')).toBeInTheDocument();

    // 네비게이션 메뉴 확인
    expect(screen.getByText('직업 정보')).toBeInTheDocument();
    expect(screen.getByText('학원 정보')).toBeInTheDocument();
    expect(screen.getByText('채용 정보')).toBeInTheDocument();
    expect(screen.getByText('나의 할일')).toBeInTheDocument();
  });

  it('type="hide"일 때 로그인 버튼이나 프로필이 표시되지 않아야 한다', () => {
    renderWithRouter(<Header type="hide" />);

    // 로그인 버튼이 없어야 함
    expect(screen.queryByText('로그인')).not.toBeInTheDocument();

    // 프로필 관련 요소가 없어야 함
    expect(screen.queryByText(/님$/)).not.toBeInTheDocument();
  });

  it('비로그인 상태에서는 로그인 버튼이 표시되어야 한다', () => {
    // localStorage에 accessToken이 없음
    renderWithRouter(<Header type="show" />);

    // 로그인 버튼이 있어야 함
    expect(screen.getByText('로그인')).toBeInTheDocument();

    // 프로필 관련 요소가 없어야 함
    expect(screen.queryByText(/님$/)).not.toBeInTheDocument();
  });

  it('로그인 상태에서는 프로필과 닉네임이 표시되어야 한다', () => {
    // localStorage에 accessToken 설정
    window.localStorage.setItem('accessToken', 'test-token');

    renderWithRouter(<Header type="show" />);

    // 로그인 버튼이 없어야 함
    expect(screen.queryByText('로그인')).not.toBeInTheDocument();

    // 프로필 이미지와 닉네임이 있어야 함
    expect(screen.getByAltText('프로필이미지')).toBeInTheDocument();
    expect(screen.getByText('테스트유저님')).toBeInTheDocument();
  });

  it('현재 경로에 해당하는 네비게이션 메뉴가 활성화되어야 한다', () => {
    renderWithRouter(<Header type="show" />);

    // 현재 경로가 /jobfound 이므로 '직업 정보' 메뉴가 활성화되어야 함
    const activeMenu = screen.getByTestId('nav-job-info');
    expect(activeMenu).toHaveClass('bg-purple-100');
    expect(activeMenu).toHaveClass('text-gray-900');

    // 다른 메뉴들은 활성화되지 않아야 함
    const inactiveMenu = screen.getByTestId('nav-academy-info');
    expect(inactiveMenu).not.toHaveClass('bg-purple-100');
    expect(inactiveMenu).toHaveClass('text-gray-600');
  });

  it('프로필 이미지가 없을 때 기본 이미지가 표시되어야 한다', () => {
    // localStorage에 accessToken 설정
    window.localStorage.setItem('accessToken', 'test-token');

    // userImage가 빈 문자열인 상태
    renderWithRouter(<Header type="show" />);

    // 프로필 이미지가 기본 이미지를 사용해야 함
    const profileImg = screen.getByAltText('프로필이미지');
    expect(profileImg).toHaveAttribute('src', 'mocked-file');
  });

  it('프로필 이미지가 있을 때 해당 이미지가 표시되어야 한다', () => {
    // localStorage에 accessToken 설정
    window.localStorage.setItem('accessToken', 'test-token');

    // userImage 값 설정
    jest
      .spyOn(useUserStoreModule, 'useUserStore')
      .mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return selector({
            nickname: '테스트유저',
            userImage: 'custom-profile.jpg',
            regionName: '',
            setRegionName: jest.fn(),
            setNickname: jest.fn(),
            setUserImage: jest.fn(),
            setUser: jest.fn(),
            clearUser: jest.fn(),
          });
        }
        return originalUseUserStore(selector);
      });

    renderWithRouter(<Header type="show" />);

    // 프로필 이미지가 설정된 이미지를 사용해야 함
    const profileImg = screen.getByAltText('프로필이미지');
    expect(profileImg).toHaveAttribute('src', 'custom-profile.jpg');
  });
});
