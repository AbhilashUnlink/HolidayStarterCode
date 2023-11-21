import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const BasicSelect = ({
  name,
  placeholder,
  onChange,
  label,
  options,
  defaultValue = "",
}) => {
  const [selected, setSelected] = useState(defaultValue);
  return (
    <FormControl className="form-group" fullWidth>
      <label className="label">{label}</label>
      <Select
        name={name}
        sx={{
          background: "#f2f2f2",
          borderRadius: "50px",
          height: "3rem",
          paddingLeft: ".5rem",
        }}
        value={selected}
        onChange={(event) => {
          onChange(event.target.name, event.target.value);
          setSelected(event.target.value);
        }}
      >
        {options?.map((itm, index) => (
          <MenuItem key={index} value={itm.value}>
            {itm.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
