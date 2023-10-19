import React from "react";
import './index.css';
const Option = ({ option, isSelected, onClick}) => {
  return (
    <li
      key={option.value}
      onClick={onClick}
      className={`dropdown-option ${isSelected && "option-selected"}`}
    >
      {option.label}
    </li>
  );
};

export default Option;
