import ExternatsGeriatry from '../ExternatsGeriatry';
import ExternatsPsycho from '../ExternatsPsycho';
import ExternatsSurgery from '../ExternatsSurgery';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

/**
 * PUBLIC
 */
// gets all the posted cases
Meteor.publish('externatsSurgery.posted', function documents() {
  return ExternatsSurgery.find({ posted :true});
});

// gets a specific posted case
Meteor.publish('externatsSurgery.view.public', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsSurgery.find({ _id: caseId , posted:true});
});

// get the case the current user has made that havent been posted 
Meteor.publish('externatsSurgery.view.edit', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsSurgery.find({ _id: caseId,  posted:false });
});

Meteor.publish('externatsSurgery.view', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsSurgery.find({ _id: caseId });
});



/**
 * EDITOR
 */
// gets the cases the user has created
Meteor.publish('externatsSurgery.author', function documents() {
  return ExternatsSurgery.find({ owner: this.userId , posted: false});
});

// get the case the current user has made that havent been posted 
Meteor.publish('externatsSurgery.view.editor', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsSurgery.find({ _id: caseId, owner: this.userId, posted: false });
});

 /**
 * ADMIN
 */

//  Gets all the cases created ever
Meteor.publish('externatsSurgery.admin', function documents() {
  return ExternatsSurgery.find();
});




// view a specific case
Meteor.publish('externatsSurgery.view.admin', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsSurgery.find({ _id: caseId });
});



/**
 * PUBLIC
 */
// gets all the posted cases
Meteor.publish('externatsPsycho.posted', function documents() {
  return ExternatsPsycho.find({ posted : true});
});

// gets a specific posted case
Meteor.publish('externatsPsycho.view.public', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsPsycho.find({ _id: caseId , posted: true});
});

// get the case the current user has made that havent been posted 
Meteor.publish('externatsPsycho.view.edit', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsPsycho.find({ _id: caseId,  posted: false });
});

Meteor.publish('externatsPsycho.view', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsPsycho.find({ _id: caseId });
});



/**
 * EDITOR
 */
// gets the cases the user has created
Meteor.publish('externatsPsycho.author', function documents() {
  return ExternatsPsycho.find({ owner: this.userId, posted: false });
});

// get the case the current user has made that havent been posted 
Meteor.publish('externatsPsycho.view.editor', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsPsycho.find({ _id: caseId, owner: this.userId, posted:false });
});

 /**
 * ADMIN
 */

//  Gets all the cases created ever
Meteor.publish('externatsPsycho.admin', function documents() {
  return ExternatsPsycho.find();
});




// view a specific case
Meteor.publish('externatsPsycho.view.admin', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsPsycho.find({ _id: caseId });
});



/**
 * PUBLIC
 */
// gets all the posted cases
Meteor.publish('externatsGeriatry.posted', function documents() {
  return ExternatsGeriatry.find({ posted :true});
});

// gets a specific posted case
Meteor.publish('externatsGeriatry.view.public', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsGeriatry.find({ _id: caseId , posted:true});
});

// get the case the current user has made that havent been posted 
Meteor.publish('externatsGeriatry.view.edit', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsGeriatry.find({ _id: caseId,  posted:false });
});

Meteor.publish('externatsGeriatry.view', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsGeriatry.find({ _id: caseId });
});



/**
 * EDITOR
 */
// gets the cases the user has created
Meteor.publish('externatsGeriatry.author', function documents() {
  return ExternatsGeriatry.find({ owner: this.userId , posted: false});
});

// get the case the current user has made that havent been posted 
Meteor.publish('externatsGeriatry.view.editor', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsGeriatry.find({ _id: caseId, owner: this.userId, posted:false });
});

 /**
 * ADMIN
 */

//  Gets all the cases created ever
Meteor.publish('externatsGeriatry.admin', function documents() {
  return ExternatsGeriatry.find();
});




// view a specific case
Meteor.publish('externatsGeriatry.view.admin', function documentsView(caseId) {
  check(caseId, String);
  return ExternatsGeriatry.find({ _id: caseId });
});


