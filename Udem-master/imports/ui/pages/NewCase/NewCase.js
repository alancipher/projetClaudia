import React from 'react';
import PropTypes from 'prop-types';
import CaseEditor from '../../components/CaseEditor/CaseEditor';

const NewCase = ({ history }) => (
  <div className="NewCase">
    <h4 className="page-header">Création de cas cliniques</h4>
    <CaseEditor history={history} />
  </div>
);

NewCase.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewCase;
