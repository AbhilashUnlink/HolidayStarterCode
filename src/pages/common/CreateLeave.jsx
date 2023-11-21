import React, { useEffect, useState } from "react";
import Heading from "../../components/heading/Heading";
import InputField from "../../components/form-fields/InputField";
import Button from "../../components/buttons/Button";
import BasicDatePicker from "../../components/form-fields/BasicDatePicker";
import BasicSelect from "../../components/form-fields/BasicSelect";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import Toast from "../../components/toast/Toast";
import {
  createLeave,
  resetLeavesResponse,
} from "../../redux/features/leavesList";
import AuthWrappers from "../../components/wrappers/AuthWrappers"

const CreateLeave = () => {
  const initialState = {
    from: "2023-10-30T11:43:33.865Z",
    to: "2023-10-31T11:43:33.865Z",
    leaveType: "SICKLEAVE",
    reasonForLeave: "I am Sick",
  };
  const [form, setForm] = useState(initialState);
  const handleChange = (name, value) => {
    const newForm = form;
    setForm({ ...newForm, [name]: value });
  };
  const dispatch = useDispatch();

  const FormItems = [
    {
      name: "from",
      placeholder: "From",
      label: "From (DD/MM/YYYY)",
      value: form.from,
      required: false,
      datePicker: true,
    },
    {
      name: "to",
      placeholder: "To",
      label: "To (DD/MM/YYYY)",
      value: form.to,
      required: false,
      datePicker: true,
    },
    {
      required: false,
      name: "leaveType",
      label: "Leave Type",
      options: [
        { label: "Casual Leave", value: "CASUALLEAVE" },
        { label: "Sick Leave", value: "SICKLEAVE" },
        { label: "Earned Leave", value: "EARNEDLEAVE" },
      ],
      select: true,
      defaultValue: "SICKLEAVE",
    },
    {
      name: "reasonForLeave",
      placeholder: "reasonForLeave",
      label: "Reason For Leave",
      value: form.reasonForLeave,
      required: false,
    },
  ];

  const columnWidth = { two: "48%", three: "32%", one: "94%" };
  const columns = columnWidth.one;
  const [toast, setToast] = useState({ open: false, message: "", type: "" });
  const { open, message, type } = toast;
  const { response, loading } = useSelector((store) => store?.leaves);

  useEffect(() => {
    if (response && response?.status === 200) {
      console.log("I am here");
      setToast({
        open: true,
        message: "Leave Created Successfully !",
        type: "success",
      });
      dispatch(resetLeavesResponse());
    }
  }, [dispatch, response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(createLeave(form));
  };
  
  return (
    <>
      <Loader loading={loading} />
      <Toast show={open} type={type} message={message} />
      <AuthWrappers
        showLogo={false}
        rightHeader="Apply Leave"
        rightSubHeader="Welcome to the Portal for leave applying "
        onClick={() => {}}
        button={"Profile"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "50%",
            padding: "2rem",
          }}
        >
          <Heading  title="Create Leave" />

          {FormItems.map(
            (
              {
                name,
                placeholder,
                label,
                value,
                required,
                datePicker = false,
                holidays,
                select = false,
                options,
                defaultValue,
              },
              index
            ) => {
              return datePicker ? (
                <div key={index} style={{ width: columns }}>
                  <BasicDatePicker
                    name={name}
                    placeholder={placeholder}
                    label={label}
                    value={form.birthday}
                    required={false}
                    holidays={holidays}
                    onChange={handleChange}
                    minDate={new Date()}
                  />
                </div>
              ) : select ? (
                <div key={index} style={{ width: columns }}>
                  <BasicSelect
                    label={label}
                    options={options}
                    name={name}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div key={index} style={{ width: columns }}>
                  <InputField
                    key={index}
                    name={name}
                    value={value}
                    label={label}
                    required={required}
                    placeholder={placeholder}
                    onChange={handleChange}
                    X
                  />
                </div>
              );
            }
          )}
          <div style={{width:"94%",marginTop:"1rem"}}>

          <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </AuthWrappers>
    </>
  );
};

export default CreateLeave;
