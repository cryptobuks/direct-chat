import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import notificationPaneStyle from 'assets/jss/chatPage/sideView/notificationPaneStyle';
import ContactItem from './ContactItem';
import { List, ListItem } from '@material-ui/core';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import notificationStore from 'stores/NotificationStore';
import { observer } from 'mobx-react-lite';
import { ReactComponent as Loading } from 'assets/img/loading.svg';

function NotificationPane(props) {
  const { classes, className } = props;

  if (notificationStore.loading) {
    return <Loading />;
  }

  return (
    <List
      className={classNames({ [classes.container]: true, [className]: true })}
    >
      {notificationStore.notifications.map((notification, index) => (
        <ListItem key={notification.email} dense className={classes.listItem}>
          <ContactItem
            name={notification.name}
            status={notification.status}
            image={notification.image}
          />
          {notification.type === 'sentFriendRequest' &&
            getSentFriedRequestView(props)}
          {notification.type === 'receivedFriendRequest' &&
            getFriedRequestView(props)}
          {notification.type === 'friendRequestDeclined' &&
            getFriedRequestDeniedView(props)}
        </ListItem>
      ))}
    </List>
  );
}

function getFriedRequestDeniedView(props) {
  const { classes } = props;

  return (
    <div>
      <div className={classes.typeText}>declined your friend request</div>
    </div>
  );
}

function getSentFriedRequestView(props) {
  const { classes } = props;

  return (
    <div>
      <div className={classes.typeText}>Sent Request</div>
    </div>
  );
}

function getFriedRequestView(props) {
  const { classes } = props;

  return (
    <div>
      <div className={classes.typeText}>Friend Request</div>
      <div>
        <Button variant="contained" color="primary" className={classes.button}>
          Accept
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}

export default withStyles(notificationPaneStyle)(observer(NotificationPane));
