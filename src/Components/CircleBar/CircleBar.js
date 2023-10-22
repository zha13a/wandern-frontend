import React from "react";
import "./CircleBar.css";

const CircleBar = ({ percentage, stroke }) => {
  return (
    <div className="table__cell circle-cell">
      <span className="percentage-label">{Math.round(percentage)}%</span>
      <svg className="progress-ring" width="70" height="70">
        <circle 
          className="progress-ring__bg-circle" cx="35" cy="35" r="30" 
          strokeWidth="10"
          style={{ stroke: `${stroke}50` }}
        />
        <circle 
          className="progress-ring__circle" cx="35" cy="35" r="30" 
          strokeWidth="10"
          style={
            { 
              strokeDashoffset: 188 - (188 * Math.round(percentage) / 100), 
              stroke: Math.round(percentage) < 1 ? '#00000000' : stroke,
            }
          }
        />
      </svg>
    </div>
  );
};

export default CircleBar;