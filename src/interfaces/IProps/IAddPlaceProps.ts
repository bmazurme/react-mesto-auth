import { IProps } from './IProps';

export interface IAddPlaceProps extends IProps{
  onAddPlace: (data: any) => void,
}
