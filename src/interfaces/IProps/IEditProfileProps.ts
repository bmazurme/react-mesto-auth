import { IProps } from './IProps';

export interface IEditProfileProps extends IProps {
  onUpdateUser: (data: Record<string, string>) => void,
}
