import React, { useState } from "react";
import "./simple-input.styles.scss";

const SimpleInput = ({ isPassword, ...props }) => {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="simple-input">
      {isPassword ? (
        <div className="input-with-icon">
          <span
            onClick={() => setHidden((hidden) => !hidden)}
            class="material-icons"
          >
            {hidden ? "visibility_off" : "visibility"}
          </span>
          <input {...props} type={`${hidden ? "password" : "text"}`} />
        </div>
      ) : (
        <input {...props} />
      )}
    </div>
  );
};

export default SimpleInput;
