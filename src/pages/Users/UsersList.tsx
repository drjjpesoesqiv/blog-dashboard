import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/EditSharp';
import DeleteIcon from '@material-ui/icons/Delete';

import Header from '../../components/Header';
import Pagination from '../../components/Pagination';

import { getUsersCount, getUsersByPage, deleteUser } from '../../actions/users';
import { clearNotificationValue } from '../../actions/notifications';
import UsersMenu from './UsersMenu';

const styles = createStyles({
  button: {
    cursor: "pointer",
    marginRight: "8px"
  }
});

interface Props {
  classes:any;
  location:any;
  history:any;
  match:any;
  getUsersCount: () => void;
  getUsersByPage: (page:number) => void;
  deleteUser: (_id:string) => void;
  clearNotificationValue: () => void;
  users:any;
  count:number;
  perPage:number;
  notification:any;
}

class Users extends React.Component<Props> {
  componentWillMount() {
    this.props.getUsersCount();
    this.props.getUsersByPage(1);
  }

  componentWillReceiveProps(next:any) {
    if (next.notification.reload) {
      this.props.getUsersByPage(next.match.params.page);
      this.props.clearNotificationValue();
    }
  }

  changePage = (page:number) => {
    this.props.history.push(`/users/page/${page}`);
    this.props.getUsersByPage(page);
  }

  delete = (_id:string, username:string) => {
    if (window.confirm(`Confirm delete user: ${username}`))
      this.props.deleteUser(_id);
  }

  render() {
    const { classes } = this.props;

    return(
      <div>
        <Header text="Users" />
        <UsersMenu />
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left"></TableCell>
                <TableCell align="left">username</TableCell>
                <TableCell align="right">email</TableCell>
                <TableCell align="right">role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.users.map((row:any) => (
                <TableRow key={row.username}>
                  <TableCell align="left">
                    <EditIcon className={classes.button} onClick={() => this.props.history.push(`/user/u/${row._id}`)} />
                    <DeleteIcon className={classes.button} onClick={() => this.delete(row._id, row.username)} />
                  </TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Pagination
          callback={this.changePage}
          count={this.props.count}
          page={parseInt(this.props.match.params.page) || 1}
          perPage={this.props.perPage} />
      </div>
    );
  }
}

function mapStateToProps({ users, notifications }:any) {
  return {
    users: users.users,
    count: users.count,
    perPage: users.perPage,
    notification: notifications.value
  };
}

const propFunctions = { getUsersCount, getUsersByPage, deleteUser, clearNotificationValue }
export default connect(mapStateToProps, propFunctions)(withStyles(styles)(withRouter(Users)));
