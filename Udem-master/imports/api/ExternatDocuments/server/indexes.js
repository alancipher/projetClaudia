import ExternatDocuments from '../ExternatDocuments';
import createIndex from '../../../modules/server/create-index';

createIndex(ExternatDocuments, { owner: 1 });
