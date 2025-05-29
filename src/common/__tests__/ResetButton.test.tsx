import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetButton from '../ResetButton';

// RefreshIcon 모킹
jest.mock('@assets/icons/refresh_icon.svg?react', () => ({
  __esModule: true,
  default: () => <span data-testid="refresh-icon" />,
}));

describe('ResetButton 컴포넌트', () => {
  it('기본 라벨과 아이콘이 렌더링되어야 한다', () => {
    const onClick = jest.fn();
    render(<ResetButton onClick={onClick} />);

    // 기본 라벨
    expect(screen.getByText('필터 초기화')).toBeInTheDocument();
    // 아이콘
    expect(screen.getByTestId('refresh-icon')).toBeInTheDocument();
    // 기본 스타일 클래스
    const button = screen.getByRole('button', { name: /필터 초기화/i });
    expect(button).toHaveClass(
      'flex',
      'items-center',
      'bg-gray-500',
      'text-white'
    );
  });

  it('커스텀 라벨을 전달하면 해당 텍스트가 렌더링되어야 한다', () => {
    const onClick = jest.fn();
    render(<ResetButton onClick={onClick} label="리셋" />);

    expect(screen.getByText('리셋')).toBeInTheDocument();
    // 기본 라벨은 없어야 함
    expect(screen.queryByText('필터 초기화')).not.toBeInTheDocument();
  });

  it('className prop으로 전달한 클래스가 버튼에 추가되어야 한다', () => {
    const onClick = jest.fn();
    render(<ResetButton onClick={onClick} className="custom-class" />);

    const button = screen.getByRole('button', { name: /필터 초기화/i });
    expect(button).toHaveClass('custom-class');
  });

  it('버튼을 클릭하면 onClick 핸들러가 호출되어야 한다', () => {
    const onClick = jest.fn();
    render(<ResetButton onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: /필터 초기화/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
