import { Alert, Button, Table } from 'react-bootstrap';
import { monthDayYearAtTime, timeago } from '../../../modules/dates';

import { Bert } from 'meteor/themeteorchef:bert';
import ExternatsGeriatry from '../../../api/Externats/ExternatsGeriatry';
import ExternatsPsycho from '../../../api/Externats/ExternatsPsycho';
import ExternatsSurgery from '../../../api/Externats/ExternatsSurgery';
import Fade from '@material-ui/core/Fade';
import Loading from '../../components/Loading/Loading';
import { Meteor } from 'meteor/meteor';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import swal from 'sweetalert';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';

// FIXME ready for styling 
const styles = theme => ({
    root: {
      height: 180,
    },
    container: {
      display: 'flex',
    },
    paper: {
      margin: theme.spacing.unit,
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
  });
 
  
const handleRemovePsych = (caseId) => {
  if (confirm('Êtes vous sûr de vouloir suprimer ce cas clinique ?')) {
    Meteor.call('externatsPsychiatry.remove', caseId, (error) => {
      if (error) {
        swal(error.reason, { icon:'error'});
      } else {
        swal('Le cas clinique à été supprimé.', { icon:'success'});
      }
    });
  }
};
const handleRemoveGeriatry = (caseId) => {
  if (confirm('Êtes vous sûr de vouloir suprimer ce cas clinique ?')) {
    Meteor.call('externatsGeriatry.remove', caseId, (error) => {
      if (error) {
        swal(error.reason, { icon:'error'});
      } else {
        swal('Le cas clinique à été supprimé.', { icon:'success'});
      }
    });
  }
};

const handleRemoveSurgery = (caseId) => {
  if (confirm('Êtes vous sûr de vouloir suprimer ce cas clinique ?')) {
    Meteor.call('externatsSurgery.remove', caseId, (error) => {
      if (error) {
        swal(error.reason, { icon:'error'});
      } else {
        swal('Le cas clinique à été supprimé.', { icon:'success'});
      }
    });
  }
};


class Externats extends React.Component {
    state = {
        checked: true,
      };
    
      handleChange = () => {
        this.setState(state => ({ checked: !state.checked }));
      };
    
    render() {
        const {  loading, cases1,cases2,cases3, match, history, classes} = this.props;
        
        const { checked } = this.state;

       
        return (!loading ? (
            <div className="Externats">
              <div className="page-header clearfix">
                <h4 className="pull-left">Externats</h4>
              
                <Switch   className="pull-right" checked={checked} onChange={this.handleChange} aria-label="Collapse" />
              </div>
              {(cases1.length || cases2.length ||cases3.length) ?
              <Fade in={checked}>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Système</th>
                      <th>Dèrnières modifications</th>
                      <th>Créer le</th>
                      <th />
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {cases1.map(({
                      _id, gabarit, createdAt, updatedAt,type
                    }) => (
                      <tr key={_id}>
                        <td>{type}</td>
                        <td>il y a {timeago(updatedAt)}</td>
                        <td>{monthDayYearAtTime(createdAt)}</td>
                        <td>
                          <Button
                            onClick={() => history.push(`externat-${type.toLowerCase()}/${_id}`)}
                            block
                          >
                              <i className="fa fa-eye" aria-hidden="true" />
                          </Button>
                        </td>
                        <td>
                          <Button
                            bsStyle="danger"
                            onClick={() => handleRemovePsych(_id )}
                            block
                          >
                              <i className="fa fa-trash" aria-hidden="true" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                     {cases2.map(({
                      _id, gabarit, createdAt, updatedAt,type
                    }) => (
                      <tr key={_id}>
                        <td>{type}</td>
                        <td>il y a {timeago(updatedAt)}</td>
                        <td>{monthDayYearAtTime(createdAt)}</td>
                        <td>
                          <Button
                            onClick={() => history.push(`externat-${type.toLowerCase()}/${_id}`)}
                            block
                          >
                              <i className="fa fa-eye" aria-hidden="true" />
                          </Button>
                        </td>
                        <td>
                          <Button
                            bsStyle="danger"
                            onClick={() => handleRemoveGeriatry(_id)}
                            block
                          >
                              <i className="fa fa-trash" aria-hidden="true" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                     {cases3.map(({
                      _id, gabarit, createdAt, updatedAt,type
                    }) => (
                      <tr key={_id}>
                        <td>{type}</td>
                        <td>il y a {timeago(updatedAt)}</td>
                        <td>{monthDayYearAtTime(createdAt)}</td>
                        <td>
                          <Button
                            onClick={() => history.push(`externat-${type.toLowerCase()}/${_id}`)}
                            block
                          >
                              <i className="fa fa-eye" aria-hidden="true" />
                          </Button>
                        </td>
                        <td>
                          <Button
                            bsStyle="danger"
                            onClick={() => handleRemoveSurgery(_id)}
                            block
                          >
                              <i className="fa fa-trash" aria-hidden="true" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table></Fade> : <Alert bsStyle="warning">Vous n'avez pas encore créé de cas clinique!</Alert>}
            </div>
          ) : <Loading />)
    }
}




Externats.propTypes = {
  loading: PropTypes.bool.isRequired,
  cases1: PropTypes.arrayOf(PropTypes.object).isRequired,
  cases2: PropTypes.arrayOf(PropTypes.object).isRequired,
  cases3: PropTypes.arrayOf(PropTypes.object).isRequired,
  // match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object,
  theme: PropTypes.object,
};

const Externats2 = withStyles(styles)(Externats);

export default withTracker(() => {
  const subscription1 = Meteor.subscribe('externatsPsycho.author');
  const subscription2 = Meteor.subscribe('externatsGeriatry.author');
  const subscription3 = Meteor.subscribe('externatsSurgery.author');
  return {
    loading: !subscription1.ready() && !subscription2.ready() && !subscription3.ready(),
    cases1: ExternatsPsycho.find().fetch(),
    cases2: ExternatsGeriatry.find().fetch(),
    cases3: ExternatsSurgery.find().fetch(),

  }; 
})(Externats2);
