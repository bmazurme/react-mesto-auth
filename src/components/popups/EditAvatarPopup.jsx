import React from 'react';
import PopupWithForm from './PopupWithForm';
import TextField from '../TextField/TextField';
import { useFormWithValidation } from '../../utils/Validator';

function EditAvatarPopup(props) {
  const {
    isOpen,
    onClose,
    isLoading,
    onUpdateAvatar,
  } = props;

  const {
    values,
    errors,
    isValid,
    handleChange,
  } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar,
    });
  };

  React.useEffect(() => {
    values.avatar = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText={isLoading ? 'Загрузка...' : 'Сохранить'}
      isOpen={isOpen}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <TextField
        placeholder="Название"
        label="avatar"
        value={values.avatar || ''}
        name="avatar"
        id="avatar-input"
        autoComplete="off"
        className=""
        onChange={handleChange}
        type="text"
        minLength="2"
        errors={errors}
        required
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
