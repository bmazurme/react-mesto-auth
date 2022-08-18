import React from 'react';
import {
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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

import { Urls } from '../../utils/constants';

import { selectData, setUserData } from '../user/userSlice';

import { ICard } from '../../interfaces/interfaces';

function App() {
  const navigate = useNavigate();
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

  const handleCloseAllPopups = () => {
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
      handleCloseAllPopups();
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

  const handleCardLikeClick = (card: ICard) => {
    const isLiked = card.likes.some((user) => user._id === currentUser.user._id);
    api
      .changeLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state: Array<ICard>) => state.map((c: ICard) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    api
      .getUser()
      .then((userInfo) => {
        dispatch(setUserData(userInfo));
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
          navigate(Urls.BASE);
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log('401 — Токен не передан или передан не в том формате.');
          }
          console.log(err);
        });
    }
  }, [history]);

  const handleUpdateUserSubmit = (data: Record<string, string>) => {
    setIsLoading(true);
    api
      .patchUser(data)
      .then((userInfo) => {
        dispatch(setUserData(userInfo));
        setIsLoading(false);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatarSubmit = (data: Record<string, string>) => {
    setIsLoading(true);
    api
      .patchAvatar(data)
      .then((userInfo) => {
        dispatch(setUserData(userInfo));
        setIsLoading(false);
        handleCloseAllPopups();
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
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card: ICard|Record<string, string>) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((_card) => _card !== card);
        setCards(newCards);
        setIsLoading(false);
        handleCloseAllPopups();
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
        navigate(Urls.BASE);
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
        navigate(Urls.SIGNIN)
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
    navigate(Urls.SIGNIN);
  };

  return (
    <div className="page">
      <Header
        email={email}
        onSignOut={handleSignOut}
      />
      <Routes>
        <Route
          path={Urls.SIGNIN}
          element={(<SignIn onLogin={handleLoginSubmit} />)}
        />

        <Route
          path={Urls.SIGNUP}
          element={(<SignUp onRegister={handleRegisterSubmit} />)}
        />

        <Route
          path={Urls.BASE}
          element={(
            <ProtectedRoute
              loggedIn={isLoggedIn}
            >
              <Main
                path={Urls.BASE}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                handleCardLike={handleCardLikeClick}
                handleCardDelete={handleCardDeleteConfirm}
                cards={cards}
                component={Main}
                isLoading={isLoading}
              />
            </ProtectedRoute>
          )}
        />
      </Routes>

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={handleCloseAllPopups}
        onUpdateUser={handleUpdateUserSubmit}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={handleCloseAllPopups}
        onUpdateAvatar={handleUpdateAvatarSubmit}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={handleCloseAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />
      <ImagePopup
        card={selectedCard}
        onClose={handleCloseAllPopups}
      />
      <PopupWithConfirm
        isOpen={isConfirmPopupOpen}
        isLoading={isLoading}
        card={deletedCard}
        onClose={handleCloseAllPopups}
        onSubmit={handleCardDelete}
        title="Вы уверены?"
        buttonText="Да"
      />
      <InfoTooltip
        isOpen={isInfoToolTipPopupOpen}
        onClose={handleCloseAllPopups}
        isSuccess={isSuccess}
        text={
          isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
        }
      />
    </div>
  );
}

export default App;
