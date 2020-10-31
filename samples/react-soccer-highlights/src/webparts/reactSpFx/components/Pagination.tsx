import React from "react";

const Pagination = ({ highLightsPerPage, totalHighlights, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalHighlights / highLightsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination" style={{ marginLeft: "10px" }}>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
