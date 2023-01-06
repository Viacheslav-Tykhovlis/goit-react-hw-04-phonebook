import { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const getName = evt => {
    setName(evt.target.value);
  };

  const getNumber = evt => {
    setNumber(evt.target.value);
  };

  const addContact = evt => {
    evt.preventDefault();
    onSubmit({
      name,
      id: nanoid(10),
      number,
    });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.formInput} onSubmit={addContact}>
      <label className={css.labelName}>
        Name:
        <br />
        <input
          className={css.inputName}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={getName}
        />
      </label>
      <label className={css.labelName}>
        Number:
        <br />
        <input
          className={css.inputName}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={getNumber}
        />
      </label>
      <button type="submit" className={css.btnContact}>
        Add contact
      </button>
    </form>
  );
}
