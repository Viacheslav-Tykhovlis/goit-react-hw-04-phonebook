import React from 'react';
import { PropTypes } from 'prop-types';
import css from './Contact.module.css';

export const Contact = ({ contactList, onDeleteContact }) => {
  return contactList.map(contact => {
    return (
      <li key={contact.id} className={css.contactItem}>
        <p className={css.name}>{contact.name}</p>
        <span className={css.number}>{contact.number}</span>
        <button
          className={css.btnDelete}
          type="button"
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    );
  });
};

Contact.propTypes = {
  contactList: PropTypes.array,
  onDeleteContact: PropTypes.func,
};
