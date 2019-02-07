import React from 'react';
import contactItemStyle from 'assets/jss/chatPage/sideView/contactItemStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button } from '@material-ui/core';

function ContactItem(props) {
  const { classes, name, status, image, onClick } = props;
  const online = status === 'online';
  const offline = status === 'away';

  return (
    <div className={classes.container}>
      <Button className={classes.button}>
        <img
          alt="avatar"
          src={image}
          onClick={onClick}
          className={classnames({
            [classes.avatar]: true,
            [classes.online]: online,
            [classes.offline]: offline
          })}
        />
      </Button>
      <div className={classes.userNameSet}>
        <div className={classes.name}>{name}</div>
        <div className={classes.status}>{status}</div>
      </div>
    </div>
  );
}

ContactItem.propTypes = {
  status: PropTypes.oneOf(['online', 'away'])
};

export default withStyles(contactItemStyle)(ContactItem);
