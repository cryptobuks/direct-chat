import React, { useState } from 'react';
import ContactItem from './ContactItem';
import TextField from '@material-ui/core/TextField';
import contactStyle from 'assets/jss/chatPage/sideView/contactStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import { List, ListItem } from '@material-ui/core';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import contactStore from 'stores/ContactStore';
import notificationStore from 'stores/NotificationStore';
import { ReactComponent as Loading } from 'assets/img/loading.svg';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

function ContactPane(props) {
  const { classes, className, onContactClick } = props;
  const [searchInput, setSearchInput] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [globalSearch, setGlobalSearch] = useState(false);

  const handleSearchInput = event => {
    console.log(event.target.value);
    let searchText = event.target.value;
    setSearchInput(searchText);
    searchText = searchText.trim();
    if (searchText === '') {
      if (globalSearch) {
        contactStore.emptyAllContacts();
      } else {
        contactStore.resetAllContacts();
      }
      return;
    } else if (searchText.length < 3) {
      contactStore.emptyAllContacts();
      return;
    }

    if (globalSearch) {
      contactStore.fetchContactsWithKeywords(searchText);
    } else {
      contactStore.filterAllContacts(searchText);
    }
  };

  const handleContactClick = (contact, index) => () => {
    setActiveIndex(index);
    onContactClick(contact);
    console.log(contact.name);
  };

  const handleGolbalSearchToggle = event => {
    const isGlobal = event.target.checked;
    setGlobalSearch(isGlobal);
    setSearchInput('');
    if (isGlobal) {
      contactStore.emptyAllContacts();
    } else {
      contactStore.resetAllContacts();
    }
  };

  const handleAddContact = contact => event => {
    event.stopPropagation();
    console.log('Add contact:' + contact.email);
    contact.type = 'sentFriendRequest';
    notificationStore.sendFriendRequest(contact);
  };

  const handleProfileClick = contact => event => {
    event.stopPropagation();
    console.log('profile Click:' + contact.email);
  };

  if (contactStore.loadingAllContacts) {
    return <Loading />;
  }

  return (
    <>
      <div className={classes.searchAndAddContact}>
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          value={searchInput}
          className={classes.search}
          onChange={handleSearchInput}
          InputProps={{
            classes: {
              root: classes.searchOutline
            }
          }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={globalSearch}
              onChange={handleGolbalSearchToggle}
              value="Global"
            />
          }
          classes={{
            label: globalSearch
              ? classes.globalSearchLable
              : classes.globalSearchLableOff
          }}
          className={classes.globalSearch}
          labelPlacement="top"
          label="Global"
        />
      </div>
      <List
        dense
        className={classNames({ [classes.container]: true, [className]: true })}
      >
        {contactStore.allContacts.map((contact, index) => {
          let addIconDisplay = 'none';
          let checkIconDisplay = 'none';

          if (contact.type === 'sentFriendRequest') {
            checkIconDisplay = 'inline-flex';
          } else if (contact.type) {
            addIconDisplay = 'inline-flex';
          }

          return (
            <ListItem
              key={index}
              selected={activeIndex === index}
              button
              disableRipple
              onClick={handleContactClick(contact, index)}
              className={classes.listItem}
            >
              <ContactItem
                name={contact.name}
                status={contact.status}
                image={contact.image}
                onClick={handleProfileClick(contact)}
              />

              <Fab
                style={{ display: addIconDisplay }}
                color="secondary"
                aria-label="Add Contact"
                className={classes.addContactButton}
                onClick={handleAddContact(contact)}
              >
                <AddIcon />
              </Fab>
              <CheckIcon
                style={{ display: checkIconDisplay }}
                className={classes.checkSign}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default withStyles(contactStyle)(observer(ContactPane));
