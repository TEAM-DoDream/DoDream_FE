// src/common/Pagination.tsx
import Arrow from '@assets/icons/arrow.svg?react';
import clsx from 'clsx';

interface PaginationProps {
  totalPages: number;                    // 전체 페이지 수
  currentPage: number;                   // 1부터 시작하는 현재 페이지
  setCurrentPage: (page: number) => void; // 페이지 변경 함수 (1-based)
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  // 페이지 클릭 핸들러 (1-based page)
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 현재 페이지 그룹 (1~10 → 1, 11~20 → 2, …)
  const getPageGroup = () => {
    return Math.ceil(currentPage / 10) || 1;
  };

  // 현재 그룹에서 보여줄 페이지 배열 생성
  const getPages = (): number[] => {
    const pages: number[] = [];
    const currentGroup = getPageGroup();
    const startPage = (currentGroup - 1) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);

    for (let p = startPage; p <= endPage; p++) {
      pages.push(p);
    }
    return pages;
  };

  // 이전 그룹의 마지막 페이지로 이동
  const goToPrevGroup = () => {
    const prevGroupLastPage = (getPageGroup() - 1) * 10;
    if (prevGroupLastPage >= 1) handleClick(prevGroupLastPage);
  };

  // 다음 그룹의 첫 페이지로 이동
  const goToNextGroup = () => {
    const nextGroupFirstPage = getPageGroup() * 10 + 1;
    if (nextGroupFirstPage <= totalPages) handleClick(nextGroupFirstPage);
  };

  const hasPrevGroup = getPageGroup() > 1;
  const hasNextGroup = getPageGroup() * 10 < totalPages;

  return (
    <div className="flex items-center justify-center space-x-2">
      {hasPrevGroup && (
        <button onClick={goToPrevGroup} className="h-9 w-9 cursor-pointer">
          <Arrow className="h-9 w-9 rotate-180 rounded-[10px] border border-gray-300" />
        </button>
      )}

      {getPages().map((p) => (
        <button
          key={`page-${p}`}
          onClick={() => handleClick(p)}
          className={clsx(
            'flex h-9 w-9 cursor-pointer flex-row items-center justify-center transition font-B02-SB',
            p === currentPage
              ? 'text-purple-500'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {p}
        </button>
      ))}

      {hasNextGroup && (
        <button onClick={goToNextGroup} className="h-9 w-9 cursor-pointer">
          <Arrow className="h-9 w-9 rounded-[10px] border border-gray-300" />
        </button>
      )}
    </div>
  );
};

export default Pagination;