import Chirurgie from './Schemas/Chirurgies';
import Geriatry from './Schemas/Geriatry';
import Gynecos from './Schemas/Gynecos';
import {Mongo} from 'meteor/mongo';
import Ophtalmo from './Schemas/Ophtalmo';
import Pediatry from './Schemas/Pediatry';
import Psychos from './Schemas/Psychos';

// import schemas


const ExternatsGeriatry = new Mongo.Collection('ExternatsGeriatry ');

ExternatsGeriatry .allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
});

ExternatsGeriatry .deny({
    insert: () => false,
    update: () => true,
    remove: () => true,
});


// attach multiple schemas

ExternatsGeriatry.attachSchema(Geriatry);
export default ExternatsGeriatry ; 