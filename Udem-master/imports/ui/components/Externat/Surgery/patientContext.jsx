import React,{Component} from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NotFound from '../../../pages/NotFound/NotFound';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {withTracker} from 'meteor/react-meteor-data';

// FIXME ready for styling

const styles = theme => ({
    root: {
        flexGrow: 1,
        height:100,
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



export default class PatientContext extends Component {
  static propTypes = {
    sessionCase: PropTypes.object,
  }

  render() {
      const props = this.props;
    return (props.sessionCase ? (
        <div style={styles.root}>
            <div className={'page-header '}>
                <Typography className="padding2" variant="display2" align="left" color={"primary"}>
                    Mise en situation || Patient
                </Typography>
            </div>
            <Grid container spacing={24} align={"center"}>
                <Grid item xs={12} sm={12} m={6} l={6} xl={6} >
                    < Paper className={styles.paper} align={"center"}>
                        <div className={"padding4"}>
                            <Typography variant="title" align="left">
                                Nom:&nbsp;&nbsp;
                               <span className="prop-info">{props.sessionCase.gabarit.nom} , {props.sessionCase.gabarit.age} ans </span>
                            </Typography>
                            <Typography variant="title" align="left">
                                Raison de consultation:&nbsp;&nbsp;
                                <span className="prop-info">{this.props.sessionCase.intro.q1.text} </span>
                            </Typography>
                            <Typography variant="title" align="left">
                                Niveau de difficulté:&nbsp;&nbsp;
                                <span className="prop-info">{props.sessionCase.gabarit.niveau}</span>
                            </Typography>
                            <br/>
                            <Typography align="left">
                                {props.sessionCase.gabarit.patientContext}
                            </Typography>
                        </div>
                    </Paper>

                    <div className={'padding4'} align={"left"}>
                    <div className="buttons">
                        <Button variant="contained" onClick={() => {this.props.sessionPage; this.props.onSetSessionPage(1);}} color="secondary"
                                className={styles.button}>
                            Mise en situation pour le médecin
                        </Button>
                        </div>
                        <div className="buttons">
                        <Button variant="contained" onClick={() => {this.props.sessionPage; this.props.onSetSessionPage(3);}} color="primary"
                                className={styles.button}>
                            Visionnement du cas clinique
                        </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    ) : <NotFound/>)

    }
}
