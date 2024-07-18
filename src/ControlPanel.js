import React from "react";
import "./styles/ControlPanel.css";

const ControlPanel = ({ onUserClick }) => {
  const handleClick = (argument) => {
    if (onUserClick) {
      onUserClick(argument);
    }
  };
  return (
    <div className="ControlPanel">
      <button className="control-button" onClick={() => handleClick("start")}>
        Start
      </button>
      <button className="control-button" onClick={() => handleClick("pause")}>
        Pause
      </button>
      <button className="control-button" onClick={() => handleClick("reset")}>
        Reset
      </button>
    </div>
  );
};

export default ControlPanel;
