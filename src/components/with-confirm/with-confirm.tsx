import React from 'react';

import style from './with-confirm.module.css';

export default function WithConfirm({
  card, title, buttonText, onSubmit, isLoading,
} : {
  card: Card;
  title: string;
  buttonText: string;
  onSubmit: (c: Card) => void; isLoading: boolean;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(card);
  };
  console.log(isLoading);

  return (
    <form
      className="form"
      name="confirm-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className={style.title}>{title}</h2>
      <button aria-label="Save" className={style.submit} type="submit">
        {buttonText}
      </button>
    </form>
  );
}
