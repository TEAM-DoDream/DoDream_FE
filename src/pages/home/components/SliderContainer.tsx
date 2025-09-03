import { useState, useEffect, useRef, useMemo } from 'react';
import Slider from './Slider';
import { usePopularQuery } from '@hook/home/usePopularQuery';

const SLIDER_HEIGHT = 168;
const GAP = 20;
const TRANSITION_DURATION = 500;

const VIEWPORT_HEIGHT = SLIDER_HEIGHT * 2 + GAP;

const SliderContainer = () => {
  const { data: popularTodos } = usePopularQuery();

  const extendedSliderData = useMemo(() => {
    if (!popularTodos || popularTodos.length === 0) return [];

    const transformedData = popularTodos.map((todo) => ({
      id: todo.todoId,
      text: todo.title,
      user: todo.memberNickname,
      tags: [todo.jobName, todo.memberLevel || '레벨 없음'],
    }));

    const firstClone = {
      ...transformedData[0],
      id: `clone-first-${transformedData[0].id}`,
    };
    return [...transformedData, firstClone];
  }, [popularTodos]);

  const [activeIndex, setActiveIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const startInterval = () => {
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }, 5000);
  };

  useEffect(() => {
    if (extendedSliderData.length > 0) {
      startInterval();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [extendedSliderData.length]);

  useEffect(() => {
    if (activeIndex === extendedSliderData.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveIndex(1);
      }, TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }

    if (activeIndex === 1 && !isTransitioning) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  }, [activeIndex, isTransitioning, extendedSliderData.length]);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    startInterval();
  };

  return (
    <div className="relative w-full max-w-[900px]">
      <style>
        {`
        .slider-viewport {
            mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
          }

          .slider-viewport::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              transparent 50%,
              rgba(249, 250, 251, 0.1) 70%,
              rgba(249, 250, 251, 0.4) 85%,
              rgba(249, 250, 251, 0.8) 95%,
              #f9fafb 100%
            );
            pointer-events: none;
            z-index: 10;
            border-radius: 30px;
          }
        `}
      </style>

      <div
        className="slider-viewport w-full rounded-[30px]"
        style={{
          height: `${VIEWPORT_HEIGHT}px`,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex flex-col"
          style={{
            gap: `${GAP}px`,
            transform: `translateY(-${(activeIndex - 1) * (SLIDER_HEIGHT + GAP)}px)`,
            transition: isTransitioning
              ? `transform ${TRANSITION_DURATION}ms ease-in-out`
              : 'none',
          }}
        >
          {extendedSliderData.map((data) => (
            <div
              key={data.id}
              style={{
                height: `${SLIDER_HEIGHT}px`,
                flexShrink: 0,
                width: '100%',
              }}
              className="w-full"
            >
              <Slider {...data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderContainer;
