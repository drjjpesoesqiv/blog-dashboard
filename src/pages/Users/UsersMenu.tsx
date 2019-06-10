import React from 'react';
import { withRouter } from 'react-router-dom';
import { createStyles, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';

const styles = createStyles({
  button: {
    margin: '16px',
  },
  input: {
    display: 'none',
  }
});

interface Props {
  history:any;
  location:any;
  match:any;
  classes: any;
}

class UsersMenu extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return(
      <div>
        <Button
          onClick={() => this.props.history.push('/users/new')}
          className={classes.button}>New User</Button>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(UsersMenu));
