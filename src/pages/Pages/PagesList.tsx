import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
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
import PagesMenu from './PagesMenu';

import { getPagesCount, getPagesByPage, deletePage } from '../../actions/pages';
import { clearNotificationValue } from '../../actions/notifications';

const styles = createStyles({
  button: {
    cursor: "pointer",
    marginRight: "8px"
  }
});

interface Props {
  history:any;
  location:any;
  match:any;
  classes:any;
  getPagesCount: () => void;
  getPagesByPage: (page:number) => void;
  deletePage: (_id:string) => void;
  clearNotificationValue: () => void;
  pages:any;
  count:number;
  perPage:number;
  notification:any;
}

class PagesList extends React.Component<Props> {
  componentWillMount() {
    this.props.getPagesCount();
    this.props.getPagesByPage(this.props.match.params.page || 1);
  }

  changePage = (page:number) => {
    this.props.history.push(`/pages/page/${page}`);
    this.props.getPagesByPage(page);
  }

  componentWillReceiveProps(next:any) {
    if (next.notification.reload) {
      this.props.getPagesByPage(next.match.params.page);
      this.props.clearNotificationValue();
    }
  }

  delete(_id:string, title:string) {
    if (window.confirm(`Confirm delete page: ${title}`))
      this.props.deletePage(_id);
  }

  render() {
    const { classes } = this.props;
    
    return(
      <div>
        <Header text="Pages" />
        <PagesMenu />
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left"></TableCell>
                <TableCell align="left">title</TableCell>
                <TableCell align="right">date</TableCell>
                <TableCell align="right">author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.pages.map((row:any) => (
                <TableRow key={row._id}>
                  <TableCell align="left">
                    <EditIcon className={classes.button} onClick={() => this.props.history.push(`/pages/u/${row._id}`)} />
                    <DeleteIcon className={classes.button} onClick={() => this.delete(row._id, row.title)} />
                  </TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.author}</TableCell>
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

function mapStateToProps({ pages, notifications }:any) {
  return {
    count: pages.count,
    perPage: pages.perPage,
    pages: pages.pages,
    notification: notifications.value
  };
}

const propFunctions = { getPagesCount, getPagesByPage, deletePage, clearNotificationValue };
export default connect(mapStateToProps, propFunctions)(withStyles(styles)(withRouter(PagesList)));
