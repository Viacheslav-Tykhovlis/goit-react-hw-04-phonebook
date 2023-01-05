import React from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  getName = evt => {
    this.setState({
      name: evt.target.value,
    });
  };

  getNumber = evt => {
    this.setState({
      number: evt.target.value,
    });
  };

  addContact = evt => {
    evt.preventDefault();

    this.props.onSubmit({
      name: this.state.name,
      id: nanoid(10),
      number: this.state.number,
    });
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.formInput} onSubmit={this.addContact}>
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
            onChange={this.getName}
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
            onChange={this.getNumber}
          />
        </label>
        <button type="submit" className={css.btnContact}>
          Add contact
        </button>
      </form>
    );
  }
}
