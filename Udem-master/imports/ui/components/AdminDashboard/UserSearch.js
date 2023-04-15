import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CasesCollection from '../../../api/Cases/Cases';
import EmailSearch from './EmailSearch';
import Grid from '@material-ui/core/Grid';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { inlineContent } from '../../../../node_modules/juice';
import { white } from 'material-ui/styles/colors';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

// This is to lookup users

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  checboxes: {
    display: inlineContent,
  },
  seperateInput: {
    backgroundColor: white,
    padding: 3,
    justifyContent: 'center',
    height: 60,
  },
  item: {
    width: '92%',
  },
  search: {
    width: '95%',
    margin: 7,
  },
  grid: {
    width: '90%',
    margin: 'auto',
    opacity: '0.8',
  },
});

const generateEmailArray = (baseArray) => {

  var emailObject = [];
  //// console.log('in generateEmail');
  //// console.log('base aray is ');
  //// console.log(baseArray);
  //// console.log('now creating emailObect');
  baseArray.forEach(function (userDoc) {
   // console.log(emailObject)
    for(var i = 0 ; i < baseArray.lenght ; i++ ){
     // console.log(userDoc.emails[i].address);
        emailObject = emailObject.concat(userDoc.emails[i].address);
      }
  });

  //// console.log("Email array is ");
  //// console.log(emailObject);

  //remove duplicates from the array 
  // var finalReasonObject = emailObject.filter(function (value, index, self) {

  //   return self.indexOf(value) == index;
  // });

 // console.log("final reason object is :");
  //// console.log(finalReasonObject)
  return Array.from(emailObject);
};


class Search extends React.Component {
  state = {

    //search bar
    checkedA: true,
    multiline: 'Controlled',
    //raison 
    emailsArray: generateEmailArray(this.props.usersArray),
    email: 'Recherche par couriel',
    reasonArray: [],
    //systeme
    systeme: 'Recherche par couriel',
    systemeArray: [],
    nameArray: [],
    //niveau de difficulte
    
    atelier: false,
  };
  componentWillMount = () => {
    //// console.log('component will mount and current search array is :');
    
    // this.props.onSetUserSearchArray(this.props.searchArray);
    this.props.onSetUsers(this.props.usersArray);
    //// console.log(this.props.searchArray);
  };
 
  componentDidMount = () => {
    //// console.log("component did mount");
    this.props.onSetUsers(this.props.usersArray);
  };
 
    
  componentWillUnmount = () =>{ 
    this.props.onSetUserSearchArray([]);
}

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeSearch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes, userSearchArray } = this.props;
    const {  usersArray,emailsArray } = this.state;
    return (
      <div className={classes.grid}>            
          <EmailSearch label="Rechercher par couriel" className={(classes.textField, classes.search)} emailsArray={emailsArray} {...this.props} />       
      </div>
     
        
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Search2 = withStyles(styles)(Search);

export default withTracker(() => {
  const subscription = Meteor.subscribe('admin.users');


  return {
    loading: !subscription.ready(),
    usersArray: Meteor.users.find().fetch(),
    userSearchArray: Meteor.users.find().fetch(),
 


  };
})(Search2);