import { applyMiddleware, combineReducers, createStore } from 'redux';

import { apiMiddleware } from 'redux-api-middleware';
import caseReducer from './reducers/case';
import placesReducer from './reducers/places';
import sessionReducer from './reducers/session';
import usersReducer from './reducers/users';

const rootReducer = combineReducers({
    places: placesReducer,  
    session: sessionReducer,  
    cases: caseReducer,  
    users: usersReducer
});

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
const configureStore = () => {
   return createStoreWithMiddleware(rootReducer);
};

export default configureStore;
