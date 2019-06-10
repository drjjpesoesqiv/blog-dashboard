import React from 'react';
import { connect } from 'react-redux';
import { createStyles, withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import NavigationMenu from './NavigationMenu';
import Header from '../../components/Header';
import { Paper } from '@material-ui/core';

import { getNavigationItems, updateNavigationItems } from '../../actions/navigation';

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
  classes:any;
  getNavigationItems: () => void;
  updateNavigationItems: (items:any) => void;
  items:any;
}

interface Store {
  items:any;
}

class NavigationList extends React.Component<Props,Store> {
  columns = [
    { title: 'Title', field: 'title' },
    { title: 'Path', field: 'href' },
    { title: 'Order', field: 'order' },
  ];

  constructor(props:any) {
    super(props);
    this.state = {
      items: []
    }
  }

  save = () => {
    var { items } = this.state;
    for (var i = 0; i < items.length; i++)
      delete items[i].tableData;
    this.props.updateNavigationItems(items);
  }

  componentWillMount() {
    this.props.getNavigationItems(); 
  }

  componentWillReceiveProps(next:any) {
    this.setState({
      items: next.items
    })
  }

  onRowAdd = (newData:any) => new Promise<void>((resolve:Function, reject:Function) => {
    setTimeout(() => {
      var { items } = this.state;
      items.push(newData);
      this.setState({ items: items });
      resolve();
    }, 1000);
  });

  onRowUpdate = (newData:any, oldData:any) =>  new Promise<void>((resolve:Function, reject:Function) => {
    setTimeout(() => {
      var { items } = this.state;
      for (var i = 0; i < items.length; i++)
        if (items[i] === oldData) {
          items[i] = newData;
          break;
        }

      this.setState({ items: items });
      resolve();
    }, 1000)
  });

  onRowDelete = (oldData:any) =>  new Promise<void>((resolve:Function, reject:Function) => {
    setTimeout(() => {
      var { items } = this.state;
      for (var i = 0; i < items.length; i++)
        if (items[i] === oldData) {
          items.splice(i, 1);
          break;
        }

      this.setState({ items: items });
      resolve();
    }, 1000);
  });

  render() {
    const { classes } = this.props;

    return(
      <div>
        <Header text="Navigation" />
        <NavigationMenu />
        <Paper>
          <MaterialTable
            options={{ paging: false, showTitle: false, search: false }}
            columns={this.columns}
            data={this.state.items}
            editable={{
              onRowAdd: this.onRowAdd,
              onRowUpdate: this.onRowUpdate,
              onRowDelete: this.onRowDelete
            }}
          />
        </Paper>
        <div className={classes.buttons}>
          <Button
            onClick={this.save}
            className={classes.button}
            color="primary"
            variant="contained">Update</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ navigation }:any) {
  return {
    items: navigation.items
  };
}

export default connect(mapStateToProps, { getNavigationItems, updateNavigationItems })(withStyles(styles)(NavigationList));
