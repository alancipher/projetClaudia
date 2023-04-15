import AutoField from "uniforms--material-ui/AutoField";
import AutoForm from "uniforms--material-ui/AutoForm";
import { Bert } from "meteor/themeteorchef:bert";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ErrorsField from "uniforms--material-ui/ErrorsField";
import Externats from "../../../api/Externats/ExternatsPsycho";
import Grid from "@material-ui/core/Grid";
import Gynecos from "../../../api/Externats/Schemas/Gynecos";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Loading from "../../components/Loading/Loading";
import { Meteor } from "meteor/meteor";
import MobileStepper from "@material-ui/core/MobileStepper";
import NestField from "uniforms--material-ui/NestField";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import RadioField from "uniforms--material-ui/RadioField";
import React from "react";
import SelectField from "uniforms--material-ui/SelectField";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import SubmitField from "uniforms--material-ui/SubmitField";
import TextField from "uniforms--material-ui/TextField";
import Typography from "@material-ui/core/Typography";
import swal from 'sweetalert';
import { withStyles } from "@material-ui/core/styles";
import { withTracker } from 'meteor/react-meteor-data';

// TODO make form more personalized
const styles = theme => ({
  symptomField: {
    display: "flex",
    flexWrap: "wrap"
  },
  paper1: {
    width: "100%",
    margin: "0vh 0vh 1vh 0vh"
  },
  space: {
    margin: "4vh 4vh 10vh 4vh",
    padding: "2vh"
  },
  field: {
    display: "flex",
    flexWrap: 'wrap',
  },
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  paper: {
    ...theme.mixins.gutters(),
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 5,
    fontSize: "1em"
  },
  stepper: {
    width: "100%"
  },
  otherSystemField: {
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

function getSteps() {
  return [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
}

class EditCase extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set(),
    width: window.innerWidth,

  };

  isStepOptional = step => {
    return step === 13;
  };

  componentWillMount = () => {
    window.addEventListener("resize", this.handleWindowSizeChange);
  };

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleWindowSizeChange);
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
      activeStep: activeStep + 1,
      skipped
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1
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
        skipped
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes, theme ,history,loading,sessionCase,...props} = this.props;
    const steps = getSteps();
    const { activeStep, width } = this.state;
    const isMobile = width <= 500;
if(loading){
return (<Loading {...props} />);
}else{
    return (
      <div className="EditCase" className={classes.root}>
        <Typography
          variant="display1"
          color={"primary"}
          className={"paddingTop3"}
          gutterBottom
        >
          {" "}
         Modifier un cas d'externat : Gynecologie-Obstétrique
        </Typography>
        <AutoForm
          schema={Gynecos}
          model={sessionCase}
          onSubmit={doc => {
            console.log("submitted");
            console.log(doc);
            Meteor.call("externats.update", doc, "gyneco", error => {
              if (error) {
                Bert.alert(error.reason, "danger");
              } else {
                // TODO use better alerts
                swal("Votre cas clinique à été sauvegardé !", { icon: "success" });
                this.props.history.push("/cases");
              }
            });
          }}
        
        >
          <MobileStepper
            variant="progress"
            steps={9}
            position="static"
            activeStep={this.state.activeStep}
            className={classes.stepper}
            nextButton={
              <Button
                size="small"
                variant="contained"
                color={"primary"}
                onClick={this.handleNext}
                disabled={this.state.activeStep === 14}
              >
                Suivant
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                  )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                variant="contained"
                onClick={this.handleBack}
                disabled={this.state.activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                  )}
                Précédent
              </Button>
            }
          />

          <Paper className={classes.paper} elevation={1}>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&quot;re finished
                </Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
                <div>
                  <Grid container>{getStepContent(activeStep)}</Grid>
                  <br />
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      <KeyboardArrowLeft /> Précédent
                  </Button>
                    {this.isStepOptional(activeStep) && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleSkip}
                        className={classes.button}
                      >
                        Sauter
                    </Button>
                    )}
                    {activeStep === steps.length - 1 ? (
                      <SubmitField />
                    ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                          
                        >
                          Suivant <KeyboardArrowRight />
                        </Button>
                      )}
                  </div>
                </div>
              )}{" "}
          </Paper>
        </AutoForm>
      </div>
    );
  }}
}

function getStepContent(step) { 
  switch (step) {
    case 0:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Informations sur le patient et le cas clinique
          </Typography>

          <AutoField name="gabarit.nom" />


          <AutoField name="gabarit.age" />

          <AutoField name="gabarit.niveau" />
          <AutoField name="gabarit.stationTime" />
          <AutoField name="gabarit.contenu" />

          <AutoField name="intro.q1.text" label={'Raison de consultation primaire (en quelques mots)'} multiline />
          <AutoField name="intro.q2.text" label={'Raison de consultation secondaire (si applicable)'} multiline />
          <AutoField name="intro.q3" label={'Contexte pour l’étudiant'} multiline />
          <AutoField name="intro.q4" label={'Contexte pour le patient'} multiline />
        </Grid>
      );
    case 1:
      return (
        <Grid item xs={12} sm={12}>


          <Typography variant="headline" color={"secondary"} gutterBottom>
            Antécédents
          </Typography>
          <Typography variant="body1" color={"secondary"} gutterBottom>
          Obstétriques
          </Typography>
          <div style={styles.field}>
            <AutoField name="antecedents" multiline />
          </div>
          
          <div style={styles.field}>
            <AutoField name="obstetrique.q1.text" label={'ITSS'} multiline />
            <AutoField name="obstetrique.q1.important" />
            <AutoField name="obstetrique.q1.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="obstetrique.q2.text" label={'Herpes'} multiline />
            <AutoField name="obstetrique.q2.important" />
            <AutoField name="obstetrique.q2.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="obstetrique.q3.text" label={'Dernier PAP'} multiline />
            <AutoField name="obstetrique.q3.important" />
            <AutoField name="obstetrique.q3.value" />
          </div>

          <Typography variant="headline" color={"secondary"} gutterBottom>
          Généraux
          </Typography>

          <div style={styles.field}>
            <AutoField name="generaux.q1.text" label={'Groupe sanguin'} multiline />
            <AutoField name="generaux.q1.important" />
            <AutoField name="generaux.q1.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="generaux.q2.text" label={'Winrho reçu?'} multiline />
            <AutoField name="generaux.q2.important" />
            <AutoField name="generaux.q2.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="generaux.q3.text" label={'Anti-corps rubéole'} multiline />
            <AutoField name="generaux.q3.important" />
            <AutoField name="generaux.q3.value" />
          </div>
      
          <div style={styles.field}>
            <AutoField name="generaux.q4.text" label={'Personnels médicaux'} helperText={'Ne pas utiliser d\'acronymes'} multiline />
            <AutoField name="generaux.q4.important" />
            <AutoField name="generaux.q4.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="generaux.q5.text" label={'Chirurgicaux'} multiline />
            <AutoField name="generaux.q5.important" />
            <AutoField name="generaux.q5.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="generaux.q6.text" label={'Psychiatriques/psychologiques'} multiline />
            <AutoField name="generaux.q6.important" />
            <AutoField name="generaux.q6.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="generaux.q7.text" label={'Vaccins'} multiline />
            <AutoField name="generaux.q7.important" />
            <AutoField name="generaux.q7.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="generaux.q8.text" label={'Antécédents familiaux'} helperText={'parents, fratrie, grand-parents, etc'} multiline />
            <AutoField name="generaux.q8.important" />
            <AutoField name="generaux.q8.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="generaux.q9.text" label={'Allergies'} helperText={'présence, réaction'} multiline />
            <AutoField name="generaux.q9.important" />
            <AutoField name="generaux.q9.value" />
          </div>
         
          <Typography variant="headline" color={"secondary"} gutterBottom>
          Histoire de la grossesse actuelle{" "}
          </Typography>
          <Typography variant="headline" color={"secondary"} gutterBottom>
          T1
          </Typography>
           
          <Typography variant="body1" color={"secondary"} gutterBottom>
          Bilans de base
          </Typography>
          <div style={styles.field}>
          <AutoField name="currentPregHist.q1.text" label={'VIH'}  multiline />
          <AutoField name="currentPregHist.q1.important" />
          <AutoField name="currentPregHist.q1.value" />
         
          </div>
          <div style={styles.field}>
          <AutoField name="currentPregHist.q2.text" label={'VHB'}  multiline />
          <AutoField name="currentPregHist.q2.important"  />
          <AutoField name="currentPregHist.q2.value" />
         
          </div>

          <br/>
          <div style={styles.field}>
          <AutoField name="currentPregHist.q3.text" label={'Hémoglobine'} multiline />
          <AutoField name="currentPregHist.q3.important" />
          <AutoField name="currentPregHist.q3.value" />
         
          </div>
        
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q4.text" label={'TSH'} multiline />
          <AutoField name="currentPregHist.q4.important" />
          <AutoField name="currentPregHist.q4.value" />
          
          </div>
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q5.text" label={'Analyse et culture d’urine'} multiline />
          <AutoField name="currentPregHist.q5.important" />
          <AutoField name="currentPregHist.q5.value" />
     
          </div>
          <br/>
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q6.text" label={'Électrophorèse hémoglobine (si indiquée)'} multiline />
          <AutoField name="currentPregHist.q6.important" />
          <AutoField name="currentPregHist.q6.value" />
         
          </div>
          <br/>
          <div style={styles.field}>
          <AutoField name="currentPregHist.q7.text" label={'DPNQT21 (si fait)'}  multiline />
          <AutoField name="currentPregHist.q7.important" />
          <AutoField name="currentPregHist.q7.value" />
         
          </div>
          <br/>
          <Typography variant="body1" color={"secondary"} gutterBottom>
          Écho T1
          </Typography>
          <div style={styles.field}>
          <AutoField name="currentPregHist.q8.text" label={'Âge gestationnel'}  multiline />
          <AutoField name="currentPregHist.q8.important"  />
          <AutoField name="currentPregHist.q8.value" />
         
          </div>
          
          
          <div style={styles.field}>
          <AutoField name="currentPregHist.q9.text" label={'Clarté nucale'} multiline />
          <AutoField name="currentPregHist.q9.important" />
          <AutoField name="currentPregHist.q9.value" />
         
          </div>
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q10.text" label={'Os nasal'} multiline />
          <AutoField name="currentPregHist.q10.important" />
          <AutoField name="currentPregHist.q10.value" />
          
          </div>
          <Typography variant="body1" color={"secondary"} gutterBottom>
           T2
          </Typography>
          <Typography variant="body1" color={"secondary"} gutterBottom>
          HGOP
          </Typography>
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q11.text" label={'Hyperglycémie orale provoquée'} multiline />
          <AutoField name="currentPregHist.q11.important" />
          <AutoField name="currentPregHist.q11.value" />
     
          </div>
          <Typography variant="body1" color={"secondary"} gutterBottom>
          Écho T2
          </Typography>
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q12.text" label={'Âge gestationnel'} multiline />
          <AutoField name="currentPregHist.q12.important" />
          <AutoField name="currentPregHist.q12.value" />
         
          </div>
          
          
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q13.text" label={'Morphologie'} multiline />
          <AutoField name="currentPregHist.q13.important" />
          <AutoField name="currentPregHist.q13.value" />
         
          </div>
          <div style={styles.field}>
          <AutoField name="currentPregHist.q14.text" label={'Liquide amniotique'}  multiline />
          <AutoField name="currentPregHist.q14.important" />
          <AutoField name="currentPregHist.q14.value" />
         
          </div>
          <div style={styles.field}>
          <AutoField name="currentPregHist.q15.text" label={'Position placenta'}  multiline />
          <AutoField name="currentPregHist.q15.important"  />
          <AutoField name="currentPregHist.q15.value" />
         
          </div>

          <Typography variant="body1" color={"secondary"} gutterBottom>
           T3
          </Typography>
          <Typography variant="body1" color={"secondary"} gutterBottom>
          Écho T3 (si indiquée)
          </Typography>
          <div style={styles.field}>
          <AutoField name="currentPregHist.q16.text" label={'Âge gestationnel'} multiline />
          <AutoField name="currentPregHist.q16.important" />
          <AutoField name="currentPregHist.q16.value" />
         
          </div>
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q17.text" label={'Indication de l’échographie du 3e trimestre'} multiline />
          <AutoField name="currentPregHist.q17.important" />
          <AutoField name="currentPregHist.q17.value" />
          
          </div>

          <Typography variant="body2">Jugement</Typography>
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q18.text" label={'Estimé du poids foetal'} multiline />
          <AutoField name="currentPregHist.q18.important" />
          <AutoField name="currentPregHist.q18.value" />
     
          </div>
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q19.text" label={'Pratique'} multiline />
          <AutoField name="currentPregHist.q19.important" />
          <AutoField name="currentPregHist.q19.value" />
         
          </div>
          <div style={styles.field}>   
          <AutoField name="currentPregHist.q20.text" label={'Pratique'} multiline />
          <AutoField name="currentPregHist.q20.important" />
          <AutoField name="currentPregHist.q20.value" />
        
          </div>
        </Grid>
      );
    case 2:
      return (
        <Grid item xs={12} sm={12}>
        
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Médication
          </Typography>

          <div style={styles.field}>
            <AutoField
              name="medication.q1.text"
              label={"Liste de médicaments"}
              multiline
            />
            <AutoField
              name="medication.q1.important"

            />
            <AutoField
              name="medication.q1.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="medication.q2.text"
              label={"Observance et/ou changements récents"}
              multiline
            />
            <AutoField
              name="medication.q2.important"

            />
            <AutoField
              name="medication.q2.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="medication.q3.text"
              label={"Produits de santé naturels"}
              multiline
            />
            <AutoField
              name="medication.q3.important"

            />
            <AutoField
              name="medication.q3.value"

            />
          </div>
       

          <br />
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Habitudes de vie{" "}
          </Typography>

          <div style={styles.field}>
            <AutoField name="lifeHabits.q1.text" label={"Tabac"} multiline />
            <AutoField
              name="lifeHabits.q1.important"

            />
            <AutoField
              name="lifeHabits.q1.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="lifeHabits.q2.text"
              label={"Alcool"}
              multiline
            />
            <AutoField
              name="lifeHabits.q2.important"

            />
            <AutoField
              name="lifeHabits.q2.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="lifeHabits.q3.text"
              label={"Drogues"}
              multiline
            />
            <AutoField
              name="lifeHabits.q3.important"

            />
            <AutoField
              name="lifeHabits.q3.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField name="lifeHabits.q4.text" label={"Caféines/stimulants"} multiline />
            <AutoField
              name="lifeHabits.q4.important"

            />
            <AutoField
              name="lifeHabits.q4.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="lifeHabits.q5.text"
              label={"Activité physique"}
              multiline
            />
            <AutoField
              name="lifeHabits.q5.important"

            />
            <AutoField
              name="lifeHabits.q5.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="lifeHabits.q6.text"
              label={"Alimentation"}
              multiline
            />
            <AutoField
              name="lifeHabits.q6.important"

            />
            <AutoField
              name="lifeHabits.q6.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="lifeHabits.q7.text"
              label={"Sexualité"}
              multiline
            />
            <AutoField
              name="lifeHabits.q7.important"

            />
            <AutoField
              name="lifeHabits.q7.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="lifeHabits.q8.text"
              label={"Sommeil"}
              multiline
            />
            <AutoField
              name="lifeHabits.q8.important"

            />
            <AutoField
              name="lifeHabits.q8.value"

            />
          </div>
          <br />

          <Typography variant="headline" color={"secondary"} gutterBottom>
            Contexte de vie
          </Typography>

          <div style={styles.field}>
            <AutoField name="lifeContext.q1.text" label={"Occupation"} multiline />
            <AutoField name="lifeContext.q1.important"  />
            <AutoField name="lifeContext.q1.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="lifeContext.q2.text"  label={"Partenaire/famille"}  multiline />
            <AutoField  name="lifeContext.q2.important" />
            <AutoField name="lifeContext.q2.value" />
          </div>
          <div style={styles.field}>
            <AutoField
              name="lifeContext.q3.text"
              label={"Milieu de vie"}
              multiline
            />
            <AutoField
              name="lifeContext.q3.important"

            />
            <AutoField
              name="lifeContext.q3.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField name="lifeContext.q4.text" label={"Niveau de stress"} multiline />
            <AutoField
              name="lifeContext.q4.important"

            />
            <AutoField
              name="lifeContext.q4.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="lifeContext.q5.text"
              label={"Activités/loisirs"}
              multiline
            />
            <AutoField
              name="lifeContext.q5.important"

            />
            <AutoField
              name="lifeContext.q5.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="lifeContext.q6.text"
              label={"Voyages récents"}
              multiline
            />
            <AutoField
              name="lifeContext.q6.important"

            />
            <AutoField
              name="lifeContext.q6.value"

            />
          </div>

          <Typography variant="headline" color={"secondary"} gutterBottom>
            Histoire de la maladie actuelle{" "}
          </Typography>

          <div style={styles.field}>
            <AutoField
              name="currentHist.open.text"
              label={"Réponse à la question ouverte (moins de 5 phrases)"}
              multiline
            />
            <AutoField
              name="currentHist.open.important"

            />
            <AutoField
              name="currentHist.open.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="currentHist.p.one.text"
              label={"Provoqué"}
              multiline
            />
            <AutoField
              name="currentHist.p.one.important"

            />
            <AutoField
              name="currentHist.p.one.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="currentHist.p.two.text"
              label={"Pallié"}
              multiline
            />
            <AutoField
              name="currentHist.p.two.important"

            />
            <AutoField
              name="currentHist.p.two.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="currentHist.q.one.text"
              label={"Qualité"}
              multiline
            />
            <AutoField
              name="currentHist.q.one.important"

            />
            <AutoField
              name="currentHist.q.one.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="currentHist.q.two.text"
              label={"Quantité"}
              multiline
            />
            <AutoField
              name="currentHist.q.two.important"

            />
            <AutoField
              name="currentHist.q.two.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="currentHist.r.one.text"
              label={"Région"}
              multiline
            />
            <AutoField
              name="currentHist.r.one.important"

            />
            <AutoField
              name="currentHist.r.one.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="currentHist.r.two.text"
              label={"Irradiation"}
              multiline
            />
            <AutoField
              name="currentHist.r.two.important"

            />
            <AutoField
              name="currentHist.r.two.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="currentHist.s.one.text"
              label={"Sévérité"}
              multiline
            />
            <AutoField
              name="currentHist.s.one.important"

            />
            <AutoField
              name="currentHist.s.one.value"

            />
          </div>
          <div style={styles.field}>
            <AutoField
              name="currentHist.t.one.text"
              label={"Depuis combien de temps?"}
              multiline
            />
            <AutoField
              name="currentHist.t.one.important"

            />
            <AutoField
              name="currentHist.t.one.value"

            />
          </div>

        </Grid>
      );
    case 3:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
          À demander en tout temps
          </Typography>

          <div style={styles.field}>
            <AutoField name="alwaysAsk.q1.text" label={"Changement de l’acuité visuelle"} multiline />
            <AutoField  name="alwaysAsk.q1.important" />
            <AutoField name="alwaysAsk.q1.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="alwaysAsk.q2.text" label={"Douleur oculaire"} multiline />
            <AutoField name="alwaysAsk.q2.important" />
            <AutoField  name="alwaysAsk.q2.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="alwaysAsk.q3.text"  label={"Rougeur oculaire"} multiline  />
            <AutoField name="alwaysAsk.q3.important" />
            <AutoField name="alwaysAsk.q3.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="alwaysAsk.q4.text" label={"Photophobie"} multiline />
            <AutoField name="alwaysAsk.q4.important"  />
            <AutoField name="alwaysAsk.q4.value" />
          </div>
          <div style={styles.field}>
            <AutoField name="alwaysAsk.q5.text" label={"Écoulement oculaire"}  multiline />
            <AutoField name="alwaysAsk.q5.important" />
            <AutoField  name="alwaysAsk.q5.value"  />
          </div>
          <div style={styles.field}>
            <AutoField name="alwaysAsk.q6.text" label={"Prurit oculaire"}  multiline  />
            <AutoField name="alwaysAsk.q6.important"  />
            <AutoField name="alwaysAsk.q6.value" />
          </div>

          <div style={styles.field}>
            <AutoField name="alwaysAsk.q7.text" label={"Trauma oculaire"}  multiline  />
            <AutoField name="alwaysAsk.q7.important"  />
            <AutoField name="alwaysAsk.q7.value" />
          </div>

          <Typography variant="headline" color={"secondary"} gutterBottom>
            Revue des systèmes {" "}:
            Choisir les systèmes qui s’applique au cas clinique que vous créez. Si oui, cochez et spécifiez.
          </Typography>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Symptômes généraux
          </Typography>
          <div style={styles.field}>
            <AutoField name="generalSymp.q1.text" label={'Fièvre'} multiline />
            <AutoField name="generalSymp.q1.important" />
            <AutoField name="generalSymp.q1.value" />
            <AutoField name="generalSymp.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="generalSymp.q2.text" label={'Perte d’appétit'} multiline />
            <AutoField name="generalSymp.q2.important" />
            <AutoField name="generalSymp.q2.value" />
            <AutoField name="generalSymp.q2.present" />

          </div>
          <div style={styles.field}>
            <AutoField name="generalSymp.q3.text" label={'Perte de poids'} multiline />
            <AutoField name="generalSymp.q3.important" />
            <AutoField name="generalSymp.q3.value" />
            <AutoField name="generalSymp.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="generalSymp.q4.text" label={'Diaphorèse nocturne'} multiline />
            <AutoField name="generalSymp.q4.important" />
            <AutoField name="generalSymp.q4.value" />
            <AutoField name="generalSymp.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="generalSymp.q5.text" label={'Fatigue'} multiline />
            <AutoField name="generalSymp.q5.important" />
            <AutoField name="generalSymp.q5.value" />
            <AutoField name="generalSymp.q5.present" />
          </div>
          <br />
          <Typography variant="headline" color={"secondary"} gutterBottom>

            Système ophtalmologique
            
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysOphtalmo.q1.text" label={'Diplopie'} multiline />
            <AutoField name="sysOphtalmo.q1.important" />
            <AutoField name="sysOphtalmo.q1.value" />
            <AutoField name="sysOphtalmo.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOphtalmo.q2.text" label={'Réduction de l’acuité visuelle'} multiline />
            <AutoField name="sysOphtalmo.q2.important" />
            <AutoField name="sysOphtalmo.q2.value" />
            <AutoField name="sysOphtalmo.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOphtalmo.q3.text" label={'Sécrétions'} multiline />
            <AutoField name="sysOphtalmo.q3.important" />
            <AutoField name="sysOphtalmo.q3.value" />
            <AutoField name="sysOphtalmo.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOphtalmo.q4.text" label={'Sécheresse des paupières'} multiline />
            <AutoField name="sysOphtalmo.q4.important" />
            <AutoField name="sysOphtalmo.q4.value" />
            <AutoField name="sysOphtalmo.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOphtalmo.q5.text" label={'Larmoiement excessif'} multiline />
            <AutoField name="sysOphtalmo.q5.important" />
            <AutoField name="sysOphtalmo.q5.value" />
            <AutoField name="sysOphtalmo.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOphtalmo.q6.text" label={'Scotomes – phosphènes (flashs)'} multiline />
            <AutoField name="sysOphtalmo.q6.important" />
            <AutoField name="sysOphtalmo.q6.value" />
            <AutoField name="sysOphtalmo.q6.present" />
          </div>
       
        </Grid>
      );
    case 4:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système oto-rhino-laryngologique  {" "}
          </Typography>

          <div style={styles.field}>
            <AutoField name="sysOto.q1.text" label={'Otalgie'} multiline />
            <AutoField name="sysOto.q1.important" />
            <AutoField name="sysOto.q1.value" />
            <AutoField name="sysOto.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q2.text" label={'Hypoacousie'} multiline />
            <AutoField name="sysOto.q2.important" />
            <AutoField name="sysOto.q2.value" />
            <AutoField name="sysOto.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q3.text" label={'Tinnitus (acouphènes)'} multiline />
            <AutoField name="sysOto.q3.important" />
            <AutoField name="sysOto.q3.value" />
            <AutoField name="sysOto.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q4.text" label={'Dysphonie – Aphonie'} multiline />
            <AutoField name="sysOto.q4.important" />
            <AutoField name="sysOto.q4.value" />
            <AutoField name="sysOto.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q5.text" label={'Saignement gingival'} multiline />
            <AutoField name="sysOto.q5.important" />
            <AutoField name="sysOto.q5.value" />
            <AutoField name="sysOto.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q6.text" label={'Rhinorrhée'} multiline />
            <AutoField name="sysOto.q6.important" />
            <AutoField name="sysOto.q6.value" />
            <AutoField name="sysOto.q6.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q7.text" label={'Otorrhée'} multiline />
            <AutoField name="sysOto.q7.important" />
            <AutoField name="sysOto.q7.value" />
            <AutoField name="sysOto.q7.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q8.text" label={'Éternuement'} multiline />
            <AutoField name="sysOto.q8.important" />
            <AutoField name="sysOto.q8.value" />
            <AutoField name="sysOto.q8.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q9.text" label={'Épistaxis'} multiline />
            <AutoField name="sysOto.q9.important" />
            <AutoField name="sysOto.q9.value" />
            <AutoField name="sysOto.q9.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q10.text" label={'Prurit nasal'} multiline />
            <AutoField name="sysOto.q10.important" />
            <AutoField name="sysOto.q10.value" />
            <AutoField name="sysOto.q10.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q11.text" label={'Écoulement nasal postérieur'} multiline />
            <AutoField name="sysOto.q11.important" />
            <AutoField name="sysOto.q11.value" />
            <AutoField name="sysOto.q11.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysOto.q12.text" label={'Ulcération buccale'} multiline />
            <AutoField name="sysOto.q12.important" />
            <AutoField name="sysOto.q12.value" />
            <AutoField name="sysOto.q12.present" />
          </div>
        </Grid>
      );
    case 5:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système neurologique
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q1.text" label={'Dominance manuelle'} helperText="D ou G, même si ce n’est pas un symptôme, c’est utile à savoir" multiline />
            <AutoField name="sysNeuro.q1.important" />
            <AutoField name="sysNeuro.q1.value" />
            <AutoField name="sysNeuro.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q2.text" label={'Céphalée'} multiline />
            <AutoField name="sysNeuro.q2.important" />
            <AutoField name="sysNeuro.q2.value" />
            <AutoField name="sysNeuro.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q3.text" label={'Perte de conscience'} multiline />
            <AutoField name="sysNeuro.q3.important" />
            <AutoField name="sysNeuro.q3.value" />
            <AutoField name="sysNeuro.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q4.text" label={'Syncope'} multiline />
            <AutoField name="sysNeuro.q4.important" />
            <AutoField name="sysNeuro.q4.value" />
            <AutoField name="sysNeuro.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q5.text" label={'Convulsions'} multiline />
            <AutoField name="sysNeuro.q5.important" />
            <AutoField name="sysNeuro.q5.value" />
            <AutoField name="sysNeuro.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q6.text" label={'Amaurose fugace'} multiline />
            <AutoField name="sysNeuro.q6.important" />
            <AutoField name="sysNeuro.q6.value" />
            <AutoField name="sysNeuro.q6.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q7.text" label={'Paresthésies'} multiline />
            <AutoField name="sysNeuro.q7.important" />
            <AutoField name="sysNeuro.q7.value" />
            <AutoField name="sysNeuro.q7.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q8.text" label={'Vertiges – Étourdissements'} multiline />
            <AutoField name="sysNeuro.q8.important" />
            <AutoField name="sysNeuro.q8.value" />
            <AutoField name="sysNeuro.q8.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q9.text" label={'Dysphasie – Aphasie'} multiline />
            <AutoField name="sysNeuro.q9.important" />
            <AutoField name="sysNeuro.q9.value" />
            <AutoField name="sysNeuro.q9.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q10.text" label={'Troubles sensoriels'} multiline />
            <AutoField name="sysNeuro.q10.important" />
            <AutoField name="sysNeuro.q10.value" />
            <AutoField name="sysNeuro.q10.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q11.text" label={'Tremblements'} multiline />
            <AutoField name="sysNeuro.q11.important" />
            <AutoField name="sysNeuro.q11.value" />
            <AutoField name="sysNeuro.q11.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q12.text" label={'Ataxie'} multiline />
            <AutoField name="sysNeuro.q12.important" />
            <AutoField name="sysNeuro.q12.value" />
            <AutoField name="sysNeuro.q12.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysNeuro.q13.text" label={'Perte de mémoire'} multiline />
            <AutoField name="sysNeuro.q13.important" />
            <AutoField name="sysNeuro.q13.value" />
            <AutoField name="sysNeuro.q13.present" />
          </div>
        </Grid>
      );
    case 6:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système psychiatrique
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysPsych.q1.text" label={'Anxiété'} multiline />
            <AutoField name="sysPsych.q1.important" />
            <AutoField name="sysPsych.q1.value" />
            <AutoField name="sysPsych.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPsych.q2.text" label={'Tristesse'} multiline />
            <AutoField name="sysPsych.q2.important" />
            <AutoField name="sysPsych.q2.value" />
            <AutoField name="sysPsych.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPsych.q3.text" label={'Colère'} multiline />
            <AutoField name="sysPsych.q3.important" />
            <AutoField name="sysPsych.q3.value" />
            <AutoField name="sysPsych.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPsych.q4.text" label={'Culpabilité'} multiline />
            <AutoField name="sysPsych.q4.important" />
            <AutoField name="sysPsych.q4.value" />
            <AutoField name="sysPsych.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPsych.q5.text" label={'Euphorie'} multiline />
            <AutoField name="sysPsych.q5.important" />
            <AutoField name="sysPsych.q5.value" />
            <AutoField name="sysPsych.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPsych.q6.text" label={'Idéation suicidaire'} multiline />
            <AutoField name="sysPsych.q6.important" />
            <AutoField name="sysPsych.q6.value" />
            <AutoField name="sysPsych.q6.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPsych.q7.text" label={'Hallucinations visuelles'} multiline />
            <AutoField name="sysPsych.q7.important" />
            <AutoField name="sysPsych.q7.value" />
            <AutoField name="sysPsych.q7.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPsych.q8.text" label={'Hallucinations auditives'} multiline />
            <AutoField name="sysPsych.q8.important" />
            <AutoField name="sysPsych.q8.value" />
            <AutoField name="sysPsych.q8.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPsych.q9.text" label={'Troubles de comportement'} multiline />
            <AutoField name="sysPsych.q9.important" />
            <AutoField name="sysPsych.q9.value" />
            <AutoField name="sysPsych.q9.present" />
          </div>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système respiratoire
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysRespi.q1.text" label={'Consommation de tabac'} helperText="nombre de paquets/année" multiline />
            <AutoField name="sysRespi.q1.important" />
            <AutoField name="sysRespi.q1.value" />
            <AutoField name="sysRespi.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysRespi.q2.text" label={'Toux'} multiline />
            <AutoField name="sysRespi.q2.important" />
            <AutoField name="sysRespi.q2.value" />
            <AutoField name="sysRespi.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysRespi.q3.text" label={'Expectorations'} multiline />
            <AutoField name="sysRespi.q3.important" />
            <AutoField name="sysRespi.q3.value" />
            <AutoField name="sysRespi.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysRespi.q4.text" label={'Hémoptysies'} multiline />
            <AutoField name="sysRespi.q4.important" />
            <AutoField name="sysRespi.q4.value" />
            <AutoField name="sysRespi.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysRespi.q5.text" label={'Dyspnée (grade I à V)'} multiline />
            <AutoField name="sysRespi.q5.important" />
            <AutoField name="sysRespi.q5.value" />
            <AutoField name="sysRespi.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysRespi.q6.text" label={'Douleur thoracique'} multiline />
            <AutoField name="sysRespi.q6.important" />
            <AutoField name="sysRespi.q6.value" />
            <AutoField name="sysRespi.q6.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysRespi.q7.text" label={'Exposition industrielle ou autre'} helperText="amiantose, silicose" multiline />
            <AutoField name="sysRespi.q7.important" />
            <AutoField name="sysRespi.q7.value" />
            <AutoField name="sysRespi.q7.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysRespi.q8.text" label={'Dernière RX pulmonaire'} multiline />
            <AutoField name="sysRespi.q8.important" />
            <AutoField name="sysRespi.q8.value" />
            <AutoField name="sysRespi.q8.present" />
          </div>
        </Grid>
      );
    case 7:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système cardiovasculaire{" "}
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysCardio.q1.text" label={'Douleur rétrosternale'} helperText="nombre de paquets/année" multiline />
            <AutoField name="sysCardio.q1.important" />
            <AutoField name="sysCardio.q1.value" />
            <AutoField name="sysCardio.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysCardio.q2.text" label={'Palpitations'} multiline />
            <AutoField name="sysCardio.q2.important" />
            <AutoField name="sysCardio.q2.value" />
            <AutoField name="sysCardio.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysCardio.q3.text" label={'Perte de conscience/syncope'} multiline />
            <AutoField name="sysCardio.q3.important" />
            <AutoField name="sysCardio.q3.value" />
            <AutoField name="sysCardio.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysCardio.q4.text" label={'Dyspnée (grade I à IV)'} multiline />
            <AutoField name="sysCardio.q4.important" />
            <AutoField name="sysCardio.q4.value" />
            <AutoField name="sysCardio.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysCardio.q5.text" label={'Dyspnée paroxystique nocturne'} multiline />
            <AutoField name="sysCardio.q5.important" />
            <AutoField name="sysCardio.q5.value" />
            <AutoField name="sysCardio.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysCardio.q6.text" label={'Orthopnée'} multiline />
            <AutoField name="sysCardio.q6.important" />
            <AutoField name="sysCardio.q6.value" />
            <AutoField name="sysCardio.q6.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysCardio.q7.text" label={'Claudication intermittente'} helperText="amiantose, silicose" multiline />
            <AutoField name="sysCardio.q7.important" />
            <AutoField name="sysCardio.q7.value" />
            <AutoField name="sysCardio.q7.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysCardio.q8.text" label={'Œdème des membres inférieurs'} multiline />
            <AutoField name="sysCardio.q8.important" />
            <AutoField name="sysCardio.q8.value" />
            <AutoField name="sysCardio.q8.present" />
          </div>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système gastro-intestinal  {" "}
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysGastro.q1.text" label={'Odynophagie'} multiline />
            <AutoField name="sysGastro.q1.important" />
            <AutoField name="sysGastro.q1.value" />
            <AutoField name="sysGastro.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q2.text" label={'Dysphagie'} multiline />
            <AutoField name="sysGastro.q2.important" />
            <AutoField name="sysGastro.q2.value" />
            <AutoField name="sysGastro.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q3.text" label={'Dyspepsie – Brûlure épigastrique'} multiline />
            <AutoField name="sysGastro.q3.important" />
            <AutoField name="sysGastro.q3.value" />
            <AutoField name="sysGastro.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q4.text" label={'Régurgitation/reflux'} multiline />
            <AutoField name="sysGastro.q4.important" />
            <AutoField name="sysGastro.q4.value" />
            <AutoField name="sysGastro.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q5.text" label={'Ictère'} multiline />
            <AutoField name="sysGastro.q5.important" />
            <AutoField name="sysGastro.q5.value" />
            <AutoField name="sysGastro.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q6.text" label={'Hématémèse'} multiline />
            <AutoField name="sysGastro.q6.important" />
            <AutoField name="sysGastro.q6.value" />
            <AutoField name="sysGastro.q6.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q7.text" label={'Rectorragie'} multiline />
            <AutoField name="sysGastro.q7.important" />
            <AutoField name="sysGastro.q7.value" />
            <AutoField name="sysGastro.q7.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q8.text" label={'Méléna'} multiline />
            <AutoField name="sysGastro.q8.important" />
            <AutoField name="sysGastro.q8.value" />
            <AutoField name="sysGastro.q8.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q9.text" label={'Nausée'} multiline />
            <AutoField name="sysGastro.q9.important" />
            <AutoField name="sysGastro.q9.value" />
            <AutoField name="sysGastro.q9.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q10.text" label={'Vomissements'} multiline />
            <AutoField name="sysGastro.q10.important" />
            <AutoField name="sysGastro.q10.value" />
            <AutoField name="sysGastro.q10.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q11.text" label={'Douleur abdominale'} multiline />
            <AutoField name="sysGastro.q11.important" />
            <AutoField name="sysGastro.q11.value" />
            <AutoField name="sysGastro.q11.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q12.text" label={'Transit intestinal'} multiline />
            <AutoField name="sysGastro.q12.important" />
            <AutoField name="sysGastro.q12.value" />
            <AutoField name="sysGastro.q12.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q13.text" label={'Stéatorrhée'} multiline />
            <AutoField name="sysGastro.q13.important" />
            <AutoField name="sysGastro.q13.value" />
            <AutoField name="sysGastro.q13.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGastro.q14.text" label={'Douleur ano-rectale'} multiline />
            <AutoField name="sysGastro.q14.important" />
            <AutoField name="sysGastro.q14.value" />
            <AutoField name="sysGastro.q14.present" />
          </div>

        </Grid>
      );
    case 8:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système urinaire
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysPipi.q1.text" label={'Brûlure mictionnelle'} multiline />
            <AutoField name="sysPipi.q1.important" />
            <AutoField name="sysPipi.q1.value" />
            <AutoField name="sysPipi.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q2.text" label={'Dysurie (difficulté à uriner)'} multiline />
            <AutoField name="sysPipi.q2.important" />
            <AutoField name="sysPipi.q2.value" />
            <AutoField name="sysPipi.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q3.text" label={'Hématurie'} multiline />
            <AutoField name="sysPipi.q3.important" />
            <AutoField name="sysPipi.q3.value" />
            <AutoField name="sysPipi.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q4.text" label={'Nycturie'} multiline />
            <AutoField name="sysPipi.q4.important" />
            <AutoField name="sysPipi.q4.value" />
            <AutoField name="sysPipi.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q5.text" label={'Goutte-à-goutte'} multiline />
            <AutoField name="sysPipi.q5.important" />
            <AutoField name="sysPipi.q5.value" />
            <AutoField name="sysPipi.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q6.text" label={'Force du jet'} multiline />
            <AutoField name="sysPipi.q6.important" />
            <AutoField name="sysPipi.q6.value" />
            <AutoField name="sysPipi.q6.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q7.text" label={'Douleur loge rénale'} multiline />
            <AutoField name="sysPipi.q7.important" />
            <AutoField name="sysPipi.q7.value" />
            <AutoField name="sysPipi.q7.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q8.text" label={'Pollakiurie'} multiline />
            <AutoField name="sysPipi.q8.important" />
            <AutoField name="sysPipi.q8.value" />
            <AutoField name="sysPipi.q8.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q9.text" label={'Polyurie'} multiline />
            <AutoField name="sysPipi.q9.important" />
            <AutoField name="sysPipi.q9.value" />
            <AutoField name="sysPipi.q9.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q10.text" label={'Ténesme vésical'} multiline />
            <AutoField name="sysPipi.q10.important" />
            <AutoField name="sysPipi.q10.value" />
            <AutoField name="sysPipi.q10.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q11.text" label={'Miction impérieuse'} multiline />
            <AutoField name="sysPipi.q11.important" />
            <AutoField name="sysPipi.q11.value" />
            <AutoField name="sysPipi.q11.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysPipi.q12.text" label={'Incontinence urinaire'} multiline />
            <AutoField name="sysPipi.q12.important" />
            <AutoField name="sysPipi.q12.value" />
            <AutoField name="sysPipi.q12.present" />
          </div>
         
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système génital féminin
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysGenitalF.q1.text" label={'Ménarche'} multiline />
            <AutoField name="sysGenitalF.q1.important" />
            <AutoField name="sysGenitalF.q1.value" />
            <AutoField name="sysGenitalF.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGenitalF.q2.text" label={'Histoire menstruelle (cycle menstruel)'} multiline />
            <AutoField name="sysGenitalF.q2.important" />
            <AutoField name="sysGenitalF.q2.value" />
            <AutoField name="sysGenitalF.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGenitalF.q3.text" label={'Date des dernières menstruations'} multiline />
            <AutoField name="sysGenitalF.q3.important" />
            <AutoField name="sysGenitalF.q3.value" />
            <AutoField name="sysGenitalF.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGenitalF.q4.text" label={'Ménorragie'} multiline />
            <AutoField name="sysGenitalF.q4.important" />
            <AutoField name="sysGenitalF.q4.value" />
            <AutoField name="sysGenitalF.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGenitalF.q5.text" label={'Métrorragie'} multiline />
            <AutoField name="sysGenitalF.q5.important" />
            <AutoField name="sysGenitalF.q5.value" />
            <AutoField name="sysGenitalF.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGenitalF.q6.text" label={'Leucorrhée'} multiline />
            <AutoField name="sysGenitalF.q6.important" />
            <AutoField name="sysGenitalF.q6.value" />
            <AutoField name="sysGenitalF.q6.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGenitalF.q7.text" label={'Ménopause et malaises associés'} multiline />
            <AutoField name="sysGenitalF.q7.important" />
            <AutoField name="sysGenitalF.q7.value" />
            <AutoField name="sysGenitalF.q7.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGenitalF.q8.text" label={'Dysménorrhée'} multiline />
            <AutoField name="sysGenitalF.q8.important" />
            <AutoField name="sysGenitalF.q8.value" />
            <AutoField name="sysGenitalF.q8.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysGenitalF.q9.text" label={'Dyspareunie'} multiline />
            <AutoField name="sysGenitalF.q9.important" />
            <AutoField name="sysGenitalF.q9.value" />
            <AutoField name="sysGenitalF.q9.present" />
          </div>
        </Grid>
      );
    case 9:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système endocrinien
          </Typography>

          <div style={styles.field}>
            <AutoField name="sysEndo.q1.text" label={'Polydipsie'} multiline />
            <AutoField name="sysEndo.q1.important" />
            <AutoField name="sysEndo.q1.value" />
            <AutoField name="sysEndo.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q2.text" label={'Polyurie'} multiline />
            <AutoField name="sysEndo.q2.important" />
            <AutoField name="sysEndo.q2.value" />
            <AutoField name="sysEndo.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q3.text" label={'Polyphagie'} multiline />
            <AutoField name="sysEndo.q3.important" />
            <AutoField name="sysEndo.q3.value" />
            <AutoField name="sysEndo.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q4.text" label={'Frilosité'} multiline />
            <AutoField name="sysEndo.q4.important" />
            <AutoField name="sysEndo.q4.value" />
            <AutoField name="sysEndo.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q5.text" label={'Intolérance à la chaleur'} multiline />
            <AutoField name="sysEndo.q5.important" />
            <AutoField name="sysEndo.q5.value" />
            <AutoField name="sysEndo.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q6.text" label={'Raucité de la voix'} multiline />
            <AutoField name="sysEndo.q6.important" />
            <AutoField name="sysEndo.q6.value" />
            <AutoField name="sysEndo.q6.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q7.text" label={'Gain ou perte de poids'} multiline />
            <AutoField name="sysEndo.q7.important" />
            <AutoField name="sysEndo.q7.value" />
            <AutoField name="sysEndo.q7.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q8.text" label={'Aménorrhée – Galactorrhée'} multiline />
            <AutoField name="sysEndo.q8.important" />
            <AutoField name="sysEndo.q8.value" />
            <AutoField name="sysEndo.q8.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q9.text" label={'Tremblements'} multiline />
            <AutoField name="sysEndo.q9.important" />
            <AutoField name="sysEndo.q9.value" />
            <AutoField name="sysEndo.q9.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q10.text" label={'Pilosité excessive ou insuffisante'} multiline />
            <AutoField name="sysEndo.q10.important" />
            <AutoField name="sysEndo.q10.value" />
            <AutoField name="sysEndo.q10.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q11.text" label={'Palpitations'} multiline />
            <AutoField name="sysEndo.q11.important" />
            <AutoField name="sysEndo.q11.value" />
            <AutoField name="sysEndo.q11.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q12.text" label={'Constipation ou diarrhée'} multiline />
            <AutoField name="sysEndo.q12.important" />
            <AutoField name="sysEndo.q12.value" />
            <AutoField name="sysEndo.q12.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q13.text" label={'Sudation'} multiline />
            <AutoField name="sysEndo.q13.important" />
            <AutoField name="sysEndo.q13.value" />
            <AutoField name="sysEndo.q13.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysEndo.q14.text" label={'Gynécomastie'} multiline />
            <AutoField name="sysEndo.q14.important" />
            <AutoField name="sysEndo.q14.value" />
            <AutoField name="sysEndo.q14.present" />
          </div>
        </Grid>
      );
    case 10:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système hématologique
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysHema.q1.text" label={'Perte de poids'} multiline />
            <AutoField name="sysHema.q1.important" />
            <AutoField name="sysHema.q1.value" />
            <AutoField name="sysHema.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysHema.q2.text" label={'Sudation nocturne'} multiline />
            <AutoField name="sysHema.q2.important" />
            <AutoField name="sysHema.q2.value" />
            <AutoField name="sysHema.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysHema.q3.text" label={'Masse cervicale ou inguinale'} multiline />
            <AutoField name="sysHema.q3.important" />
            <AutoField name="sysHema.q3.value" />
            <AutoField name="sysHema.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysHema.q4.text" label={'Fatigabilité'} multiline />
            <AutoField name="sysHema.q4.important" />
            <AutoField name="sysHema.q4.value" />
            <AutoField name="sysHema.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysHema.q5.text" label={'Susceptibilité aux infections'} multiline />
            <AutoField name="sysHema.q5.important" />
            <AutoField name="sysHema.q5.value" />
            <AutoField name="sysHema.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysHema.q6.text" label={'Diathèse hémorragique'} multiline />
            <AutoField name="sysHema.q6.important" />
            <AutoField name="sysHema.q6.value" />
            <AutoField name="sysHema.q6.present" />
          </div>

          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système locomoteur
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysLoco.q1.text" label={'Arthralgie centrale ou périphérique'} multiline />
            <AutoField name="sysLoco.q1.important" />
            <AutoField name="sysLoco.q1.value" />
            <AutoField name="sysLoco.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysLoco.q2.text" label={'Gonflement articulaire'} multiline />
            <AutoField name="sysLoco.q2.important" />
            <AutoField name="sysLoco.q2.value" />
            <AutoField name="sysLoco.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysLoco.q3.text" label={'Rougeur articulaire'} multiline />
            <AutoField name="sysLoco.q3.important" />
            <AutoField name="sysLoco.q3.value" />
            <AutoField name="sysLoco.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysLoco.q4.text" label={'Raideur matinale'} multiline />
            <AutoField name="sysLoco.q4.important" />
            <AutoField name="sysLoco.q4.value" />
            <AutoField name="sysLoco.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysLoco.q5.text" label={'Phénomène de Raynaud'} multiline />
            <AutoField name="sysLoco.q5.important" />
            <AutoField name="sysLoco.q5.value" />
            <AutoField name="sysLoco.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysLoco.q6.text" label={'Myalgies'} multiline />
            <AutoField name="sysLoco.q6.important" />
            <AutoField name="sysLoco.q6.value" />
            <AutoField name="sysLoco.q6.present" />
          </div>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Système trophique (peau et phanères)
          </Typography>
          <div style={styles.field}>
            <AutoField name="sysTrophique.q1.text" label={'Érythème'} multiline />
            <AutoField name="sysTrophique.q1.important" />
            <AutoField name="sysTrophique.q1.value" />
            <AutoField name="sysTrophique.q1.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysTrophique.q2.text" label={'Prurit – Éruption'} multiline />
            <AutoField name="sysTrophique.q2.important" />
            <AutoField name="sysTrophique.q2.value" />
            <AutoField name="sysTrophique.q2.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysTrophique.q3.text" label={'Hippocratisme digital'} multiline />
            <AutoField name="sysTrophique.q3.important" />
            <AutoField name="sysTrophique.q3.value" />
            <AutoField name="sysTrophique.q3.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysTrophique.q4.text" label={'Pitting unguéal'} multiline />
            <AutoField name="sysTrophique.q4.important" />
            <AutoField name="sysTrophique.q4.value" />
            <AutoField name="sysTrophique.q4.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysTrophique.q5.text" label={'Raynaud'} multiline />
            <AutoField name="sysTrophique.q5.important" />
            <AutoField name="sysTrophique.q5.value" />
            <AutoField name="sysTrophique.q5.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysTrophique.q6.text" label={'Alopécie'} multiline />
            <AutoField name="sysTrophique.q6.important" />
            <AutoField name="sysTrophique.q6.value" />
            <AutoField name="sysTrophique.q6.present" />
          </div>
          <div style={styles.field}>
            <AutoField name="sysTrophique.q7.text" label={'Photosensibilité'} multiline />
            <AutoField name="sysTrophique.q7.important" />
            <AutoField name="sysTrophique.q7.value" />
            <AutoField name="sysTrophique.q7.present" />
          </div>
        </Grid>
      );
    case 11:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Autres signes et symptômes:
          </Typography>


          <Typography variant="body1" color={"secondary"} gutterBottom>
            PICA:
          </Typography>
          <div style={styles.field}>
            <AutoField name="pica.q1.text" label={'Perception'} multiline />
            <AutoField name="pica.q1.important" />
            <AutoField name="pica.q1.value" />

          </div>
          <div style={styles.field}>
            <AutoField name="pica.q2.text" label={'Impacts'} multiline />
            <AutoField name="pica.q2.important" />
            <AutoField name="pica.q2.value" />

          </div>
          <div style={styles.field}>
            <AutoField name="pica.q3.text" label={'Craintes'} multiline />
            <AutoField name="pica.q3.important" />
            <AutoField name="pica.q3.value" />

          </div>
          <div style={styles.field}>
            <AutoField name="pica.q4.text" label={'Attentes'} multiline />
            <AutoField name="pica.q4.important" />
            <AutoField name="pica.q4.value" />

          </div>
          <Typography variant="body1" color={"secondary"} gutterBottom>
            Examen Physique
          </Typography>
          <div style={styles.field}>
            <AutoField name="physicalExam.q1.text" label={'Température'} multiline />
            <AutoField name="physicalExam.q1.important" />
            <AutoField name="physicalExam.q1.value" />

          </div>
          <div style={styles.field}>
            <AutoField name="physicalExam.q2.text" label={'Fréq. cardiaque'} multiline />
            <AutoField name="physicalExam.q2.important" />
            <AutoField name="physicalExam.q2.value" />

          </div>
          <div style={styles.field}>
            <AutoField name="physicalExam.q3.text" label={'Fréq. respiratoire'} multiline />
            <AutoField name="physicalExam.q3.important" />
            <AutoField name="physicalExam.q3.value" />

          </div>
          <div style={styles.field}>
            <AutoField name="physicalExam.q4.text" label={'Tension artérielle'} multiline />
            <AutoField name="physicalExam.q4.important" />
            <AutoField name="physicalExam.q4.value" />

          </div>
          <div style={styles.field}>
            <AutoField name="physicalExam.q5.text" label={'Saturation'} multiline />
            <AutoField name="physicalExam.q5.important" />
            <AutoField name="physicalExam.q5.value" />

          </div>
          
          <div style={styles.field}>
            <AutoField name="physicalExam.q6.text" label={'Examen Physique'} multiline />
            <AutoField name="physicalExam.q6.important" />
            <AutoField name="physicalExam.q6.value" />

          </div>
        </Grid>
      );
    case 12:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" color={"secondary"} gutterBottom>
            Plan
          </Typography>
          <AutoField name="plan" />
          <Typography variant="body1" color={"secondary"} gutterBottom>
            QUESTIONS SUPPLÉMENTAIRES
          </Typography>
          <div style={styles.field}>
            <AutoField name="additional.q1.text" label={'Diagnostic principal'} multiline />
            <AutoField name="additional.q1.important" />
            <AutoField name="additional.q1.value" />

          </div>
          <div style={styles.field}>
            <AutoField name="additional.q2.text" label={'Diagnostic différentiel'} multiline />
            <AutoField name="additional.q2.important" />
            <AutoField name="additional.q2.value" />

          </div>
          <div style={styles.field}>
            <AutoField name="additional.q3.question" label={'Question pertinente'} multiline />
            <AutoField name="additional.q3.reponse" />
            <AutoField name="additional.q3.value" />

          </div>
          <div style={styles.field}>
            <AutoField name="additional.q4.question" label={'Autre question pertinente'} multiline />
            <AutoField name="additional.q4.reponse" />
            <AutoField name="additional.q4.value" />

          </div>
        </Grid>
      );
    case 13:
      return (
        <Grid item xs={12} sm={12}>
          <Typography variant="headline" color={"secondary"} gutterBottom>
            Soumettre le cas
          </Typography>

          <ErrorsField />
        </Grid>
      );
    default:
      return "Oops?";
  }
}
EditCase.proTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object,
  theme: PropTypes.object.isRequired
};
const styled = withStyles(styles, { withTheme: true })(EditCase);
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe("externats.view.edit", documentId);

  return {
    loading: !subscription.ready(),
    sessionCase: Externats.findOne({ _id: documentId })
  };
})(styled);

