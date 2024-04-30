function Pagination({ currentPage, totalPages, onNextPage, onPrevPage }) {
  return (
    <div className="pagination-style">
      <button onClick={onPrevPage} disabled={currentPage === 1}>Previous Page</button>

      <span>{currentPage}/{totalPages}</span> 

      <button onClick={onNextPage} disabled={currentPage === totalPages}>Next Page</button>
    </div>
  );
}

export default Pagination;
