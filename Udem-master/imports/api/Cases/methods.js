import { Match, check } from 'meteor/check';

import Cases from './Cases';
import { Meteor } from 'meteor/meteor';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'cases.insert': function documentsInsert(doc) {
    console.log(doc);
    check(doc, Object);

    try {
      doc.owner = this.userId;
      console.log(doc);
      return Cases.insert(doc);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'cases.update': function documentsUpdate(doc) {
    check(doc, Object);

    try {
      const caseId = doc._id;

      // update the symtoms
      const OtherSystems = doc.otherSystems;
      // doc.otherSystem = null;


      // yes I am lazy , fuck you i had to deploy 3 days ago
      // var currentCase = Cases.findOne({_id:doc._id});

      Meteor.call('cases.remove', caseId, (error, result) => {
        if (error) {
          console.log(error.message);
        } else {
          Cases.insert(doc, (error, result) => {
            Cases.update({ _id: caseId }, {
              $set: {
                createdAt: doc.createdAt,
                owner: doc.owner
              }

            }, { upsert: true });
          });
        }
      });





      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'cases.post': function documentsUpdate(doc) {
    check(doc, Object);

    try {
      const caseId = doc._id;
      Cases.update(caseId, { $set: { updatedAt: doc.updatedAt , posted: true } });
      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'cases.unpost': function documentsUpdate(doc) {
    check(doc, Object);

    try {
      const caseId = doc._id;
      Cases.update(caseId, { $set: { updatedAt: doc.updatedAt ,posted: false } });
      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'cases.remove': function documentsRemove(caseId) {
    check(caseId, String);

    try {
      return Cases.remove(caseId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'cases.insert',
    'cases.update',
    'cases.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
