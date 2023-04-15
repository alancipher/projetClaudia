import './CaseView.scss';

import { monthDayYearAtTime, timeago } from '../../../modules/dates';

import { Alert } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CasesCollection from '../../../api/Cases/Cases';
import Documents from '../../../api/Documents/Documents';
import ExternatsGeriatry from '../../../api/Externats/ExternatsGeriatry';
import ExternatsPsycho from '../../../api/Externats/ExternatsPsycho';
import ExternatsSurgery from '../../../api/Externats/ExternatsSurgery';
import Grid from '@material-ui/core/Grid';
import Loading from '../Loading/Loading';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React from 'react';
import Search from './Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

// import SearchField from './searchfield';




// FIXME READY FOR FINAL STYLING 
//this is the page where they see all the cases and can query through them

const styles = {
    root: {
        flexGrow: 1,
        flex: 1,
        alignItems: 'center',
    },
    flex: {
        flex: 1,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

const setCaseId = (id) => {
    //   this function calls the dispatcher for the case atribute of the caseId state variable

}

const generateSystemeArray = (baseArray) => {

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
    return Array.from(finalSystemeObject);
  };


const CaseView = ({ loading,  cases1,cases2,cases3,  systemeArray, searchArray, match, history, ...props }) => (!loading ? (
   
<div className="Externats">
      <div style={styles.header} className={"page-header"}>
        <h3 className="pull-left">Externats</h3>
      </div>
      <br />  
      <div align="left"  className={"page-header"} style={styles.flex}>
        <h4 >Psychiatrie</h4>
      </div>
      <div align="left"> 
      {cases1.map(({ _id, gabarit,intro,type ,...caseDoc}, index) => (
        <div key={_id} className="case-card">
          <Card>
            <CardContent>
              <Typography style={styles.title} color="primary">
                {gabarit.nom} , {gabarit.age} ans
              </Typography>
              <Typography style={styles.title} color="secondary">
              {intro.q1.text}
              </Typography>
            </CardContent>

            <Button
                            onClick={() => history.push(`/externat-${type.toLowerCase()}/${_id}`)}
                            block
                          >
                              <i className="fa fa-eye" aria-hidden="true" />
                          </Button>
             
          </Card>
        </div>
      ))}
      </div>
      <br />  
      <div align="left" className={"page-header"} style={styles.flex}>
        <h4  >Gériatrie</h4>
      </div>
      <div align="left"> 
      {cases2.map(({ _id, gabarit,intro,type ,...caseDoc}, index) => (
        <div key={_id} className="case-card">
          <Card>
            <CardContent>
              <Typography style={styles.title} color="primary">
                {gabarit.nom} , {gabarit.age} ans
              </Typography>
              <Typography style={styles.title} color="secondary">
              {intro.q1.text}
              </Typography>
            </CardContent>

            
            <Button
                            onClick={() => history.push(`/externat-${type.toLowerCase()}/${_id}`)}
                            block
                          >
                              <i className="fa fa-eye" aria-hidden="true" />
                          </Button>
           
          </Card>
        </div>
      ))}
      </div>
      <br />  
      <div align="left" className={"page-header"} style={styles.flex}>
        <h4 >Chirurgie</h4>
      </div>
      <div  align="left"> 
      {cases3.map(({ _id,type,intro, gabarit,...caseDoc }, index) => (
        <div key={_id} className="case-card">
          <Card>
            <CardContent>
              <Typography style={styles.title} color="primary">
                {gabarit.nom} , {gabarit.age} ans
              </Typography>
              <Typography style={styles.title} color="secondary">
                {intro.q1.text}
              </Typography>
            </CardContent>

           
            <Button
                            onClick={() => history.push(`/externat-${type.toLowerCase()}/${_id}`)}
                            block
                          >
                              <i className="fa fa-eye" aria-hidden="true" />
                          </Button>
          </Card>
        </div>
      ))}
      </div>
    </div>
            
) : <Loading />);

CaseView.propTypes = {
    loading: PropTypes.bool.isRequired,
    cases1: PropTypes.arrayOf(PropTypes.object).isRequired,
    cases2: PropTypes.arrayOf(PropTypes.object).isRequired,
    cases3: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withTracker(() => {
    const subscription1 = Meteor.subscribe("externatsGeriatry.admin");
  const subscription2 = Meteor.subscribe("externatsSurgery.admin");
  const subscription3 = Meteor.subscribe("externatsPsycho.admin");
  


    return {
        loading:   !subscription1.ready() &&
        !subscription2.ready() &&
        !subscription3.ready()  ,
        cases1: ExternatsPsycho.find().fetch(),
    cases2: ExternatsGeriatry.find().fetch(),
    cases3: ExternatsSurgery.find().fetch()

    };
})(CaseView);
