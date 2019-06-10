import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Header from '../../components/Header';

import { newPost } from '../../actions/posts';

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
  newPost: (postData:any) => void;
}

interface State {
  title:string;
  date:string;
  content:string;
}

class NewPost extends React.Component<Props,State> {
  constructor(props:any) {
    super(props);
    this.state = {
      title: "",
      date: "",
      content: ""
    };
  }

  save = () => {
    this.props.newPost({
      title: this.state.title,
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

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Header text="New Post" />
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

export default connect(mapStateToProps, { newPost })(withStyles(styles)(withRouter(NewPost)));
