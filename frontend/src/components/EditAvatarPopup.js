import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
        avatarRef.current.value = ''
      }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="popup__input popup__input_edit_name"
        id="avatar-link-input"
        name="avatar"
        type="url"
        ref={avatarRef}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error" id="avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
