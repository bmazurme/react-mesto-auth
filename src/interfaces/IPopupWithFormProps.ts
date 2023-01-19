export interface IPopupWithFormProps {
  name: string,
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (evt: Event) => void,
  title: string,
  buttonText: string,
  isValid: boolean,
}
