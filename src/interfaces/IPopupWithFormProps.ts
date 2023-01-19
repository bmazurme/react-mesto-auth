export interface IPopupWithFormProps {
  name: string,
  isOpen: boolean,
  onClose: () => void,
  onSubmit: any,
  title: string,
  buttonText: string,
  isValid: boolean,
}
