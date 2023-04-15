import React, { Component } from 'react';

import Externats from '../../../../api/Externats/ExternatsGeriatry';
import {Meteor} from 'meteor/meteor';
import Remote from '../Remote';
import Session from './Session'
import {withTracker} from 'meteor/react-meteor-data';

// FIXME session page ready for styling 
const SessionPage = ({...props}) => { 
 
  return( <div> <Remote {...props}/> <Session {...props}/></div>);
};



  export default withTracker(({match}) => {
    const documentId = match.params._id;
    const subscription = Meteor.subscribe('externatsGeriatry.view.public', documentId);


    return {
    loading: !subscription.ready(),
    sessionCase: Externats.findOne(documentId),
};
})(SessionPage);
  