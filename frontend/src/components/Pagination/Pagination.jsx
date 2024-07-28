import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 6;

  const getPageRange = () => {
    let start = Math.max(1, Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages));
    let end = Math.min(start + maxVisiblePages - 1, totalPages);
    start = Math.max(1, end - maxVisiblePages + 1);
    return { start, end };
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const { start, end } = getPageRange();

    for (let i = start; i <= end; i++) {
      if (i === totalPages && end - start >= maxVisiblePages - 1) break;
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles.paginationButton} ${currentPage === i ? styles.active : ''}`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages || (end === totalPages && pageNumbers.length === maxVisiblePages)) {
      if (pageNumbers.length === maxVisiblePages) {
        pageNumbers.pop();
      }
      pageNumbers.push(
        <span key="divider" className={styles.divider}>|</span>
      );
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`${styles.paginationButton} ${currentPage === totalPages ? styles.active : ''}`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pageNumbers}>
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default Pagination;