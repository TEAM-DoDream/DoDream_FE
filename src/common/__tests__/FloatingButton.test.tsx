// src/common/__tests__/FloatingButton.test.tsx
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import FloatingButton from '../FloatingButton';

// SVG 아이콘 모킹
jest.mock('@assets/icons/pencil.svg?react', () => () => (
  <div data-testid="pencil-icon">연필 아이콘</div>
));
jest.mock('@assets/icons/info.svg?react', () => () => (
  <div data-testid="info-icon">정보 아이콘</div>
));
jest.mock('@assets/icons/whiteCancel.svg?react', () => () => (
  <div data-testid="cancel-icon">취소 아이콘</div>
));

// 모달 컴포넌트 모킹
interface FloatingModalProps {
  onClose: () => void;
  onAddTask: () => void;
}
jest.mock(
  '../modal/FloatingModal',
  () =>
    ({ onClose, onAddTask }: FloatingModalProps) => (
      <div data-testid="floating-modal">
        <button data-testid="close-button" onClick={onClose}>
          닫기
        </button>
        <button data-testid="add-task-button" onClick={onAddTask}>
          할일 추가
        </button>
      </div>
    )
);

// 토스트 모달 모킹
interface ToastModalProps {
  text: string;
  icon?: React.ReactNode;
}
jest.mock('../modal/ToastModal', () => ({ text }: ToastModalProps) => (
  <div data-testid="toast-modal">{text}</div>
));

describe('FloatingButton 컴포넌트', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('호버 시에도 텍스트가 변경되지 않아야 한다', () => {
    render(<FloatingButton />);
    const button = screen.getByText('바로 할일 추가').closest('button')!;
    fireEvent.mouseEnter(button);
    expect(screen.getByText('바로 할일 추가')).toBeInTheDocument();
    fireEvent.mouseLeave(button);
    expect(screen.getByText('바로 할일 추가')).toBeInTheDocument();
  });

  it('버튼 클릭 시 모달이 표시되고 텍스트가 "할일 추가 닫기"로 변경되어야 한다', () => {
    render(<FloatingButton />);
    const button = screen.getByText('바로 할일 추가').closest('button')!;
    fireEvent.click(button);
    expect(screen.getByTestId('floating-modal')).toBeInTheDocument();
    expect(screen.getByText('할일 추가 닫기')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-icon')).toBeInTheDocument();
  });

  it('모달 외부 클릭 시 모달이 닫히고 텍스트가 "바로 할일 추가"로 돌아가야 한다', () => {
    render(<FloatingButton />);
    const button = screen.getByText('바로 할일 추가').closest('button')!;
    fireEvent.click(button);
    expect(screen.getByTestId('floating-modal')).toBeInTheDocument();
    // overlay 클릭: 모달 div의 최상위 부모가 overlay이므로
    const overlay =
      screen.getByTestId('floating-modal').parentElement!.parentElement!;
    fireEvent.click(overlay);
    expect(screen.queryByTestId('floating-modal')).not.toBeInTheDocument();
    expect(screen.getByText('바로 할일 추가')).toBeInTheDocument();
  });

  it('모달에서 "할일 추가" 버튼 클릭 시 토스트가 표시되어야 한다', () => {
    render(<FloatingButton />);
    const button = screen.getByText('바로 할일 추가').closest('button')!;
    fireEvent.click(button);
    fireEvent.click(screen.getByTestId('add-task-button'));
    expect(screen.queryByTestId('floating-modal')).not.toBeInTheDocument();
    expect(screen.getByTestId('toast-modal')).toBeInTheDocument();
    expect(screen.getByText('할일 목록이 추가되었습니다')).toBeInTheDocument();
  });

  it('토스트는 2.5초 후에 자동으로 사라져야 한다', () => {
    render(<FloatingButton />);
    const button = screen.getByText('바로 할일 추가').closest('button')!;
    fireEvent.click(button);
    fireEvent.click(screen.getByTestId('add-task-button'));
    expect(screen.getByTestId('toast-modal')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(2500));
    expect(screen.queryByTestId('toast-modal')).not.toBeInTheDocument();
  });
});
