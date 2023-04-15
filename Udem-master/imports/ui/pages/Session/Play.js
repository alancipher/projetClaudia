import { Alert } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Cases from '../../../api/Cases/Cases';
import Checkbox from '@material-ui/core/Checkbox';
import Delete from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FileUpload from '@material-ui/icons/FileUpload';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import KeyboardVoice from '@material-ui/icons/KeyboardVoice';
import Link from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Meteor } from 'meteor/meteor';
import NotFound from '../NotFound/NotFound';
import Paper from '@material-ui/core/Paper';
import PlayArrow from '@material-ui/icons/PlayArrow'
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import Save from '@material-ui/icons/Save';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

// FIXME ready for styling

const styles = theme => ({
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 12,

    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
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
        display: 'inline-blocks',
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

var timeItTookSent;
class Play extends React.Component {


    state = {
        expanded: null,
        sessionCase: {
            ...this.props.sessionCase,
            score: 0,
            additional: {
                ...this.props.sessionCase.additional,
                principal: "Mauvaise Réponse",
                differentiel: "Mauvaise Réponse",
                q1: "Mauvaise Réponse",
                q2: "Mauvaise Réponse",
            },
            physical: false,

        }
    };

    componentWillMount = () => {

    };

    componentDidMount = () => {
        timeItTookSent = false;


    };

    handleChange = panel => (event, expanded) => {
        event.preventDefault();
        this.setState({
            expanded: expanded ? panel : false,
        });
        console.log("session case from panel change ")
        console.log(this.state.sessionCase);
    };
    handleClick1 = (single) => {
        console.log("current checkbox " + single);
        console.log(this.state.sessionCase[single]);
        if (this.state.sessionCase[single]) {
            this.setState(prevState => ({
                ...prevState,
                sessionCase: {
                    ...prevState.sessionCase,
                    score: prevState.sessionCase.score - 1
                }
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                sessionCase: {
                    ...prevState.sessionCase,
                    score: prevState.sessionCase.score + 1
                }
            }));
        }
        console.log('score is' + this.state.sessionCase.score);
        // set the state of a unique checkbox ex: sessionCase.comfortCheck
        this.setState(prevState => ({
            ...prevState,
            sessionCase: {
                ...prevState.sessionCase,
                [single]: !prevState.sessionCase[single]

            }
        }));

    };
    handleClick2 = (category, variable) => {
        console.log("current checkbox " + category + "." + variable);

        console.log(this.state.sessionCase[category][variable]);
        // set the state of a 2 level one sessionCase.intro.salutation
        if (this.state.sessionCase[category][variable]) {
            this.setState(prevState => ({
                ...prevState,
                sessionCase: {
                    ...prevState.sessionCase,
                    score: prevState.sessionCase.score - 1
                }
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                sessionCase: {
                    ...prevState.sessionCase,
                    score: prevState.sessionCase.score + 1
                }
            }));
        }
        console.log('score is' + this.state.sessionCase.score);
        this.setState(prevState => ({
            ...prevState,
            sessionCase: {
                ...prevState.sessionCase,
                [category]: {
                    ...prevState.sessionCase[category], //sessionCase.intro:{rest}
                    [variable]: !prevState.sessionCase[category][variable]      //salutation: !state.sessionCase.intro.salutation
                }

            }
        }))
    };

    handleClick3 = (category, variable, value) => {
        console.log("current checkbox " + category + "." + variable + "." + value);
        console.log(this.state.sessionCase[category][variable][value]);
        // set the state of a 2 level one sessionCase.med.general.done
        // set the state of a 2 level one sessionCase.intro.salutation
        if (this.state.sessionCase[category][variable][value]) {
            this.setState(prevState => ({
                ...prevState,
                sessionCase: {
                    ...prevState.sessionCase,
                    score: prevState.sessionCase.score - 1
                }
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                sessionCase: {
                    ...prevState.sessionCase,
                    score: prevState.sessionCase.score + 1
                }
            }));
        }
        console.log('score is' + this.state.sessionCase.score);
        this.setState(prevState => ({
            ...prevState,
            sessionCase: {
                ...prevState.sessionCase,
                [category]: {
                    ...prevState.sessionCase[category], //sessionCase.intro:{rest}
                    [variable]: {
                        ...prevState.sessionCase[category][variable],
                        [value]: !prevState.sessionCase[category][variable][value]
                    }      //salutation: !state.sessionCase.intro.salutation
                }

            }
        }))
    };

    handleClick4 = (category, variable, value, value2) => {
        console.log("current checkbox " + category + "." + variable + "." + value + "." + value2);
        // set the state of a 2 level one sessionCase.med.general.done
        // set the state of a 2 level one sessionCase.intro.salutation

        console.log(this.state.sessionCase[category][variable][value][value2]);
        if (this.state.sessionCase[category][variable][value][value2]) {
            this.setState(prevState => ({
                ...prevState,
                sessionCase: {
                    ...prevState.sessionCase,
                    score: prevState.sessionCase.score - 1
                }
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                sessionCase: {
                    ...prevState.sessionCase,
                    score: prevState.sessionCase.score + 1
                }
            }));
        }
        console.log('score is' + this.state.sessionCase.score);
        this.setState(prevState => ({
            ...prevState,
            sessionCase: {
                ...prevState.sessionCase,
                [category]: {
                    ...prevState.sessionCase[category], //sessionCase.intro:{rest}
                    [variable]: {
                        ...prevState.sessionCase[category][variable],
                        [value]: {
                            ...prevState.sessionCase[category][variable][value],
                            [value2]: !prevState.sessionCase[category][variable][value][value2]
                        }
                    }

                }
            }
        }))
    };

    handleClick5 = (index, i, value) => {
        console.log("current checkbox from obj" + value);
        let newSystems = this.state.sessionCase.otherSystems; //creating copy of object
        newSystems[index].system[i].symptom['done'] = value;
        if (!value) {
            this.setState(prevState => ({
                ...prevState,
                sessionCase: {
                    ...prevState.sessionCase,
                    score: prevState.sessionCase.score - 1
                }
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                sessionCase: {
                    ...prevState.sessionCase,
                    score: prevState.sessionCase.score + 1
                }
            }));
        }
        //updating value
        this.setState(prevState => ({
            ...prevState,
            sessionCase: {
                ...prevState.sessionCase,
                otherSystems: newSystems
            }
        }));



    };

    toggleIt = (event, name) => {
        var currentSessionCase = this.state.sessionCase;

        currentSessionCase['additional'][name] = event.target.value;
        console.log(event.target.value);
        this.setState({ sessionCase: currentSessionCase });



    }

    arrayToObject = (array, keyField) => {
        console.log("Current array with keyfield" + keyfield);
        console(array);
        array.reduce((obj, item) => {
            obj[item[keyField]] = item
            console.log("object that is returned: ");
            console.log(obj);
            return obj
        }, {})
    };

    componentDidUpdate() {
        console.log("component update" + timeItTookSent);

        if (this.props.clockState == 'STOPPED' && !this.props.inSession || this.props.clockState == 'PAUSED' && !this.props.inSession) {
            // as soon as the session ends, we update the redux sessionCase with the state sessionCase
            if (this.props.timeItTook && !timeItTookSent) {
                var caseDoc = this.state.sessionCase;
                caseDoc.timeItTook = this.props.timeItTook;
                console.log("time it took is " + this.props.timeItTook);

                this.props.onSessionCaseAdded(caseDoc);
                timeItTookSent = true;

                var document = { 'caseDoc': caseDoc, 'lastScore': caseDoc.score, 'lastCase': caseDoc };


                console.log(document);
                // TODO check if its the first time they do the case  to know which method to call
                Meteor.call('documents.insert', document, (error, documentId) => {
                    if (error) {
                        Bert.alert(error.reason, 'danger'); 
                    } else {
                        //   const confirmation = existingDocument ? 'Document updated!' : 'Document added!';
                        //   this.form.reset();
                        console.log(documentId);
                        this.props.history.push(`/recap/${documentId}`);
                    }
                })
            }
        }
    };
    render() {

        const { expanded } = this.state;
        const props = this.props;
        const sessionCase = this.state.sessionCase;

        const { classes } = this.props;
        const physicalExam = Array.from(this.state.sessionCase && this.state.sessionCase.physicalExam ?  this.state.sessionCase.physicalExam : []);
        const systems = Array.from(this.state.sessionCase.otherSystems);//turning the objects to array


        return (
            <div className={styles.root}>

                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>1. INTRODUCTION</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick2('intro', 'salutation'); }} button>
                                <ListItemText
                                    primary="Salutations et présentation" secondary="" />
                                <ListItemSecondaryAction>  <IconButton aria-label="Comments">

                                </IconButton>
                                    <Checkbox checked={sessionCase.intro.salutation} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick2('intro', 'salutation'); }} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick2('intro', 'comfort'); }} button>
                                <ListItemText primary="S’assurer du confort" secondary="" />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox checked={sessionCase.intro.comfort} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick2('intro', 'comfort'); }} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <Divider />

                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick1('reasonCheck'); }} button>
                                <ListItemText primary="Raison de consultation"
                                    secondary={sessionCase.intro.reason} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox id={'raison'} checked={sessionCase.reasonCheck ? sessionCase.reasonCheck : false} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick1('reasonCheck'); }} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick1('consultationCheck'); }} button>
                                <ListItemText primary="Raison de consultation secondaire"
                                    secondary={sessionCase.intro.consultationReason2} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox id={'raison2'} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick1('consultationCheck'); }} checked={sessionCase.consultationCheck ? sessionCase.consultationCheck : false} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick1('ageOccCheck'); }} button>
                                <ListItemText primary="Âge" secondary={sessionCase.gabarit.age + "ans"} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox id={sessionCase.intro.ageAndOcc} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick1('ageOccCheck'); }} checked={sessionCase.ageOccCheck ? sessionCase.ageOccCheck : false} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick2('intro', 'plan'); }} button>
                                <ListItemText primary="Établir un plan de l'entrevue" />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox id={'plan'} checked={sessionCase.intro.plan} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick2('intro', 'plan'); }} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>2. ANTÉCÉDENTS MÉDICAUX</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'personal', 'done'); }} button>
                                <ListItemText primary="Personnels" secondary={sessionCase.antecedents.personal.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'personal', 'done'); }} checked={sessionCase.antecedents.personal.done} type="checkbox" tabIndex={-1} disableRipple />

                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'surgeries', 'done'); }} button>
                                <ListItemText primary="Chirurgicaux" secondary={sessionCase.antecedents.surgeries.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'surgeries', 'done'); }} checked={sessionCase.antecedents.surgeries.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'psy', 'done'); }} button>
                                <ListItemText primary="Psychiatriques, psychologique"
                                    secondary={sessionCase.antecedents.psy.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'psy', 'done'); }} checked={sessionCase.antecedents.psy.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'gyn', 'done'); }} button>
                                <ListItemText primary="Gynécologiques/obstétriques"
                                    secondary={sessionCase.antecedents.gyn.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'gyn', 'done'); }} checked={sessionCase.antecedents.gyn.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'famHist', 'done'); }} button>
                                <ListItemText primary="Antécédents familiaux" secondary={sessionCase.antecedents.famHist.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'famHist', 'done'); }} checked={sessionCase.antecedents.famHist.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'allergies', 'done'); }} button>
                                <ListItemText primary="Allergies" secondary={sessionCase.antecedents.allergies.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('antecedents', 'allergies', 'done'); }} checked={sessionCase.antecedents.allergies.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />

                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>3. MÉDICATION</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('medication', 'listOfMeds', 'done'); }} button>
                                <ListItemText primary="Listes de medicaments"
                                    secondary={sessionCase.medication.listOfMeds.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('medication', 'listOfMeds', 'done'); }} checked={sessionCase.medication.listOfMeds.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('medication', 'recentChanges', 'done'); }} button>
                                <ListItemText primary="Changements récents"
                                    secondary={sessionCase.medication.recentChanges.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('medication', 'recentChanges', 'done'); }} checked={sessionCase.medication.recentChanges.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />



                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>4. CONTEXTE DE VIE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'job', 'done'); }} button>
                                <ListItemText primary="Emploi" secondary={sessionCase.lifeContext.job.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'job', 'done'); }} id={"Emploi"} checked={sessionCase.lifeContext.job.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'partner', 'done'); }} button>
                                <ListItemText primary="Partenaire" secondary={sessionCase.lifeContext.partner.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'partner', 'done'); }} id={"Partenaire"} checked={sessionCase.lifeContext.partner.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'environment', 'done'); }} button>
                                <ListItemText primary="Milieu de vie" secondary={sessionCase.lifeContext.environment.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'environment', 'done'); }} id={'Milieux de vie'} checked={sessionCase.lifeContext.environment.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'stressLevel', 'done'); }} button>
                                <ListItemText primary="Niveau de stress" secondary={sessionCase.lifeContext.stressLevel.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'stressLevel', 'done'); }} id={"Niveau de stress"} checked={sessionCase.lifeContext.stressLevel.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'activities', 'done'); }} button>
                                <ListItemText primary="Activités/loisirs" secondary={sessionCase.lifeContext.activities.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox id={"Activités/loisirs"} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'activities', 'done'); }} checked={sessionCase.lifeContext.activities.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'travels', 'done'); }} button>
                                <ListItemText primary="Voyages récents" secondary={sessionCase.lifeContext.travels.text} />
                                <ListItemSecondaryAction>

                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox id="Voyages récents" disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeContext', 'travels', 'done'); }} checked={sessionCase.lifeContext.travels.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <Divider />


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>5. HABITUS</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'tabacco', 'done'); }} button>
                                <ListItemText primary="Tabac" secondary={sessionCase.lifeHabits.tabacco.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox id="Tabac" disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'tabacco', 'done'); }} checked={sessionCase.lifeHabits.tabacco.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'alcohol', 'done'); }} button>
                                <ListItemText primary="Alcool" secondary={sessionCase.lifeHabits.alcohol.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'alcohol', 'done'); }} id="Alcool" checked={sessionCase.lifeHabits.alcohol.done} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'drugs', 'done'); }} button>
                                <ListItemText primary="Drogues" secondary={sessionCase.lifeHabits.drugs.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'drugs', 'done'); }} checked={sessionCase.lifeHabits.drugs.done} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'coffee', 'done'); }} button>
                                <ListItemText primary="Caféines/stimulants" secondary={sessionCase.lifeHabits.coffee.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'coffee', 'done'); }} checked={sessionCase.lifeHabits.coffee.done} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'physAct', 'done'); }} button>
                                <ListItemText primary="Activité physique" secondary={sessionCase.lifeHabits.physAct.text} />
                                <ListItemSecondaryAction>                 <IconButton aria-label="Comments">
                                </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'physAct', 'done'); }} checked={sessionCase.lifeHabits.physAct.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'foodHabits', 'done'); }} button>
                                <ListItemText primary="Alimentation" secondary={sessionCase.lifeHabits.foodHabits.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox checked={sessionCase.lifeHabits.foodHabits.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'foodHabits', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'sexuality', 'done'); }} button>
                                <ListItemText primary="Sexualité" secondary={sessionCase.lifeHabits.sexuality.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>

                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'sexuality', 'done'); }} checked={sessionCase.lifeHabits.sexuality.done} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'sleep', 'done'); }} button>
                                <ListItemText primary="Sommeil" secondary={sessionCase.lifeHabits.sleep.text} />
                                <ListItemSecondaryAction>

                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('lifeHabits', 'sleep', 'done'); }} checked={sessionCase.lifeHabits.sleep.done} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>6. HISTOIRE de la MALADIE
                            ACTUELLE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('currentHist', 'historic', 'done'); }} button>
                                <ListItemText primary="Question ouverte" secondary={sessionCase.currentHist.historic.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('currentHist', 'historic', 'done'); }} checked={sessionCase.currentHist.historic.done} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <Typography variant={'headline'} color={'secondary'}>P</Typography>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'p', 'one', 'done'); }} button>
                                <ListItemText primary="Provoqué" secondary={sessionCase.currentHist.p.one.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'p', 'one', 'done'); }} checked={sessionCase.currentHist.p.one.done} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'p', 'two', 'done'); }} button>
                                <ListItemText primary="Pallié" secondary={sessionCase.currentHist.p.two.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox checked={sessionCase.currentHist.p.two.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'p', 'two', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <Typography variant={'headline'} color={'secondary'}>Q</Typography>

                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'q', 'one', 'done'); }} button>
                                <ListItemText primary="Qualité" secondary={sessionCase.currentHist.q.one.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox checked={sessionCase.currentHist.q.one.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'q', 'one', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'q', 'two', 'done'); }} button>
                                <ListItemText primary="Quantité" secondary={sessionCase.currentHist.q.two.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox checked={sessionCase.currentHist.q.two.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'q', 'two', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <Typography variant={'headline'} color={'secondary'}>R</Typography>

                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'r', 'one', 'done'); }} button>
                                <ListItemText primary="Région" secondary={sessionCase.currentHist.r.one.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox checked={sessionCase.currentHist.r.one.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'r', 'one', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'r', 'two', 'done'); }} button>
                                <ListItemText primary="Irradiation" secondary={sessionCase.currentHist.r.two.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox checked={sessionCase.currentHist.r.two.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 'r', 'two', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <Typography variant={'headline'} color={'secondary'}>S</Typography>

                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 's', 'one', 'done'); }} button>
                                <ListItemText primary="Sévérité" secondary={sessionCase.currentHist.s.one.text} />
                                <ListItemSecondaryAction>                 <IconButton aria-label="Comments">                                    </IconButton>
                                    <Checkbox checked={sessionCase.currentHist.s.one.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 's', 'one', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>

                            <Divider />
                            <Typography variant={'headline'} color={'secondary'}>T</Typography>

                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 't', 'one', 'done'); }} button>
                                <ListItemText primary="Depuis combien de temps?"
                                    secondary={sessionCase.currentHist.t.one.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox checked={sessionCase.currentHist.t.one.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 't', 'one', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 't', 'two', 'done'); }} button>
                                <ListItemText primary="Constant/intermittent" secondary={sessionCase.currentHist.t.two.text} />
                                <ListItemSecondaryAction>                 <IconButton aria-label="Comments">
                                </IconButton><Checkbox checked={sessionCase.currentHist.t.two.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 't', 'two', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 't', 'three', 'done'); }} button>
                                <ListItemText primary="Croissant/stable" secondary={sessionCase.currentHist.t.three.text} />
                                <ListItemSecondaryAction>                 <IconButton aria-label="Comments">
                                </IconButton>
                                    <Checkbox checked={sessionCase.currentHist.t.three.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 't', 'three', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 't', 'four', 'done'); }} button>
                                <ListItemText primary="Fin" secondary={sessionCase.currentHist.t.four.text} />
                                <ListItemSecondaryAction>                 <IconButton aria-label="Comments">
                                </IconButton>
                                    <Checkbox checked={sessionCase.currentHist.t.four.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick4('currentHist', 't', 'four', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel7'} onChange={this.handleChange('panel7')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>7 SYMPTÔMES GÉNÉRAUX</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('generalSymp', 'one', 'done'); }} className={sessionCase.generalSymp.one.presence ? 'greenCard' : 'RedCard'} button>

                                <ListItemText primary="Fièvre" secondary={sessionCase.generalSymp.one.text} />
                                <ListItemSecondaryAction>
                                    <Checkbox checkedIcon={<StarIcon color={'primary'} />} icon={''} checked={sessionCase.generalSymp.one.important ? sessionCase.generalSymp.one.important : false} disabled /> <Checkbox checked={sessionCase.generalSymp.one.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('generalSymp', 'one', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('generalSymp', 'two', 'done'); }} className={sessionCase.generalSymp.two.presence ? 'greenCard' : 'RedCard'} button>

                                <ListItemText primary="Perte d'appetit" secondary={sessionCase.generalSymp.two.text} />
                                <ListItemSecondaryAction>
                                    <Checkbox checkedIcon={<StarIcon color={'primary'} />} icon={''} checked={sessionCase.generalSymp.two.important ? sessionCase.generalSymp.two.important : false} disabled /><Checkbox checked={sessionCase.generalSymp.two.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('generalSymp', 'two', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('generalSymp', 'three', 'done'); }} className={sessionCase.generalSymp.three.presence ? 'greenCard' : 'RedCard'} button>

                                <ListItemText primary="Diaphorèse nocturne" secondary={sessionCase.generalSymp.three.text} />
                                <ListItemSecondaryAction>
                                    <Checkbox checkedIcon={<StarIcon color={'primary'} />} icon={''} checked={sessionCase.generalSymp.three.important ? sessionCase.generalSymp.three.important : false} disabled />
                                    <Checkbox checked={sessionCase.generalSymp.three.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('generalSymp', 'three', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('generalSymp', 'four', 'done'); }} className={sessionCase.generalSymp.four.presence ? 'greenCard' : 'RedCard'} button>

                                <ListItemText primary="Fatigue" secondary={sessionCase.generalSymp.four.text} />
                                <ListItemSecondaryAction>
                                    <Checkbox checkedIcon={<StarIcon color={'primary'} />} icon={''} checked={sessionCase.generalSymp.four.important ? sessionCase.generalSymp.four.important : false} disabled />
                                    <Checkbox checked={sessionCase.generalSymp.four.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('generalSymp', 'four', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>


                        </List>








                    </ExpansionPanelDetails>
                </ExpansionPanel>
                {systems ? <div>{systems.map(({ name, system }, index) => (
                    <ExpansionPanel key={name} expanded={expanded === ('panel7.' + (index + 1))} onChange={this.handleChange('panel7.' + (index + 1))}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={'uppercase'} variant={'headline'} color={'primary'}>8.{index + 1} {name}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                            <List className={"fullwidth"} component="nav" style={styles.rootList}>
                                {system.map(({ symptom }, i) => (
                                    <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick5(index, i, !symptom.done); }} key={i} className={symptom.presence ? 'greenCard' : 'RedCard'} button>
                                        <ListItemText primary={symptom.name} secondary={symptom.text} />
                                        <ListItemSecondaryAction>
                                            <Checkbox checkedIcon={<StarIcon color={'primary'} />} icon={''} checked={symptom.important ? symptom.important : false} disabled />

                                            <Checkbox disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick5(index, i, !symptom.done); }} checked={symptom.done} type="checkbox" tabIndex={-1} disableRipple />               </ListItemSecondaryAction></ListItem>
                                ))}


                            </List>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}</div> : <p>no more system</p>}
                <ExpansionPanel expanded={expanded === 'panel8'} onChange={this.handleChange('panel8')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>9. PICA</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('pica', 'one', 'done'); }} button>
                                <ListItemText primary="Perception" secondary={sessionCase.pica.one.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox checked={sessionCase.pica.one.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('pica', 'one', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('pica', 'two', 'done'); }} button>
                                <ListItemText primary="Impacts" secondary={sessionCase.pica.two.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">

                                    </IconButton>
                                    <Checkbox checked={sessionCase.pica.two.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('pica', 'two', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('pica', 'three', 'done'); }} button>
                                <ListItemText primary="Craintes" secondary={sessionCase.pica.three.text} />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Comments">
                                    </IconButton>
                                    <Checkbox checked={sessionCase.pica.three.done} disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('pica', 'three', 'done'); }} type="checkbox" tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>
                            <Divider />
                            <ListItem disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('pica', 'four', 'done'); }} button>
                                <ListItemText primary="Attentes" secondary={sessionCase.pica.four.text} />
                                <ListItemSecondaryAction>                 <IconButton aria-label="Comments">
                                </IconButton>
                                    <Checkbox checked={sessionCase.pica.four.done} type="checkbox" disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick3('pica', 'four', 'done'); }} tabIndex={-1} disableRipple />
                                </ListItemSecondaryAction></ListItem>


                        </List>


                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel9'} onChange={this.handleChange('panel9')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>10. Examen physique</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List>
                            <ListItem  disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick1('physical'); }} button>

                            <ListItemSecondaryAction>
                            <Checkbox  checked={sessionCase && sessionCase.physical} type="checkbox" disabled={this.props.clockState != 'STARTED'} onClick={(e) => { e.preventDefault(); this.handleClick1('physical'); }} tabIndex={-1} disableRipple />

                                </ListItemSecondaryAction>

                                    {physicalExam.map(({ text }, i) => (
                                        <ListItemText primary=""
                                        secondary={text} />
                                    ))}

                                </ListItem>



                        </List>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel10'} onChange={this.handleChange('panel10')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant={'headline'} color={'primary'}>11.QUESTIONS SUPLÉMENTAIRES</Typography>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List className={"fullwidth"} component="nav" style={styles.rootList}>
                            <ListItem disabled={this.props.clockState != 'STARTED'}>
                                <FormControl component="fieldset" className={styles.formControl}>
                                    <FormLabel component="legend">
                                        <Typography variant="title" align="left">
                                            Diagnostic Principal:&nbsp;&nbsp;
                                <span className="prop-info">{sessionCase.additional.one} </span>
                                        </Typography>
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="Diagnostic-Principal"
                                        name="diagnostic-principal"
                                        className={styles.group}
                                        value={sessionCase.additional.principal ? sessionCase.additional.principal : "Mauvaise Réponse"}
                                        onChange={(e) => { e.preventDefault(); this.toggleIt(e, 'principal'); }}
                                        row
                                    >
                                        <FormControlLabel value="Bonne Réponse" control={<Radio />} label="Bonne Réponse" />
                                        <FormControlLabel value="Mauvaise Réponse" control={<Radio />} label="Mauvaise Réponse" />

                                    </RadioGroup>
                                </FormControl>
                            </ListItem>
                            <ListItem disabled={this.props.clockState != 'STARTED'}>
                                <FormControl component="fieldset" className={styles.formControl}>
                                    <FormLabel component="legend">
                                        <Typography variant="title" align="left">
                                            Diagnostic Différentiel:&nbsp;&nbsp;
                                <span className="prop-info">{sessionCase.additional.two} </span>
                                        </Typography>
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="Diagnostic-Differentiel"
                                        name="diagnostic-differentiel"
                                        className={styles.group}
                                        value={sessionCase.additional.differentiel ? sessionCase.additional.differentiel : "Mauvaise Réponse"}
                                        onChange={(e) => { e.preventDefault(); this.toggleIt(e, 'differentiel'); }}
                                        row
                                    >
                                        <FormControlLabel value="Bonne Réponse" control={<Radio />} label="Bonne Réponse" />
                                        <FormControlLabel value="Mauvaise Réponse" control={<Radio />} label="Mauvaise Réponse" />

                                    </RadioGroup>
                                </FormControl>
                            </ListItem>
                            {sessionCase && sessionCase.additional && sessionCase.additional.three ?
                                <ListItem disabled={this.props.clockState != 'STARTED'}>
                                    <FormControl component="fieldset" className={styles.formControl}>
                                        <FormLabel component="legend">
                                            <Typography variant="title" align="left">
                                                Question:&nbsp;&nbsp;
                                <span className="prop-info">{sessionCase.additional.three.question} </span>
                                            </Typography>
                                            <Typography variant="title" align="left">
                                                Réponse:&nbsp;&nbsp;
                                <span className="prop-info">{sessionCase.additional.three.reponse} </span>
                                            </Typography>
                                        </FormLabel>
                                        <RadioGroup
                                            aria-label="q1"
                                            name="q1"
                                            className={styles.group}
                                            value={sessionCase.additional.q1 ? sessionCase.additional.q1 : "Mauvaise Réponse"}
                                            onChange={(e) => { e.preventDefault(); this.toggleIt(e, 'q1'); }}
                                            row
                                        >
                                            <FormControlLabel value="Bonne Réponse" control={<Radio />} label="Bonne Réponse" />
                                            <FormControlLabel value="Mauvaise Réponse" control={<Radio />} label="Mauvaise Réponse" />

                                        </RadioGroup>
                                    </FormControl>
                                </ListItem> : ''}
                            {sessionCase && sessionCase.additional && sessionCase.additional.four ?
                                <ListItem disabled={this.props.clockState != 'STARTED'}>
                                    <FormControl component="fieldset" className={styles.formControl}>
                                        <FormLabel component="legend">
                                            <Typography variant="title" align="left">
                                                Question:&nbsp;&nbsp;
                                <span className="prop-info">{sessionCase.additional.four.question} </span>
                                            </Typography>
                                            <Typography variant="title" align="left">
                                                Réponse:&nbsp;&nbsp;
                                <span className="prop-info">{sessionCase.additional.four.reponse} </span>
                                            </Typography>
                                        </FormLabel>
                                        <RadioGroup
                                            aria-label="q2"
                                            name="q2"
                                            className={styles.group}
                                            value={sessionCase.additional.q2 ? sessionCase.additional.q2 : "Mauvaise Réponse"}
                                            onChange={(e) => { e.preventDefault(); this.toggleIt(e, 'q2'); }}
                                            row
                                        >
                                            <FormControlLabel value="Bonne Réponse" control={<Radio />} label="Bonne Réponse" />
                                            <FormControlLabel value="Mauvaise Réponse" control={<Radio />} label="Mauvaise Réponse" />

                                        </RadioGroup>
                                    </FormControl>
                                </ListItem> : ''}
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}





Play.propTypes = {
    sessionCase: PropTypes.object,
};

export default withStyles(styles)(Play);
