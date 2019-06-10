import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Header from '../../components/Header';

import { getPostById, updatePost } from '../../actions/posts';

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
  getPostById: (_id:string) => void;
  updatePost: (postData:any) => void;
  post:any;
}

interface State {
  title:string;
  date:string;
  content:string;
}

class UpdatePost extends React.Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      title: "",
      date: "",
      content: ""
    };
  }

  save = () => {
    this.props.updatePost({
      _id: this.props.post._id,
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

  componentWillMount() {
    this.props.getPostById(this.props.match.params._id);
  }

  componentWillReceiveProps(next:any) {
    this.setState({
      title: next.post.title,
      date: next.post.date,
      content: next.post.content
    })
  }

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Header text="Post Update" />
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
            <TextField
              label="Content"
              multiline
              name="content"
              rows="10"
              rowsMax="10"
              onChange={this.onTextFieldChange}
              value={this.state.content}
            />

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

function mapStateToProps({ posts }:any) {
  return {
    post: posts.post
  };
}

export default connect(mapStateToProps, { getPostById, updatePost })(withStyles(styles)(withRouter(UpdatePost)));
