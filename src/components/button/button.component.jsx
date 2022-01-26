import React from "react";
import "./button.styles.scss";

const Button = ({ children, type, disabled, ...props }) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`btn ${type === "main" ? "btn-main" : "btn-secondary"} `}
    >
      {children}
    </button>
  );
};

export default Button;
