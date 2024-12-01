import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange, justify = "justify-center", ptb50 = "ptb50" }) => {
  const getVisiblePages = () => {
    const visiblePages = [];
    if (totalPages <= 5) {
      // Если страниц 5 или меньше, показываем все
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Для большого количества страниц
      if (currentPage <= 3) {
        visiblePages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        visiblePages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        visiblePages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return visiblePages;
  };

  const handlePageClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={`${styles.pagination} ${styles[justify]} ${styles[ptb50]}`}>
      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}
          onClick={() => handlePageClick(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
