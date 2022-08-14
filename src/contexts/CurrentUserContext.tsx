import React from 'react';

// interface IUser {
//   avatar: string,
//   name: string,
//   about: string,
// }

export const CurrentUserContext = React.createContext({ _id: 0, avatar: '', name: '', about: '' });
