import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CasesCollection from '../../../api/Cases/Cases';
import Grid from '@material-ui/core/Grid';
import { Meteor } from 'meteor/meteor';
import NameSearch from './NameSearch';
import PropTypes from 'prop-types';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { inlineContent } from '../../../../node_modules/juice';
import { white } from 'material-ui/styles/colors';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

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

const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

class Search extends React.Component {
  state = {

    //search bar
    checkedA: true,
    multiline: 'Controlled',
    //raison 
    raison: 'Recherche par raison de consulation',
    reasonArray: [],
    //systeme
    systeme: 'Recherche par système',
    systemeArray: [],
    nameArray: [],
    //niveau de difficulte
    
    atelier: false,
  };
  componentWillMount = () => {
    // console.log('component will mount and current search array is :');
    // console.log(this.props.searchArray);
    // this.props.onSetSearchArray(this.props.cases);
    this.props.onSetUserCases(this.props.cases);
    this.props.onSetReasonArray(this.generateReasonArray(this.props.cases));
    this.props.onSetSystemeArray(this.generateSystemeArray(this.props.cases));
  };
  componentDidMount = () => {
    
    this.props.onSetReasonArray(this.generateReasonArray(this.props.cases));
    this.props.onSetSystemeArray(this.generateSystemeArray(this.props.cases));
    
  }
  generateReasonArray = (baseArray) => {

    var reasonObject = [];
    // console.log('in generateReasonArray');
    // console.log('base aray is ');
    // console.log(baseArray);
    // console.log('now creating reasonObect');
    baseArray.forEach(function (caseDoc) {
      // console.log(reasonObject)
      reasonObject = reasonObject.concat(caseDoc.gabarit.reason);
    });

    // console.log("Reason array is ");
    // console.log(reasonObject);

    //remove duplicates from the array 
    var finalReasonObject = reasonObject.filter(function (value, index, self) {

      return self.indexOf(value) == index;
    });

    // console.log("final reason object is :");
    // console.log(finalReasonObject)
   
    return (finalReasonObject.length == 0 ) ? [""] : Array.from(finalReasonObject);
  };


  generateSystemeArray = (baseArray) => {

    var systemeObject = [];
    // console.log('in generateSystemeArray');
    // console.log('base aray is ');
    // console.log(baseArray);
    // console.log('now creating systemeObect');
    baseArray.forEach(function (caseDoc) {
      // console.log(systemeObject)
      systemeObject = systemeObject.concat(caseDoc.gabarit.systeme);
    });

    // console.log("Systeme array is ");
    // console.log(systemeObject);

    //remove duplicates from the array 
    var finalSystemeObject = systemeObject.filter(function (value, index, self) {

      return self.indexOf(value) == index;
    });

    // console.log("final systeme object is :");
    // console.log(finalSystemeObject)
    if(finalSystemeObject.length == 0){
      finalSystemeObject = [""];
    }
    return (finalSystemeObject.length == 0 ) ? [""] : Array.from(finalSystemeObject);
  };


  generateNameArray = (baseArray) => {

    var systemeObject = [];
    // console.log('in generateNameArray');
    // console.log('base aray is ');
    // console.log(baseArray);
    // console.log('now creating NameObect');
    baseArray.forEach(function (caseDoc) {
      // console.log(systemeObject)
      systemeObject = systemeObject.concat(caseDoc.gabarit.nom);
    });

    // console.log("Systeme name is ");
    // console.log(systemeObject);

    //remove duplicates from the array 
    var finalSystemeObject = systemeObject.filter(function (value, index, self) {

      return self.indexOf(value) == index;
    });

    // console.log("final systeme object is :");
    // console.log(finalSystemeObject)
    
    return (finalSystemeObject.length == 0 ) ? [""] : (finalSystemeObject.length == 0 ) ? [""] : Array.from(finalSystemeObject);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeSearch = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes, searchArray } = this.props;
    const { reason, reasonArray, systeme, systemeArray, nameArray } = this.state;
    return (
      <div className={classes.grid}>            
          <NameSearch label="Rechercher par raison de consultation" className={(classes.textField, classes.search)} nameArray={reasonArray} {...this.props} />       
      </div>
     
        
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Search2 = withStyles(styles)(Search);

export default withTracker(() => {
  const subscription = Meteor.subscribe('cases');


  return {
    loading: !subscription.ready(),
    cases: CasesCollection.find().fetch(),
    searchArray: CasesCollection.find().fetch(),

  };
})(Search2);