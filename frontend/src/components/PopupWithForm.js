import React from "react";

function PopupWithForm(props) {
  React.useEffect(() => {
    if (!props.isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        props.onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  });

  return (
    <div
      className={`popup ${props.isOpen ? "popup_opened" : ""} popup_type-${props.name}`}
    >
      <form
        className="popup__container popup__container_edit-form"
        name={`${props.name}`}
        method="POST"
        onSubmit={props.onSubmit}
        noValidate
      >
        <h3 className="popup__edit-profile">{`${props.title}`}</h3>
        {props.children}
        <button 
        className="popup__button-save" 
        type="submit">
          {`${props.buttonText}`}
        </button>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
