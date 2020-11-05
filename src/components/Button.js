import React from "react";
import "./Button.scss";
const classNames = require('classnames');


export const Button = p => {
  
  const buttonClass = classNames('button',
    {
      'button--confirm': p.confirm,
      'button--danger': p.danger
    });

  return (
    <button disabled={p.disabled}
      onClick={p.onClick}
      className={buttonClass}>
      {p.children}
    </button>
  );
};
