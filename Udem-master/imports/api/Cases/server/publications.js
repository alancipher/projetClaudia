import Cases from '../Cases';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('cases.admin', function documents() {
  return Cases.find();
});

Meteor.publish('cases.author', function documents() {
    return Cases.find({ owner: this.userId });
});

Meteor.publish('cases.posted', function documents() {
  return Cases.find({ posted :true});
});

// Note: cases.view is also used when editing an existing case.
Meteor.publish('cases.view.public', function documentsView(caseId) {
  check(caseId, String);
  return Cases.find({ _id: caseId , posted:true});
});

// Note: cases.view is also used when editing an existing case.
Meteor.publish('cases.view.admin', function documentsView(caseId) {
  check(caseId, String);
  return Cases.find({ _id: caseId });
});


// Note: cases.view is also used when editing an existing case.
Meteor.publish('cases.view', function documentsView(caseId) {
  check(caseId, String);
  return Cases.find({ _id: caseId, owner: this.userId, posted:false });
});
