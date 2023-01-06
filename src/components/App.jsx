import { useState, useEffect, useRef } from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Contact } from './Contact/Contact';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  const handleSubmit = contact => {
    if (isSaved(contact)) {
      return alert(`${contact.name} is already is contacts `);
    }
    setContacts(state => [...state, contact]);
  };

  const isSaved = user => {
    const normalaseUser = user.name.toLowerCase();
    return contacts.find(
      contact => contact.name.toLowerCase() === normalaseUser
    );
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const deleteContact = userId => {
    setContacts(state => state.filter(user => user.id !== userId));
  };

  const filtredContacts = () => {
    const normalaseFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaseFilter)
    );
  };

  useEffect(() => {
    const parseContacts = JSON.parse(window.localStorage.getItem('contacts'));

    if (parseContacts) {
      setContacts(parseContacts);
    } else {
      setContacts([
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={css.mainDiv}>
      <h2>Phonebook</h2>

      <ContactForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>

      <Filter onChange={changeFilter} value={filter} />

      <ContactList>
        <Contact
          contactList={filtredContacts()}
          onDeleteContact={deleteContact}
        />
      </ContactList>
    </div>
  );
}
