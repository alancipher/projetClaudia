import {Mongo} from 'meteor/mongo';
import Psychos from './Schemas/Psychos';

// import schemas


const ExternatsPsycho = new Mongo.Collection('ExternatsPsycho');
 

ExternatsPsycho.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

ExternatsPsycho.deny({
    insert: () => false,
    update: () => true,
    remove: () => true,
});

 ExternatsPsycho.attachSchema(Psychos);
export default ExternatsPsycho; 
 