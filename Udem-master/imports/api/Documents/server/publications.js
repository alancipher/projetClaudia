import Documents from '../Documents';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('documents.admin', function documents() {
  return Documents.find();
});

Meteor.publish('documents', function documents() {
  return Documents.find({ owner: this.userId },{sort : {createdAt:1}});
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('documents.view', function documentsView(documentId) {
  check(documentId, String);
  return Documents.find({ _id: documentId, owner: this.userId });
});
