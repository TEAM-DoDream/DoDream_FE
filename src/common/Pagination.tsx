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

  const getPages = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const left = 2;

      pages.push(1);

      if (currentPage > left + 1) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - left) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {getPages().map((p, i) => {
        const key = typeof p === 'number' ? `page-${p}` : `dots-${i}`;
        return p === '...' ? (
          <span
            key={key}
            className="flex h-9 w-9 items-center justify-center text-gray-300 font-B02-SB"
          >
            …
          </span>
        ) : (
          <button
            key={key}
            onClick={() => handleClick(p as number)}
            className={clsx(
              'flex h-9 w-9 cursor-pointer flex-row items-center justify-center transition font-B02-SB',
              p === currentPage
                ? 'text-purple-500'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 w-9 cursor-pointer disabled:opacity-50"
      >
        <Arrow className="h-9 w-9 rounded-[10px] border border-gray-300" />
      </button>
    </div>
  );
};

export default Pagination;
