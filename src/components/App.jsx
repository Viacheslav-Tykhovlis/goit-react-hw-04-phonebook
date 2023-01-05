import React from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Contact } from './Contact/Contact';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleSubmit = contact => {
    if (this.isSaved(contact)) {
      return alert(`${contact.name} is already is contacts `);
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  isSaved = user => {
    const normalaseUser = user.name.toLowerCase();
    return this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalaseUser
    );
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  deleteContact = userId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(user => user.id !== userId),
    }));
  };

  filtredContacts = () => {
    const normalaseFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaseFilter)
    );
  };

  componentDidMount() {
    const parseContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    } else {
      this.setState({
        contacts: [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <div className={css.mainDiv}>
        <h2>Phonebook</h2>

        <ContactForm onSubmit={this.handleSubmit} />

        <h2>Contacts</h2>

        <Filter onChange={this.changeFilter} value={this.state.filter} />

        <ContactList>
          <Contact
            contactList={this.filtredContacts()}
            onDeleteContact={this.deleteContact}
          />
        </ContactList>
      </div>
    );
  }
}
