import React from "react";

import "./Modal.css";

const Modal = ({ children, isOpen, toggleFunction }) => {
  const handleBgClick = (e) => {
    e.target === e.currentTarget && toggleFunction();
  }

  return (
    <div className={`modal ${isOpen ? "modal_visible" : ""}`} onClick={handleBgClick}>
      <div className="modal__card">
        <button className="modal__close-btn" onClick={toggleFunction}>x</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;