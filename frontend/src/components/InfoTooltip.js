import React from "react";
import authsucess from "../images/register-sucess.svg";
import authfail from "../images/register-error.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup ${
        props.isOpen ? "popup_opened" : ""
      } popup_type-info-tooltip`}
    >
      <div className="popup__info-tooltip-container">
          <img
            className="info-tooltip__image"
            src={props.isSuccessed ? authsucess : authfail}
            alt="статус регистрации"
          />
          <p className="info-tooltip__text">
              {props.isSuccessed ? "Вы успешно зарегистрировались!" : "Что-то пошло не так. Попробуйте ещё раз."}
            </p>
          <button
          className="popup__button-close popup__button-close_white"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
