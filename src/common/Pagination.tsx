import Arrow from '@assets/icons/arrow.svg?react';
import clsx from 'clsx';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageGroup = () => {
    return Math.ceil(currentPage / 10);
  };

  const getPages = (): number[] => {
    const pages: number[] = [];
    const currentGroup = getPageGroup();
    
    const startPage = (currentGroup - 1) * 10 + 1;
    const endPage = Math.min(startPage + 9, totalPages);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  const goToPrevGroup = () => {
    const prevGroupLastPage = (getPageGroup() - 1) * 10;
    if (prevGroupLastPage > 0) {
      handleClick(prevGroupLastPage);
    }
  };
  
  const goToNextGroup = () => {
    const nextGroupFirstPage = getPageGroup() * 10 + 1;
    if (nextGroupFirstPage <= totalPages) {
      handleClick(nextGroupFirstPage);
    }
  };

  const hasNextGroup = getPageGroup() * 10 < totalPages;
  const hasPrevGroup = getPageGroup() > 1;

  return (
    <div className="flex items-center justify-center space-x-2">
      {hasPrevGroup && (
        <button
          onClick={goToPrevGroup}
          className="h-9 w-9 cursor-pointer"
        >
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
        <button
          onClick={goToNextGroup}
          className="h-9 w-9 cursor-pointer"
        >
          <Arrow className="h-9 w-9 rounded-[10px] border border-gray-300" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
