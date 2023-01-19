import { IProps } from './IProps';

export interface IAddPlaceProps extends IProps {
  onAddPlace: (data: Record<string, string>) => void,
}
