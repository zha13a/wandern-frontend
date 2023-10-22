import React from "react";

import "./Table.css";

const Table = ({ colsCount, children, headers }) => {
  return (
    <div className="table default-grid" style={{ gridTemplateColumns: `repeat(${colsCount}, 1fr)` }}>
      {headers.map((header, index) => (
          <div className="table__header" key={index}>{header}</div>
        ))}
      {children}
    </div>
  );
};

export default Table;