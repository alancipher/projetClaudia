/* eslint-disable consistent-return */

import Externats from '../Externats/ExternatsPsycho';
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const ExternatDocuments = new Mongo.Collection('ExternatDocuments');


ExternatDocuments.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

ExternatDocuments.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
});


export default ExternatDocuments;
 