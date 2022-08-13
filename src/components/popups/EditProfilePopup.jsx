import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/Validator';
import PopupWithForm from './PopupWithForm';
import TextField from '../TextField/TextField';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    isLoading,
    isOpen,
    onClose,
    onUpdateUser,
  } = props;

  const {
    values,
    errors,
    isValid,
    handleChange,
  } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.profession,
    });
  };

  React.useEffect(() => {
    values.name = currentUser.name;
    values.profession = currentUser.about;
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText={isLoading ? 'Загрузка...' : 'Сохранить'}
      isOpen={isOpen}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <TextField
        placeholder="Имя"
        label="name"
        value={values.name || ''}
        name="name"
        id="name-input"
        autoComplete="off"
        className=""
        onChange={handleChange}
        type="text"
        minLength="2"
        maxLength="40"
        errors={errors}
        required
      />
      <TextField
        placeholder="Профессия"
        label="profession"
        value={values.profession || ''}
        name="profession"
        id="profession-input"
        autoComplete="off"
        className=""
        onChange={handleChange}
        type="text"
        minLength="2"
        maxLength="200"
        errors={errors}
        required
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
