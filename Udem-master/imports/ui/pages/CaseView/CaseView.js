import './CaseView.scss';

import { monthDayYearAtTime, timeago } from '../../../modules/dates';

import { Alert } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CasesCollection from '../../../api/Cases/Cases';
import Documents from '../../../api/Documents/Documents';
import Grid from '@material-ui/core/Grid';
import Loading from '../../components/Loading/Loading';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React from 'react';
import Search from '../../components/Search/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

// import SearchField from './searchfield';





//this is the page where they see all the cases and can query through them

const styles = {
    root: {
        flexGrow: 1,
        flex: 1,
        alignItems: 'center',
    },
    flex: {
        flex: 1,

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
};

const setCaseId = (id) => {
    //   this function calls the dispatcher for the case atribute of the caseId state variable

}

const CaseView = ({ loading, cases, sessions, systemeArray, searchArray, match, history, ...props }) => (!loading ? (
    <div className="Cases">

        <div style={styles.header} className='caseview-header clearfix'>
            <div className='search'>
                <Search {...props} />
            </div>
        </div>
        <div className={'page-header'} style={styles.flex}>
            <h4 className="pull-left">Cas cliniques</h4>
            <Button className='pull-right' size="small" color={'default'} onClick={() => {
                var randomCase = searchArray[Math.floor(Math.random() * searchArray.length)];
                props.onSessionCaseAdded(randomCase); props.onSetSessionPage(1); console.log("session page is :" + props.sessionPage); history.push(`/session/${randomCase._id}`);
            }}>Choisir un cas au hasard</Button>
        </div>
        {searchArray ?
            <div style={styles.root}>
                <p><br />{searchArray.length} cas clinique(s) correspondent à votre recherche</p>
                {systemeArray.map((systeme, index) => (
                    <div key={index} >{searchArray.filter(caseDoc => { return caseDoc.gabarit.systeme == systeme }).length > 0 ?
                        <div className={'page-header'} style={styles.flex}>
                            <h5 className="pull-left">{systeme}</h5>
                        </div> : ''
                    }

                        <div className="iist-cases">

                            {searchArray.filter(caseDoc => { return caseDoc.gabarit.systeme == systeme }).map(({ _id, gabarit, createdAt, updatedAt, ...caseDoc }) => (
                                <div key={_id} className="case-card">
                                    <Card >
                                        <CardContent>
                                            <Typography style={styles.title} color="primary">
                                                {gabarit.nom} , {gabarit.age} ans
                                             </Typography>
                                             <Typography style={styles.title} color="secondary">
                                                {gabarit.reason} 
                                             </Typography>
                                        </CardContent>

                                        <div>{sessions.filter(function (sessionCase) {  return sessionCase.caseId == _id; }).length > 0 ? <div className="case-card-action">
                                                <Button size="small" color={'primary'} onClick={() => { history.push(`/recap/${sessions.filter(function (sessionCase) {  return sessionCase.caseId == _id; })[0]._id}`); }}>Resultat</Button>
                                                <Button size="small" color={'secondary'} onClick={() => { props.onSessionCaseAdded(caseDoc); props.onSetSessionPage(1); console.log("session page is :" + props.sessionPage); history.push(`/session/${_id}`); }}>Refaire le cas</Button>
                                            </div> : <Button size="small" color={'secondary'} onClick={() => { props.onSessionCaseAdded(caseDoc); props.onSetSessionPage(1); console.log("session page is :" + props.sessionPage); history.push(`/session/${_id}`); }}>Faire le cas</Button>}</div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            : <Alert bsStyle="warning">Il n'y a pas encore de cas cliniques a essayer</Alert>
        }
    </div>
) : <Loading />);

CaseView.propTypes = {
    loading: PropTypes.bool.isRequired,
    cases: PropTypes.arrayOf(PropTypes.object).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withTracker(() => {
    const subscription = Meteor.subscribe('cases.posted');
    const subscription2 = Meteor.subscribe('documents');


    return {
        loading: !subscription.ready() && !subscription2.ready(),
        cases: CasesCollection.find().fetch(),
        sessions: Documents.find().fetch(),

    };
})(CaseView);
