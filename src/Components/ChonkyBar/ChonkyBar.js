import React from "react";

import "./ChonkyBar.css";

const ChonkyBar = ({ persantage, color }) => {
  return (
    <div className="bar" style={{ backgroundColor: `${color}50`}}>
      <div className="bar__progress" style={{ width: `${persantage}%`, backgroundColor: color }}/>
    </div>
  )
};

export default ChonkyBar;