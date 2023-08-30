declare module '*.css';

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

type Like = {
  _id: string,
  user: User | null,
}

 type Card = {
  _id: string,
  name: string,
  link: string,
  likes: Array<Like>,
  owner: User | null,
  createdAt: Date
}
