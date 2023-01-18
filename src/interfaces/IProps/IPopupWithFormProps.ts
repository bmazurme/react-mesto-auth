export interface IPopupWithFormProps {
  name: string,
  isOpen: boolean,
  onClose: () => void,
  onSubmit: any,
  title: string,
  children: any,
  buttonText: string,
  isValid: boolean,
}
