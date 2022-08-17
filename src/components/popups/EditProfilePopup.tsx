import React from 'react';
import { useSelector } from 'react-redux';
import { useFormWithValidation } from '../../utils/Validator';
import PopupWithForm from './PopupWithForm';
import TextField from '../TextField/TextField';
import { selectData } from '../user/userSlice';

import { IValid } from '../../interfaces/IValid';

interface IProps {
  isOpen: boolean,
  onClose: any,
  isLoading: boolean,
  onUpdateUser: (data: Record<string, string>) => void,
}

function EditProfilePopup(props: IProps) {
  const { user } = useSelector(selectData);
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
    onUpdateUser(values);
  };

  React.useEffect(() => {
    values.name = user.name;
    values.about = user.about;
  }, [isOpen, user]);

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
        label="about"
        value={values.about || ''}
        name="about"
        id="about-input"
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
