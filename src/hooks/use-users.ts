import { useAppSelector } from './index';
import { usersSelector } from '../store';

export default function useUser() {
  return useAppSelector(usersSelector);
}
