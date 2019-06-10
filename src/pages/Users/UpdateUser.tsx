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

import { getUserById, updateUser } from '../../actions/users';

import { ROLES } from '../../config';

const styles = createStyles({
  container: {
    padding: "16px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    margin: "16px 0px"
  },
  button: {
    marginLeft: "16px",
    width: "128px"
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
  getUserById: (_id:string) => void;
  updateUser: (userData:any) => void;
  user:any;
}

interface State {
  role:string;
  email:string;
  username:string;
  password:string;
}

class UpdateUser extends React.Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      role: "",
      email: "",
      username: "",
      password: ""
    };
  }

  componentWillMount() {
    this.props.getUserById(this.props.match.params._id);
  }

  componentWillReceiveProps(next:any) {
    this.setState({
      role: next.user.role,
      email: next.user.email,
      username: next.user.username,
      password: next.user.password
    })
  }

  save = () => {
    var userData:any = {
      _id: this.props.user._id,
      role: this.state.role,
      email: this.state.email,
      username: this.state.username
    }

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

  render() {
    const { classes } = this.props;

    var roles:any = [];
    for (var role in ROLES)
      roles.push(<MenuItem value={ROLES[role]}>{role}</MenuItem>);

    return(
      <div>
        <Header text="New User" />
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

function mapStateToProps({ users }:any) {
  return {
    user: users.user
  };
}

export default connect(mapStateToProps, { getUserById, updateUser })(withStyles(styles)(withRouter(UpdateUser)));
