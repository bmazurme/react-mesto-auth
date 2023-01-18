type Action<T> = {
  type: string;
  payload: T;
};

type Reducer<T> = (state: T, action: Action<T>) => T;

type User = {
  _id: string;
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};
