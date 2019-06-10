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

import { newUser } from '../../actions/users';

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
    width: "320px"
  }
});

interface Props {
  history:any;
  location:any;
  match:any;
  classes:any;
  newUser: (userData:any) => void;
}

interface State {
  role:number,
  email:string;
  username:string;
  password:string;
}

class NewUser extends React.Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      role: 0,
      email: "",
      username: "",
      password: ""
    };
  }

  save = () => {
    this.props.newUser({
      role: this.state.role,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    })
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

function mapStateToProps(state:any) {
  return {};
}

export default connect(mapStateToProps, { newUser })(withStyles(styles)(withRouter(NewUser)));
