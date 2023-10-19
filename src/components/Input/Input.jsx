import React from "react";
import "./index.css";

export default ({ id, type, onChange, label, placeholder, errorText }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
      />
      {!!errorText && (
        <>
          <span className="error"></span>
          <p className="error-text">{errorText}</p>
        </>
      )}
    </>
  );
};
