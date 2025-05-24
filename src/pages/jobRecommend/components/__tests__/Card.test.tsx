import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../Card';

const baseProps = {
  title: '요양보호사',
  description: '노인을 돌보는 직업',
  imageUrl: '/some-image.png',
  personality: '‘영희’ 님과 잘 맞아요.',
  strong: '‘영희’ 님은 따뜻한 소통에 강점을 지녔어요.',
  condition: '조건 설명입니다',
};

describe('Card 컴포넌트', () => {
  it('제목, 설명, 이미지가 올바르게 렌더링된다', () => {
    render(<Card {...baseProps} />);
    expect(screen.getByTestId('card-title')).toHaveTextContent(baseProps.title);
    expect(screen.getByTestId('card-description')).toHaveTextContent(
      baseProps.description
    );
    const image = screen.getByTestId('card-image');
    expect(image).toHaveAttribute('src', baseProps.imageUrl);
    expect(image).toHaveAttribute('alt', baseProps.title);
  });

  it('hover 전에는 hover-content가 숨겨져 있다', () => {
    render(<Card {...baseProps} />);
    expect(screen.getByTestId('hover-content')).toHaveClass('opacity-0');
  });

  it('hover 시 hover-content가 나타난다', () => {
    render(<Card {...baseProps} />);
    fireEvent.mouseEnter(screen.getByTestId('card-container'));
    expect(screen.getByTestId('hover-content')).toHaveClass('opacity-100');
  });

  it('hover 종료 시 hover-content가 다시 숨겨진다', () => {
    render(<Card {...baseProps} />);
    const container = screen.getByTestId('card-container');
    fireEvent.mouseEnter(container);
    fireEvent.mouseLeave(container);
    expect(screen.getByTestId('hover-content')).toHaveClass('opacity-0');
  });

  it('hover 시 성향/강점/조건 정보가 정확히 출력된다', () => {
    render(<Card {...baseProps} />);
    fireEvent.mouseEnter(screen.getByTestId('card-container'));

    expect(screen.getByTestId('card-trait')).toHaveTextContent('성향');
    expect(screen.getByTestId('card-trait')).toHaveTextContent(
      baseProps.personality
    );

    expect(screen.getByTestId('card-strength')).toHaveTextContent('강점');
    expect(screen.getByTestId('card-strength')).toHaveTextContent(
      baseProps.strong
    );

    expect(screen.getByText('조건')).toBeInTheDocument();
    expect(screen.getByText(baseProps.condition)).toBeInTheDocument();
  });

  it('버튼 텍스트가 올바르게 렌더링된다', () => {
    render(<Card {...baseProps} />);
    fireEvent.mouseEnter(screen.getByTestId('card-container'));

    expect(screen.getByTestId('card-save-button')).toHaveTextContent('담기');
    expect(screen.getByTestId('card-detail-button')).toHaveTextContent(
      '상세정보 보기'
    );
  });

  it('onHover, onLeave 이벤트가 정상 호출된다', () => {
    const onHover = jest.fn();
    const onLeave = jest.fn();
    render(<Card {...baseProps} onHover={onHover} onLeave={onLeave} />);
    const container = screen.getByTestId('card-container');

    fireEvent.mouseEnter(container);
    fireEvent.mouseLeave(container);

    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onLeave).toHaveBeenCalledTimes(1);
  });

  it('onClick 이벤트가 save 버튼 클릭 시 호출된다', () => {
    const onClick = jest.fn();
    render(<Card {...baseProps} onClick={onClick} />);
    fireEvent.mouseEnter(screen.getByTestId('card-container'));
    fireEvent.click(screen.getByTestId('card-save-button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('nickname 없이도 trait 섹션이 렌더링된다', () => {
    render(<Card {...baseProps} personality="잘 맞는 성향입니다." />);
    fireEvent.mouseEnter(screen.getByTestId('card-container'));
    expect(screen.getByTestId('card-trait')).toBeInTheDocument();
  });
});
