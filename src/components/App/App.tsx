import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

import { useSelector } from 'react-redux';
import { getUserAsync, selectData, setUserData } from '../user/userSlice';

import { ICard } from '../../interfaces/ICard';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectData);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState<ICard|null>(null);
  const [deletedCard, setDeletedCard] = React.useState<ICard|null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cards, setCards] = React.useState<ICard[]>([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
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
  const escFunction = (event: KeyboardEventInit) => {
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
  const handleCardClick = (card: ICard) => {
    setSelectedCard(card);
  };
  const handleCardDeleteConfirm = (card: ICard) => {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  };

  const handleCardLike = (card: ICard) => {
    const isLiked = card.likes.some((user) => user._id === currentUser.user._id);
    api
      .changeLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state: Array<ICard>) => state.map((c: ICard) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    dispatch<any>(getUserAsync());
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

  const handleUpdateUser = (data: Record<string, string>) => {
    setIsLoading(true);
    api
      .patchUser(data)
      .then((userInfo) => {
        dispatch(setUserData(userInfo));
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (data: Record<string, string>) => {
    setIsLoading(true);
    api
      .patchAvatar(data)
      .then((userInfo) => {
        dispatch(setUserData(userInfo));
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (card: ICard) => {
    setIsLoading(true);
    api
      .postCard(card)
      .then((newCard: ICard) => {
        const arr: Array<ICard> = [newCard, ...cards];
        setCards(arr);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card: ICard) => {
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

  const handleLoginSubmit = (data: Record<string, string>) => {
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

  const handleRegisterSubmit = (data: Record<string, string>) => {
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
  );
}

export default App;
