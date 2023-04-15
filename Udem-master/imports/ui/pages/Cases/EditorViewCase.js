import React, { Component } from 'react'
import { monthDayYearAtTime, timeago } from '../../../modules/dates';

import Button from '@material-ui/core/Button';
import CasesCollection from '../../../api/Cases/Cases';
import Loading from '../../components/Loading/Loading';
import { Meteor } from 'meteor/meteor';
import NotAuthorized from '../../components/AdminDashboard/NotAuthorized';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import Revision from '../../pages/Session/Revision';
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

// FIXME READY FOR FINAL STYLING 
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

class EditorViewCase extends Component {
    //   static propTypes = {
    //     prop: PropTypes
    //   }

    constructor(props) {
        super(props);

        // this.state = { admin: this.props.roles.includes("admin")};
    }
    render() {
        const props = this.props;

        if (this.props.editor) { //maing sure the user is an admin 
            return (!props.loading ?
                <div>
                    <h3>Cas Clinique</h3>
                    <Paper className={styles.paper} align={"center"}>
                        <div className={'padding4'}>
                            <Typography variant="title" align="left">
                                Créer le : {monthDayYearAtTime(this.props.sessionCase.createdAt)}

                            </Typography>
                            <br />
                            <Typography variant="title" align="left">
                                Dernières modifications : il y a {timeago(this.props.sessionCase.updatedAt)}

                            </Typography>
                            <br />
                            <Typography variant="title" align="left">
                                Durée de la station: {this.props.sessionCase.gabarit.stationTime}

                            </Typography>
                            <br />
                            <Typography variant="title" align="left">
                                Nom:&nbsp;&nbsp;
                                    <span className="prop-info">{this.props.sessionCase.gabarit.nom} , {this.props.sessionCase.gabarit.age} ans </span>
                            </Typography>
                            <br />
                            <Typography variant="title" align="left">
                                Raison de consultation:&nbsp;&nbsp;
                                    <span className="prop-info">{this.props.sessionCase.gabarit.reason} </span>
                            </Typography>
                            <br />
                            <Typography variant="title" align="left">
                                Niveau de difficulté:&nbsp;&nbsp;
                                    <span className="prop-info">{this.props.sessionCase.gabarit.niveau}</span>
                            </Typography>

                            <br />

                            <Typography variant="title" align="left">
                                Contexte pour l'étudiant:&nbsp;&nbsp;
                                <span className="prop-info">{this.props.sessionCase.gabarit.studentContext}</span>
                            </Typography>
                            <br />
                            <Typography variant="title" align="left">
                                Contexte pour le patient:&nbsp;&nbsp;
                                <span className="prop-info"> {this.props.sessionCase.gabarit.patientContext}</span>
                            </Typography>

                            <br />







                        </div>
                    </Paper>
                    <h3>Questions Principales</h3>
                    <Revision {...props} />

                    <Paper className={styles.paper} align={"center"}>
                        <h3>Questions Suplémentaires</h3>
                        <div className={'padding4'}>
                            <Typography variant="title" align="left">
                                Diagnostic principal:&nbsp;&nbsp;
                                    <span className="prop-info">{this.props.sessionCase.additional.one} </span>
                            </Typography>
                            <Typography variant="title" align="left">
                                Diagnostic différentiel:&nbsp;&nbsp;
                                    <span className="prop-info">{this.props.sessionCase.additional.two} </span>
                            </Typography>
                            <br />
                            <Typography variant="title" align="left">
                                Question Supplémentaire 1:&nbsp;&nbsp;
                                    <span className="prop-info">{this.props.sessionCase.additional.three.question}</span>
                            </Typography>
                            <br />
                            <Typography variant="title" align="left">
                                Réponse 1:&nbsp;&nbsp;
                                    <span className="prop-info">{this.props.sessionCase.additional.three.reponse}</span>
                            </Typography>

                            <br />

                            <Typography variant="title" align="left">
                                Question Supplémentaire 2:&nbsp;&nbsp;
                                    <span className="prop-info">{this.props.sessionCase.additional.four.question}</span>
                            </Typography>
                            <br />
                            <Typography variant="title" align="left">
                                Réponse 2:&nbsp;&nbsp;
                                    <span className="prop-info">{this.props.sessionCase.additional.four.reponse}</span>
                            </Typography>

                            <br />





                        </div>
                    </Paper>
                    <div className={"admin-view-case-button-container"} >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={()=>{this.props.onSessionCaseAdded(this.props.sessionCase); this.props.history.push("/editor/edit-case/"+this.props.sessionCase._id);}}>
                            Modifier le cas
    </Button>
                       

                    </div>

                </div> : <Loading />
            )
        } else {
            return (
                <NotAuthorized {...props} />
            )
        }
    }
}

const EditorViewCase2 = withStyles(styles)(EditorViewCase);

export default withTracker(({ match }) => {
    const documentId = match.params._id;
    const subscription = Meteor.subscribe('cases.view', documentId);


    return {
        loading: !subscription.ready(),
        sessionCase: !subscription.ready() && CasesCollection.findOne({ _id: documentId }),
        // sessions: Documents.find().fetch(),

    };
})(EditorViewCase2);
