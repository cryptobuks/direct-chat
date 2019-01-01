import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import chatViewStyle from 'assets/jss/material-kit-react/chatViewStyle';
import { observer } from 'mobx-react-lite';
import contactStore from 'stores/ContactStore';
import messageStore from 'stores/MessageStore';
import { List, ListItem } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';

function ChatView(props) {
  const { classes } = props;

  if (contactStore.currentChat === null) {
    return <div />;
  }
  const currentChatId = contactStore.currentChat.id;
  const myContactId = contactStore.myContact.id;
  const messages = messageStore.messages[currentChatId];
  const avatarCache = {};
  avatarCache[currentChatId] = contactStore.currentChat.image;
  avatarCache[contactStore.myContact.id] = contactStore.myContact.image;

  const listItemClass = message => {
    const itemClasses = { [classes.message]: true };
    if (message.sender === myContactId) {
      itemClasses[classes.messageReverse] = true;
    }
    return itemClasses;
  };

  const bubbleClass = message => {
    const bubbleClasses = { [classes.bubble]: true };
    if (message.sender === myContactId) {
      bubbleClasses[classes.bubbleRight] = true;
    } else {
      bubbleClasses[classes.bubbleLeft] = true;
    }
    return bubbleClasses;
  };

  return (
    <div className={classes.container}>
      <div className={classes.displayPane}>
        {messages && (
          <List dense>
            {messages.map(message => (
              <ListItem
                key={message.time.getTime()}
                className={classNames(listItemClass(message))}
              >
                <img
                  alt="sender"
                  src={avatarCache[message.sender]}
                  className={classes.contactAvatar}
                />
                <div className={classNames(bubbleClass(message))}>
                  {message.content}
                </div>
              </ListItem>
            ))}
          </List>
        )}
      </div>
      <Divider />
      <div className={classes.inputPane} />
    </div>
  );
}

export default withStyles(chatViewStyle)(observer(ChatView));
