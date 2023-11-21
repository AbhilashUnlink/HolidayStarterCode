import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import dayjs from "dayjs";
import "./style.css";
import InputField from "./InputField";

const BasicDatePicker = ({
  name,
  placeholder,
  label,
  value,
  required,
  holidays,
  onChange,
  maxDate,
  minDate
}) => {
  const [startDate, setStartDate] = useState(maxDate);
  return (
    <div className="form-group mb-1 flex-column">
      <label className="label">{label}</label>

      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        name={name}
        placeholder={placeholder}
        selected={startDate}
        onChange={(date) => {
          // setDate(date)
          onChange(name, date);
          setStartDate(date);
        }}
        showYearDropdown
        holidays={holidays}
        customInput={
          <div>
            {" "}
            <InputField
              onChange={() => {}}
              value={dayjs(startDate).format("DD MMMM, YYYY")}
            />
          </div>
        }
      />
    </div>
  );
};
export default BasicDatePicker;
