import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ label, icon, ...props }) => {
  return (
    <div className="form-input">
      {label ? <label>{label}</label> : null}
      <div className={`input-container ${icon ? "input-icon" : ""}`}>
        {icon}
        <input {...props} />
      </div>
    </div>
  );
};

export default FormInput;
