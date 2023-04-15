import { Alert, Button, Col, ControlLabel, FormGroup, Row } from 'react-bootstrap';

import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import React from 'react';
import autoBind from 'react-autobind';
import validate from '../../../modules/validate';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        newPassword: {
          required: true,
          minlength: 6,
        },
        repeatNewPassword: {
          required: true,
          minlength: 6,
          equalTo: '[name="newPassword"]',
        },
      },
      messages: {
        newPassword: {
          required: 'Entrer votre nouveau mot de passe',
          minlength: 'S\'il vous plaît avoir un minimum de 6 caractères',
        },
        repeatNewPassword: {
          required: 'Confirmer votre nouveau mot de passe',
          equalTo: 'Les mots de passe ne sont pas pareils. S\'il vous plaît réessayer.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { match, history } = this.props;
    const { token } = match.params;

    Accounts.resetPassword(token, form.newPassword.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        history.push('/viewcases');
      }
    });
  }

  render() {
    return (
      <div className="ResetPassword">
        <Row>
          <Col xs={12}>
            <h4 className="page-header">Réinitialiser votre mot de passe</h4>
            <Alert bsStyle="info">
              Pour réinitialiser votre mot de passe, veuillez l'écrire ci-dessous.
              Vous serez reconnecté avec votre nouveau mot de passe.
            </Alert>
            <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
              <FormGroup>
                <ControlLabel>Nouveau mot de passe</ControlLabel>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  placeholder="Nouveau mot de passe"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Confirmer le nouveau mot de passe</ControlLabel>
                <input
                  type="password"
                  className="form-control"
                  name="repeatNewPassword"
                  placeholder="Confirmer le nouveau mot de passe"
                />
              </FormGroup>
              <Button type="submit" bsStyle="success">Réinitialiser &amp; Connecter</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ResetPassword;
