import { Alert } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Externats from "../../../../api/Externats/ExternatsGeriatry";
import FileUpload from '@material-ui/icons/FileUpload';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import KeyboardVoice from '@material-ui/icons/KeyboardVoice';
import Link from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Meteor } from 'meteor/meteor';
import NotFound from '../../../pages/NotFound/NotFound';
import PlayArrow from '@material-ui/icons/PlayArrow'
import PropTypes from 'prop-types';
import React from 'react';
import Save from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import { withTracker } from 'meteor/react-meteor-data';

// FIXME ready for styling

// GERIATRY

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

        const { expanded } = this.state;
        const { sessionCase } = this.props;

        const physicalExam = Array.from(this.props.sessionCase && this.props.sessionCase.physicalExam ? this.props.sessionCase.physicalExam : []);

        return (
            <div className={styles.root}>

                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>1. INTRODUCTION</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List className={"fullwidth"} component="nav" style={styles.rootList}>

                            <ListItem button>
                                <ListItemText primary="Raison de consultation primaire"
                                    secondary={sessionCase.intro.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Raison de consultation secondaire"
                                    secondary={sessionCase.intro.q2.text} />
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>2. ANTÉCÉDENTS</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Personnels médicaux" secondary={sessionCase.antecedents.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Chirurgicaux" secondary={sessionCase.antecedents.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Psychiatriques/psychologiques"
                                    secondary={sessionCase.antecedents.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Gynécologiques/obstétriques "
                                    secondary={sessionCase.antecedents.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Vaccins" secondary={sessionCase.antecedents.q5.text} />
                            </ListItem>
                            <Divider />

                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Antécédents familiaux" secondary={sessionCase.antecedents.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Allergies" secondary={sessionCase.antecedents.q7.text} />
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>


                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>3. MÉDICATION</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Liste de médicaments"
                                    secondary={sessionCase.medication.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Présence d’anticoagulant"
                                    secondary={sessionCase.medication.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Observance et/ou changements récents" secondary={sessionCase.medication.q3.text} />
                            </ListItem>
                            <Divider />

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>4. HABITUDES DE VIE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Tabac" secondary={sessionCase.lifeHabits.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Alcool" secondary={sessionCase.lifeHabits.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Drogues" secondary={sessionCase.lifeHabits.q3.text} />
                            </ListItem>

                            <ListItem button>
                                <ListItemText primary="Caféines/stimulants" secondary={sessionCase.lifeHabits.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Activité physique" secondary={sessionCase.lifeHabits.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Alimentation" secondary={sessionCase.lifeHabits.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Sexualité" secondary={sessionCase.lifeHabits.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Sommeil" secondary={sessionCase.lifeHabits.q8.text} />
                            </ListItem>
                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>5. HISTOIRE SOCIALE </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Nom du médecin de famille" secondary={sessionCase.socialHist.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Milieux de vie" secondary={sessionCase.socialHist.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Personne ressource / Mandataire / Proches aidants" secondary={sessionCase.socialHist.q3.text} />
                            </ListItem>

                            <ListItem button>
                                <ListItemText primary="Services à domicile" secondary={sessionCase.socialHist.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Emplois actifs ou anciens" secondary={sessionCase.socialHist.q5.text} />
                            </ListItem>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>6.ACTIVITÉS de la VIE DOMESTIQUE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Ménage" secondary={sessionCase.domestic.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Lavage" secondary={sessionCase.domestic.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Utilisation du téléphone"
                                    secondary={sessionCase.domestic.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Préparation des repas"
                                    secondary={sessionCase.domestic.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Courses" secondary={sessionCase.domestic.q5.text} />
                            </ListItem>

                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Gestion financière"
                                    secondary={sessionCase.domestic.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Auto-médication"
                                    secondary={sessionCase.domestic.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Transport (autre que la marche)" secondary={sessionCase.domestic.q8.text} />
                            </ListItem>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel7'} onChange={this.handleChange('panel7')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>7.ACTIVITÉS de la VIE QUOTIDIENNE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Hygiène et apparence" secondary={sessionCase.daily.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Habillage" secondary={sessionCase.daily.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Se nourrir"
                                    secondary={sessionCase.daily.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Contrôle des sphincters"
                                    secondary={sessionCase.daily.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Déglutition" secondary={sessionCase.daily.q5.text} />
                            </ListItem>
                            <Divider />
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Niveau de soins" secondary={sessionCase.careLvl} />
                            </ListItem>
                            <Divider />
                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel8'} onChange={this.handleChange('panel8')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>8. HISTOIRE de la MALADIE
                            ACTUELLE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Question ouverte" secondary={sessionCase.currentHist.open.text} />
                            </ListItem>
                            <Divider />
                            <Typography variant={'headline'} color={'secondary'}>P</Typography>
                            <ListItem className={sessionCase.currentHist.p.one.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Provoqué" secondary={sessionCase.currentHist.p.one.text} />
                            </ListItem>
                            <ListItem className={sessionCase.currentHist.p.two.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Pallié" secondary={sessionCase.currentHist.p.two.text} />
                            </ListItem>
                            <Divider />
                            <Typography variant={'headline'} color={'secondary'}>Q</Typography>

                            <ListItem button>
                                <ListItemText primary="Qualité" secondary={sessionCase.currentHist.q.one.text} />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Quantité" secondary={sessionCase.currentHist.q.two.text} />
                            </ListItem>
                            <Divider />
                            <Typography variant={'headline'} color={'secondary'}>R</Typography>

                            <ListItem button>
                                <ListItemText primary="Région" secondary={sessionCase.currentHist.r.one.text} />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Irradiation" secondary={sessionCase.currentHist.r.two.text} />
                            </ListItem>
                            <Divider />
                            <Typography variant={'headline'} color={'secondary'}>S</Typography>

                            <ListItem className={sessionCase.currentHist.s.one.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Sévérité" secondary={sessionCase.currentHist.s.one.text} />
                            </ListItem>

                            <Divider />
                            <Typography variant={'headline'} color={'secondary'}>T</Typography>

                            <ListItem button>
                                <ListItemText primary="Temporalité"
                                    secondary={sessionCase.currentHist.t.one.text} />
                            </ListItem>



                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel9'} onChange={this.handleChange('panel9')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>9. SYMPTÔMES GÉNÉRAUX
                            ACTUELLE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.generalSymp.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Fièvre" secondary={sessionCase.generalSymp.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.generalSymp.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Perte d’appétit" secondary={sessionCase.generalSymp.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.generalSymp.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Perte de poids" secondary={sessionCase.generalSymp.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.generalSymp.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Diaphorèse nocturne" secondary={sessionCase.generalSymp.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.generalSymp.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Fatigue" secondary={sessionCase.generalSymp.q5.text} />
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel10'} onChange={this.handleChange('panel10')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>9. SYSTÈME OPHTALMOLOGIQUE
                           </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysOphtalmo.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Rougeur oculaire" secondary={sessionCase.sysOphtalmo.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOphtalmo.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Douleur oculaire" secondary={sessionCase.sysOphtalmo.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOphtalmo.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Diplopie" secondary={sessionCase.sysOphtalmo.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOphtalmo.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Réduction de l’acuité visuelle" secondary={sessionCase.sysOphtalmo.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOphtalmo.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Sécrétions" secondary={sessionCase.sysOphtalmo.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOphtalmo.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Sécheresse des paupières" secondary={sessionCase.sysOphtalmo.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOphtalmo.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Larmoiement excessif" secondary={sessionCase.sysOphtalmo.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOphtalmo.q8.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Scotomes – phosphènes (flashs)" secondary={sessionCase.sysOphtalmo.q8.text} />
                            </ListItem>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel11'} onChange={this.handleChange('panel11')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>10. SYSTÈME OTO-RHINO-LARYNGOLOGIQUE
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysOto.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Otalgie" secondary={sessionCase.sysOto.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Hypoacousie" secondary={sessionCase.sysOto.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Tinnitus (acouphènes)" secondary={sessionCase.sysOto.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dysphonie – Aphonie" secondary={sessionCase.sysOto.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Saignement gingival" secondary={sessionCase.sysOto.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Rhinorrhée" secondary={sessionCase.sysOto.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Otorrhée" secondary={sessionCase.sysOto.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q8.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Éternuement" secondary={sessionCase.sysOto.q8.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q9.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Épistaxis" secondary={sessionCase.sysOto.q9.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q10.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Prurit nasal" secondary={sessionCase.sysOto.q10.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q11.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Écoulement nasal postérieur" secondary={sessionCase.sysOto.q11.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysOto.q12.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Ulcération buccale" secondary={sessionCase.sysOto.q12.text} />
                            </ListItem>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel12'} onChange={this.handleChange('panel12')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>11. SYSTÈME NEUROLOGIQUE
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysNeuro.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dominance manuelle" secondary={sessionCase.sysNeuro.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Céphalée" secondary={sessionCase.sysNeuro.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Perte de conscience" secondary={sessionCase.sysNeuro.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Syncope" secondary={sessionCase.sysNeuro.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary=" Convulsions" secondary={sessionCase.sysNeuro.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Amaurose fugace" secondary={sessionCase.sysNeuro.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Paresthésies" secondary={sessionCase.sysNeuro.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q8.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Vertiges – Étourdissements" secondary={sessionCase.sysNeuro.q8.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q9.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dysphasie – Aphasie" secondary={sessionCase.sysNeuro.q9.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q10.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Troubles sensoriels" secondary={sessionCase.sysNeuro.q10.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q11.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Tremblements" secondary={sessionCase.sysNeuro.q11.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q12.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Ataxie" secondary={sessionCase.sysNeuro.q12.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysNeuro.q13.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Perte de mémoire" secondary={sessionCase.sysNeuro.q13.text} />
                            </ListItem>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel13'} onChange={this.handleChange('panel13')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>12. SYSTÈME PSYCHIATRIQUE
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysPsych.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Anxiété" secondary={sessionCase.sysPsych.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPsych.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Tristesse" secondary={sessionCase.sysPsych.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPsych.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Colère" secondary={sessionCase.sysPsych.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPsych.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Culpabilité" secondary={sessionCase.sysPsych.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPsych.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary=" Euphorie" secondary={sessionCase.sysPsych.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPsych.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Idéation suicidaire" secondary={sessionCase.sysPsych.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPsych.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Hallucinations visuelles" secondary={sessionCase.sysPsych.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPsych.q8.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Hallucinations auditives" secondary={sessionCase.sysPsych.q8.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPsych.q9.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Troubles de comportement" secondary={sessionCase.sysPsych.q9.text} />
                            </ListItem>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel14'} onChange={this.handleChange('panel14')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>13. SYSTÈME RESPIRATOIRE
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysRespi.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Consommation de tabac" secondary={sessionCase.sysRespi.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysRespi.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Toux" secondary={sessionCase.sysRespi.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysRespi.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Expectorations" secondary={sessionCase.sysRespi.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysRespi.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Hémoptysies" secondary={sessionCase.sysRespi.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysRespi.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dyspnée" secondary={sessionCase.sysRespi.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysRespi.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Douleur thoracique" secondary={sessionCase.sysRespi.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysRespi.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Exposition industrielle ou autre" secondary={sessionCase.sysRespi.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysRespi.q8.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dernière RX pulmonaire" secondary={sessionCase.sysRespi.q8.text} />
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel15'} onChange={this.handleChange('panel15')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>15. SYSTÈME CARDIOVASCULAIRE
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysCardio.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Douleur rétrosternale" secondary={sessionCase.sysCardio.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysCardio.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Palpitations" secondary={sessionCase.sysCardio.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysCardio.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Perte de conscience/syncope" secondary={sessionCase.sysCardio.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysCardio.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dyspnée" secondary={sessionCase.sysCardio.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysCardio.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dyspnée paroxystique nocturne" secondary={sessionCase.sysCardio.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysCardio.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Orthopnée" secondary={sessionCase.sysCardio.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysCardio.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Claudication intermittente" secondary={sessionCase.sysCardio.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysCardio.q8.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Œdème des membres inférieurs" secondary={sessionCase.sysCardio.q8.text} />
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel16'} onChange={this.handleChange('panel16')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>15. SYSTÈME GASTRO-INTESTINAL
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysGastro.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Odynophagie" secondary={sessionCase.sysGastro.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dysphagie" secondary={sessionCase.sysGastro.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dyspepsie – Brûlure épigastrique" secondary={sessionCase.sysGastro.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Régurgitation/reflux" secondary={sessionCase.sysGastro.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Ictère" secondary={sessionCase.sysGastro.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Hématémèse" secondary={sessionCase.sysGastro.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Rectorragie" secondary={sessionCase.sysGastro.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q8.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Méléna" secondary={sessionCase.sysGastro.q8.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q9.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Nausée" secondary={sessionCase.sysGastro.q9.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q10.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Vomissements" secondary={sessionCase.sysGastro.q10.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q11.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Douleur abdominale" secondary={sessionCase.sysGastro.q11.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q12.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Transit intestinal" secondary={sessionCase.sysGastro.q12.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q13.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Stéatorrhée" secondary={sessionCase.sysGastro.q13.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGastro.q14.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Douleur ano-rectale" secondary={sessionCase.sysGastro.q14.text} />
                            </ListItem>
                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel17'} onChange={this.handleChange('panel17')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>16. SYSTÈME URINAIRE </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysPipi.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Brûlure mictionnelle" secondary={sessionCase.sysPipi.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dysurie (difficulté à uriner)" secondary={sessionCase.sysPipi.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Hématurie" secondary={sessionCase.sysPipi.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Nycturie" secondary={sessionCase.sysPipi.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Goutte-à-goutte" secondary={sessionCase.sysPipi.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Force du jet" secondary={sessionCase.sysPipi.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Douleur loge rénale" secondary={sessionCase.sysPipi.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q8.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Pollakiurie" secondary={sessionCase.sysPipi.q8.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q9.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Polyurie" secondary={sessionCase.sysPipi.q9.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q10.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Ténesme vésical" secondary={sessionCase.sysPipi.q10.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q11.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Miction impérieuse" secondary={sessionCase.sysPipi.q11.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysPipi.q12.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Incontinence urinaire" secondary={sessionCase.sysPipi.q12.text} />
                            </ListItem>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel18'} onChange={this.handleChange('panel18')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>18. SYSTÈME GÉNITAL MASCULIN </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysGenitalM.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Douleur périnéale" secondary={sessionCase.sysGenitalM.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalM.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Douleur scrotale" secondary={sessionCase.sysGenitalM.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalM.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Masse scrotale" secondary={sessionCase.sysGenitalM.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalM.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dysfonction érectile" secondary={sessionCase.sysGenitalM.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalM.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Hémospermie" secondary={sessionCase.sysGenitalM.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalM.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Douleur à l’éjaculation" secondary={sessionCase.sysGenitalM.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalM.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Écoulement urétral" secondary={sessionCase.sysGenitalM.q7.text} />
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel18'} onChange={this.handleChange('panel18')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>18. SYSTÈME GÉNITAL FÉMININ </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysGenitalF.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Ménarche" secondary={sessionCase.sysGenitalF.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalF.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Histoire menstruelle (cycle menstruel)" secondary={sessionCase.sysGenitalF.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalF.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Date des dernières menstruations" secondary={sessionCase.sysGenitalF.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalF.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Ménorragie" secondary={sessionCase.sysGenitalF.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalF.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Métrorragie" secondary={sessionCase.sysGenitalF.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalF.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Leucorrhée" secondary={sessionCase.sysGenitalF.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalF.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Ménopause et malaises associés" secondary={sessionCase.sysGenitalF.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalF.q8.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dysménorrhée" secondary={sessionCase.sysGenitalF.q8.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysGenitalF.q9.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Dyspareunie" secondary={sessionCase.sysGenitalF.q9.text} />
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel19'} onChange={this.handleChange('panel19')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>19. SYSTÈME ENDOCRINIEN
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysEndo.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Polydipsie" secondary={sessionCase.sysEndo.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Polyurie" secondary={sessionCase.sysEndo.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Polyphagie" secondary={sessionCase.sysEndo.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Frilosité" secondary={sessionCase.sysEndo.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary=" Intolérance à la chaleur" secondary={sessionCase.sysEndo.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Raucité de la voix" secondary={sessionCase.sysEndo.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q7.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Gain ou perte de poids" secondary={sessionCase.sysEndo.q7.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q8.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Aménorrhée – Galactorrhée" secondary={sessionCase.sysEndo.q8.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q9.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Tremblements" secondary={sessionCase.sysEndo.q9.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q10.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Pilosité excessive ou insuffisante" secondary={sessionCase.sysEndo.q10.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q11.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Palpitations" secondary={sessionCase.sysEndo.q11.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q12.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Constipation ou diarrhée" secondary={sessionCase.sysEndo.q12.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q13.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Sudation" secondary={sessionCase.sysEndo.q13.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysEndo.q14.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Gynécomastie" secondary={sessionCase.sysEndo.q14.text} />
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel20'} onChange={this.handleChange('panel20')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>20. SYSTÈME HÉMATOLOGIE
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysHema.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Perte de poids" secondary={sessionCase.sysHema.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysHema.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Sudation nocturne" secondary={sessionCase.sysHema.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysHema.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Masse cervicale ou inguinale" secondary={sessionCase.sysHema.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysHema.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Fatigabilité" secondary={sessionCase.sysHema.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysHema.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Susceptibilité aux infections" secondary={sessionCase.sysHema.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysHema.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Diathèse hémorragique" secondary={sessionCase.sysHema.q6.text} />
                            </ListItem>
                            <Divider />


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel21'} onChange={this.handleChange('panel21')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>21. SYSTÈME LOCOMOTEUR
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysLoco.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Arthralgie centrale ou périphérique" secondary={sessionCase.sysLoco.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysLoco.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Gonflement articulaire" secondary={sessionCase.sysLoco.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysLoco.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Rougeur articulaire" secondary={sessionCase.sysLoco.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysLoco.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Raideur matinale" secondary={sessionCase.sysLoco.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysLoco.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Phénomène de Raynaud" secondary={sessionCase.sysLoco.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysLoco.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Myalgies" secondary={sessionCase.sysLoco.q6.text} />
                            </ListItem>
                            <Divider />


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>



                <ExpansionPanel expanded={expanded === 'panel22'} onChange={this.handleChange('panel22')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>22. SYSTÈME TROPHIQUE (PEAU ET PHANÈRES)
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem className={sessionCase.sysTrophique.q1.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Érythème" secondary={sessionCase.sysTrophique.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysTrophique.q2.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Prurit – Éruption" secondary={sessionCase.sysTrophique.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysTrophique.q3.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Hippocratisme digital" secondary={sessionCase.sysTrophique.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysTrophique.q4.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Pitting unguéal" secondary={sessionCase.sysTrophique.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysTrophique.q5.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Raynaud" secondary={sessionCase.sysTrophique.q5.text} />
                            </ListItem>
                            <Divider />
                            <ListItem className={sessionCase.sysTrophique.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Alopécie" secondary={sessionCase.sysTrophique.q6.text} />
                            </ListItem>
                            <Divider />

                            <ListItem className={sessionCase.sysTrophique.q6.presence ? 'greenCard' : 'RedCard'} button>
                                <ListItemText primary="Photosensibilité" secondary={sessionCase.sysTrophique.q6.text} />
                            </ListItem>
                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel23'} onChange={this.handleChange('panel23')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>23. PLAN</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                             
                            <ListItem button>
                                <ListItemText primary="Investigations supplémentaires" secondary={sessionCase.plan.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Consultations d'autres spécialités" secondary={sessionCase.plan.q2.text} />
                            </ListItem>
                            <Divider />
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Consultations d'autres professionnels" secondary={sessionCase.plan.q3.text} />
                            </ListItem>
                            
                            <ListItem button>
                                <ListItemText primary="Traitements médicamenteux" secondary={sessionCase.plan.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Approche comportementale, cognitive, psychodynamique" secondary={sessionCase.plan.q5.text} />
                            </ListItem>
                            <Divider />
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Thérapie de milieu" secondary={sessionCase.plan.q6.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Thérapie de soutien" secondary={sessionCase.plan.q7.text} />
                            </ListItem>
                            <Divider />

                            <ListItem button>
                                <ListItemText primary="Information à donner au patient et à ses proches" secondary={sessionCase.plan.q8.text} />
                            </ListItem>
                            <Divider />
                           
                            <ListItem button>
                                <ListItemText primary="Maladie, traitements, médicaments" secondary={sessionCase.plan.q9.text} />
                            </ListItem>
                            
                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>


                <ExpansionPanel expanded={expanded === 'panel24'} onChange={this.handleChange('panel24')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>24. PICA</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem button>
                                <ListItemText primary="Perception" secondary={sessionCase.pica.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Impacts" secondary={sessionCase.pica.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Craintes" secondary={sessionCase.pica.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Attentes" secondary={sessionCase.pica.q4.text} />
                            </ListItem>


                        </List>


                    </ExpansionPanelDetails>


                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel25'} onChange={this.handleChange('panel25')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>25. SIGNE VITAUX ET EXAMEN PHYSIQUE
                            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <Typography variant={'body1'} color={'textPrimary'} >Signe vitaux</Typography>
                            <ListItem button>
                                <ListItemText primary="Température" secondary={sessionCase.physicalExam.q1.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Fréq. cardiaque" secondary={sessionCase.physicalExam.q2.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Fréq. respiratoire" secondary={sessionCase.physicalExam.q3.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Tension artérielle" secondary={sessionCase.physicalExam.q4.text} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Saturation" secondary={sessionCase.physicalExam.q5.text} />
                            </ListItem>
                            <Divider />
                            <Divider />
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Examen physique" secondary={sessionCase.physicalExam.q6.text} />
                            </ListItem>

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

          

            </div>
        );
    }
}





Revision.propTypes = {
    sessionCase: PropTypes.object,
};


export default withTracker(({ match }) => {
    const documentId = match.params._id;
    const subscription = Meteor.subscribe('externatsGeriatry.view.public', documentId);


    return {
        loading: !subscription.ready(),
        sessionCase: Externats.findOne(match.params._id),
    };
})(Revision);


