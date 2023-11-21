import React from "react";
import "./style.css";
import Button from "../buttons/Button";

export const BasicPopup = ({ open,heading, data, onCancel, onYes }) => {
  return open ? (
    <div className="popup-container">
      <div className="popup-body">
        <header className="heading">{heading}</header>

        <div className="popup-buttons">
          <button className="cancel-btn" onClick={onCancel}>
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
