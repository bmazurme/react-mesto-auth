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

export const BASE_URL = '/';
export const SIGNIN_URL = '/sign-in';
export const SIGNUP_URL = '/sign-up';
export const EMAIL_REGEXP = '[a-z0-9._%+-]+@[a-z0-9.-]+[\.{0}][a-z]{2,3}$';
