import { Match, check } from 'meteor/check';

import ExternatDocuments from './ExternatDocuments';
import { Meteor } from 'meteor/meteor';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'externats-documents.insert': function documentsInsert(doc) {
    console.log('DOCUMENT Externat');
    console.log(doc);
    check(doc,Match.Maybe(Object) );

    try {
      
      return ExternatDocuments.insert({ owner: this.userId, createdAt: new Date() , updatedAt: new Date() ,caseId: doc.caseDoc._id, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'externats-documents.update': function documentsUpdate(doc) {
    check(doc, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const documentId = doc._id;
      
      ExternatDocuments.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'externats-documents.remove': function documentsRemove(documentId) {
    check(documentId, String);

    try {
      return ExternatDocuments.remove(documentId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'externats-documents.insert',
    'externats-documents.update',
    'externats-documents.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
