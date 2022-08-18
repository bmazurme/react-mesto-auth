import { ICard, IOptions } from 'interfaces/interfaces';
import { METHODS } from './methods';
import { AUTH_API } from './config';

export class Auth {
  options: IOptions;
  constructor(options: IOptions) {
    this.options = options;
  }

  checkResponse(res: Response) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  async signUp(data: Record<string, string>) {
    const res = await fetch(`${this.options.baseUrl}/signup`, {
      method: METHODS.POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.checkResponse(res);
  }

  async signIn(data: Record<string, string>|ICard) {
    const res = await fetch(`${this.options.baseUrl}/signin`, {
      method: METHODS.POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.checkResponse(res);
  }

  async checkToken(jwt: string) {
    const res = await fetch(`${this.options.baseUrl}/users/me`, {
      method: METHODS.GET,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
    return this.checkResponse(res);
  }
}

const auth = new Auth({
  baseUrl: AUTH_API.PTH,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default auth;
