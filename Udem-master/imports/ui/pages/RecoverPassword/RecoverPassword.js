import { Alert, Button, Col, ControlLabel, FormGroup, Row } from 'react-bootstrap';

import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import autoBind from 'react-autobind';
import validate from '../../../modules/validate';

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Adresse courriel',
          email: 'Est-ce la bonne adresse courriel?',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;
    const email = form.emailAddress.value;

    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(`Vérifier l'adresse courriel ${email} pour réinitialiser votre mot de passe`, 'success');
        history.push('/login');
      }
    });
  }

  render() {
    return (
      <div className="RecoverPassword">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h4 className="page-header">Récupérer votre mot de passe</h4>
            <Alert bsStyle="info">
              Entrer votre adresse courriel afin de recevoir le lien pour réinitialiser votre mot de passe.
            </Alert>
            <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              <FormGroup>
                <ControlLabel>Adresse courriel</ControlLabel>
                <input
                  type="email"
                  name="emailAddress"
                  className="form-control"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success">Récupérer votre mot de passe</Button>
              <AccountPageFooter>
                <p>Vous vous souvenez de votre mot de passe? <Link to="/login">Connecter</Link>.</p>
              </AccountPageFooter>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

RecoverPassword.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RecoverPassword;
