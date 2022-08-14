import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/Validator';
import PopupWithForm from './PopupWithForm';
import TextField from '../TextField/TextField';

interface IProps {
  isOpen: boolean,
  onClose: any,
  isLoading: boolean,
  onUpdateUser: (data: {name: string, about: string}) => void,
}

interface IValid {
  values: any,
  errors: any,
  isValid: boolean,
  handleChange: any,
}

interface IUser {
  _id: number,
  avatar: string,
  name: string,
  about: string,
}

function EditProfilePopup(props: IProps) {
  const currentUser = React.useContext(CurrentUserContext) as IUser;
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
  } = useFormWithValidation() as IValid;

  const handleSubmit = (evt: SubmitEvent) => {
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
        minLength={2}
        maxLength={40}
        errors={errors}
        required
        pattern={''}
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
        minLength={2}
        maxLength={200}
        errors={errors}
        required
        pattern={''}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
