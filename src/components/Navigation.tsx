import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { logout } from '../actions/cred';
import { clearNotificationValue } from '../actions/notifications';

const styles = createStyles({
  hidden: {
    display: "none"
  },
  logout: {
    float: "right",
    margin: "16px"
  }
})

interface Props {
  classes:any;
  history:any;
  location:any;
  match:any;
  logout: (redirect:string) => void;
  clearNotificationValue: () => void;
  loggedIn:boolean;
  notification:any;
}

interface State {
  selection: string;
}

class Navigation extends React.Component<Props,State> {
  paths = [
    '/users',
    '/posts'
  ];

  constructor(props:any) {
    super(props);
    
    this.state = {
      selection: this.getSelection()
    }
  }

  componentDidMount() {
    if (! this.props.loggedIn)
      this.props.history.push('/login');
  }

  componentWillReceiveProps(props:any) {
    const { redirect } = props.notification;
    if (redirect && this.props.location.pathname !== redirect) {
      this.props.history.push(redirect)
      this.props.clearNotificationValue();
    }
  }

  getSelection() {
    const { pathname } = this.props.location;
    return this.paths.indexOf(pathname) !== -1
      ? pathname
      : false;
  }

  handleChange(event: React.ChangeEvent<{}>, selection: string) {
    this.setState({ selection: selection });
    this.props.history.push(selection);
  }

  logout = () => {
    this.props.logout('/login');
  }

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Paper>
          <Tabs
            className={ ! this.props.loggedIn ? classes.hidden : ''}
            value={this.state.selection}
            onChange={this.handleChange.bind(this)}
            indicatorColor="primary"
            textColor="primary">
            <Tab label="Users" value="/users" />
            <Tab label="Posts" value="/posts" />
            <Tab label="Pages" value="/pages" />
            <Tab label="Navigation" value="/navigation" />
          </Tabs>
        </Paper>
        <Button
          onClick={this.logout}
          variant="outlined"
          color="primary"
          className={this.props.loggedIn ? classes.logout : classes.hidden}>
          Logout
        </Button>
      </div>
    )
  }
}

function mapStateToProps({ cred, notifications }:any) {
  const { value } = notifications;
  return {
    loggedIn: cred.loggedIn,
    notification: value
  }
}

export default connect(mapStateToProps, { clearNotificationValue, logout })(withStyles(styles)(withRouter(Navigation)));
