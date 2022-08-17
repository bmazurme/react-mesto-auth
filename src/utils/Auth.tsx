import { IOptions } from 'interfaces/IOptions';

export class Auth {
  options: IOptions;
  constructor(options: IOptions) {
    this.options = options;
  }

  checkResponse(res: any) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  async signUp(data: Record<string, string>) {
    const res = await fetch(`${this.options.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.checkResponse(res);
  }

  async signIn(data: Record<string, string>) {
    const res = await fetch(`${this.options.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.checkResponse(res);
  }

  async checkToken(jwt: string) {
    const res = await fetch(`${this.options.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    });
    return this.checkResponse(res);
  }
}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default auth;
