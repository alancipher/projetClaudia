import Chirurgie from './Schemas/Chirurgies';
import Geriatry from './Schemas/Geriatry';
import Gynecos from './Schemas/Gynecos';
import {Mongo} from 'meteor/mongo';
import Ophtalmo from './Schemas/Ophtalmo';
import Pediatry from './Schemas/Pediatry';
import Psychos from './Schemas/Psychos';

// import schemas


const ExternatsSurgery = new Mongo.Collection('ExternatsSurgery');

ExternatsSurgery.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

ExternatsSurgery.deny({
    insert: () => false,
    update: () => true,
    remove: () => true,
});


 
 
ExternatsSurgery.attachSchema(Chirurgie);

export default ExternatsSurgery; 