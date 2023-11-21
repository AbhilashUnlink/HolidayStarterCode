import React from "react";
import "./style.css";
import logo from "../assets/logo.png";

const AuthWrappers = ({
  children,
  rightHeader,
  rightSubHeader,
  onClick,
  button,
  showLogo = true,
}) => {
  return (
    <>
      <section className="ftco-section">
        <div className="container">
          {showLogo && (
            <div className="row justify-content-center">
              <div className="col-md-6 text-center mb-5">
                <img className="heading-section" src={logo} alt="logo" />
              </div>
            </div>
          )}

          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                  <div className="text w-100">
                    <h2>{rightHeader}</h2>
                    <p>{rightSubHeader}</p>
                    <div
                      className="btn btn-white btn-outline-white"
                      onClick={onClick}
                    >
                      {button}
                    </div>
                  </div>
                </div>

                {children}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthWrappers;
