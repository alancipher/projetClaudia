import './Documents.scss';

import { Alert, Button, Table } from 'react-bootstrap';
import { monthDayYearAtTime, timeago } from '../../../modules/dates';

import { Bert } from 'meteor/themeteorchef:bert';
import Documents from '../../../api/Documents/Documents';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { Meteor } from 'meteor/meteor';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withTracker } from 'meteor/react-meteor-data';

class DocumentsComponent extends React.Component{
  constructor(props) {
    super(props);
    // autoBind(this);
}

getMissedImportantQuestion(){


  var missedQuestions = [];
 const doc = this.props.document.caseDoc.otherSystems.map((system,index)=>(
   console.log(system)
  ));
}
componentDidMount(){
  // this.getMissedImportantQuestion();

  console.log(this.props.document);
}
  render(){
    const {loading} = this.props;
    return (!loading ? <div>
<Paper>
  <Typography>Salut jnjkjn</Typography>
</Paper>
    </div>: <Loading />);
  }
}
DocumentsComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  // document: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({match}) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('documents.view',documentId);
  return {
    loading: !subscription.ready(),
    document: Documents.findOne(documentId),
  };
})(DocumentsComponent);
