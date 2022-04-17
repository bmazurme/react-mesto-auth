import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  const [data, setData] = React.useState({
    name: '',
    link: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    console.log(e.target);
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(
      {
        name: data.name,
        link: data.link
      });
  }

  React.useEffect(() => { 
    setData({
      name: '',
      link: ''
    }); 
  }, [props.isOpen]); 

  return(
    <PopupWithForm title="Новое место" 
                   name="place" 
                   buttonText={props.isLoading 
                               ? 'Загрузка...' 
                               : 'Создать'}  
                   isOpen={props.isOpen} 
                   onClose={props.onClose}
                   onSubmit={handleSubmit}
    >
      <div className="form__box">
        <input placeholder="Название"
               onChange={handleChange} 
               value={data.name || ''}
               className="form__input form__input_type_name"
               required 
               minLength="2" 
               maxLength="30" 
               name="name" 
               id="placename-input"/>
          <span className="placename-input-error form__input-error"></span>
      </div>
      <div className="form__box">
        <input placeholder="Ссылка на картинку"
               onChange={handleChange}
               value={data.link || ''}
               name="link" 
               className="form__input form__input_type_link" 
               id="link-input" 
               required 
               type="url"/>
        <span className="link-input-error form__input-error"></span>
      </div>
    </PopupWithForm >
  );
}

export default AddPlacePopup;