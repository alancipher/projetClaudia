import CaseEditor from '../../components/CaseEditor/CaseEditor';
import Cases from '../../../api/Cases/Cases';
import { Meteor } from 'meteor/meteor';
import NotFound from '../NotFound/NotFound';
import PropTypes from 'prop-types';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

const EditCase = ({ sessionCase , history , ...props}) => (sessionCase ? (
  <div className="EditCase">
    <CaseEditor sessionCase={sessionCase} history={history} {...props} />
  </div>
) : <NotFound />);

EditCase.defaultProps = {
  doc: null,
};

EditCase.propTypes = {
  sessionCase: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('cases.view.admin', documentId);

  return {
    loading: !subscription.ready(),
    sessionCase: Cases.findOne({_id:documentId}),
  };
})(EditCase);
