import React, { Component } from 'react'
import { monthDayYear, monthDayYearAtTime, timeago } from '../../../../modules/dates';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExternatDocuments from '../../../../api/ExternatDocuments/ExternatDocuments';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Loading from '../../Loading/Loading';
import { Meteor } from 'meteor/meteor';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import StarIcon from '@material-ui/icons/Star';
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

class Result extends Component {
  static propTypes = {
    // prop: PropTypes
  }

  state = {
    sessionCase: this.props.documents ? this.props.documents.caseDoc : '',
    goodAnswers: [],
    badAnswers: [],
    loadedDoc: false,
    expanded: null,
  }

  constructor(props) {
    super(props);


  }
  handleChange = panel => (event, expanded) => {
    this.setState({
        expanded: expanded ? panel : false,
    });
};
  componentDidUpdate() {
    
  }



  render() {
    const { expanded} = this.state;
    const { loading } = this.props;
    const sessionDoc = this.props.documents;
    const sessionCase = this.props.documents ? this.props.documents.caseDoc : '';
    // console.log(this.props.documents ? this.props.documents.caseDoc : 'fail betch');



    return (
      !loading ?
        <div>
          <div className={'page-header'} style={styles.flex}>
            <h4 className="pull-left">Revue et résultats</h4>

          </div>
          <Grid container spacing={24} align={"center"}>
            <Grid item xs={12} sm={12} m={6} l={6} xl={6} >
              <Paper className={styles.paper} align={"center"}>
                <h3 className='pull-right result' size="small" color={'default'} >{Math.floor((sessionDoc.score / sessionDoc.total) * 100)} %</h3>
                <div className={'padding4'}>
                  <Typography variant="title" align="left">
                    Nom:&nbsp;&nbsp;
                    <span className="prop-info">{sessionCase.gabarit.nom} , {sessionCase.gabarit.age} ans </span>
                  </Typography>
                  <Typography variant="title" align="left">
                    Raison de consultation:&nbsp;&nbsp;
                    <span className="prop-info">{sessionCase.gabarit.reason}</span>
                  </Typography>
                  <Typography variant="title" align="left">
                    Niveau de difficulté:&nbsp;&nbsp;
                    <span className="prop-info">{sessionCase.gabarit.niveau}</span>
                  </Typography>
              
                  <Typography variant="title" align="left">
                    Diagnostic principal:&nbsp;&nbsp;
                    <span className="prop-info">{sessionCase.additional.q1.text}</span>
                  </Typography>
                  <Typography variant="body1" align="left">
                    {sessionCase.additional.principal}
                  </Typography>
                  <Typography variant="title" align="left">
                    Diagnostic différentiel:&nbsp;&nbsp;
                    <span className="prop-info">{sessionCase.additional.q2.text}</span>

                  </Typography>
                  <Typography variant="body1" align="left">
                    {sessionCase.additional.differentiel}
                  </Typography>
                  {sessionCase && sessionCase.additional && sessionCase.additional.three ? <div><Typography variant="title" align="left">
                    Question:{sessionCase.additional.three.question}&nbsp;&nbsp;
                    <span className="prop-info">Réponse{sessionCase.additional.three.reponse}</span>
                  </Typography>
                    <Typography variant="body1" align="left">
                      {sessionCase.additional.q1}
                    </Typography></div> : ''}
                  {sessionCase && sessionCase.additional && sessionCase.additional.four ? <div><Typography variant="title" align="left">
                    Question: {sessionCase.additional.four.question}&nbsp;&nbsp;
                    <span className="prop-info">Réponse: {sessionCase.additional.four.reponse}</span>
                  </Typography>
                    <Typography variant="body1" align="left">
                      {sessionCase.additional.q2}
                    </Typography></div> : ''}
                  <Typography variant="title" align="left">
                    Complété:&nbsp;&nbsp;
                    <span className="prop-info">{monthDayYearAtTime(sessionDoc.updatedAt)} en {Math.floor(sessionCase.timeItTook / 60)} minute(s) et {sessionCase.timeItTook % 60} secondes.</span>
                  </Typography>
                </div>
              </Paper>

            </Grid>
          </Grid>
<br/><br/><br/>
          <div className={styles.root}>
            <ExpansionPanel
                expanded={expanded === "panel1"}
                onChange={this.handleChange("panel1")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  1. INTRODUCTION
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("intro", "q1");
                      }}
                      button
                  >
                    <Checkbox checked={sessionCase.intro.q1.done} disableRipple />

                    <ListItemText
                        primary="Raison de consultation primaire"
                        secondary={sessionCase.intro.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.intro.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("intro", "q2");
                      }}
                      button
                  >
                    <Checkbox checked={sessionCase.intro.q2.done} disableRipple />
                    <ListItemText
                        primary="Raison de consultation secondaire"
                        secondary={sessionCase.intro.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.intro.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel2"}
                onChange={this.handleChange("panel2")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  2. ANTÉCÉDENTS
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q1");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q1.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Chirurgicaux"
                        secondary={sessionCase.antecedents.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q2");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q2.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Suivi par Dr"
                        secondary={sessionCase.antecedents.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q3");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q3.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Suivi où"
                        secondary={sessionCase.antecedents.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q4");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q4.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Dernier suivi "
                        secondary={sessionCase.antecedents.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q5");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q5.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Plan au suivi"
                        secondary={sessionCase.antecedents.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />

                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q6");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q6.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Salle d’opération prévue quand et pourquoi"
                        secondary={sessionCase.antecedents.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q7");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q7.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Si néoplasie"
                        secondary={sessionCase.antecedents.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q8");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q8.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Personnels médicaux (les pertinents)"
                        secondary={sessionCase.antecedents.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q9");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q9.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Gynécologiques/obstétriques"
                        secondary={sessionCase.antecedents.q9.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q9.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q10");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q10.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Antécédents familiaux"
                        secondary={sessionCase.antecedents.q10.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q10.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("antecedents", "q11");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.antecedents.q11.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Allergies"
                        secondary={sessionCase.antecedents.q11.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.antecedents.q11.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel
                expanded={expanded === "panel4"}
                onChange={this.handleChange("panel4")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  3. MÉDICATION
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("medication", "q1");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.medication.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Liste de médicaments"
                        secondary={sessionCase.medication.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.medication.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("medication", "q2");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.medication.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Présence d’anticoagulant"
                        secondary={sessionCase.medication.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.medication.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("medication", "q3");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.medication.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Observance et/ou changements récents"
                        secondary={sessionCase.medication.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.medication.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={expanded === "panel5"}
                onChange={this.handleChange("panel5")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  4. HABITUDES DE VIE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("lifeHabits", "q1");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.lifeHabits.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Tabac"
                        secondary={sessionCase.lifeHabits.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.lifeHabits.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("lifeHabits", "q2");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.lifeHabits.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Alcool"
                        secondary={sessionCase.lifeHabits.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.lifeHabits.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("lifeHabits", "q3");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.lifeHabits.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Drogues"
                        secondary={sessionCase.lifeHabits.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.lifeHabits.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>


                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={expanded === "panel7"}
                onChange={this.handleChange("panel7")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  5. HISTOIRE de la MALADIE ACTUELLE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering2("currentHist", "open");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.currentHist.open.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Question ouverte"
                        secondary={sessionCase.currentHist.open.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.currentHist.open.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <Typography variant={"headline"} color={"secondary"}>
                    P
                  </Typography>
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering2("currentHist", "p", "one");
                      }}
                      className={
                        sessionCase.currentHist.p.one.presence
                            ? "greenCard"
                            : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.currentHist.p.one.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Provoqué"
                        secondary={sessionCase.currentHist.p.one.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.currentHist.p.one.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering2("currentHist", "p", "two");
                      }}
                      className={
                        sessionCase.currentHist.p.two.presence
                            ? "greenCard"
                            : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.currentHist.p.two.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Pallié"
                        secondary={sessionCase.currentHist.p.two.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.currentHist.p.two.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <Typography variant={"headline"} color={"secondary"}>
                    Q
                  </Typography>

                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering2("currentHist", "q", "one");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.currentHist.q.one.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Qualité"
                        secondary={sessionCase.currentHist.q.one.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.currentHist.q.one.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering2("currentHist", "q", "two");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.currentHist.q.two.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Quantité"
                        secondary={sessionCase.currentHist.q.two.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.currentHist.q.two.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <Typography variant={"headline"} color={"secondary"}>
                    R
                  </Typography>

                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering2("currentHist", "r", "one");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.currentHist.r.one.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Région"
                        secondary={sessionCase.currentHist.r.one.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.currentHist.r.one.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering2("currentHist", "r", "two");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.currentHist.r.two.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Irradiation"
                        secondary={sessionCase.currentHist.r.two.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.currentHist.r.two.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <Typography variant={"headline"} color={"secondary"}>
                    S
                  </Typography>

                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering2("currentHist", "s", "one");
                      }}
                      className={
                        sessionCase.currentHist.s.one.presence
                            ? "greenCard"
                            : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.currentHist.s.one.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Sévérité"
                        secondary={sessionCase.currentHist.s.one.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.currentHist.s.one.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>

                  <Divider />
                  <Typography variant={"headline"} color={"secondary"}>
                    T
                  </Typography>

                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering2("currentHist", "t", "one");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.currentHist.t.one.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Temporalité"
                        secondary={sessionCase.currentHist.t.one.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.currentHist.t.one.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel8"}
                onChange={this.handleChange("panel8")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  6. SYMPTÔMES GÉNÉRAUX ACTUELLE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    onClick={e => {
                      this.answering1("generalSymp", "q1");
                    }}
                    className={"fullwidth"}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("intro", "q1");
                      }}
                      className={
                        sessionCase.generalSymp.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.intro.q1.done} disableRipple />
                    <Checkbox
                        checked={sessionCase.generalSymp.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Fièvre"
                        secondary={sessionCase.generalSymp.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.generalSymp.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("generalSymp", "q2");
                      }}
                      className={
                        sessionCase.generalSymp.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.generalSymp.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Perte d’appétit"
                        secondary={sessionCase.generalSymp.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.generalSymp.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("generalSymp", "q3");
                      }}
                      className={
                        sessionCase.generalSymp.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.generalSymp.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Perte de poids"
                        secondary={sessionCase.generalSymp.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.generalSymp.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("generalSymp", "q4");
                      }}
                      className={
                        sessionCase.generalSymp.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.generalSymp.q4.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Diaphorèse nocturne"
                        secondary={sessionCase.generalSymp.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.generalSymp.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("generalSymp", "q5");
                      }}
                      className={
                        sessionCase.generalSymp.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.generalSymp.q5.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Fatigue"
                        secondary={sessionCase.generalSymp.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.generalSymp.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={expanded === "panel9"}
                onChange={this.handleChange("panel9")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  7. SYSTÈME OPHTALMOLOGIQUE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOphtalmo", "q1");
                      }}
                      className={
                        sessionCase.sysOphtalmo.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysOphtalmo.q1.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Rougeur oculaire"
                        secondary={sessionCase.sysOphtalmo.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOphtalmo.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOphtalmo", "q2");
                      }}
                      className={
                        sessionCase.sysOphtalmo.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysOphtalmo.q2.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Douleur oculaire"
                        secondary={sessionCase.sysOphtalmo.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOphtalmo.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOphtalmo", "q3");
                      }}
                      className={
                        sessionCase.sysOphtalmo.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <ListItemText
                        primary="Diplopie"
                        secondary={sessionCase.sysOphtalmo.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOphtalmo.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOphtalmo", "q4");
                      }}
                      className={
                        sessionCase.sysOphtalmo.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysOphtalmo.q4.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Réduction de l’acuité visuelle"
                        secondary={sessionCase.sysOphtalmo.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOphtalmo.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOphtalmo", "q5");
                      }}
                      className={
                        sessionCase.sysOphtalmo.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysOphtalmo.q5.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Sécrétions"
                        secondary={sessionCase.sysOphtalmo.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOphtalmo.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOphtalmo", "q6");
                      }}
                      className={
                        sessionCase.sysOphtalmo.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysOphtalmo.q6.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Sécheresse des paupières"
                        secondary={sessionCase.sysOphtalmo.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOphtalmo.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOphtalmo", "q7");
                      }}
                      className={
                        sessionCase.sysOphtalmo.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysOphtalmo.q7.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Larmoiement excessif"
                        secondary={sessionCase.sysOphtalmo.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOphtalmo.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOphtalmo", "q8");
                      }}
                      className={
                        sessionCase.sysOphtalmo.q8.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysOphtalmo.q8.done}
                        disableRipple
                    />

                    <ListItemText
                        primary="Scotomes – phosphènes (flashs)"
                        secondary={sessionCase.sysOphtalmo.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOphtalmo.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel10"}
                onChange={this.handleChange("panel10")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  8. SYSTÈME OTO-RHINO-LARYNGOLOGIQUE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q1");
                      }}
                      className={
                        sessionCase.sysOto.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q1.done} disableRipple />
                    <ListItemText
                        primary="Otalgie"
                        secondary={sessionCase.sysOto.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q2");
                      }}
                      className={
                        sessionCase.sysOto.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q2.done} disableRipple />
                    <ListItemText
                        primary="Hypoacousie"
                        secondary={sessionCase.sysOto.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q3");
                      }}
                      className={
                        sessionCase.sysOto.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q3.done} disableRipple />
                    <ListItemText
                        primary="Tinnitus (acouphènes)"
                        secondary={sessionCase.sysOto.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q4");
                      }}
                      className={
                        sessionCase.sysOto.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q4.done} disableRipple />
                    <ListItemText
                        primary="Dysphonie – Aphonie"
                        secondary={sessionCase.sysOto.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q5");
                      }}
                      className={
                        sessionCase.sysOto.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q5.done} disableRipple />
                    <ListItemText
                        primary="Saignement gingival"
                        secondary={sessionCase.sysOto.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q6");
                      }}
                      className={
                        sessionCase.sysOto.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q6.done} disableRipple />
                    <ListItemText
                        primary="Rhinorrhée"
                        secondary={sessionCase.sysOto.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q7");
                      }}
                      className={
                        sessionCase.sysOto.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q7.done} disableRipple />
                    <ListItemText
                        primary="Otorrhée"
                        secondary={sessionCase.sysOto.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q8");
                      }}
                      className={
                        sessionCase.sysOto.q8.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q8.done} disableRipple />
                    <ListItemText
                        primary="Éternuement"
                        secondary={sessionCase.sysOto.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q9");
                      }}
                      className={
                        sessionCase.sysOto.q9.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q9.done} disableRipple />
                    <ListItemText
                        primary="Épistaxis"
                        secondary={sessionCase.sysOto.q9.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q9.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q10");
                      }}
                      className={
                        sessionCase.sysOto.q10.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q10.done} disableRipple />
                    <ListItemText
                        primary="Prurit nasal"
                        secondary={sessionCase.sysOto.q10.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q10.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q11");
                      }}
                      className={
                        sessionCase.sysOto.q11.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q11.done} disableRipple />
                    <ListItemText
                        primary="Écoulement nasal postérieur"
                        secondary={sessionCase.sysOto.q11.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q11.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysOto", "q12");
                      }}
                      className={
                        sessionCase.sysOto.q12.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysOto.q12.done} disableRipple />
                    <ListItemText
                        primary="Ulcération buccale"
                        secondary={sessionCase.sysOto.q12.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysOto.q12.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel11"}
                onChange={this.handleChange("panel11")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  9. SYSTÈME NEUROLOGIQUE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q1");
                      }}
                      className={
                        sessionCase.sysNeuro.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dominance manuelle"
                        secondary={sessionCase.sysNeuro.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q2");
                      }}
                      className={
                        sessionCase.sysNeuro.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Céphalée"
                        secondary={sessionCase.sysNeuro.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q3");
                      }}
                      className={
                        sessionCase.sysNeuro.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Perte de conscience"
                        secondary={sessionCase.sysNeuro.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q4");
                      }}
                      className={
                        sessionCase.sysNeuro.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q4.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Syncope"
                        secondary={sessionCase.sysNeuro.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q5");
                      }}
                      className={
                        sessionCase.sysNeuro.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q5.done}
                        disableRipple
                    />
                    <ListItemText
                        primary=" Convulsions"
                        secondary={sessionCase.sysNeuro.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q6");
                      }}
                      className={
                        sessionCase.sysNeuro.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q6.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Amaurose fugace"
                        secondary={sessionCase.sysNeuro.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q7");
                      }}
                      className={
                        sessionCase.sysNeuro.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q7.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Paresthésies"
                        secondary={sessionCase.sysNeuro.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q8");
                      }}
                      className={
                        sessionCase.sysNeuro.q8.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q8.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Vertiges – Étourdissements"
                        secondary={sessionCase.sysNeuro.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q9");
                      }}
                      className={
                        sessionCase.sysNeuro.q9.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q9.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dysphasie – Aphasie"
                        secondary={sessionCase.sysNeuro.q9.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q9.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q10");
                      }}
                      className={
                        sessionCase.sysNeuro.q10.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q10.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Troubles sensoriels"
                        secondary={sessionCase.sysNeuro.q10.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q10.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q11");
                      }}
                      className={
                        sessionCase.sysNeuro.q11.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q11.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Tremblements"
                        secondary={sessionCase.sysNeuro.q11.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q11.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q12");
                      }}
                      className={
                        sessionCase.sysNeuro.q12.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q12.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Ataxie"
                        secondary={sessionCase.sysNeuro.q12.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q12.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysNeuro", "q13");
                      }}
                      className={
                        sessionCase.sysNeuro.q13.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysNeuro.q13.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Perte de mémoire"
                        secondary={sessionCase.sysNeuro.q13.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysNeuro.q13.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel12"}
                onChange={this.handleChange("panel12")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  10. SYSTÈME PSYCHIATRIQUE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPsych", "q1");
                      }}
                      className={
                        sessionCase.sysPsych.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPsych.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Anxiété"
                        secondary={sessionCase.sysPsych.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPsych.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPsych", "q2");
                      }}
                      className={
                        sessionCase.sysPsych.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPsych.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Tristesse"
                        secondary={sessionCase.sysPsych.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPsych.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPsych", "q3");
                      }}
                      className={
                        sessionCase.sysPsych.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPsych.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Colère"
                        secondary={sessionCase.sysPsych.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPsych.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPsych", "q4");
                      }}
                      className={
                        sessionCase.sysPsych.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPsych.q4.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Culpabilité"
                        secondary={sessionCase.sysPsych.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPsych.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPsych", "q5");
                      }}
                      className={
                        sessionCase.sysPsych.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPsych.q5.done}
                        disableRipple
                    />
                    <ListItemText
                        primary=" Euphorie"
                        secondary={sessionCase.sysPsych.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPsych.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPsych", "q6");
                      }}
                      className={
                        sessionCase.sysPsych.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPsych.q6.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Idéation suicidaire"
                        secondary={sessionCase.sysPsych.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPsych.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPsych", "q7");
                      }}
                      className={
                        sessionCase.sysPsych.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPsych.q7.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Hallucinations visuelles"
                        secondary={sessionCase.sysPsych.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPsych.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPsych", "q8");
                      }}
                      className={
                        sessionCase.sysPsych.q8.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPsych.q8.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Hallucinations auditives"
                        secondary={sessionCase.sysPsych.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPsych.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPsych", "q9");
                      }}
                      className={
                        sessionCase.sysPsych.q9.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPsych.q9.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Troubles de comportement"
                        secondary={sessionCase.sysPsych.q9.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPsych.q9.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={expanded === "panel13"}
                onChange={this.handleChange("panel13")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  11. SYSTÈME RESPIRATOIRE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysRespi", "q1");
                      }}
                      className={
                        sessionCase.sysRespi.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysRespi.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Consommation de tabac"
                        secondary={sessionCase.sysRespi.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysRespi.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysRespi", "q2");
                      }}
                      className={
                        sessionCase.sysRespi.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysRespi.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Toux"
                        secondary={sessionCase.sysRespi.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysRespi.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysRespi", "q3");
                      }}
                      className={
                        sessionCase.sysRespi.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysRespi.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Expectorations"
                        secondary={sessionCase.sysRespi.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysRespi.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysRespi", "q4");
                      }}
                      className={
                        sessionCase.sysRespi.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysRespi.q4.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Hémoptysies"
                        secondary={sessionCase.sysRespi.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysRespi.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysRespi", "q5");
                      }}
                      className={
                        sessionCase.sysRespi.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysRespi.q5.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dyspnée"
                        secondary={sessionCase.sysRespi.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysRespi.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysRespi", "q6");
                      }}
                      className={
                        sessionCase.sysRespi.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysRespi.q6.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Douleur thoracique"
                        secondary={sessionCase.sysRespi.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysRespi.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysRespi", "q7");
                      }}
                      className={
                        sessionCase.sysRespi.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysRespi.q7.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Exposition industrielle ou autre"
                        secondary={sessionCase.sysRespi.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysRespi.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysRespi", "q8");
                      }}
                      className={
                        sessionCase.sysRespi.q8.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysRespi.q8.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dernière RX pulmonaire"
                        secondary={sessionCase.sysRespi.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysRespi.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={expanded === "panel14"}
                onChange={this.handleChange("panel14")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  12. SYSTÈME CARDIOVASCULAIRE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysCardio", "q1");
                      }}
                      className={
                        sessionCase.sysCardio.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysCardio.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Douleur rétrosternale"
                        secondary={sessionCase.sysCardio.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysCardio.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysCardio", "q2");
                      }}
                      className={
                        sessionCase.sysCardio.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysCardio.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Palpitations"
                        secondary={sessionCase.sysCardio.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysCardio.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysCardio", "q3");
                      }}
                      className={
                        sessionCase.sysCardio.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysCardio.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Perte de conscience/syncope"
                        secondary={sessionCase.sysCardio.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysCardio.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysCardio", "q4");
                      }}
                      className={
                        sessionCase.sysCardio.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysCardio.q4.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dyspnée"
                        secondary={sessionCase.sysCardio.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysCardio.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysCardio", "q5");
                      }}
                      className={
                        sessionCase.sysCardio.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysCardio.q5.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dyspnée paroxystique nocturne"
                        secondary={sessionCase.sysCardio.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysCardio.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysCardio", "q6");
                      }}
                      className={
                        sessionCase.sysCardio.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysCardio.q6.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Orthopnée"
                        secondary={sessionCase.sysCardio.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysCardio.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysCardio", "q7");
                      }}
                      className={
                        sessionCase.sysCardio.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysCardio.q7.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Claudication intermittente"
                        secondary={sessionCase.sysCardio.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysCardio.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysCardio", "q8");
                      }}
                      className={
                        sessionCase.sysCardio.q8.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysCardio.q8.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Œdème des membres inférieurs"
                        secondary={sessionCase.sysCardio.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysCardio.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={expanded === "panel15"}
                onChange={this.handleChange("panel15")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  13. SYSTÈME GASTRO-INTESTINAL
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q1");
                      }}
                      className={
                        sessionCase.sysGastro.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Odynophagie"
                        secondary={sessionCase.sysGastro.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q2");
                      }}
                      className={
                        sessionCase.sysGastro.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dysphagie"
                        secondary={sessionCase.sysGastro.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q3");
                      }}
                      className={
                        sessionCase.sysGastro.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dyspepsie – Brûlure épigastrique"
                        secondary={sessionCase.sysGastro.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q4");
                      }}
                      className={
                        sessionCase.sysGastro.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q4.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Régurgitation/reflux"
                        secondary={sessionCase.sysGastro.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q5");
                      }}
                      className={
                        sessionCase.sysGastro.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q5.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Ictère"
                        secondary={sessionCase.sysGastro.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q6");
                      }}
                      className={
                        sessionCase.sysGastro.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q6.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Hématémèse"
                        secondary={sessionCase.sysGastro.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q7");
                      }}
                      className={
                        sessionCase.sysGastro.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q7.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Rectorragie"
                        secondary={sessionCase.sysGastro.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q8");
                      }}
                      className={
                        sessionCase.sysGastro.q8.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q8.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Méléna"
                        secondary={sessionCase.sysGastro.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q9");
                      }}
                      className={
                        sessionCase.sysGastro.q9.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q9.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Nausée"
                        secondary={sessionCase.sysGastro.q9.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q9.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q10");
                      }}
                      className={
                        sessionCase.sysGastro.q10.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q10.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Vomissements"
                        secondary={sessionCase.sysGastro.q10.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q10.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q11");
                      }}
                      className={
                        sessionCase.sysGastro.q11.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q11.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Douleur abdominale"
                        secondary={sessionCase.sysGastro.q11.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q11.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q12");
                      }}
                      className={
                        sessionCase.sysGastro.q12.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q12.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Transit intestinal"
                        secondary={sessionCase.sysGastro.q12.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q12.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q13");
                      }}
                      className={
                        sessionCase.sysGastro.q13.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q13.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Stéatorrhée"
                        secondary={sessionCase.sysGastro.q13.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q13.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGastro", "q14");
                      }}
                      className={
                        sessionCase.sysGastro.q14.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGastro.q14.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Douleur ano-rectale"
                        secondary={sessionCase.sysGastro.q14.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGastro.q14.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel16"}
                onChange={this.handleChange("panel16")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  14. SYSTÈME URINAIRE{" "}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q1");
                      }}
                      className={
                        sessionCase.sysPipi.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysPipi.q1.done} disableRipple />
                    <ListItemText
                        primary="Brûlure mictionnelle"
                        secondary={sessionCase.sysPipi.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q2");
                      }}
                      className={
                        sessionCase.sysPipi.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysPipi.q2.done} disableRipple />
                    <ListItemText
                        primary="Dysurie (difficulté à uriner)"
                        secondary={sessionCase.sysPipi.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q3");
                      }}
                      className={
                        sessionCase.sysPipi.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysPipi.q3.done} disableRipple />
                    <ListItemText
                        primary="Hématurie"
                        secondary={sessionCase.sysPipi.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q4");
                      }}
                      className={
                        sessionCase.sysPipi.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysPipi.q4.done} disableRipple />
                    <ListItemText
                        primary="Nycturie"
                        secondary={sessionCase.sysPipi.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q5");
                      }}
                      className={
                        sessionCase.sysPipi.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysPipi.q5.done} disableRipple />
                    <ListItemText
                        primary="Goutte-à-goutte"
                        secondary={sessionCase.sysPipi.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q6");
                      }}
                      className={
                        sessionCase.sysPipi.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysPipi.q6.done} disableRipple />
                    <ListItemText
                        primary="Force du jet"
                        secondary={sessionCase.sysPipi.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q7");
                      }}
                      className={
                        sessionCase.sysPipi.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysPipi.q7.done} disableRipple />
                    <ListItemText
                        primary="Douleur loge rénale"
                        secondary={sessionCase.sysPipi.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q8");
                      }}
                      className={
                        sessionCase.sysPipi.q8.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysPipi.q8.done} disableRipple />
                    <ListItemText
                        primary="Pollakiurie"
                        secondary={sessionCase.sysPipi.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q9");
                      }}
                      className={
                        sessionCase.sysPipi.q9.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysPipi.q9.done} disableRipple />
                    <ListItemText
                        primary="Polyurie"
                        secondary={sessionCase.sysPipi.q9.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q9.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q10");
                      }}
                      className={
                        sessionCase.sysPipi.q10.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPipi.q10.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Ténesme vésical"
                        secondary={sessionCase.sysPipi.q10.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q10.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q11");
                      }}
                      className={
                        sessionCase.sysPipi.q11.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPipi.q11.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Miction impérieuse"
                        secondary={sessionCase.sysPipi.q11.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q11.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysPipi", "q12");
                      }}
                      className={
                        sessionCase.sysPipi.q12.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysPipi.q12.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Incontinence urinaire"
                        secondary={sessionCase.sysPipi.q12.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysPipi.q12.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel17"}
                onChange={this.handleChange("panel17")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  15. SYSTÈME GÉNITAL MASCULIN{" "}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalM", "q1");
                      }}
                      className={
                        sessionCase.sysGenitalM.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalM.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Douleur périnéale"
                        secondary={sessionCase.sysGenitalM.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalM.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalM", "q2");
                      }}
                      className={
                        sessionCase.sysGenitalM.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalM.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Douleur scrotale"
                        secondary={sessionCase.sysGenitalM.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalM.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalM", "q3");
                      }}
                      className={
                        sessionCase.sysGenitalM.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalM.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Masse scrotale"
                        secondary={sessionCase.sysGenitalM.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalM.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalM", "q4");
                      }}
                      className={
                        sessionCase.sysGenitalM.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalM.q4.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dysfonction érectile"
                        secondary={sessionCase.sysGenitalM.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalM.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalM", "q5");
                      }}
                      className={
                        sessionCase.sysGenitalM.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalM.q5.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Hémospermie"
                        secondary={sessionCase.sysGenitalM.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalM.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalM", "q6");
                      }}
                      className={
                        sessionCase.sysGenitalM.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalM.q6.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Douleur à l’éjaculation"
                        secondary={sessionCase.sysGenitalM.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalM.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalM", "q7");
                      }}
                      className={
                        sessionCase.sysGenitalM.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalM.q7.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Écoulement urétral"
                        secondary={sessionCase.sysGenitalM.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalM.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel17"}
                onChange={this.handleChange("panel17")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  15. SYSTÈME GÉNITAL FÉMININ{" "}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalF", "q1");
                      }}
                      className={
                        sessionCase.sysPipi.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalF.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Ménarche"
                        secondary={sessionCase.sysPipi.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalF.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalF", "q2");
                      }}
                      className={
                        sessionCase.sysPipi.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalF.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Histoire menstruelle (cycle menstruel)"
                        secondary={sessionCase.sysPipi.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalF.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalF", "q3");
                      }}
                      className={
                        sessionCase.sysPipi.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalF.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Date des dernières menstruations"
                        secondary={sessionCase.sysPipi.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalF.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalF", "q4");
                      }}
                      className={
                        sessionCase.sysPipi.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalF.q4.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Ménorragie"
                        secondary={sessionCase.sysPipi.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalF.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalF", "q5");
                      }}
                      className={
                        sessionCase.sysPipi.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalF.q5.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Métrorragie"
                        secondary={sessionCase.sysPipi.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalF.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalF", "q6");
                      }}
                      className={
                        sessionCase.sysPipi.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalF.q6.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Leucorrhée"
                        secondary={sessionCase.sysPipi.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalF.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalF", "q7");
                      }}
                      className={
                        sessionCase.sysPipi.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalF.q7.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Ménopause et malaises associés"
                        secondary={sessionCase.sysPipi.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalF.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalF", "q8");
                      }}
                      className={
                        sessionCase.sysPipi.q8.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalF.q8.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dysménorrhée"
                        secondary={sessionCase.sysPipi.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalF.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysGenitalF", "q9");
                      }}
                      className={
                        sessionCase.sysPipi.q9.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysGenitalF.q9.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Dyspareunie"
                        secondary={sessionCase.sysPipi.q9.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysGenitalF.q9.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel18"}
                onChange={this.handleChange("panel18")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  16. SYSTÈME ENDOCRINIEN
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q1");
                      }}
                      className={
                        sessionCase.sysEndo.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysEndo.q1.done} disableRipple />
                    <ListItemText
                        primary="Polydipsie"
                        secondary={sessionCase.sysEndo.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q2");
                      }}
                      className={
                        sessionCase.sysEndo.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysEndo.q2.done} disableRipple />
                    <ListItemText
                        primary="Polyurie"
                        secondary={sessionCase.sysEndo.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q3");
                      }}
                      className={
                        sessionCase.sysEndo.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysEndo.q3.done} disableRipple />
                    <ListItemText
                        primary="Polyphagie"
                        secondary={sessionCase.sysEndo.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q4");
                      }}
                      className={
                        sessionCase.sysEndo.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysEndo.q4.done} disableRipple />
                    <ListItemText
                        primary="Frilosité"
                        secondary={sessionCase.sysEndo.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q5");
                      }}
                      className={
                        sessionCase.sysEndo.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysEndo.q5.done} disableRipple />
                    <ListItemText
                        primary=" Intolérance à la chaleur"
                        secondary={sessionCase.sysEndo.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q6");
                      }}
                      className={
                        sessionCase.sysEndo.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysEndo.q6.done} disableRipple />
                    <ListItemText
                        primary="Raucité de la voix"
                        secondary={sessionCase.sysEndo.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q7");
                      }}
                      className={
                        sessionCase.sysEndo.q7.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysEndo.q7.done} disableRipple />
                    <ListItemText
                        primary="Gain ou perte de poids"
                        secondary={sessionCase.sysEndo.q7.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q8");
                      }}
                      className={
                        sessionCase.sysEndo.q8.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysEndo.q8.done} disableRipple />
                    <ListItemText
                        primary="Aménorrhée – Galactorrhée"
                        secondary={sessionCase.sysEndo.q8.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q8.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q9");
                      }}
                      className={
                        sessionCase.sysEndo.q9.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysEndo.q9.done} disableRipple />
                    <ListItemText
                        primary="Tremblements"
                        secondary={sessionCase.sysEndo.q9.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q9.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q10");
                      }}
                      className={
                        sessionCase.sysEndo.q10.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysEndo.q10.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Pilosité excessive ou insuffisante"
                        secondary={sessionCase.sysEndo.q10.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q10.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q11");
                      }}
                      className={
                        sessionCase.sysEndo.q11.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysEndo.q11.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Palpitations"
                        secondary={sessionCase.sysEndo.q11.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q11.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q12");
                      }}
                      className={
                        sessionCase.sysEndo.q12.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysEndo.q12.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Constipation ou diarrhée"
                        secondary={sessionCase.sysEndo.q12.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q12.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q13");
                      }}
                      className={
                        sessionCase.sysEndo.q13.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysEndo.q13.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Sudation"
                        secondary={sessionCase.sysEndo.q13.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q13.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysEndo", "q14");
                      }}
                      className={
                        sessionCase.sysEndo.q14.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysEndo.q14.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Gynécomastie"
                        secondary={sessionCase.sysEndo.q14.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysEndo.q14.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={expanded === "panel19"}
                onChange={this.handleChange("panel19")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  17. SYSTÈME HÉMATOLOGIE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysHema", "q1");
                      }}
                      className={
                        sessionCase.sysHema.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysHema.q1.done} disableRipple />
                    <ListItemText
                        primary="Perte de poids"
                        secondary={sessionCase.sysHema.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysHema.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysHema", "q2");
                      }}
                      className={
                        sessionCase.sysHema.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysHema.q2.done} disableRipple />
                    <ListItemText
                        primary="Sudation nocturne"
                        secondary={sessionCase.sysHema.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysHema.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysHema", "q3");
                      }}
                      className={
                        sessionCase.sysHema.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysHema.q3.done} disableRipple />
                    <ListItemText
                        primary="Masse cervicale ou inguinale"
                        secondary={sessionCase.sysHema.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysHema.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysHema", "q4");
                      }}
                      className={
                        sessionCase.sysHema.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysHema.q4.done} disableRipple />
                    <ListItemText
                        primary="Fatigabilité"
                        secondary={sessionCase.sysHema.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysHema.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysHema", "q5");
                      }}
                      className={
                        sessionCase.sysHema.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysHema.q5.done} disableRipple />
                    <ListItemText
                        primary="Susceptibilité aux infections"
                        secondary={sessionCase.sysHema.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysHema.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysHema", "q6");
                      }}
                      className={
                        sessionCase.sysHema.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysHema.q6.done} disableRipple />
                    <ListItemText
                        primary="Diathèse hémorragique"
                        secondary={sessionCase.sysHema.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysHema.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={expanded === "panel20"}
                onChange={this.handleChange("panel20")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  18. SYSTÈME LOCOMOTEUR
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysLoco", "q1");
                      }}
                      className={
                        sessionCase.sysLoco.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysLoco.q1.done} disableRipple />
                    <ListItemText
                        primary="Arthralgie centrale ou périphérique"
                        secondary={sessionCase.sysLoco.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysLoco.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysLoco", "q2");
                      }}
                      className={
                        sessionCase.sysLoco.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysLoco.q2.done} disableRipple />
                    <ListItemText
                        primary="Gonflement articulaire"
                        secondary={sessionCase.sysLoco.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysLoco.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysLoco", "q3");
                      }}
                      className={
                        sessionCase.sysLoco.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysLoco.q3.done} disableRipple />
                    <ListItemText
                        primary="Rougeur articulaire"
                        secondary={sessionCase.sysLoco.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysLoco.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysLoco", "q4");
                      }}
                      className={
                        sessionCase.sysLoco.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysLoco.q4.done} disableRipple />
                    <ListItemText
                        primary="Raideur matinale"
                        secondary={sessionCase.sysLoco.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysLoco.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysLoco", "q5");
                      }}
                      className={
                        sessionCase.sysLoco.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysLoco.q5.done} disableRipple />
                    <ListItemText
                        primary="Phénomène de Raynaud"
                        secondary={sessionCase.sysLoco.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysLoco.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysLoco", "q6");
                      }}
                      className={
                        sessionCase.sysLoco.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox checked={sessionCase.sysLoco.q6.done} disableRipple />
                    <ListItemText
                        primary="Myalgies"
                        secondary={sessionCase.sysLoco.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysLoco.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={expanded === "panel21"}
                onChange={this.handleChange("panel21")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  19. SYSTÈME TROPHIQUE (PEAU ET PHANÈRES)
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysTrophique", "q1");
                      }}
                      className={
                        sessionCase.sysTrophique.q1.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysTrophique.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Érythème"
                        secondary={sessionCase.sysTrophique.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysTrophique.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysTrophique", "q2");
                      }}
                      className={
                        sessionCase.sysTrophique.q2.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysTrophique.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Prurit – Éruption"
                        secondary={sessionCase.sysTrophique.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysTrophique.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysTrophique", "q3");
                      }}
                      className={
                        sessionCase.sysTrophique.q3.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysTrophique.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Hippocratisme digital"
                        secondary={sessionCase.sysTrophique.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysTrophique.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysTrophique", "q4");
                      }}
                      className={
                        sessionCase.sysTrophique.q4.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysTrophique.q4.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Pitting unguéal"
                        secondary={sessionCase.sysTrophique.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysTrophique.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysTrophique", "q5");
                      }}
                      className={
                        sessionCase.sysTrophique.q5.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysTrophique.q5.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Raynaud"
                        secondary={sessionCase.sysTrophique.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysTrophique.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysTrophique", "q6");
                      }}
                      className={
                        sessionCase.sysTrophique.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysTrophique.q6.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Alopécie"
                        secondary={sessionCase.sysTrophique.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysTrophique.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />

                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("sysTrophique", "q7");
                      }}
                      className={
                        sessionCase.sysTrophique.q6.presence ? "greenCard" : "RedCard"
                      }
                      button
                  >
                    <Checkbox
                        checked={sessionCase.sysTrophique.q7.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Photosensibilité"
                        secondary={sessionCase.sysTrophique.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.sysTrophique.q7.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={expanded === 'panel25'} onChange={this.handleChange('panel25')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={'headline'} color={'primary'}>20. RÉSULTATS DE LABORATOIRES & IMAGERIE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>

                <List className={"fullwidth"} component="nav" style={styles.rootList}>
                  <Typography variant={'body1'} color={'textPrimary'} >Résultats de laboratoires</Typography>
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("labResults", "q1");
                      }}
                      button>
                    <Checkbox
                        checked={sessionCase.labResults.q1.done}
                        disableRipple
                    />
                    <ListItemText primary="Du jour même" secondary={sessionCase.labResults.q1.text} />
                    <ListItemSecondaryAction>
                      {sessionCase.labResults.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem  disabled={true}
                             onClick={e => {
                               this.answering1("labResults", "q2");
                             }}
                             button>
                    <Checkbox
                        checked={sessionCase.labResults.q2.done}
                        disableRipple
                    />

                    <ListItemText primary="Normale du patient" secondary={sessionCase.labResults.q2.text} />
                    <ListItemSecondaryAction>
                      {sessionCase.labResults.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <Divider />

                  <ListItem    disabled={true}
                               onClick={e => {
                                 this.answering1("imagerie", "q1");
                               }}
                               button>
                    <Checkbox
                        checked={sessionCase.imagerie.q1.done}
                        disableRipple
                    />
                    <ListItemText primary="Imagerie" secondary={sessionCase.imagerie.q1.text} />
                    <ListItemSecondaryAction>
                      {sessionCase.imagerie.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>

                </List>

              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel22"}
                onChange={this.handleChange("panel22")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  21. PICA
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("pica", "q1");
                      }}
                      button
                  >
                    <Checkbox checked={sessionCase.pica.q1.done} disableRipple />
                    <ListItemText
                        primary="Perception"
                        secondary={sessionCase.pica.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.pica.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("pica", "q2");
                      }}
                      button
                  >
                    <Checkbox checked={sessionCase.pica.q2.done} disableRipple />
                    <ListItemText
                        primary="Impacts"
                        secondary={sessionCase.pica.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.pica.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("pica", "q3");
                      }}
                      button
                  >
                    <Checkbox checked={sessionCase.pica.q3.done} disableRipple />
                    <ListItemText
                        primary="Craintes"
                        secondary={sessionCase.pica.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.pica.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("pica", "q4");
                      }}
                      button
                  >
                    <Checkbox checked={sessionCase.pica.q4.done} disableRipple />
                    <ListItemText
                        primary="Attentes"
                        secondary={sessionCase.pica.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.pica.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
                expanded={expanded === "panel23"}
                onChange={this.handleChange("panel23")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  22. SIGNE VITAUX ET EXAMEN PHYSIQUE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <Typography variant={"body1"} color={"textPrimary"}>
                    Signe vitaux
                  </Typography>
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("physicalExam", "q1");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.physicalExam.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Température"
                        secondary={sessionCase.physicalExam.q1.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.physicalExam.q1.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("physicalExam", "q2");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.physicalExam.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Fréq. cardiaque"
                        secondary={sessionCase.physicalExam.q2.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.physicalExam.q2.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("physicalExam", "q3");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.physicalExam.q3.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Fréq. respiratoire"
                        secondary={sessionCase.physicalExam.q3.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.physicalExam.q3.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("physicalExam", "q4");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.physicalExam.q4.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Tension artérielle"
                        secondary={sessionCase.physicalExam.q4.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.physicalExam.q4.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("physicalExam", "q5");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.physicalExam.q5.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Saturation"
                        secondary={sessionCase.physicalExam.q5.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.physicalExam.q5.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <Divider />
                  <Divider />
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("physicalExam", "q6");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.physicalExam.q6.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Examen physique"
                        secondary={sessionCase.physicalExam.q6.text}
                    />
                    <ListItemSecondaryAction>
                      {sessionCase.physicalExam.q6.important ? (
                          <IconButton aria-label="Star">
                            <StarIcon />
                          </IconButton>
                      ) : (
                          ""
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>




            <ExpansionPanel
                expanded={expanded === "panel25"}
                onChange={this.handleChange("panel25")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  23. PLAN
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("intro", "q1");
                      }}
                      button
                  >
                    <Checkbox checked={sessionCase.intro.q1.done} disableRipple />
                    <ListItemText
                        primary="Quel est votre plan?"
                        secondary={sessionCase.plan}
                    />
                  </ListItem>
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === "panel26"}
                onChange={this.handleChange("panel26")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"headline"} color={"primary"}>
                  26. QUESTIONS SUPLÉMENTAIRE
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List
                    className={"fullwidth"}
                    disabled={true}
                    component="nav"
                    style={styles.rootList}
                >
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("add", "q1");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.additional.q1.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Diagnostic principal"
                        secondary={sessionCase.additional.q1.text}
                    />
                  </ListItem>
                  <ListItem
                      disabled={true}
                      onClick={e => {
                        this.answering1("add", "q2");
                      }}
                      button
                  >
                    <Checkbox
                        checked={sessionCase.additional.q2.done}
                        disableRipple
                    />
                    <ListItemText
                        primary="Diagnostic différentiel"
                        secondary={sessionCase.additional.q2.text}
                    />
                  </ListItem>
                  {sessionCase.additional &&
                  sessionCase.additional.q3 &&
                  sessionCase.additional.q3.question ? (
                      <ListItem
                          disabled={true}
                          onClick={e => {
                            this.answering1("add", "q3");
                          }}
                          button
                      >
                        <Checkbox
                            checked={sessionCase.additional.q3.done}
                            disableRipple
                        />
                        <ListItemText
                            primary={sessionCase.additional.q3.question}
                            secondary={sessionCase.additional.q3.reponse}
                        />
                      </ListItem>
                  ) : (
                      ""
                  )}
                  {sessionCase.additional &&
                  sessionCase.additional.q4 &&
                  sessionCase.additional.q4.question ? (
                      <ListItem
                          disabled={true}
                          onClick={e => {
                            this.answering1("add", "q4");
                          }}
                          button
                      >
                        <Checkbox
                            checked={sessionCase.additional.q4.done}
                            disableRipple
                        />
                        <ListItemText
                            primary={sessionCase.additional.q4.question}
                            secondary={sessionCase.additional.q4.reponse}
                        />
                      </ListItem>
                  ) : (
                      ""
                  )}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div> : <Loading />
    )
  }
}

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('externats-documents.view', documentId);

  return {
    loading: !subscription.ready(),
    documents: ExternatDocuments.findOne({ _id: documentId }),
  };
})(Result);  