export interface IPopupWithFormProps {
  name: string,
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (data: any) => void,
  title: string,
  children: any,
  buttonText: string,
  isValid: boolean,
}
