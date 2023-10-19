import React from "react";
import "./index.css";

export default ({ stages, currentStage }) => {
  return (
    <div className="stage-container">
      {stages.map((stage, index) => (
        <span className="stage-item" key={`Stage-process-${index}`}>
          <span className={`stage-item-status ${currentStage === index && "active"} `}></span>
          {stage}
        </span>
      ))}
    </div>
  );
};
