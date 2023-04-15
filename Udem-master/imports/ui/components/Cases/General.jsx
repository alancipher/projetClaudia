import { Alert, Button, Table } from 'react-bootstrap';
import { monthDayYearAtTime, timeago } from '../../../modules/dates';

import { Bert } from 'meteor/themeteorchef:bert';
import Fade from '@material-ui/core/Fade';
import GeneralCollection from '../../../api/Cases/Cases';
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
 
  
const handleRemove = (caseId) => {
  if (confirm('Êtes vous sûr de vouloir suprimer ce cas clinique ?')) {
    Meteor.call('cases.remove', caseId, (error) => {
      if (error) {
        swal(error.reason, { icon:'error'});
      } else {
        swal('Le cas clinique à été supprimé.', { icon:'success'});
      }
    });
  }
};

class General extends React.Component {
    state = {
        checked: true,
      };
    
      handleChange = () => {
        this.setState(state => ({ checked: !state.checked }));
      };
    
    render() {
        const {  loading, cases, match, history, classes} = this.props;
       
        const { checked } = this.state;
       
        return (!loading ? (
            <div className="General">
              <div className="page-header clearfix">
                <h4 className="pull-left">Cas cliniques</h4>
                <Switch className="pull-right" checked={checked} onChange={this.handleChange} aria-label="Collapse" />
              </div>
              {cases.length ?
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
                    {cases.map(({
                      _id, gabarit, createdAt, updatedAt,
                    }) => (
                      <tr key={_id}>
                        <td>{gabarit.systeme}</td>
                        <td>il y a {timeago(updatedAt)}</td>
                        <td>{monthDayYearAtTime(createdAt)}</td>
                        <td>
                          <Button
                            onClick={() => history.push(`cases/${_id}`)}
                            block
                          >
                              <i className="fa fa-eye" aria-hidden="true" />
                          </Button>
                        </td>
                        <td>
                          <Button
                            bsStyle="danger"
                            onClick={() => handleRemove(_id)}
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




General.propTypes = {
  loading: PropTypes.bool.isRequired,
  cases: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object,
  theme: PropTypes.object,
};

const General2 = withStyles(styles)(General);

export default withTracker(() => {
  const subscription = Meteor.subscribe('cases.author');
  return {
    loading: !subscription.ready(),
    cases: GeneralCollection.find().fetch(),

  };
})(General2);
