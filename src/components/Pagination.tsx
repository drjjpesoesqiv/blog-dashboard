import React from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const styles = createStyles({
  pagination: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "16px"
  },
  link: {
    cursor: "pointer",
    margin: "0px 4px"
  }
})

interface Props {
  classes:any;
  page:number;
  count:number;
  perPage:number;
  callback:Function;
}

interface State {
  page:number;
}

class Pagination extends React.Component<Props,State> {
  maxPage:number = 0;

  constructor(props:any) {
    super(props);
    this.state = {
      page: this.props.page
    }
  }

  componentWillReceiveProps(props:any) {
    this.maxPage = Math.ceil(props.count / props.perPage);
  }

  prevPage = () => {
    this.setState({
      page: this.state.page - 1
    }, () => this.props.callback(this.state.page));
  }

  nextPage = () => {
    this.setState({
      page: this.state.page + 1
    }, () => this.props.callback(this.state.page));
  }

  goToPage = (e:any) => {
    this.setState({
      page: parseInt(e.target.dataset.value)
    }, () => this.props.callback(this.state.page));
  }

  render() {
    const { classes } = this.props;

    const prev = (this.state.page > 1)
      ? <Link className={classes.link} onClick={() => this.prevPage()}>&lt;</Link>
      : '';

    const next = (this.state.page < this.maxPage)
      ? <Link className={classes.link} onClick={() => this.nextPage()}>&gt;</Link>
      : '';

    var start = this.state.page - 3;
    if (start < 1) start = 1;

    var end = +this.state.page + 3;
    if (end > this.maxPage) end = this.maxPage;

    var links = [];
    for (var i:number = start; i <= end; i++) {
      var link = (i !== this.state.page)
        ? <Link
          key={i}
          className={classes.link}
          data-value={i}
          onClick={this.goToPage}>{i}</Link>
        : <span key={i} className={classes.link}>{i}</span>;
      links.push(link);
    }

    return(
      <div className={classes.pagination}>
        {prev}
        {links}
        {next}
      </div>
    )
  }
}

export default withStyles(styles)(Pagination);
