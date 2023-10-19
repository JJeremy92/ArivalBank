import React, { useState } from "react";

import Option from "./Option";
import "./index.css";

const Select = ({ options, onSelect, placeholder, currentOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(currentOption);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div
        className={`dropdown-toggle ${!selectedOption && "placeholder"}`}
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <Option
              key={`select-option ${index}`}
              onClick={() => handleOptionClick(option)}
              option={option}
              isSelected={option === selectedOption}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
