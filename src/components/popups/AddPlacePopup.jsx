import React from 'react';
import PopupWithForm from './PopupWithForm';
import TextField from '../TextField/TextField';
import { useFormWithValidation } from '../../utils/Validator';

function AddPlacePopup(props) {
  const {
    isOpen,
    onClose,
    isLoading,
    onAddPlace,
  } = props;

  const {
    values,
    errors,
    isValid,
    handleChange,
  } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace(
      {
        name: values.name,
        link: values.link,
      },
    );
  };

  React.useEffect(() => {
    values.name = '';
    values.link = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      isValid={isValid}
      buttonText={isLoading ? 'Загрузка...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <TextField
        placeholder="Название"
        label="name"
        value={values.name || ''}
        name="name"
        id="name-input"
        autoComplete="off"
        className=""
        onChange={handleChange}
        type="text"
        minLength="2"
        maxLength="30"
        errors={errors}
        required
      />

      <TextField
        placeholder="Ссылка на картинку"
        label="link"
        onChange={handleChange}
        value={values.link || ''}
        name="link"
        id="link-input"
        autoComplete="off"
        className=""
        type="text"
        errors={errors}
        required
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
