//this is where it's going to evaluate any action commited like starting a session or ending a session

import { SET_USERS, SET_USERSEARCHARRAY } from '../actions/types';

import { Meteor } from 'meteor/meteor';

const initialState = {
    // usersArray: null,
    // selectedCaseDoc: null
  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
    
      case SET_USERS:
      
      return {
          ...state,
          usersArray: action.payload,
          searchArray: action.payload,
          emailsArray: action.emailsArray,
         

      };
      
      case SET_USERSEARCHARRAY:
      // console.log('about to return search array');
      return {
        ...state,
        searchArray: action.payload,

      }
      default:
      // console.log("in default")
      return state;

    }
  };
  
  export default usersReducer;