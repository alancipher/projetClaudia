//this is where it's going to evaluate any action commited like starting a session or ending a session

import {
  ADD_CASEDOC,
  DELETE_CASEDOC,
  DESELECT_CASEDOC,
  SELECT_CASEDOC,
  SET_ADMINCASES,
  SET_NAMEARRAY,
  SET_REASONARRAY,
  SET_SEARCHARRAY,
  SET_SYSTEMEARRAY,
  SET_USERCASES
} from "../actions/types";

import CasesCollection from '../../../api/Cases/Cases';

const initialState = {
    casesArray: CasesCollection.find().fetch(),
    selectedCaseDoc: null
  };
  
  const caseReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ADMINCASES: 
      return {
          ...state,
          casesArray: action.payload,
          searchArray: action.payload,
      };
      case SET_USERCASES:
      
      return {
          ...state,
          casesArray: action.payload,
          searchArray: action.payload,
          nameArray: action.nameArray,
          systemeArray: action.systemeArray,
          reasonArray: action.reasonArray

      };

      case SET_SEARCHARRAY:
      // console.log('about to return search array');
      return {
        ...state,
        searchArray: action.payload,

      }

      case SET_NAMEARRAY:
      console.log('about to return search array');
      return {
        ...state,
        nameArray: action.payload,

      }
      case SET_SYSTEMEARRAY:
      console.log('about to return systeme array');
      return {
        ...state,
        systemeArray: action.payload,

      }

      case SET_REASONARRAY:
      console.log('about to return reason array');
      return {
        ...state,
        reasonArray: action.payload,

      }
      case ADD_CASEDOC:
        return {
          ...state,
          casesArray: state.casesArray.concat({
            key: Math.random(),
            name: action.caseDocName,
            image: {
              uri:
                "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
            }
          })
        };
      case DELETE_CASEDOC:
        return {
          ...state,
          casesArray: state.casesArray.filter(caseDoc => {
            return caseDoc.key !== state.selectedCaseDoc.key;
          }),
          selectedCaseDoc: null
        };
      case SELECT_CASEDOC:
        return {
          ...state,
          selectedCaseDoc: state.casesArray.find(caseDoc => {
            return caseDoc.key === action.caseDocKey;
          })
        };
      case DESELECT_CASEDOC:
        return {
          ...state,
          selectedCaseDoc: null
        };
      default:
        return state;
    }
  };
  
  export default caseReducer;
  