import React from "react";

const InputField = ({
  label,
  name,
  value,
  required,
  type = "text",
  placeholder,
  onChange,
}) => {
  return (
    <div className="form-group mb-3">
      <label className="label">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        className="form-control"
        placeholder={placeholder}
        required={required}
        onChange={(e)=>onChange(name,e.target.value)}
      />
    </div>
  );
};

export default InputField;
