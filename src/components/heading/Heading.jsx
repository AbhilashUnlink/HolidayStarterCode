import React from 'react'

const Heading = ({title,className}) => {
  return (
    <div className="d-flex">
      <div className={`w-100 ${className}`}>
        <h2 style={{ fontWeight: "800" }} className="mb-4">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default Heading