import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ChatRecentPane from './ChatRecentPane';

import cardPageStyle from 'assets/jss/material-kit-react/views/cardPage.jsx';

class ChatPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.body}>
        <div className={classes.cloudContainer}>
          <div className={classes.x2}>
            <div className={classes.cloud} />
          </div>
          <div className={classes.x3}>
            <div className={classes.cloud} />
          </div>
          <div className={classes.x4}>
            <div className={classes.cloud} />
          </div>
          <div className={classes.x5}>
            <div className={classes.cloud} />
          </div>
        </div>
        <ChatRecentPane classes={classes} />
      </div>
    );
  }
}

export default withStyles(cardPageStyle)(ChatPage);