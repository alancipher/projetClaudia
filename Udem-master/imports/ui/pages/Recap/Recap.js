import React, { Component } from 'react'
import { monthDayYear, monthDayYearAtTime, timeago } from '../../../modules/dates';

import Documents from '../../../api/Documents/Documents';
import Grid from '@material-ui/core/Grid';
import Loading from '../../components/Loading/Loading';
import { Meteor } from 'meteor/meteor';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import { withTracker } from 'meteor/react-meteor-data';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 100,
  },
  rootForm: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flex: 1,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  visible: {
    // visibility: 'visible',
  },
  hidden: {
    display: 'none',
  }
});

class Recap extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  state = {
    recapDoc: this.props.documents ? this.props.documents.caseDoc : '',
    goodAnswers: [],
    badAnswers: [],
    loadedDoc: false,
  }

  constructor(props) {
    super(props);


  }
  componentDidUpdate() {
    if (this.props.documents && !this.state.loadedDoc) {
      this.sortQuestions();
      this.setState({ loadedDoc: true })
    }
  }
  sortQuestions() {

    var goodAnswers = [''];
    var badAnswers = [''];



    const caseDoc = this.props.documents ? this.props.documents.caseDoc : null;
    if (caseDoc != null) {//check general symptoms first  
      if (caseDoc.generalSymp.one.important) {
        if (caseDoc.generalSymp.one.done) {
          goodAnswers.push({ system: 'Général', symptom: 'Fièvre', presence: caseDoc.generalSymp.one.presence, description:caseDoc.generalSymp.one.text });
        } else {
          badAnswers.push({ system: 'Général', symptom: 'Fièvre', presence: caseDoc.generalSymp.one.presence, description:caseDoc.generalSymp.one.text });
        }
      }
      if (caseDoc.generalSymp.two.important) {
        if (caseDoc.generalSymp.two.done) {
          goodAnswers.push({ system: 'Général', symptom: 'Perte d’appétit', presence: caseDoc.generalSymp.two.presence, description:caseDoc.generalSymp.two.text });
        } else {
          badAnswers.push({ system: 'Général', symptom: 'Perte d’appétit', presence: caseDoc.generalSymp.two.presence, description: caseDoc.generalSymp.two.text });
        }
      }

      if (caseDoc.generalSymp.three.important) {
        if (caseDoc.generalSymp.three.done) {
          goodAnswers.push({ system: 'Général', symptom: 'Sudations nocturnes', presence: caseDoc.generalSymp.three.presence, description: caseDoc.generalSymp.three.text });
        } else {
          badAnswers.push({ system: 'Général', symptom: 'Sudations nocturnes', presence: caseDoc.generalSymp.three.presence, description: caseDoc.generalSymp.three.text });
        }
      }
      if (caseDoc.generalSymp.four.important) {
        if (caseDoc.generalSymp.four.done) {
          goodAnswers.push({ system: 'Général', symptom: 'Fatigue', presence: caseDoc.generalSymp.four.presence, description: caseDoc.generalSymp.four.text });
        } else {
          badAnswers.push({ system: 'Général', symptom: 'Fatigue', presence: caseDoc.generalSymp.four.presence, description:caseDoc.generalSymp.four.text });
        }
      }

      if (caseDoc.generalSymp.revue.important) {
        if (caseDoc.generalSymp.revue.done) {
          goodAnswers.push({ system: 'Général', symptom: 'Revue des systèmes', presence: caseDoc.generalSymp.revue.presence, description: caseDoc.generalSymp.revue.text });
        } else {
          badAnswers.push({ system: 'Général', symptom: 'Revue des systèmes', presence: caseDoc.generalSymp.revue.presence, description: caseDoc.generalSymp.revue.text });
        }
      }



      //then check the user made questions 
      caseDoc.otherSystems.map(({ name, system }, index) => {
        system.map(({ symptom }) => {
          if (symptom.important) {
            if (symptom.done) {
              goodAnswers.push({ system: name, presence: symptom.presence, symptom: symptom.name, description: symptom.text ? symptom.text : "" });
            } else {
              badAnswers.push({ system: name, presence: symptom.presence, symptom: symptom.name, description: symptom.text ? symptom.text : "" });
            }
          }
        });
      });
    }
    //pass it on to the state 
    this.setState({ goodAnswers: goodAnswers, badAnswers: badAnswers });
  }

  scoreCalculator = (caseDoc) => {
    // this method calculates the total amount of questions in the case and returns a score on in percentage  (bonus questions count for 2 points)
    var total =  6 + 6+ 3 +6+ 7+12+4+4;  // add the rest of the lengths 
    console.log("current total is ;"+total+" other systems length " + caseDoc.otherSystems.length ) ;

    for (var i = 0; i < caseDoc.otherSystems.length; i++) {
      total += caseDoc.otherSystems[i].system.length;
      console.log("total is "+total + " symptom length " +caseDoc.otherSystems[i].system.length );
    }
return total;

    //see how many bonus questions in the case and add add bonus questions to total 
  }

  render() {
    const { loading } = this.props;
    const sessionDoc = this.props.documents;
    const recapDoc = this.props.documents ? this.props.documents.caseDoc : '';
    // console.log(this.props.documents ? this.props.documents.caseDoc : 'fail betch');

    const { goodAnswers, badAnswers } = this.state;

    return (
      !loading ?
        <div>
          <div className={'page-header'} style={styles.flex}>
            <h4 className="pull-left">Revue et résultats</h4>

          </div>
          <Grid container spacing={24} align={"center"}>
            <Grid item xs={12} sm={12} m={6} l={6} xl={6} >
              <Paper className={styles.paper} align={"center"}>
                <h3 className='pull-right result' size="small" color={'default'} >{Math.floor((sessionDoc.lastScore / this.scoreCalculator(recapDoc))*100)} %</h3>
                <div className={'padding4'}>
                  <Typography variant="title" align="left">
                    Nom:&nbsp;&nbsp;
                    <span className="prop-info">{recapDoc.gabarit.nom} , {recapDoc.gabarit.age} ans </span>
                  </Typography>
                  <Typography variant="title" align="left">
                    Raison de consultation:&nbsp;&nbsp;
                    <span className="prop-info">{recapDoc.gabarit.reason}</span>
                  </Typography>
                  <Typography variant="title" align="left">
                    Niveau de difficulté:&nbsp;&nbsp;
                    <span className="prop-info">{recapDoc.gabarit.niveau}</span>
                  </Typography>
                </div>
                <div className={'padding4'}>
                  <Typography variant="title" align="left">
                    Diagnostic principal:&nbsp;&nbsp;
                    <span className="prop-info">{recapDoc.additional.one}</span>
                  </Typography>
                  <Typography variant="body1" align="left">
                    {recapDoc.additional.principal}
                  </Typography>
                  <Typography variant="title" align="left">
                    Diagnostic différentiel:&nbsp;&nbsp;
                    <span className="prop-info">{recapDoc.additional.two}</span>

                  </Typography>
                  <Typography variant="body1" align="left">
                    {recapDoc.additional.differentiel}
                  </Typography>
                  {recapDoc && recapDoc.additional && recapDoc.additional.three ? <div><Typography variant="title" align="left">
                    Question:{recapDoc.additional.three.question}&nbsp;&nbsp;
                    <span className="prop-info">Réponse{recapDoc.additional.three.reponse}</span>
                  </Typography>
                  <Typography variant="body1" align="left">
                    {recapDoc.additional.q1}
                  </Typography></div>:''}
                 {recapDoc && recapDoc.additional && recapDoc.additional.four ? <div><Typography variant="title" align="left">
                    Question: {recapDoc.additional.four.question}&nbsp;&nbsp;
                    <span className="prop-info">Réponse: {recapDoc.additional.four.reponse}</span>
                  </Typography>
                  <Typography variant="body1" align="left">
                    {recapDoc.additional.q2}
                  </Typography></div> :''}
                  <Typography variant="title" align="left">
                    Complété:&nbsp;&nbsp;
                    <span className="prop-info">{monthDayYearAtTime(sessionDoc.updatedAt)} en {Math.floor(recapDoc.timeItTook / 60)} minute(s) et {recapDoc.timeItTook % 60} secondes.</span>
                  </Typography>
                </div>
              </Paper>
              <div className={'page-header other-questions'} style={styles.flex}>
                <h4 className="pull-left other-questions">Vous auriez dû demander les questions importantes suivantes:</h4>
                <br /><br />
              </div>
              <Grid item xs={12} sm={12} m={6} l={6} xl={6} >
                {badAnswers.map((answer, index) => (
                  answer != '' ? <Paper key={index} className={styles.paper} align={"center"}>
                    <div className={'padding4'}>
                      <Typography variant="title" align="left">
                        {answer.presence ? 'SYMPTÔME PRÉSENT' : 'SYMPTÔME ABSENT'} > {answer.system}
                      </Typography>
                      <Typography variant="body1" align="left">
                        {answer.symptom}
                      </Typography>
                      <Typography variant="body1" align="left">
                        {answer.description}
                      </Typography>

                    </div>
                  </Paper> : ''
                ))}
              </Grid>
              <div className={'page-header other-questions'} style={styles.flex}>
                <h4 className="pull-left">Vous avez correctement demandé les questions suivantes:</h4>
                <br /><br />
              </div>
              <Grid item xs={12} sm={12} m={6} l={6} xl={6} >
                {goodAnswers.map((answer, index) => (
                  answer != '' ? <Paper key={index} className={styles.paper} align={"center"}>
                    <div className={'padding4'}>
                      <Typography variant="title" align="left">
                        {answer.presence ? 'SYMPTÔME PRÉSENT' : 'SYMPTÔME ABSENT'} > {answer.system}
                      </Typography>
                      <Typography variant="body1" align="left">
                        {answer.symptom}
                      </Typography>

                      <Typography variant="body1" align="left">
                        {answer.description}
                      </Typography>
                    </div>
                  </Paper> : ''
                ))}
              </Grid>
            </Grid>
          </Grid>

        </div> : <Loading />
    )
  }
}

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('documents.view', documentId);

  return {
    loading: !subscription.ready(),
    documents: Documents.findOne({ _id: documentId }),
  };
})(Recap);  