export const config = {
  formSelector: '.form',
  inputSelector: '.text-field__input',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'button_submit_inactive',
  inputErrorClass: 'text-field__input_type_error',
  errorClass: 'text-field__input-error_active',
  forms: [
    '.form_type_edit',
    '.form_type_place',
    '.form_type_avatar',
    '.form_identity',
  ],
};

export const API = {
  PTH: 'https://mesto.nomoreparties.co/v1/cohort36',
  TOKEN: 'fcfa5c3a-c07d-49f3-a47d-0099ff285712'
};

export const AUTH_API = {
  PTH: 'https://auth.nomoreparties.co',
};
