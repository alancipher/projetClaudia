import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import OAuthLoginButton from '../OAuthLoginButton/OAuthLoginButton';

import './OAuthLoginButtons.scss';

const OAuthLoginButtons = ({emailMessage }) => (
  <div className={`OAuthLoginButtons ${emailMessage ? 'WithEmailMessage' : ''}`}>
    {emailMessage ?
      <p className="EmailMessage" style={{ marginLeft: `-${emailMessage.offset}px` }}>
        {emailMessage.text}
      </p> : ''}
  </div>
);

OAuthLoginButtons.propTypes = {
  emailMessage: PropTypes.object.isRequired,
};

// const verificationComplete = new ReactiveVar(false);
// const verifiedServices = new ReactiveVar([]);

export default OAuthLoginButtons;
