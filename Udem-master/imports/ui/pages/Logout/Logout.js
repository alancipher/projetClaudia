import './Logout.scss';

import {Button, Col, ControlLabel, FormGroup, Row} from 'react-bootstrap';

import Card from '@material-ui/core/Card';
import { CardContent } from '../../../../node_modules/@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Icon from '../../components/Icon/Icon';
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React from 'react';

class Logout extends React.Component {
  componentDidMount() {
    Meteor.logout(() => this.props.setAfterLoginPath(null));
  }

  render() {
    return (
      <div className="logout">
          <Card className="cardLogout">
            <CardHeader align="center" title={<img
                src="img/aeemum.png"
                alt="AEEMUM"
                />} subheader="À la prochaine!"/>
            
            <CardContent className="contentLogout">
              <Link to ="/login"><Button type="submit">Connexion</Button></Link>
              <Link to ="/signup"><Button type="submit">Inscription</Button></Link>
           
            </CardContent>
          </Card>
      </div>
    );
  }
}

Logout.propTypes = {
  setAfterLoginPath: PropTypes.func.isRequired,
};

export default Logout;
