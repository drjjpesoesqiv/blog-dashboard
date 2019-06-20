import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Header from '../../components/Header';

import { grant, revoke } from '../../actions/api';
import { clearNotificationValue } from '../../actions/notifications';
import { getUserById, updateUser } from '../../actions/users';

import { ROLES } from '../../config';
import Permissions from '../../components/Permissions';

const styles = createStyles({
  container: {
    padding: "16px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  apiAccess: {
    marginBottom: "16px"
  },
  buttons: {
    borderTop: "1px solid #ddd",
    display: "flex",
    flexDirection: "row",
    margin: "16px 0px",
    paddingTop: "16px"
  },
  button: {
    marginLeft: "16px",
    width: "128px"
  },
  grantButton: {
    backgroundColor: "green",
    color: "white",
    width: "196px"
  },
  revokeButton: {
    backgroundColor: "red",
    color: "white",
    width: "196px"
  },
  textField: {
    marginBottom: "16px",
    width: "256px"
  }
});

interface Props {
  history:any;
  location:any;
  match:any;
  classes:any;
  grant: (_userId:string) => void;
  revoke: (_userId:string) => void;
  clearNotificationValue: () => void;
  getUserById: (_id:string) => void;
  updateUser: (userData:any) => void;
  user:any;
}

interface State {
  role:string;
  email:string;
  username:string;
  password:string;
  permissions:any;
}

class UpdateUser extends React.Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      role: "",
      email: "",
      username: "",
      password: "",
      permissions: {}
    };
  }

  componentWillMount() {
    this.props.getUserById(this.props.match.params._id);
  }

  componentWillReceiveProps(next:any) {
    console.log(next.user);
    this.setState({
      role: next.user.role,
      email: next.user.email,
      username: next.user.username,
      password: next.user.password,
      permissions: next.user.permissions || {}
    });

    const { reload } = next.notification;
    if (reload) {
      this.props.getUserById(this.props.user._id);
      this.props.clearNotificationValue();
    }
  }

  save = () => {
    var userData:any = {
      _id: this.props.user._id,
      role: this.state.role,
      email: this.state.email,
      username: this.state.username
    }

    if (this.state.role !== ROLES.ADMIN)
      userData['permissions'] = this.state.permissions;

    if (this.state.password.length > 0)
      userData['password'] = this.state.password;

    this.props.updateUser(userData);
  }

  cancel = () => {
    this.props.history.goBack();
  }

  onTextFieldChange = (e:any) => {
    const newState:any = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onChangePermissions = (permissions:any) => {
    this.setState({
      permissions: permissions
    })
  }

  grantApiAccess = () => {
    this.props.grant(this.props.user._id);
  }

  revokeApiAccess = () => {
    this.props.revoke(this.props.user._id);
  }

  render() {
    const { classes } = this.props;

    var roles:any = [];
    for (var role in ROLES)
      roles.push(<MenuItem key={role} value={ROLES[role]}>{role}</MenuItem>);

    return(
      <div>
        <Header text="Update User" />
        <Paper className={classes.container} >
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select
                className={classes.textField}
                value={this.state.role}
                onChange={this.onTextFieldChange}
                inputProps={{
                  name: 'role',
                  id: 'role',
                }}>
                {roles}
              </Select>
            </FormControl>

            <TextField
              className={classes.textField}
              label="E-Mail Address"
              name="email"
              onChange={this.onTextFieldChange}
              value={this.state.email}
            />
            <TextField
              className={classes.textField}
              label="Username"
              name="username"
              onChange={this.onTextFieldChange}
              value={this.state.username}
            />
            <TextField
              className={classes.textField}
              label="Password"
              name="password"
              type="password"
              onChange={this.onTextFieldChange}
              value={this.state.password}
            />

            <h4>API Access</h4>
            <div className={classes.apiAccess}>
            { this.props.user.apiKey ? <p>API Key: {this.props.user.apiKey}</p> : '' }
            { ! this.props.user.apiKey
              ? <Button
                onClick={() => this.grantApiAccess()}
                className={classes.grantButton}
                variant="contained">Grant API Access</Button>
              : <Button
                onClick={() => this.revokeApiAccess()}
                className={classes.revokeButton}
                variant="contained">Revoke API Access </Button>
            }
            </div>

            {this.state.role && this.state.role !== ROLES.ADMIN && <Permissions
              permissions={this.state.permissions}
              onChange={this.onChangePermissions}
            />}

            <div className={classes.buttons}>
              <Button
                onClick={() => this.save()}
                className={classes.button}
                color="primary"
                variant="contained">Submit</Button>

              <Button
                onClick={() => this.cancel()}
                className={classes.button}
                color="secondary"
                variant="contained">Cancel</Button>
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps({ notifications, users }:any) {
  return {
    notification: notifications.value,
    user: users.user
  };
}

const propFuncs = { clearNotificationValue, grant, revoke, getUserById, updateUser };
export default connect(mapStateToProps, propFuncs)(withStyles(styles)(withRouter(UpdateUser)));
