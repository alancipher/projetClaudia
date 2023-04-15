import ExternatDocuments from '../ExternatDocuments';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// gets the documents the user own in order or newest to oldest doc
Meteor.publish('externats-documents', function documents() {
  return ExternatDocuments.find({ owner: this.userId },{sort : {createdAt:1}});
});


/**
 * PUBLIC
 */
// see all posted cases 

Meteor.publish('externats-documents.posted', function documents() {
  return ExternatDocuments.find({ posted :true});
});

// see a specific case that fas been posted 
Meteor.publish('externats-documents.view.public', function documentsView(caseId) {
  check(caseId, String);
  return ExternatDocuments.find({ _id: caseId , posted:true});
});


/**
 * FOR EDITORS 
 * can see what they made 
 * cannot see cases that they made but are currently posted 
 */

//for an editor to see a specific case hes made but hasnt posted yet

// for an editor to view a specific case hes made
Meteor.publish('externats-documents.view', function documentsView(documentId) {
  check(documentId, String);
  return ExternatDocuments.find({ _id: documentId, owner: this.userId });
});
/**
 * FOR ADMINISTRATORS
 * can see any case ever made
 */

//  for the admin to see all the cases made ever
Meteor.publish('externats-documents.admin', function documents() {
  return ExternatDocuments.find();
});


// for admin to see a case by _id
Meteor.publish('externats-documents.view.admin', function documentsView(caseId) {
  check(caseId, String);
  return ExternatDocuments.find({ _id: caseId });
});
