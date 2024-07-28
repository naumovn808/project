import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 6;
    
    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
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
    
    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pageNumbers}>
        {renderPageNumbers()}
      </div>
      <span className={styles.divider}>|</span>
      <span className={styles.totalPages}>{totalPages}</span>
    </div>
  );
};

export default Pagination;