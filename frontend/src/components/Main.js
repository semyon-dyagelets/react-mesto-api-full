import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="page">
      <main>
        <section className="profile">
          <div className="profile__container">
            <div className="profile__avatar-container">
              <img
                className="profile__avatar"
                src={currentUser.avatar}
                alt="аватар"
              />
              <button
                className="profile__edit-button profile__edit-avatar-button"
                type="button"
                aria-label="редактировать-аватар"
                onClick={props.onEditAvatar}
              />
            </div>
            <div className="profile__info">
              <div className="profile__description">
                <h1 className="profile__name">{currentUser.name}</h1>
                <p className="profile__profession">{currentUser.about}</p>
              </div>
              <button
                className="profile__edit-button profile__edit-description-button"
                type="button"
                aria-label="редактировать-профиль"
                onClick={props.onEditProfile}
              />
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="добавить-фото"
            onClick={props.onAddPlace}
          />
        </section>

        <section className="elements" aria-label="Фотографии">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;
