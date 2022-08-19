import { setUserData } from './userSlice';
import { store } from '../../store/store';

describe('setUser', () => {
  it('should set user', () => {
    const userInfo = {
      _id: 123,
      avatar: 'avatar',
      name: 'name',
      about: 'about',
    };
    expect(store.dispatch(setUserData({})).payload).toEqual({});
    expect(store.dispatch(setUserData(userInfo)).payload).toEqual(userInfo);
  })
})
