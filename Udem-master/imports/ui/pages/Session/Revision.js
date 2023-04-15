import {Alert} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Cases from '../../../api/Cases/Cases';
import Delete from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FileUpload from '@material-ui/icons/FileUpload';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import KeyboardVoice from '@material-ui/icons/KeyboardVoice';
import Link from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Meteor} from 'meteor/meteor';
import NotFound from '../NotFound/NotFound';
import PlayArrow from '@material-ui/icons/PlayArrow'
import PropTypes from 'prop-types';
import React from 'react';
import Save from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import {withTracker} from 'meteor/react-meteor-data';

// FIXME ready for styling

const styles = theme => ({
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 12,

    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(18),
        color: theme.palette.text.secondary,
    },
    card: {
        minWidth: 275,
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
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        marginTop: 4,
        marginBottom: 4,
        marginRight: 3,
    },
    buttonr: {
        color: '#ef7970',
        marginTop: 4,
        marginBottom: 4,
        marginRight: 3,

    },
    rootList: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    listItemText: {
        fontSize: 18,
    },


});


class Revision extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {

        const {expanded} = this.state;
        const {sessionCase} = this.props;
        const systems = Array.from(this.props.sessionCase && this.props.sessionCase.otherSystems ? this.props.sessionCase.otherSystems : []); //turning the objects to array
     const  physicalExam =  Array.from(this.props.sessionCase && this.props.sessionCase.physicalExam ? this.props.sessionCase.physicalExam : []);

        return (
            <div className={styles.root}>

                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant={'headline'} color={'primary'}>1. INTRODUCTION</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText className={'listItemText'} style={styles.listItemText}
                                              primary="Salutations et présentation" secondary=""/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="S’assurer du confort" secondary=""/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Raison de consultation"
                                              secondary={sessionCase.gabarit.reason}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Raison de consultation secondaire"
                                              secondary={sessionCase.intro.consultationReason2}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Âge" secondary={sessionCase.gabarit.age + "ans"}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Établir un plan de l'entrevue"/>
                            </ListItem>
                            <Divider/>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant={'headline'} color={'primary'}>2. ANTÉCÉDENTS MÉDICAUX</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Personnels" secondary={sessionCase.antecedents.personal.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Chirurgicaux" secondary={sessionCase.antecedents.surgeries.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Psychiatriques, psychologique"
                                              secondary={sessionCase.antecedents.psy.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Gynécologiques/obstétriques"
                                              secondary={sessionCase.antecedents.gyn.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Antécédents familiaux" secondary={sessionCase.antecedents.famHist.text}/>
                            </ListItem>
                            <Divider/>

                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Allergies" secondary={sessionCase.antecedents.allergies.text}/>
                            </ListItem>
                            <Divider/>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant={'headline'} color={'primary'}>3. MÉDICATION</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Listes de medicaments"
                                              secondary={sessionCase.medication.listOfMeds.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Changements récents"
                                              secondary={sessionCase.medication.recentChanges.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Vente libre" secondary={sessionCase.medication.emptyStomach.text}/>
                            </ListItem>
                            <Divider/>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant={'headline'} color={'primary'}>4. CONTEXTE DE VIE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Emploi" secondary={sessionCase.lifeContext.job.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Partenaire" secondary={sessionCase.lifeContext.partner.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Milieu de vie" secondary={sessionCase.lifeContext.environment.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Niveau de stress" secondary={sessionCase.lifeContext.stressLevel.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Activités/loisirs" secondary={sessionCase.lifeContext.activities.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Voyages récents" secondary={sessionCase.lifeContext.travels.text}/>
                            </ListItem>
                            <Divider/>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant={'headline'} color={'primary'}>5. HABITUS</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Tabac" secondary={sessionCase.lifeHabits.tabacco.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Alcool" secondary={sessionCase.lifeHabits.alcohol.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Drogues" secondary={sessionCase.lifeHabits.drugs.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Caféines/stimulants" secondary={sessionCase.lifeHabits.coffee.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Activité physique" secondary={sessionCase.lifeHabits.alcohol.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Alimentation" secondary={sessionCase.lifeHabits.drugs.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Sexualité" secondary={sessionCase.lifeHabits.coffee.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemText primary="Sommeil" secondary={sessionCase.lifeHabits.coffee.text}/>
                            </ListItem>
                            <Divider/>
                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant={'headline'} color={'primary'}>6. HISTOIRE de la MALADIE
                            ACTUELLE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Question ouverte" secondary={sessionCase.currentHist.historic.text}/>
                            </ListItem>
                            <Divider/>
                            <Typography variant={'headline'} color={'secondary'}>P</Typography>
                            <ListItem className={sessionCase.currentHist.p.one.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Provoqué" secondary={sessionCase.currentHist.p.one.text}/>
                            </ListItem>
                            <ListItem className={sessionCase.currentHist.p.two.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Pallié" secondary={sessionCase.currentHist.p.two.text}/>
                            </ListItem>
                            <Divider/>
                            <Typography variant={'headline'} color={'secondary'}>Q</Typography>

                            <ListItem  button>
                                <ListItemText primary="Qualité" secondary={sessionCase.currentHist.q.one.text}/>
                            </ListItem>
                            <ListItem  button>
                                <ListItemText primary="Quantité" secondary={sessionCase.currentHist.q.two.text}/>
                            </ListItem>
                            <Divider/>
                            <Typography variant={'headline'} color={'secondary'}>R</Typography>

                            <ListItem  button>
                                <ListItemText primary="Région" secondary={sessionCase.currentHist.r.one.text}/>
                            </ListItem>
                            <ListItem  button>
                                <ListItemText primary="Irradiation" secondary={sessionCase.currentHist.r.two.text}/>
                            </ListItem>
                            <Divider/>
                            <Typography variant={'headline'} color={'secondary'}>S</Typography>

                            <ListItem className={sessionCase.currentHist.s.one.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Sévérité" secondary={sessionCase.currentHist.s.one.text}/>
                            </ListItem>

                            <Divider/>
                            <Typography variant={'headline'} color={'secondary'}>T</Typography>

                            <ListItem  button>
                                <ListItemText primary="Depuis combien de temps?"
                                              secondary={sessionCase.currentHist.t.one.text}/>
                            </ListItem>
                            <ListItem  button>
                                <ListItemText primary="Constant/intermittent" secondary={sessionCase.currentHist.t.two.text}/>
                            </ListItem>
                            <ListItem  button>
                                <ListItemText primary="Croissant/stable" secondary={sessionCase.currentHist.t.three.text}/>
                            </ListItem>
                            <ListItem  button>
                                <ListItemText primary="Fin" secondary={sessionCase.currentHist.t.four.text}/>
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel7'} onChange={this.handleChange('panel7')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant={'headline'} color={'primary'}>7 SYMPTÔMES GÉNÉRAUX</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.generalSymp.one.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Fièvre" secondary={sessionCase.generalSymp.one.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem className={sessionCase.generalSymp.two.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Perte d'appetit" secondary={sessionCase.generalSymp.two.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem className={sessionCase.generalSymp.three.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Diaphorèse nocturne" secondary={sessionCase.generalSymp.three.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem className={sessionCase.generalSymp.four.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Fatigue" secondary={sessionCase.generalSymp.four.text}/>
                            </ListItem>


                        </List>








                    </ExpansionPanelDetails>
                </ExpansionPanel>
                { systems.map(({name , system }, index)=>(
                <ExpansionPanel key={name} expanded={expanded === ('panel7.'+(index))} onChange={this.handleChange('panel7.'+(index))}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={'uppercase'} variant={'headline'} color={'primary'}>8.{index+1} {name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List  className={"fullwidth"} component="nav" style={styles.rootList}>
                       { Array.from(system).map(({symptom},i)=>(
                             <ListItem key={i} className={symptom.presence ? 'greenCard' : 'RedCard'} button>
                             <ListItemText primary={symptom.name} secondary={symptom.text}/>
                         </ListItem>
                       ))}


                    </List>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
                  ))}
                <ExpansionPanel expanded={expanded === 'panel8'} onChange={this.handleChange('panel8')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant={'headline'} color={'primary'}>9. PICA</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.pica.one.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Perception" secondary={sessionCase.pica.one.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem className={sessionCase.pica.two.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Impacts" secondary={sessionCase.pica.two.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem className={sessionCase.pica.three.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Craintes" secondary={sessionCase.pica.three.text}/>
                            </ListItem>
                            <Divider/>
                            <ListItem className={sessionCase.pica.four.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Attentes" secondary={sessionCase.pica.four.text}/>
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>


                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel9'} onChange={this.handleChange('panel9')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography variant={'headline'} color={'primary'}>10. Examen physique</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                       <div>

                        {physicalExam.map(({text},i)=>(<p key={i} className="answer">
                            {text}
                            </p>))}
                        </div>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}





Revision.propTypes = {
    sessionCase: PropTypes.object,
};


export default withTracker(({match}) => {
    const documentId = match.params._id;
    const subscription = Meteor.subscribe('cases.view.public', documentId);


    return {
    loading: !subscription.ready(),
    sessionCase: Cases.findOne(match.params._id),
  };
  })(Revision);


