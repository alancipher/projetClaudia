import Button from '@material-ui/core/Button';
import DoctorContext from './doctorContext';
import Externats from '../../../../api/Externats/ExternatsPsycho';
import Grid from '@material-ui/core/Grid';
import {Meteor} from 'meteor/meteor';
import NotFound from '../../../pages/NotFound/NotFound';
import Paper from '@material-ui/core/Paper';
import PatientContext from './patientContext';
import Play from './Play';
import PropTypes from 'prop-types';
import React from 'react';
import Revision from './Revision';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {withTracker} from 'meteor/react-meteor-data';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    visible: {
        // visibility: 'visible',
    },
    hidden: {
        display: 'none',
    }
});
 

const Session = ({...props}) => {
    switch (props.sessionPage){
       case 1:
        return ((props.sessionCase  ?  <DoctorContext {...props} /> : <NotFound/>) );
        case 2:
        return ((props.sessionCase  ?  <PatientContext {...props} /> : <NotFound/>) );
        case 3:
        return ((props.sessionCase  ?  <Revision {...props} /> : <NotFound/>) );
        case 4:
        return ((props.sessionCase  ?  <Play {...props} /> : <NotFound/>) );
        default:
        return ((props.sessionCase  ?  <DoctorContext {...props} /> : <NotFound/>) );
    }
 
    
    }


        Session.propTypes = {
        // sessionCase: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        sessionPage: PropTypes.number.isRequired,
    };

        export default withTracker(({match}) => {
        const documentId = match.params._id;
        const subscription = Meteor.subscribe('externatsPsycho.view.public', documentId);

        return {
        loading: !subscription.ready(),
        sessionCase: Externats.findOne(documentId),
    };
    })(Session);
