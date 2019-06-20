import React from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';

interface Props {
  classes:any;
  onChange:Function;
  permissions:any;
}

interface State {
  dashboard: boolean;
  posts:boolean;
  users:boolean;
}

const styles = createStyles({
  permission: {
    display: "block"
  }
})

class Permissions extends React.Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      dashboard: props.permissions.dashboard,
      posts: props.permissions.posts,
      users: props.permissions.users,
    };
  }

  handleChange = (name:string) => (e:any) => {
    this.setState({
      ...this.state,
      [name]: e.target.checked
    }, () => this.props.onChange(this.state));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h4>Permissions</h4>

        <FormControlLabel
          className={classes.permission}
          control={
            <Switch
              checked={this.state.dashboard}
              onChange={this.handleChange('dashboard')}
              value="dashboard"
            />
          }
          label="Dashboard"
          labelPlacement="start"
        />

        <FormControlLabel
          className={classes.permission}
          control={
            <Switch
              checked={this.state.posts}
              onChange={this.handleChange('posts')}
              value="posts"
            />
          }
          label="Posts"
          labelPlacement="start"
        />

        <FormControlLabel
          className={classes.permission}
          control={
            <Switch
              checked={this.state.users}
              onChange={this.handleChange('users')}
              value="users"
            />
          }
          label="Users"
          labelPlacement="start"
        />
      </div>
    );
  }
}

export default withStyles(styles)(Permissions);
