import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup.js";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

function App() {

  const initialData = {
    email: "",
    password: ""
  }
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState(initialData);
  const [isRegistrationSuccessed, setIsRegistrationSuccessed] = React.useState(false);
  const history = useHistory();


  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .editAvatar(link)
      .then((newLink) => {
        setCurrentUser(newLink);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const likeRequest = !isLiked
      ? api.putLike(card._id)
      : api.deleteLike(card._id);
    likeRequest.then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipOpen(false);
  }

  const handleLogin = ({email, password}) => {
    return auth.authorize(email, password)
    .then(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setEmail(email);
        history.push("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }


  const tokenCheck = React.useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.getUserInfo(token)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setEmail(res.email);
        }
        history.push("/")
      })
      .catch(() => history.push("/sign-in"))
    }
  }, [history])

  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  React.useEffect(() => {
    if(loggedIn) {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      }); 

      api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  const handleRegister = ({email, password}) => {
    return auth.register(email, password)
    .then(res => {
      setIsRegistrationSuccessed(true);
      setIsInfoTooltipOpen(true);
      history.push("/sign-in");
      return res;
    })
    .catch((err) => {
      setIsInfoTooltipOpen(true)
      console.log(err);
    })
  }

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setEmail(initialData);
    setLoggedIn(false);
    history.push("/login");
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} onSignOut={handleSignOut} email={email} />

          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} tokenCheck={tokenCheck} />
            </Route>

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onSignOut={handleSignOut}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSuccessed={isRegistrationSuccessed}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;