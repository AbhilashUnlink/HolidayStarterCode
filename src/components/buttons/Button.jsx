import React from 'react'

const Button = ({ children, onClick, className, style }) => {
  return (
    <div className="form-group" onClick={onClick} style={style}>
      <button
        type="submit"
        className={`form-control btn btn-primary submit px-3 ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button