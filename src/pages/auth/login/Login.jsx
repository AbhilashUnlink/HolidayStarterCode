import React, { useEffect, useState } from "react";
import "./login.css";
import AuthWrappers from "../../../components/wrappers/AuthWrappers";
import InputField from "../../../components/form-fields/InputField";
import Button from "../../../components/buttons/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import { saveProfile } from "../../../redux/features/auth";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../../components/heading/Heading";
const Login = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((store) => store?.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (profile?.token) {
      navigate("/");
    }
  }, [navigate, profile]);
  const [form, setForm] = useState({
    email: "abhilash@gmail.com",
    password: "Abhilash@123",
  });
  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveProfile(form));
  };
  return (
    <>
      <Loader loading={loading} />
      <AuthWrappers
        rightHeader={"Welcome to Login"}
        rightSubHeader="Don't have an Account?"
        button="Sign up"
        onClick={() => {}}
      >
        <div className="login-wrap p-4 p-lg-5">
          <Heading title="Sign in" />
          <InputField
            name="email"
            value={form.email}
            label="Email Address"
            required=""
            placeholder="Email Address"
            onChange={handleChange}
          />
          <InputField
            name="password"
            label="Password"
            value={form.password}
            required=""
            placeholder="Password"
            onChange={handleChange}
          />
          <div style={{marginTop:"2rem"}}>
          <Button onClick={handleSubmit}>Login</Button>
          </div>
            
          <div className="form-group d-md-flex">
            <div className="w-100 text-md-right">
              <NavLink to="/forgot">Forgot Password?</NavLink>
            </div>
          </div>
        </div>
      </AuthWrappers>
    </>
  );
};

export default Login;
