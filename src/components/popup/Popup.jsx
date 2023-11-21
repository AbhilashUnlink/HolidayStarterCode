import React from "react";
import "./style.css";
import Button from "../buttons/Button";
import avatar from "../assets/maleavatar.png";
import femaleAvatar from "../assets/femaleAvatar.png";
export const Popup = ({ open, data, onCancel, onYes }) => {
    
    const gender = data?.popData?.gender;
  return open ? (
    <div className="popup-container">
      <div className="popup-body">
        <header className="heading">Do you really wish to Delete?</header>
        <img
          style={{ width: "10rem",marginTop:"8px" }}
          src={gender.toUpperCase() === "MALE" ? avatar : femaleAvatar}
          alt="avatar"
        />
        <h1>{data?.popData?.firstName}</h1>
        <div
          style={{
            display: "flex",
            gap: "3rem",
            justifyContent: "space-around",
            position: "absolute",
            bottom: "5px",
            left: "9rem",
          }}
        >
          <button
            style={{
              background: "gray",
              border: "none",
              borderRadius: "50px",
              width: "10rem",
              height: "3rem",
              color: "white",
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <Button onClick={onYes} style={{ width: "10rem" }}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
