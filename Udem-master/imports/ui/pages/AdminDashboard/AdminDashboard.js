import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CaseView from '../../components/AdminDashboard/CaseView';
import CasesCollection from '../../../api/Cases/Cases';
import Home from '../../components/AdminDashboard/Home';
import { Meteor } from 'meteor/meteor';
import NotAuthorized from '../../components/AdminDashboard/NotAuthorized';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import UserView from '../../components/AdminDashboard/UserView';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
  },
});



 class AdminDashboard extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired,
  }




  handleChange = (event, value) => {
    this.setState({ value });
  };
  constructor(props) {
    super(props);
    // injectTapEventPlugin();


    this.state = { admin: this.props.roles.includes("admin") ,value: 0, };

}
componentDidMount(){
    console.log(this.props.roles);
}

  render() {
    const props = this.props;
    const { classes } = this.props;
    const { value } = this.state;
    
    if(this.state.admin){
      // if the user is an administrator , return the dashboard else give them HELLL
    return (
     
      <div className={classes.root} style={{backgroundColor: 'transparent'}}>
        <Button variant="extendedFab" color="primary" onClick={(e)=>{this.props.history.push('/admin/view-all-cases')}} className={classes.button}>
        Voir tout les cas cliniques
      </Button>
      <Button variant="extendedFab"  color="secondary" onClick={(e)=>{this.props.history.push('/admin/view-users')}} className={classes.button}>
        Voir tout les utilisateurs
      </Button>
      <Button variant="extendedFab" color="primary" onClick={(e)=>{this.props.history.push('/admin/view-externat-cases')}} className={classes.button}>
        Voir tout les cas externats
      </Button>
      </div>
          
          
      
    )
  }else {
    return (
     <NotAuthorized {...props}/>
    )
  }


  }
}
 

const AdminDashboard2 = withStyles(styles)(AdminDashboard);

export default withTracker(() => {
  const subscription = Meteor.subscribe('cases.posted');
  const subscription2 = Meteor.subscribe('users.admin');


  return {
    loading: !subscription.ready() && !subscription2.ready(),
    usersArray: !subscription2.ready() &&Meteor.users.find().fetch(),
    systemeArray:!subscription.ready() && generateSystemeArray(CasesCollection.find().fetch()),
    cases:!subscription.ready() && CasesCollection.find().fetch()

  };
})(AdminDashboard2);
 