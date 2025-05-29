import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropDown from '../DropDown';
import { useDropdown } from '@hook/useDropdown';

// useDropdown 훅 모킹
jest.mock('@hook/useDropdown');
const mockToggle = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useDropdown as jest.Mock).mockReturnValue({
    isOpen: false,
    toggle: mockToggle,
    ref: { current: null },
  });
});

describe('DropDown 컴포넌트', () => {
  const options = ['옵션1', '옵션2', '옵션3'];
  const onSelect = jest.fn();
  const backOnClick = jest.fn();

  it('플레이스홀더와 토글 아이콘이 렌더링되어야 한다', () => {
    render(
      <DropDown
        placeholder="선택하세요"
        options={options}
        value=""
        onSelect={onSelect}
      />
    );

    expect(screen.getByText('선택하세요')).toBeInTheDocument();
    // 닫힌 상태이므로 토글 아이콘만 하나 렌더링
    expect(screen.getByTestId('mock-svg')).toBeInTheDocument();
  });

  it('title과 label이 제공되면 각각 렌더링된다', () => {
    render(
      <DropDown
        title="테스트 타이틀"
        label="테스트 레이블"
        placeholder="선택하세요"
        options={options}
        value=""
        onSelect={onSelect}
      />
    );

    expect(screen.getByText('테스트 타이틀')).toBeInTheDocument();
    expect(screen.getByText('테스트 레이블')).toBeInTheDocument();
  });

  it('토글 영역 클릭 시 toggle 함수가 호출된다', () => {
    render(
      <DropDown
        placeholder="선택하세요"
        options={options}
        value=""
        onSelect={onSelect}
      />
    );

    fireEvent.click(screen.getByText('선택하세요'));
    expect(mockToggle).toHaveBeenCalled();
  });

  it('isOpen이 true면 옵션 목록이 보여진다', () => {
    (useDropdown as jest.Mock).mockReturnValue({
      isOpen: true,
      toggle: mockToggle,
      ref: { current: null },
    });

    render(
      <DropDown
        placeholder="선택하세요"
        options={options}
        value=""
        onSelect={onSelect}
      />
    );

    options.forEach((opt) => expect(screen.getByText(opt)).toBeInTheDocument());
  });

  it('옵션 클릭 시 onSelect와 toggle이 호출된다', () => {
    (useDropdown as jest.Mock).mockReturnValue({
      isOpen: true,
      toggle: mockToggle,
      ref: { current: null },
    });

    render(
      <DropDown
        placeholder="선택하세요"
        options={options}
        value=""
        onSelect={onSelect}
      />
    );

    fireEvent.click(screen.getByText('옵션2'));
    expect(onSelect).toHaveBeenCalledWith('옵션2');
    expect(mockToggle).toHaveBeenCalled();
  });

  it('keepOpenOnSelect=true면 toggle이 호출되지 않는다', () => {
    (useDropdown as jest.Mock).mockReturnValue({
      isOpen: true,
      toggle: mockToggle,
      ref: { current: null },
    });

    render(
      <DropDown
        placeholder="선택하세요"
        options={options}
        value=""
        onSelect={onSelect}
        keepOpenOnSelect
      />
    );

    fireEvent.click(screen.getByText('옵션3'));
    expect(onSelect).toHaveBeenCalledWith('옵션3');
    expect(mockToggle).not.toHaveBeenCalled();
  });

  it('backButton이 있으면 아이콘과 라벨이 렌더링되고 클릭 시 onClick 호출된다', () => {
    (useDropdown as jest.Mock).mockReturnValue({
      isOpen: true,
      toggle: mockToggle,
      ref: { current: null },
    });

    render(
      <DropDown
        placeholder="선택하세요"
        options={options}
        value=""
        onSelect={onSelect}
        backButton={{ label: '뒤로가기', onClick: backOnClick }}
      />
    );

    // backButton 라벨 검증
    const backItem = screen.getByText('뒤로가기');
    expect(backItem).toBeInTheDocument();

    // 해당 <li> 내부에서만 아이콘을 찾도록 범위 지정
    const listItem = backItem.closest('li')!;
    expect(within(listItem).getByTestId('mock-svg')).toBeInTheDocument();

    // 클릭 시 백 버튼 onClick 호출
    fireEvent.click(backItem);
    expect(backOnClick).toHaveBeenCalled();
  });

  it('옵션이 8개 초과 시 스크롤 스타일이 적용된다', () => {
    const longOptions = Array.from({ length: 9 }, (_, i) => `옵션${i + 1}`);
    (useDropdown as jest.Mock).mockReturnValue({
      isOpen: true,
      toggle: mockToggle,
      ref: { current: null },
    });

    const { container } = render(
      <DropDown
        placeholder="선택하세요"
        options={longOptions}
        value=""
        onSelect={onSelect}
      />
    );

    const ul = container.querySelector('ul');
    expect(ul).toHaveClass('overflow-y-auto', 'max-h-[540px]');
  });
});
