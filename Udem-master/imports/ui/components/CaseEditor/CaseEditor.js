import AutoField from 'uniforms--material-ui/AutoField';
import AutoForm from 'uniforms--material-ui/AutoForm';
import { Bert } from 'meteor/themeteorchef:bert';
import Button from '@material-ui/core/Button';
import Cases from '../../../api/Cases/Cases';
import Divider from '@material-ui/core/Divider';
import ErrorsField from 'uniforms--material-ui/ErrorsField';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Loading from '../../components/Loading/Loading';
import { Meteor } from 'meteor/meteor';
import MobileStepper from '@material-ui/core/MobileStepper';
import NestField from 'uniforms--material-ui/NestField';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import RadioField from 'uniforms--material-ui/RadioField';
import React from 'react';
import SelectField from 'uniforms--material-ui/SelectField';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import SubmitField from 'uniforms--material-ui/SubmitField';
import TextField from 'uniforms--material-ui/TextField';
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

// TODO make form more personalized 
const styles = theme => ({
  symptomField: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper1: {
    width: '100%',
    margin: '0vh 0vh 1vh 0vh',
  },
  space: {
    margin: '4vh 4vh 10vh 4vh',
    padding: '2vh',
  },
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  paper: {
    ...theme.mixins.gutters(),
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 5,
  },
  stepper: {
    width: '100%',
  }


});

function getSteps() {
  return [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
}



class CaseEditor extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
    width: window.innerWidth,
  };

  isStepOptional = step => {
    return step === 8;
  };

  componentWillMount = () => {
    window.addEventListener('resize', this.handleWindowSizeChange);
  };

  componentDidUpdate() {
    window.scrollTo(0, 0);
  };

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  };

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };


  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }

    this.setState({
      activeStep: activeStep!=9 ? activeStep + 1 : 9,
      skipped,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("Vous ne pouvez pas sauter cette étape.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes, theme, loading, sessionCase ,match} = this.props;
    const steps = getSteps();
    const { activeStep, width } = this.state;
    const isMobile = width <= 500;

    return (
!this.props.loading ?

      <div className="CaseEditor" className={classes.root}>

        <Typography variant="display1" color={'primary'} className={'paddingTop3'} gutterBottom> {`Modification de "${sessionCase.gabarit.nom}"`}</Typography>
        <AutoForm
          schema={Cases.schema}
            model={sessionCase}
          onSubmit={(doc) => {
            //check that the user ha permission to update 
            if(Roles.userIsInRole(Meteor.userId(), ['princess']) || Roles.userIsInRole(Meteor.userId(), ['editor'])  || Roles.userIsInRole(Meteor.userId(), ['admin']))
            {Meteor.call('cases.update', doc, (error) => {
              if (error) {
                swal({text: error.reason,icon: 'error'});
              } else {
                // TODO use better alerts 
                swal({text:'Votre cas clinique à été sauvegardé !',icon: 'success'});
                //give options in the swal 
                // this.props.history.push('/cases');
              }
            });}
            else {
              swal({text: "Vous n'êtes pas autorisé à modifier ce cas",icon: 'error'});
            }
          }}>
          <MobileStepper
            variant="progress"
            steps={9}
            position="static"
            activeStep={this.state.activeStep}
            className={classes.stepper}
            nextButton={
              <Button size="small" variant="contained"
                color={'primary'} onClick={this.handleNext} disabled={this.state.activeStep === 10}>
                Suivant
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" variant="contained"
                onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Précédent
          </Button>
            }
          />

          <Paper className={classes.paper} elevation={1}>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                <SubmitField />
              </Typography>
              </div>
            ) : (
                <div>
                  <Grid container>
                    {getStepContent(activeStep)}
                  </Grid>
                  <br/>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      <KeyboardArrowLeft /> Précédent
                </Button>
                   
                    {activeStep === steps.length - 1 ? <SubmitField /> : <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      Suivant <KeyboardArrowRight />
                    </Button>}

                  </div>
                </div>
              )} </Paper>
        </AutoForm>

      </div> : <Loading />);

  }
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Grid item xs={12} sm={12}>
        <Typography variant="headline" color={'secondary'} gutterBottom>Informations sur le patient et le cas clinique</Typography>
        <AutoField name="gabarit.nom" />
        <AutoField name="gabarit.age" />
        <AutoField name="gabarit.sexe" />
       
        <AutoField name="gabarit.systeme" />
        <AutoField name="gabarit.niveau" />
        <AutoField name="gabarit.stationTime" />
        <AutoField name="gabarit.reason" multiline/>
        <AutoField name="intro.consultationReason2" multiline/>
        <AutoField name="gabarit.studentContext" multiline/>
        <AutoField name="gabarit.patientContext" multiline/>

      </Grid>;
    case 1:
      return <Grid item xs={12} sm={12}>
        <Typography variant="headline" color={'secondary'} gutterBottom>Antécédents médicaux</Typography>
        <AutoField name="antecedents.personal.text" label={'Personnels'} multiline />
        <AutoField name="antecedents.surgeries.text" label={'Chirurgicaux'} multiline/>
        <AutoField name="antecedents.psy.text" label={'Psychiatriques, psychologiques'} multiline/>
        <AutoField name="antecedents.gyn.text" label={'Gynécologiques et obstétricaux '} multiline/>
        <AutoField name="antecedents.famHist.text" label={'Familiaux'} multiline/>
        <AutoField name="antecedents.allergies.text" label={'Allergies'} multiline/>
      </Grid>;
    case 2:
      return <Grid item xs={12} sm={12}>
        <Typography variant="headline" color={'secondary'} gutterBottom>Médication</Typography>

        <AutoField name="medication.listOfMeds.text" label={'Liste de médicaments'} multiline/>
        <AutoField name="medication.recentChanges.text" label={'Changement récents'} multiline/>
        <br/>
        <Typography variant="headline" color={'secondary'} gutterBottom>Contexte de vie </Typography>
        <AutoField name="lifeContext.job.text" label={'Emploi'} multiline/>
        <AutoField name="lifeContext.partner.text" label={'Partenaire'} multiline />
        <AutoField name="lifeContext.environment.text" label={'Milieu de vie'}multiline />
        <AutoField name="lifeContext.stressLevel.text" label={'Niveau de stress'} multiline/>
        <AutoField name="lifeContext.activities.text" label={'Activités et loisirs'}multiline />
        <AutoField name="lifeContext.travels.text" label={'Voyages récents'}multiline />

      </Grid>;
    case 3:
      return <Grid item xs={12} sm={12}>
        <Typography variant="headline" color={'secondary'} gutterBottom>Habitudes de vie  </Typography>

        <AutoField name="lifeHabits.tabacco.text" label={'Tabac'} multiline/>
        <AutoField name="lifeHabits.alcohol.text" label={'Alcool'}multiline />
        <AutoField name="lifeHabits.drugs.text" label={'Drogues'} multiline/>
        <AutoField name="lifeHabits.coffee.text" label={'Caféine ou stimulants'} multiline/>
        <AutoField name="lifeHabits.physAct.text" label={'Activité physique'} multiline/>
        <AutoField name="lifeHabits.foodHabits.text" label={'Alimentation'}multiline />
        <AutoField name="lifeHabits.sexuality.text" label={'Sexualité'} multiline />
        <AutoField name="lifeHabits.sleep.text" label={'Sommeil'} multiline />



      </Grid>;
    case 4:
      return <Grid item xs={12} sm={12}>
        <Typography variant="headline" color={'secondary'} gutterBottom>Histoire de la maladie actuelle (HMA) </Typography>

        <AutoField name="currentHist.historic.text" label={'Question ouverte'} />
        <Typography variant="body1" color={'secondary'} gutterBottom> P </Typography>
        <AutoField name="currentHist.p.one.text" label={'Provoqué'} multiline/>
        <AutoField name="currentHist.p.two.text" label={'Pallié (soulagé)'}multiline />
        <Typography variant="body1" color={'secondary'} gutterBottom> Q </Typography>
        <AutoField name="currentHist.q.one.text" label={'Qualité'} multiline/>
        <AutoField name="currentHist.q.two.text" label={'Quantité'} multiline />
        <Typography variant="body1" color={'secondary'} gutterBottom> R </Typography>
        <AutoField name="currentHist.r.one.text" label={'Région'} />
        <AutoField name="currentHist.r.two.text" label={'Irradiation'} multiline/>
        <Typography variant="body1" color={'secondary'} gutterBottom> S </Typography>
        <AutoField name="currentHist.s.one.text" label={'Sévérité'} multiline/>
        <Typography variant="body1" color={'secondary'} gutterBottom> T </Typography>
        <AutoField name="currentHist.t.one.text" label={'Depuis combien de temps?'} multiline/>
        <AutoField name="currentHist.t.two.text" label={'Constant/Intermittent'}multiline />
        <AutoField name="currentHist.t.three.text" label={'Croissant/Stable'} multiline/>
        <AutoField name="currentHist.t.four.text" label={'Fin'} />
      </Grid>;
    case 5:
      return <Grid item xs={12} sm={12}>
        <Typography variant="headline" color={'secondary'} gutterBottom>Symptômes </Typography>
        <h5>Symptômes Généraux</h5>
        <div className={'uniforms-symptom-field'} styles={styles.symptomField} >
          <AutoField name="generalSymp.one.text" label={'Fièvre'} />
          <AutoField name="generalSymp.one.important" label={'Question importante'} />
          <AutoField name="generalSymp.one.presence" label={'Symptôme présent'} />
        </div>
        <div className={'uniforms-symptom-field'} styles={styles.symptomField} >
          <AutoField name="generalSymp.two.text" label={'Perte d\'appétit'} multiline/>
          <AutoField name="generalSymp.two.important" label={'Question importante'} />
          <AutoField name="generalSymp.two.presence" label={'Symptôme présent'} />
        </div>
        <div className={'uniforms-symptom-field'} styles={styles.symptomField} >
          <AutoField name="generalSymp.three.text" label={'Diaphorèse nocture'} />
          <AutoField name="generalSymp.three.important" label={'Question importante'} />
          <AutoField name="generalSymp.three.presence" label={'Symptôme présent'} />
        </div>
        <div className={'uniforms-symptom-field'} styles={styles.symptomField} >
          <AutoField name="generalSymp.four.text" label={'Fatigue'} />
          <AutoField name="generalSymp.four.important" label={'Question importante'} />
          <AutoField name="generalSymp.four.presence" label={'Symptôme présent'} />
        </div>
        <div className={'uniforms-symptom-field'} styles={styles.symptomField} >
          <AutoField name="generalSymp.revue.text" label={'Revue des systemes'} multiline />
          <AutoField name="generalSymp.revue.important" label={'Question importante'} />
          <AutoField name="generalSymp.revue.presence" label={'Symptôme présent'} />
        </div>
        <h5>Autres symptômes pertinents</h5>

        <div className={'uniforms-otherSystem-field'} styles={styles.otherSystemField} >


          <AutoField name="otherSystems" />



        </div>
      </Grid>;
    case 6:
      return <Grid item xs={12} sm={12}>
        <Typography variant="headline" color={'secondary'} gutterBottom>PICA </Typography>


        <AutoField name="pica.one.text" label={'Perception'} multiline/>
        <AutoField name="pica.two.text" label={'Impacts'} multiline/>
        <AutoField name="pica.three.text" label={'Craintes'} multiline/>
        <AutoField name="pica.four.text" label={'Attentes'} multiline/>

         <Typography variant="headline" color={"secondary"} gutterBottom>
            Examen Physique{" "}
          </Typography>
        <AutoField name="physicalExam" label={""} multiline />
      </Grid>;
    case 7:
      return <Grid item xs={12} sm={12}>
        <Typography variant="headline" color={'secondary'} gutterBottom>Questions supplémentaires </Typography>

        <AutoField name="additional.one" multiline />
        <AutoField name="additional.two"multiline />
        
        <Typography variant="body1" color={'secondary'} gutterBottom>  2 questions pertinentes qui pourraient se retrouver dans un cas d’ÉCOS</Typography>
        <AutoField name="additional.three.question" multiline/>
        <AutoField name="additional.three.reponse" multiline />
        <AutoField name="additional.four.question" multiline />
        <AutoField name="additional.four.reponse" multiline/>
      </Grid>;
    case 8:
      return <Grid item xs={12} sm={12}>
        <Typography variant="headline" color={'secondary'} gutterBottom>Références </Typography>

        <AutoField name="references" />
      </Grid>;
    // case 9:
    //   return <Grid item xs={12} sm={12}>
    //     <Typography variant="headline" color={'secondary'} gutterBottom>Validation et soumission du cas </Typography>

    //     <ErrorsField />
    //   </Grid>;


    default:
      return '';
  }
}
CaseEditor.proTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object,
  theme: PropTypes.object.isRequired,

}

const CaseEditor2 = withStyles(styles, { withTheme: true })(CaseEditor);

export default withTracker(({ match }) => {
    const documentId = match.params._id;
    const subscription = Meteor.subscribe('cases.view', documentId);

    console.log(match.params._id);
    console.log(Cases.findOne({_id:documentId}));

   
    return {
        loading: !subscription.ready(),
        sessionCase:  Cases.findOne({_id:documentId}),
    };
})(CaseEditor2);