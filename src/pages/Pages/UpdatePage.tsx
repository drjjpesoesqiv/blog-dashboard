import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Header from '../../components/Header';
import Draft from '../../components/Draft';

import { getPageById, updatePage } from '../../actions/pages';

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
  getPageById: (_id:string) => void;
  updatePage: (pageData:any) => void;
  page:any;
}

interface State {
  title:string;
  date:string;
  content:string;
}

class UpdatePage extends React.Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      title: "",
      date: "",
      content: ""
    };
  }

  save = () => {
    this.props.updatePage({
      _id: this.props.page._id,
      title: this.state.title,
      date: this.state.date,
      content: this.state.content
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

  draftOnChange = (content:any) => {
    this.setState({ content: content });
  }

  componentWillMount() {
    this.props.getPageById(this.props.match.params._id);
  }

  componentWillReceiveProps(next:any) {
    this.setState({
      title: next.page.title,
      date: next.page.date,
      content: next.page.content
    })
  }

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Header text="Page Update" />
        <Paper className={classes.container} >
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              className={classes.textField}
              label="Title"
              name="title"
              onChange={this.onTextFieldChange}
              value={this.state.title}
            />
            <TextField
              className={classes.textField}
              label="Date"
              name="date"
              type="datetime-local"
              onChange={this.onTextFieldChange}
              value={this.state.date}
            />

            <Draft content={this.state.content} onChangeCallback={this.draftOnChange} />

            <div className={classes.buttons}>
              <Button
                onClick={this.save}
                className={classes.button}
                color="primary"
                variant="contained">Update</Button>

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

function mapStateToProps({ pages }:any) {
  return {
    page: pages.page,
  };
}

export default connect(mapStateToProps, { getPageById, updatePage })(withStyles(styles)(withRouter(UpdatePage)));
