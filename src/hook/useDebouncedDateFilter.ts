import { useEffect, useState } from 'react';
import { useFilterStore } from '@store/filterStore';
import { useShallow } from 'zustand/react/shallow';

export const useDebouncedDateFilter = (delay = 500) => {
  const { startDate, endDate } = useFilterStore(
    useShallow((state) => ({
      startDate: state.startDate,
      endDate: state.endDate,
    }))
  );

  const [debouncedStartDate, setDebouncedStartDate] = useState(startDate);
  const [debouncedEndDate, setDebouncedEndDate] = useState(endDate);

  const isFullDate = (date: string) => /^\d{4}\/\d{2}\/\d{2}$/.test(date);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!startDate && !endDate) {
        setDebouncedStartDate('');
        setDebouncedEndDate('');
      } else if (startDate && endDate && isFullDate(endDate)) {
        setDebouncedStartDate(startDate);
        setDebouncedEndDate(endDate);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [startDate, endDate, delay]);

  const isValid =
    (!startDate && !endDate) ||
    (!!startDate && !!endDate && isFullDate(endDate));

  return {
    debouncedStartDate,
    debouncedEndDate,
    isValid,
  };
};
