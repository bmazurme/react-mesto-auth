import { IProps } from './i-props';

export interface IAddPlaceProps extends IProps {
  onAddPlace: (data: Record<string, string>) => void,
}
