import './VerifyEmailAlert.scss';

import { Alert, Button } from 'react-bootstrap';

import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React from 'react';

//FIXME can be styled if you want to see it set your account object to email verified false

const handleResendVerificationEmail = (emailAddress) => {
  Meteor.call('users.sendVerificationEmail', (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      swal(`Vérifier la boîte de réception de  ${emailAddress} pour le lien de confirmation.`,{icon: 'success'});
    }
  });
};

const VerifyEmailAlert = ({ userId, emailVerified, emailAddress }) => (
  userId && !emailVerified ? (
    <div className="VerifyEmailAlert ">
      <Alert className="verify-email center-align ">
        <p>Bonjour ! Pouvez-vous <strong>confirmer</strong> que ({emailAddress}) est bien à vous?</p>
          <Button onClick={() => handleResendVerificationEmail(emailAddress)} href="#">
               Renvoyer le courriel de confirmation
          </Button>
      </Alert>
    </div>
  ) : null
);

VerifyEmailAlert.propTypes = {
  userId: PropTypes.string.isRequired,
  emailVerified: PropTypes.bool.isRequired,
  emailAddress: PropTypes.string.isRequired,
};

export default VerifyEmailAlert;
