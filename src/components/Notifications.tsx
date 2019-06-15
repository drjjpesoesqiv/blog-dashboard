import React from 'react';
import { connect } from 'react-redux';

import { createStyles, withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { dismissNotification } from '../actions/notifications';

const styles = createStyles({
  white: {
    color: '#fff'
  }
});

interface Props {
  classes:any;
  dismissed:boolean;
  message:string;
  dismissNotification: () => void;
}

class Notifications extends React.Component<Props> {
  static defaultProps:any = {
    dismissed: true,
    message: ""
  }

  dismissMessage = () => {
    this.props.dismissNotification();
  }

  componentWillReceiveProps(props:any) {
    setTimeout(this.dismissMessage.bind(this), 6000);
  }

  render() {
    const { classes } = this.props;
    const open = ! this.props.dismissed && this.props.message.length ? true : false;
    return(
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
      >
        <SnackbarContent
          message={this.props.message}
          action={[
            <IconButton
              key="close"
              className={classes.white}
              onClick={this.props.dismissNotification}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Snackbar>
    )
  }
}

function mapStateToProps({ notifications }:any) {
  return {
    dismissed: notifications.dismissed,
    message: notifications.content
  }
}

export default connect(mapStateToProps, { dismissNotification })(withStyles(styles)(Notifications));
