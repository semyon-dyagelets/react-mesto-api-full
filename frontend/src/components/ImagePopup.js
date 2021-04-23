function ImagePopup(props) {
    return (
        <div className={`popup popup_type-image-caption ${props.card ? 'popup_opened' : ''}`}>
            <div className="popup__image-container">
                <img 
                className="popup__caption-image" 
                src={props.card ? props.card.link : ''} 
                alt={props.card ? props.card.name : ''} />
                <h2 className="popup__caption-image-title">{props.card ? props.card.name : ''}</h2>
                <button 
                className="popup__button-close" 
                type="button" 
                onClick={props.onClose}>
                </button>
            </div>
        </div>
    )
}

export default ImagePopup;