import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Link from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import autoBind from 'react-autobind';
import swal from 'sweetalert';
import {withStyles} from '@material-ui/core/styles';

// FIXME remote for the sessions 
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        margin: 'auto',
        // width: `${top}%`,
        fontSize: 12,
        backgroundColor: '#ffffff',
        padding: 10,
    };
}

const styles = theme => ({
    root: {},
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
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
    column: {
        flexBasis: '33.33%',
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
    pos: {
        marginBottom: 12,
    },
    rootList: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    listItemText: {
        fontSize: 18,
    },


});


//this is a timer with a prop that needs to be set

class Remote extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            secondsRemaining: this.props.sessionTime,
            open: false,
            open2: false,
        };
        this.handleOpen = this.handleOpen.bind(this);

    }
   
    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOpen2() {
        this.setState({open2: true});
    }

    handleClose2() {
        this.setState({open2: false});
    }

    tick() {
        this.setState({secondsRemaining: this.state.secondsRemaining - 1});
        if (this.state.secondsRemaining <= 0) {
            clearInterval(this.interval);

            // stop everything 
           
            this.pause();
            this.stop();
            this.props.onEndSession();
        }

        
    }

    start() {
        
             this.setState({ secondsRemaining: this.props.sessionTime},()=>{this.interval = setInterval(this.tick, 1000)})
         
       
    }

    pause() {
        clearInterval(this.interval);
        delete this.interval;
        this.props.onPauseSession();
    }
    

    resume() {
        if (!this.interval)  this.interval = setInterval(this.tick, 1000);
        this.props.onResumeSession();
        
    }

    getTime() {
        // this method returns the time elapsed since the timer was started and then stopped
        console.log(this.props.sessionTime +" "+this.state.secondsRemaining);
        return this.props.sessionTime - this.state.secondsRemaining;
    }

    stop() {
        console.log('stopping session time it took is  '+ this.getTime());
        this.props.onSetClockState('STOPPED');
        this.props.onSetTimeItTook(this.getTime());
        // TODO enhancement : calculate total amount of checkmarks 
        
        console.log(this.props.sessionCase);
        

    }

    checkmarkCounter() {
        var score = 0;
        //this method counts all the dones of the sessionCase
        console.log('In checkmack counter ');
        console.log(this.props.sessionCase);

    }

    componentWillMount() {
        

    }

    componentDidMount() {

    this.props.onSessionCaseAdded(this.props.sessionCase);


    // this.props.onSetSessionTime();
        
    }

    componentWillUnmount() {
        console.log("unmounting");
        clearInterval(this.interval);

    }

    render() {
        return (
            <div className={'case-practice-nav'}>
                <div className="buttons">
                <Tooltip title="Débuter" placement="top" leaveTouchDelay>
                <Button id="start"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            this.props.onSetSessionPage(4);
                            this.props.onSetClockState('STARTED');
                            this.start();

                        }}
                        className={styles.button}
                        disabled={this.props.sessionPage ==1 || this.props.sessionPage ==2 ||  this.props.clockState=='STARTED'  ||  this.props.clockState=='DONE'}
                >

                    <Icon className={styles.rightIcon}>play_arrow</Icon>
                    
                </Button>
                </Tooltip>
                </div>
                <div className="buttons">
                <Tooltip title="Terminer" placement="top">
                <Button id={'stop'} variant="outlined" color="primary" onClick={() =>{
                     this.pause(); this.props.onPauseSession();
                    swal("Terminer la session", "Il vous reste encore du temps. Êtes vous certain de vouloir mettre fin à la session ?", {
                        buttons: {
                            cancel: { text: "Non", closeModal: true, },
                            non: {
                                text: "Non",
                                value: "non",

                            },
                            oui: {
                                text: "Oui",
                                value: "oui",

                            }
                        },
                        icon: "warning",
                    }).then((value) => {
                        if (value == "oui") {
                           //end the session
                           this.pause();
                           this.stop();
                           this.props.onEndSession();

                        }
                        else if (value =="non") {
                            //restart the session
                            this.resume();
                                this.props.onResumeSession();
                                this.props.onSetClockState('STARTED');
                        }
                        else {
                            //restart the session
                            this.resume();
                                this.props.onResumeSession();
                                this.props.onSetClockState('STARTED');
                        }
                    })
                    }}
                        className={styles.button}  disabled={this.props.sessionPage ==1 || this.props.sessionPage ==2 || this.props.sessionPage ==3 ||  this.props.clockState=='DONE'}>

                    <Icon className={styles.rightIcon}>stop</Icon>
                 
                </Button>
                </Tooltip>
                </div>
                <div className="buttons">
                <Button variant="outlined" color="secondary" className={styles.button}>
                    <Icon className={styles.rightIcon}>av_timer</Icon>
                    {this.props.clockState=='STOPPED'?<strong>{Math.floor(this.props.sessionTime / 60)} min, {this.props.sessionTime % 60} sec</strong>:<strong>{Math.floor(this.state.secondsRemaining / 60)} min, {this.state.secondsRemaining % 60} sec</strong>}
                </Button>
                </div>
                <div className="buttons">

                <Button id={'exit'} variant="outlined" color="inherit" onClick={() => {
                    this.pause(); this.props.onPauseSession();
                    swal("Quitter la session", " Êtes vous certain de vouloir mettre fin à la session ?", {
                        buttons: {
                            cancel: { text: "Non", closeModal: true, },
                            non: {
                                text: "Non",
                                value: "non",

                            },
                            oui: {
                                text: "Oui",
                                value: "oui",

                            }
                        },
                        icon: "warning",
                    }).then((value) => {
                        if (value == "oui") {
                           //end the session
                        //    this.pause();
                           this.stop();
                        //    this.props.onEndSession();
                           this.props.history.push('/viewcases');

                        }
                        else if (value =="non") {
                            //restart the session
                            // this.resume();
                                // this.props.onResumeSession();
                                
                                // this.props.onSetClockState('STARTED');
                        }
                        else {
                            //restart the session
                            // this.resume();
                                // this.props.onResumeSession();
                                // this.props.onSetClockState('STARTED');
                        }
                    })
                    

                }}
                        className={styles.button}>

                    <Icon className={styles.rightIcon}>close</Icon>
                    <strong> Quitter le cas</strong>
                </Button>
             
                </div>
               
                
            </div>
        );
    }
}

Remote.defaultProps = {
    sessionTime: 600,
  };
Remote.propTypes = {
    sessionTime: PropTypes.number,
};

export default withStyles(styles)(Remote);
