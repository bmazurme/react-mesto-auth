import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [data, setData] = React.useState({
    name: '',
    profession: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  React.useEffect(() => {
    setData({
      name: currentUser.name,
      profession: currentUser.about
    });
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: data.name,
      about: data.profession
    });
  }
  
  return(
    <PopupWithForm title="Редактировать профиль" 
                   name="edit"
                   buttonText={props.isLoading 
                               ? 'Загрузка...' 
                               : 'Сохранить'}  
                   isOpen={props.isOpen}
                   onClose={props.onClose}
                   onSubmit={handleSubmit}
    >
    <div className="form__box">
      <input placeholder="Имя"
             onChange={handleChange} 
             className="form__input 
                        form__input_type_name" 
             name="name" 
             required
             minLength="2" 
             maxLength="40" 
             id="name-input" 
             value={data.name || ''}
      />
      <span className="name-input-error 
                       form__input-error"></span>
    </div>

    <div className="form__box">
      <input placeholder="Профессия"
             onChange={handleChange} 
             className="form__input form__input_type_profession" 
             name="profession"
             required 
             minLength="2" 
             maxLength="200" 
             id="profession-input" 
             value={data.profession || ''}
      />
      <span className="profession-input-error 
                       form__input-error"></span>
    </div>
  </PopupWithForm>
  );
}

export default EditProfilePopup;