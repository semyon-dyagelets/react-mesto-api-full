import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (`${isOwn ? 'element__delete' : 'element__delete_hidden'}`); 

    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (`${isLiked ? 'element__like_active' : 'element__like'}`);

    function handleCardClick() {
        props.onCardClick({
            name: props.card.name,
            link: props.card.link,
        })
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    } 

    return (
        <article className="element">
            <img className="element__photo" 
            src={props.card.link} 
            alt={props.card.name} 
            onClick={handleCardClick} />
            <button className={cardDeleteButtonClassName}
                type="button"
                aria-label="удалить"
                onClick={handleDeleteClick}>
            </button>
            <div className="element__container">
                <h2 className="element__place-name">{props.card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName}
                        type="button"
                        aria-label="лайк"
                        onClick={handleLikeClick}>
                    </button>
                    <p className="element__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;