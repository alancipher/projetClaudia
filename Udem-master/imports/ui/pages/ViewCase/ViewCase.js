import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Cases from '../../../api/Cases/Cases';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import CaseViewAdmin from '../../components/CaseViewAdmin/CaseViewAdmin';

const handleRemove = (caseId, history) => {
  if (confirm('Êtes vous sur de vouloir suprimer ce cas?')) {
    Meteor.call('cases.remove', caseId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Le cas clinique à été supprimé.', 'success');
        history.push('/cases');
      }
    });
  }
};

const renderCase = (doc, match, history) => (doc ? (
  <div className="ViewCase">
    <div className="page-header clearfix">
      <h4 className="pull-left">{ doc && doc.systeme }</h4>
      <ButtonToolbar className="pull-right">
        <ButtonGroup bsSize="small">
          <Button onClick={() => history.push(`${match.url}/edit`)}><i className="fa fa-pencil-square-o" aria-hidden="true" /></Button>
            <Button disabled onClick={() => history.push(`${match.url}/edit`)}> <i className="fa fa-paper-plane" aria-hidden="true" /></Button>
          <Button onClick={() => handleRemove(doc._id, history)} className="text-danger">/
              <i className="fa fa-trash" aria-hidden="true" />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
    <CaseViewAdmin doc={doc} history={history} />
  </div>
) : <NotFound />);

const ViewCase = ({
  loading, doc, match, history,
}) => (
  !loading ? renderCase(doc, match, history) : <Loading />
);

ViewCase.defaultProps = {
  doc: null,
};

ViewCase.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const caseId = match.params._id;
  const subscription = Meteor.subscribe('cases.view', caseId);

  return {
    loading: !subscription.ready(),
    doc: Cases.findOne(caseId),
  };
})(ViewCase);
