import { IProps } from './i-props';

export interface IPopupWithConfirmProps extends IProps {
  title: string,
  buttonText: string,
  card: Card | null,
  onSubmit: (evt: Card | null) => void,
}
