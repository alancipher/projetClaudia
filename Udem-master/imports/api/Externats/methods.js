import { Match, check } from 'meteor/check';

import ExternatsGeriatry from './ExternatsGeriatry';
import ExternatsPsycho from './ExternatsPsycho';
import ExternatsSurgery from './ExternatsSurgery';
import { Meteor } from 'meteor/meteor';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'externatsGeriatry.insert': function documentsInsert(doc,type) {
    console.log(doc);
    
    check(doc, Object);
    check(type, String);
    try {
      doc.owner = this.userId;
      console.log("type is "+type)
      console.log(doc);
      doc.type = type;
      return ExternatsGeriatry.insert(doc );
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'externatsGeriatry.update': function documentsUpdate(doc,type) {
    check(doc, Object);
    check(type, String);
    try {
      const caseId = doc._id;


      // doc.otherSystem = null;


      // yes I am lazy , fuck you i had to deploy 3 days ago
      // var currentCase = Externats.findOne({_id:doc._id});

      Meteor.call('externatsGeriatry.remove', caseId, (error, result) => {
        if (error) {
          console.log(error.message);
        } else {
        
          ExternatsGeriatry.insert({owner: doc.owner,...doc} , (error, result) => {
         if(error){
           console.log(error);
         }
          });
        }
      });





      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'externatsGeriatry.post': function documentsUpdate(doc) {
    check(doc, Object);

    try {
      const caseId = doc._id;
      ExternatsGeriatry.update(caseId, { $set: { updatedAt: doc.updatedAt , posted: true } });
      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'externatsGeriatry.unpost': function documentsUpdate(doc) {
    check(doc, Object);

    try {
      const caseId = doc._id;
      ExternatsGeriatry.update(caseId, { $set: { updatedAt: doc.updatedAt ,posted: false } });
      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'externatsGeriatry.remove': function documentsRemove(caseId) {
    check(caseId, String);

    try {
      return ExternatsGeriatry.remove(caseId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'externatsPsychiatry.insert': function documentsInsert(doc,type) {
    console.log(doc);
    
    check(doc, Object);
    check(type, String);
    try {
      doc.owner = this.userId;
      console.log("type is "+type)
      console.log(doc);
      doc.type = type;
      return ExternatsPsycho.insert(doc );
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'externatsPsychiatry.update': function documentsUpdate(doc,type) {
    check(doc, Object);
    check(type, String);
    try {
      const caseId = doc._id;


      // doc.otherSystem = null;


      // yes I am lazy , fuck you i had to deploy 3 days ago
      // var currentCase = Externats.findOne({_id:doc._id});

      Meteor.call('externatsPsychiatry.remove', caseId, (error, result) => {
        if (error) {
          console.log(error.message);
        } else {
        
          ExternatsPsycho.insert({owner: doc.owner,...doc} , (error, result) => {
         if(error){
           console.log(error);
         }
          });
        }
      });





      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'externatsPsychiatry.post': function documentsUpdate(doc) {
    check(doc, Object);

    try {
      const caseId = doc._id;
      ExternatsPsycho.update(caseId, { $set: { updatedAt: doc.updatedAt , posted: true } });
      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'externatsPsychiatry.unpost': function documentsUpdate(doc) {
    check(doc, Object);

    try {
      const caseId = doc._id;
      ExternatsPsycho.update(caseId, { $set: { updatedAt: doc.updatedAt ,posted: false } });
      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'externatsPsychiatry.remove': function documentsRemove(caseId) {
    check(caseId, String);

    try {
      return ExternatsPsycho.remove(caseId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'externatsSurgery.insert': function documentsInsert(doc,type) {
    console.log(doc);
    
    check(doc, Object);
    check(type, String);
    try {
      doc.owner = this.userId;
      console.log("type is "+type)
      console.log(doc);
      doc.type = type;
      return ExternatsSurgery.insert(doc );
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'externatsSurgery.update': function documentsUpdate(doc,type) {
    check(doc, Object);
    check(type, String);
    try {
      const caseId = doc._id;


      // doc.otherSystem = null;


      // yes I am lazy , fuck you i had to deploy 3 days ago
      // var currentCase = Externats.findOne({_id:doc._id});

      Meteor.call('externatsSurgery.remove', caseId, (error, result) => {
        if (error) {
          console.log(error.message);
        } else {
        
          ExternatsSurgery.insert({owner: doc.owner,...doc} , (error, result) => {
         if(error){
           console.log(error);
         }
          });
        }
      });





      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'externatsSurgery.post': function documentsUpdate(doc) {
    check(doc, Object);

    try {
      const caseId = doc._id;
      ExternatsSurgery.update(caseId, { $set: { updatedAt: doc.updatedAt , posted: true } });
      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'externatsSurgery.unpost': function documentsUpdate(doc) {
    check(doc, Object);

    try {
      const caseId = doc._id;
      ExternatsSurgery.update(caseId, { $set: { updatedAt: doc.updatedAt ,posted: false } });
      return caseId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },

  'externatsSurgery.remove': function documentsRemove(caseId) {
    check(caseId, String);

    try {
      return ExternatsSurgery.remove(caseId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'externatsSurgery.insert',
    'externatsSurgery.update',
    'externatsSurgery.remove',
    'externatsGeriatry.insert',
    'externatsGeriatry.update',
    'externatsGeriatry.remove',
    'externatsPsychiatry.insert',
    'externatsPsychiatry.update',
    'externatsPsychiatry.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
