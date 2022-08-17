import React from 'react';
import PopupWithForm from './PopupWithForm';
import TextField from '../TextField/TextField';
import { useFormWithValidation } from '../../utils/Validator';

import { IValid } from '../../interfaces/IValid';

interface IProps {
  isOpen: boolean,
  onClose: any,
  isLoading: boolean,
  onUpdateAvatar: (data: Record<string, string>) => void,
}

function EditAvatarPopup(props: IProps) {
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
  } = useFormWithValidation() as IValid;

  const handleSubmit = (evt: SubmitEvent) => {
    evt.preventDefault();
    onUpdateAvatar(values);
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
        minLength={2}
        maxLength={300}
        errors={errors}
        required
        pattern={''}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
