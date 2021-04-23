import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDesсriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      buttonText="Сохранить"
    >
      <input
        className="popup__input popup__input_edit_name"
        id="name-input"
        name="name"
        type="text"
        value={name || ""}
        onChange={handleNameChange}
        minLength="2"
        maxLength="40"
        required
      />
      <span 
      className="popup__input-error" 
      id="name-input-error">
      </span>
      <input
        className="popup__input popup__input_edit_description"
        id="description-input"
        name="about"
        type="text"
        value={description || ""}
        onChange={handleDesсriptionChange}
        minLength="2"
        maxLength="200"
        required
      />
      <span 
      className="popup__input-error" 
      id="description-input-error">
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
