import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Meteor } from 'meteor/meteor'
import NotFound from '../../../pages/NotFound/NotFound';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

// FIXME ready for styling 

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



export default class DoctorContext extends Component {
    static propTypes = {
        sessionCase: PropTypes.object,
    }
    toNumbers(time) {
        console.log(time);
        switch (time) {
            case '6 minutes':
                return 360;

            case '8 minutes':
                return 480;

            case '10 minutes':
                return 600;

            case '12 minutes':
                return 720;

        }
    }
    componentDidMount() {
        //  in the case that the user reaches this page through a link, we need to make sur the case is still passed on in the global state
        this.props.onSessionCaseAdded(this.props.sessionCase);
        const time = this.toNumbers(this.props.sessionCase.gabarit.stationTime);
        console.log("converted time is "+time );
        

    }
    handleChange = event => {
        console.log("event target value is "+event.target.value);
        this.props.onSetSessionTime(event.target.value);
    }
    render() {
        return (
            this.props.sessionCase ? <div className={(this.props.sessionPage == 1) ? "visible" : "hidden"} style={styles.root}>
                <div className={'page-header '}>
                    <Typography className="padding2" variant="display2" align="left" color={"primary"}>
                        Mise en situation || Médecin
                    </Typography>
                </div>
                <Grid container spacing={24} align={"center"}>
                    <Grid item xs={12} sm={12} m={6} l={6} xl={6} >
                        <Paper className={styles.paper} align={"center"}>
                            <div className={'padding4'}>
                                <Typography variant="title" align="left">
                                    Nom:&nbsp;&nbsp;
                                    <span className ="prop-info">{this.props.sessionCase.gabarit.nom} , {this.props.sessionCase.gabarit.age} ans </span>
                                </Typography>
                                <Typography variant="title" align="left">
                                    Raison de consultation:&nbsp;&nbsp;
                                    <span className ="prop-info">{this.props.sessionCase.intro.q1.text} </span>
                                </Typography>
                                <Typography variant="title" align="left">
                                    Niveau de difficulté:&nbsp;&nbsp;
                                    <span className ="prop-info">{this.props.sessionCase.gabarit.niveau}</span>
                                </Typography>
                          
                                <br/>
        
                                <Typography align="left">
                                    {this.props.sessionCase.gabarit.studentContext}
                                </Typography>
                            
                                <br/>
                                <Typography variant="title" align="left">
                                    Durée de la station: &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Select 
                                            value={this.props.sessionTime}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'stationTime',
                                                id: 'stationTime',
                                            }}
                                        >
                                            <MenuItem value={360}>6 minutes</MenuItem>
                                            <MenuItem value={480}>8 minutes</MenuItem>
                                            <MenuItem value={600}>10 minutes</MenuItem>
                                            <MenuItem value={720}>12 minutes</MenuItem>
                                        </Select>
                                </Typography>
                           
                                     
                                    
                              
                            </div>
                        </Paper>
                        <div align={"left"}>
                            <div className={"buttons"}>
                            <Button variant="contained" onClick={() => this.props.history.push('/viewcases')} color="secondary" className={styles.button}>
                                Choisir un autre cas
                            </Button>
                            </div>
                            <div className={"buttons"}>
                            <Button  variant="contained" onClick={() => { console.log('page is ' + this.props.sessionPage); this.props.onSetSessionPage(2) }} color="primary" className={styles.button}>
                                Mise en situation pour le patient
                            </Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div> : <NotFound />)

    }
}
