/* eslint-disable no-undef */
import { IProps } from './IProps';

export interface IEditAvatarProps extends IProps {
  onUpdateUser: (data: Record<string, string>) => void,
  info: User | null,
}
