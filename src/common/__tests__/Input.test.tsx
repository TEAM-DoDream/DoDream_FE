// src/common/__tests__/Input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input 컴포넌트', () => {
  const baseProps = {
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('inputtitle과 undertext가 렌더링된다', () => {
    render(
      <Input
        {...baseProps}
        inputtitle="이름"
        undertext="이름을 입력해주세요"
        data-testid="input"
      />
    );

    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByText('이름을 입력해주세요')).toBeInTheDocument();
  });

  it('undertextClassName이 적용된다', () => {
    render(
      <Input
        {...baseProps}
        undertext="에러 메시지"
        undertextClassName="text-red-500"
      />
    );
    const underText = screen.getByText('에러 메시지');
    expect(underText).toHaveClass('text-red-500');
  });

  it('값이 없으면 우측 아이콘이 렌더링되지 않는다', () => {
    render(<Input {...baseProps} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('값이 있으면 클리어 아이콘만 렌더링된다 (비밀번호 아님)', () => {
    render(<Input value="abc" onChange={jest.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
  });

  it('클리어 버튼 클릭 시 빈 문자열로 onChange 호출', () => {
    const handleChange = jest.fn();
    render(<Input value="hello" onChange={handleChange} />);
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith({ target: { value: '' } });
  });

  it('isPassword이면 토글 아이콘 + 클리어 아이콘이 둘 다 렌더링된다', () => {
    render(<Input value="secret" onChange={() => {}} isPassword />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('비밀번호 토글 아이콘 클릭 시 input type 전환된다', () => {
    render(<Input value="secret" onChange={() => {}} isPassword />);
    const inputEl = screen.getByDisplayValue('secret') as HTMLInputElement;
    const [toggleButton] = screen.getAllByRole('button');

    expect(inputEl.type).toBe('password');
    fireEvent.click(toggleButton);
    expect(inputEl.type).toBe('text');
    fireEvent.click(toggleButton);
    expect(inputEl.type).toBe('password');
  });

  it('포커스 시 보라색 테두리가 적용된다', () => {
    render(<Input {...baseProps} />);
    const inputEl = screen.getByRole('textbox');
    fireEvent.focus(inputEl);
    expect(inputEl).toHaveClass('border-purple-500');
    fireEvent.blur(inputEl);
    expect(inputEl).toHaveClass('border-gray-300');
  });

  it('state="writing"이면 항상 보라색 테두리이다', () => {
    render(<Input {...baseProps} state="writing" />);
    const inputEl = screen.getByRole('textbox');
    expect(inputEl).toHaveClass('border-purple-500');
  });
});
