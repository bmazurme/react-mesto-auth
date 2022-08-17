import React from 'react';
import PopupWithForm from './PopupWithForm';
import TextField from '../TextField/TextField';
import { useFormWithValidation } from '../../utils/Validator';

import { IValid } from '../../interfaces/IValid';

interface IProps {
  isOpen: boolean,
  onClose: any,
  isLoading: boolean,
  onAddPlace: any,
}

function AddPlacePopup(props: IProps) {
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
  } = useFormWithValidation() as IValid;

  const handleSubmit = (evt: SubmitEvent) => {
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
        minLength={2}
        maxLength={30}
        errors={errors}
        required
        pattern={''}
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
        pattern={''}
        minLength={0}
        maxLength={200}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
