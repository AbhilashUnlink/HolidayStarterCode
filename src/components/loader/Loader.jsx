import React from "react";
import "./style.css";
import loaderImage from "../assets/loader.gif";

const Loader = ({ loading = false }) => {
  return (
    <>
      {loading ? (
        <div className="loader-div">
          <img className="loader" alt="loaderImage" src={loaderImage} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loader;
