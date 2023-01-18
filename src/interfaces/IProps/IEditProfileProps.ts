/* eslint-disable no-undef */
import { IProps } from './IProps';

export interface IEditProfileProps extends IProps {
  onUpdateUser: (info: User | null) => void,
}
