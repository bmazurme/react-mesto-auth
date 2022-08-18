import { ICard } from '../ICard';
import { IProps } from './IProps';

export interface IPopupWithConfirmProps extends IProps{
  title: string,
  buttonText: string,
  card: ICard|null,
  onSubmit: (data: any) => void,
}
