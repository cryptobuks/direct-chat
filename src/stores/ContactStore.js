import { observable, action } from 'mobx';
import api from 'utils/api';
import messageStore from 'stores/MessageStore';
import _ from 'lodash';

class ContactStore {
  @observable myContact = null;
  @observable currentChat = null;
  @observable allContacts = []; // all contacts to be displayed
  @observable recentContacts = [];
  @observable loadingAllContacts = true;
  @observable loadingRecentContacts = true;
  allContactsAlways = [];

  getMyEmail = () => {
    return this.myEmail;
  };

  fetchMyContact = () => {
    return this.fetchContact().then(myContact => {
      if (_.isEmpty(myContact)) {
        console.log('empty contact');
        return {};
      } else {
        console.log('myContact:' + JSON.stringify(myContact));
        this.setMyContact(myContact);
        return myContact;
      }
    });
  };

  fetchContact = async () => {
    const user = await api.fetchMyContact();
    if (_.isEmpty(user)) {
      return {};
    } else {
      this.setMyContact(user);
      return this.myContact;
    }
  };

  setMyContact(contact) {
    this.myContact = contact;
    this.myEmail = contact.email;
    messageStore.setCurrentSender(this.myContact.email);
  }

  async fetchAllContact() {
    this.loadingAllContacts = true;
    const json = await api.fetchAllContact();
    json.forEach(
      action(contact => {
        this.allContacts.push(contact);
        this.allContactsAlways.push(contact);
      })
    );
    this.loadingAllContacts = false;
  }

  async fetchContactsWithKeywords(keyword) {
    this.allContacts = [];
    const json = await api.fetchContactsWithKeywords(keyword);
    json.forEach(
      action(contact => {
        this.allContacts.push(contact);
      })
    );
  }

  async fetchRecentChatContact() {
    this.loadingRecentContacts = true;
    const json = await api.fetchRecentChatContact();
    if (json.length) {
      this.setCurrentChat(json[0]);
      json.forEach(action(contact => this.recentContacts.push(contact)));
    }

    this.loadingRecentContacts = false;
  }

  setCurrentChat(contact) {
    this.currentChat = contact;
    messageStore.setCurrentReciver(contact.email);
    messageStore.setRoomId(contact.email);
  }

  filterAllContacts(keyword) {
    this.allContacts = this.allContactsAlways.filter(contact =>
      contact.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  resetAllContacts() {
    this.allContacts = [];
    this.allContactsAlways.forEach(contact => {
      this.allContacts.push(contact);
    });
  }

  emptyAllContacts() {
    this.allContacts = [];
  }
}

const contactStore = new ContactStore();

export default contactStore;
