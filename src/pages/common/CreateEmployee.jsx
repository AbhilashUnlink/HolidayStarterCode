import React, { useEffect, useState } from "react";
import Heading from "../../components/heading/Heading";
import InputField from "../../components/form-fields/InputField";
import Button from "../../components/buttons/Button";
import BasicDatePicker from "../../components/form-fields/BasicDatePicker";
import BasicSelect from "../../components/form-fields/BasicSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  resetCreateEmployee,
} from "../../redux/features/createEmployee";
import Loader from "../../components/loader/Loader";
import Toast from "../../components/toast/Toast";
import dayjs from "dayjs";

const CreateEmployee = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthday: dayjs().subtract(18, "year").toDate(),
    gender: "Male",
    userType: "USER",
    organisationId: "695eb55f-1ed5-4c63-9ff9-eb3b6d38556b",
    street: "",
    city: "",
    // landmark: "",
    state: "",
    postalCode: "",
    country: "India",
    casualleave: 7,
    sickleave: 7,
    earnedleave: 7,
  };
  const [form, setForm] = useState(initialState);
  const handleChange = (name, value) => {
    const newForm = form;
    setForm({ ...newForm, [name]: value });
  };
  const dispatch = useDispatch();

  const FormItems = [
    {
      name: "firstName",
      placeholder: "Enter First Name",
      label: "First Name",
      value: form.firstName,
      required: false,
    },
    {
      name: "lastName",
      placeholder: "Enter Last Name",
      label: "Last Name",
      value: form.lastName,
      required: false,
    },
    {
      name: "birthday",
      placeholder: "Enter Your Date Of Birth",
      label: "Birthday (DD/MM/YYYY)",
      value: form.birthday,
      required: false,
      datePicker: true,
      holidays: [{ date: "1998-09-18", holidayName: "Abhilash's BirthDay" }],
    },
    {
      name: "email",
      placeholder: "Email Address",
      label: "Email",
      value: form.email,
      required: false,
    },
    {
      name: "password",
      placeholder: "Enter Password",
      label: "Password",
      value: form.password,
      required: false,
    },
    {
      required: false,
      name: "gender",
      label: "Gender",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
      ],
      select: true,
      defaultValue: "Male",
    },
    {
      required: false,
      name: "userType",
      label: "User Type",
      options: [
        { label: "System Admin", value: "SYSADMIN" },
        { label: "Employee", value: "USER" },
      ],
      select: true,
      defaultValue: "USER",
    },
    {
      required: false,
      name: "casualleave",
      label: "Casual Leave",
      options: [
        { label: "Seven", value: 7 },
        { label: "Eight", value: 8 },
        { label: "Nine", value: 9 },
      ],
      select: true,
      defaultValue: 7,
    },
    {
      required: false,
      name: "sickleave",
      label: "Sick Leave",
      options: [
        { label: "Seven", value: 7 },
        { label: "Eight", value: 8 },
        { label: "Nine", value: 9 },
      ],
      select: true,
      defaultValue: 7,
    },

    {
      required: false,
      name: "earnedleave",
      label: "Earned Leave",
      options: [
        { label: "Seven", value: 7 },
        { label: "Eight", value: 8 },
        { label: "Nine", value: 9 },
      ],
      select: true,
      defaultValue: 7,
    },
    {
      name: "city",
      placeholder: "City",
      label: "City",
      value: form.city,
      required: false,
    },
    {
      name: "street",
      placeholder: "Street",
      label: "Street",
      value: form.street,
      required: false,
    },
    {
      name: "state",
      placeholder: "State",
      label: "State",
      value: form.state,
      required: false,
    },
    {
      name: "postalCode",
      placeholder: "Postal Code",
      label: "Postal Code",
      value: form.postalCode,
      required: false,
    },
    {
      required: false,
      name: "country",
      label: "Country",
      options: [{ label: "India", value: "India" }],
      select: true,
      defaultValue: "India",
    },
  ];

  const columnWidth = { two: "48%", three: "32%" };
  const columns = columnWidth.three;
  const [showToast, setToast] = useState(false);
  const { loading, response } = useSelector((store) => store.createEmployee);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (response) {
      if (response?.status === 201) {
        setToast(true);
        setMessage(
          `Congratulations ${response?.data?.firstName} has been Onboarded!`
        );
        setType("success");
        setForm(initialState);
        dispatch(resetCreateEmployee());
      } else {
        setToast(true);
        setMessage(`Something Went Wrong !!`);
        setType("error");
      }
    }
  }, [dispatch, initialState, response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    dispatch(createEmployee(form));
  };
  return (
    <>
      <Loader loading={loading} />
      <Toast show={showToast} type={type} message={message} />
      <Heading className="p-4" title="Enter Details" />

      <>
        <div
          className="p-4 "
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
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
                    maxDate={dayjs().subtract(18, "year").toDate()}
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
        </div>
        <div style={{ width: "20%", margin: "0 auto" }}>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        <div className="form-group d-md-flex">
          <div className="w-100 text-md-right">
            {/* <NavLink to="/forgot">Forgot Password?</NavLink> */}
          </div>
        </div>
      </>
    </>
  );
};

export default CreateEmployee;
