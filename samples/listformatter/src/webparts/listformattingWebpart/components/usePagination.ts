import { useState } from 'react';

interface UsePaginationReturnType {
  currentPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  resetPage: () => void;
}

const usePagination = (totalItems: number, pageSize: number): UsePaginationReturnType => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = (): void => {
    if (currentPage < Math.ceil(totalItems / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetPage = (): void => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    handleNextPage,
    handlePreviousPage,
    resetPage,
  };
};

export default usePagination;