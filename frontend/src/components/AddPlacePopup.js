import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
    nameRef.current.value = ''
    linkRef.current.value = ''
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Добавить"
    >
      <input
        className="popup__input popup__input_edit_name"
        id="place-name-input"
        name="name"
        ref={nameRef}
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        required
      />
      <span className="popup__input-error" id="place-name-input-error"></span>
      <input
        className="popup__input popup__input_edit_description"
        id="place-link-input"
        name="link"
        ref={linkRef}
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error" id="place-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
