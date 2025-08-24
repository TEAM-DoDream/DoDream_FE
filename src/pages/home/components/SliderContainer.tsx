import { useState, useEffect, useRef, useMemo } from 'react';
import Slider from './Slider';

const sliderData = [
  {
    id: 1,
    text: '‘한국보건의료인국가시험원 홈페이지 방문하여 자격요건, 시험 일정 확인하기 확인하 확인하 확인하 확인하 확인하 확인하',
    user: '금서짱',
    tags: ['요양보호사', '새싹 단계인 사람'],
  },
  {
    id: 2,
    text: '컴퓨터활용능력 1급 실기 시험 접수하기',
    user: '개발왕',
    tags: ['컴활', '자격증 준비'],
  },
  {
    id: 3,
    text: 'React Query 마스터를 위한 공식 문서 정독',
    user: '리액트꿈나무',
    tags: ['프론트엔드', '스터디'],
  },
];

const SLIDER_HEIGHT = 168;
const GAP = 20;
const TRANSITION_DURATION = 500;

const VIEWPORT_HEIGHT = SLIDER_HEIGHT * 2 + GAP;

const SliderContainer = () => {
  const extendedSliderData = useMemo(() => {
    if (sliderData.length === 0) return [];
    const firstClone = {
      ...sliderData[0],
      id: `clone-first-${sliderData[0].id}`,
    };
    return [...sliderData, firstClone];
  }, []);

  const [activeIndex, setActiveIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const startInterval = () => {
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
    <div className="relative w-full max-w-[664px]">
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
              style={{ height: `${SLIDER_HEIGHT}px`, flexShrink: 0 }}
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
