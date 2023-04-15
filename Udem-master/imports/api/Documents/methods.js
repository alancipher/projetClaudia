import { Match, check } from 'meteor/check';

import Documents from './Documents';
import { Meteor } from 'meteor/meteor';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'documents.insert': function documentsInsert(doc) {
    console.log('DOCUMENT');
    console.log(doc);
    check(doc,{caseDoc: Match.Maybe(Object),lastScore: Match.Maybe(Number) , lastCase:Match.Maybe(Object) } );

    try {
      
      return Documents.insert({ owner: this.userId, createdAt: new Date() , updatedAt: new Date() ,caseId: doc.caseDoc._id, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'documents.update': function documentsUpdate(doc) {
    check(doc, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const documentId = doc._id;
      
      Documents.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'documents.remove': function documentsRemove(documentId) {
    check(documentId, String);

    try {
      return Documents.remove(documentId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'documents.insert',
    'documents.update',
    'documents.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
