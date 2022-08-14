import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SIGNIN_URL, SIGNUP_URL, BASE_URL } from '../../utils/config';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ImagePopup from '../popups/ImagePopup';
import EditProfilePopup from '../popups/EditProfilePopup';
import EditAvatarPopup from '../popups/EditAvatarPopup';
import AddPlacePopup from '../popups/AddPlacePopup';
import PopupWithConfirm from '../popups/PopupWithConfirm';
import InfoTooltip from '../popups/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SignIn from '../Sign/SignIn';
import SignUp from '../Sign/SignUp';

import api from '../../utils/Api';
import auth from '../../utils/Auth';

interface IUser {
  _id: number,
  avatar: string,
  name: string,
  about: string,
}

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState({id: ''});
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({_id: 0, avatar: '', name: '', about: ''});
  const [cards, setCards] = React.useState<any[]>([]); // React.useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard(null);
    setIsSuccess(false);
  };
  const escFunction = (event: any) => {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (card: any) => {
    setSelectedCard(card);
  };
  const handleCardDeleteConfirm = (card: any) => {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  };

  const handleCardLike = (card: any) => {
    const isLiked = card.likes.some((user: IUser) => user._id === currentUser._id);
    api
      .changeLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state: any) => state.map((c: any) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    api
      .getUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
    api
      .getCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push(BASE_URL);
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log('401 — Токен не передан или передан не в том формате.');
          }
          console.log(err);
        });
    }
  }, [history]);

  const handleUpdateUser = (data: any) => {
    setIsLoading(true);
    api
      .patchUser(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data: any) => {
    setIsLoading(true);
    api
      .patchAvatar(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (card: any) => {
    setIsLoading(true);
    api
      .postCard(card)
      .then((newCard: string[]) => {
        const arr: Array<any> = [newCard, ...cards];
        setCards(arr);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card: any) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((_card) => _card !== card);
        setCards(newCards);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleLoginSubmit = (data: any) => {
    auth
      .signIn(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setEmail(data.email);
        history.push(BASE_URL);
      })
      .catch((err) => {
        setIsInfoToolTipPopupOpen(true);
        setIsSuccess(false);
        if (err.status === 400) {
          console.log('400 - не передано одно из полей.');
        } else if (err.status === 401) {
          console.log('401 - пользователь с email не найден.');
        }
        console.log(err);
      });
  };

  const handleRegisterSubmit = (data: any) => {
    auth
      .signUp(data)
      .then(() => {
        setIsInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        history.replace({ pathname: SIGNIN_URL });
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей.');
        }
        console.log('400 - некорректно заполнено одно из полей');
        console.log(err);
        setIsInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setEmail('');
    history.push(SIGNIN_URL);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            exact
            path={BASE_URL}
            isLoggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDeleteConfirm}
            cards={cards}
            component={Main}
            isLoading={isLoading}
          />
          <Route path={SIGNIN_URL}>
            <SignIn onLogin={handleLoginSubmit} />
          </Route>
          <Route path={SIGNUP_URL}>
            <SignUp onRegister={handleRegisterSubmit} />
          </Route>
          <Route path="*">
            {
              isLoggedIn
                ? (<Redirect to={BASE_URL} />)
                : (<Redirect to={SIGNIN_URL} />)
            }
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <PopupWithConfirm
          isOpen={isConfirmPopupOpen}
          isLoading={isLoading}
          card={deletedCard}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          title="Вы уверены?"
          buttonText="Да"
        />
        <InfoTooltip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          text={
            isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
