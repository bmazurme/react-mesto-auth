import { ICard, IOptions } from '../interfaces/interfaces';
import { METHODS } from './methods';
import { API } from './config';

export class Api {
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

  async getUser() {
    const res = await fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    });
    return this.checkResponse(res);
  }

  async patchUser({ name, about }: Record<string, string>) {
    const res = await fetch(`${this.options.baseUrl}/users/me`, {
      method: METHODS.PATCH,
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
    return this.checkResponse(res);
  }

  async patchAvatar({ avatar }: Record<string, string>) {
    const res = await fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: METHODS.PATCH,
      headers: this.options.headers,
      body: JSON.stringify({
        avatar,
      }),
    });
    return this.checkResponse(res);
  }

  async getCards() {
    const res = await fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    });
    return this.checkResponse(res);
  }

  async deleteCard(cardId: number | string) {
    const res = await fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: METHODS.DELETE,
      headers: this.options.headers,
    });
    return this.checkResponse(res);
  }

  async postCard({ name, link }: ICard) {
    const res = await fetch(`${this.options.baseUrl}/cards`, {
      method: METHODS.POST,
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
    return this.checkResponse(res);
  }

  async changeLike(cardId: number, value: boolean) {
    const res = await fetch(`${this.options.baseUrl}/cards/${cardId}/likes`, {
      method: value ? METHODS.PUT : METHODS.DELETE,
      headers: this.options.headers,
    });
    return this.checkResponse(res);
  }
}

const api = new Api({
  baseUrl: API.PTH,
  headers: {
    authorization: API.TOKEN,
    'Content-Type': 'application/json',
  },
});

export default api;
