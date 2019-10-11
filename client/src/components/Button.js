import React from "react";
import "./Button.scss";
import cx from "classnames";

const Button = ({ className, onClick, children }) => (
  <button className={cx("Button", className)} onClick={onClick}>
    {children}
  </button>
);

export default Button;
