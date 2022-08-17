import { ICard } from '../interfaces/ICard';
import { IOptions } from 'interfaces/IOptions';

export class Api {
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

  async getUser() {
    const res = await fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers,
    });
    return this.checkResponse(res);
  }

  async patchUser({ name, about }: Record<string, string>) {
    const res = await fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
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
      method: 'PATCH',
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

  async deleteCard(cardId: number) {
    const res = await fetch(`${this.options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
    });
    return this.checkResponse(res);
  }

  async postCard({ name, link }: ICard) {
    const res = await fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
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
      method: value ? 'PUT' : 'DELETE',
      headers: this.options.headers,
    });
    return this.checkResponse(res);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: 'fcfa5c3a-c07d-49f3-a47d-0099ff285712',
    'Content-Type': 'application/json',
  },
});

export default api;
