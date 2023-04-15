import ExternatsGeriatry from '../ExternatsGeriatry';
import ExternatsPsycho from '../ExternatsPsycho';
import ExternatsSurgery from '../ExternatsSurgery';
import createIndex from '../../../modules/server/create-index';

createIndex(ExternatsGeriatry, { owner: 1 });
createIndex(ExternatsPsycho, { owner: 1 });
createIndex(ExternatsSurgery, { owner: 1 });