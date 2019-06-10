import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Header from '../components/Header';

import { login } from '../actions/cred';

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
})

interface Props {
  classes:any;
  history:any;
  location:any;
  match:any;
  login: (username:string, password:string, redirect:string) => void;
}

interface State {
  username:string,
  password:string
}

class Login extends React.Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  onTextFieldChange = (e:any) => {
    const newState:any = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  login = () => {
    this.props.login(this.state.username, this.state.password, '/posts');
  }

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Header text="Login" />
        <Paper className={classes.container} >
          <form className={classes.form} noValidate autoComplete="off">
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
                onClick={this.login}
                className={classes.button}
                color="primary"
                variant="contained">Login</Button>
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps({ notifications }:any) {
  return {}
}

export default connect(mapStateToProps, { login })(withStyles(styles)(withRouter(Login)));
