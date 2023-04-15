import './Cases.scss';

import { Alert, Button, Table } from 'react-bootstrap';
import { monthDayYearAtTime, timeago } from '../../../modules/dates';

import { Bert } from 'meteor/themeteorchef:bert';
import CasesCollection from '../../../api/Cases/Cases';
import Externats from '../../components/Cases/Externats';
import General from '../../components/Cases/General';
import Grow from '@material-ui/core/Grow';
import Loading from '../../components/Loading/Loading';
import { Meteor } from 'meteor/meteor';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { Typography } from '@material-ui/core';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';

// FIXME ready for styling 



const Cases = ({
  loading, cases, match, history, ...props
}) => (!loading ? (
  <div className="Cases">
  <div className="page-header clearfix">
  <h4 className="pull-left">Mes Documents</h4>
  <Button className="pull-right" href="/createCase-menu" variant="fab" color="#303f9f" >
        Créer un cas  <i className="fa fa-pencil" />
      </Button>
  </div>
   
  
      <General history={history} {...props} />
   
   
      <Externats history={history} {...props} />
  

  </div>
) : <Loading />);

Cases.propTypes = {
  loading: PropTypes.bool.isRequired,
  cases: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('cases.author');
  return {
    loading: !subscription.ready(),
    cases: CasesCollection.find().fetch(),

  };
})(Cases);
