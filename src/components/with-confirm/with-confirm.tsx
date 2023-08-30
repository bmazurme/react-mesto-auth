import React from 'react';

export default function WithConfirm({ card, title, buttonText, onSubmit, isLoading }
: { card: Card; title: string; buttonText: string; onSubmit: (card: Card) => void; isLoading: boolean; }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <form
      className="form form_type_confirm"
      name="confirm-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="form__title">{title}</h2>
      <button aria-label="Save" className="button button_submit" type="submit">
        {buttonText}
      </button>
    </form>
  );
}
