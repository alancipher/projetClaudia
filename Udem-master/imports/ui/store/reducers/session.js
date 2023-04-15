import {
  ADD_SESSIONCASE,
  DELETE_SESSIONCASE,
  DESELECT_SESSIONCASE,
  END_SESSION,
  PAUSE_SESSION,
  RESUME_SESSION,
  SELECT_SESSIONCASE,
  SET_CLOCKSTATE,
  SET_SESSIONPAGE,
  SET_SESSIONTIME,
  SET_TIMEITTOOK,
  START_SESSION
} from "../actions/types";

const initialState = {
  sessionCase: null,
  sessionPage: 1,
  inSession: false,
  sessionTime:600,
  clockState:'STOPPED',

};

const sessionReducer = (state = initialState, action) => {
  //  TODO finish session reducers
  // TODO check reducers with notes

  // console.log("this action type is "+ action.type + " it's payload is "+ action.payload)
  switch (action.type) {
    case ADD_SESSIONCASE:
      console.log("In reducer");
      console.log("action type is " + action.type);
      console.log("payload is ");
      console.log(action.payload);

      return {
        ...state, //keeps the current state
        // inSession: true,
        // sessionPage: 1,
        sessionCase: action.payload, //sets the sessionCase prop
        recapCase: action.payload, //sets the recapCase prop

      };
    case SET_SESSIONTIME:
      console.log("In reducer SESSIONTIME");
      console.log("action type is " + action.type);
      console.log("payload is ");
      console.log(action.payload);

      return {
        ...state, //keeps the current state
        sessionTime: action.payload, //sets the sessionCase prop
        sessionTimeSplit: action.sessionTimeSplit


      };
    case SET_TIMEITTOOK:
      const minutes2 = Math.floor(action.payload / 60);
      const seconds2 = action.payload % 60;
      return {
        ...state, //keeps the current state
        timeItTook: action.payload, //sets the sessionCase prop
        timeItTookSplit: { min: minutes2, sec: seconds2 } //sets the recapCase prop
      };
    case DELETE_SESSIONCASE:

      return {
        ...state, //keeps the current state
        sessionCase: null,
        inSession: false,
      };

    case SELECT_SESSIONCASE:

      return {
        ...state, //keeps the current state
        selectedCaseId: action.payload
      };

    case DESELECT_SESSIONCASE:

      return {
        ...state, //keeps the current state
        selectedCaseId: null
      };

    case START_SESSION:

      return {
        ...state, //keeps the current state
        inSession: true,

      };
    case SET_SESSIONPAGE:

      return {
        ...state,
        sessionPage: action.payload,
        inSession :true,
      };
    case SET_CLOCKSTATE:
      return {
        ...state,
        clockState: action.payload
      };
    case RESUME_SESSION:

      return {
        ...state, //keeps the current state
        inSession: true,
        clockState: 'STARTED',

      };
    case PAUSE_SESSION:

      return {
        ...state, //keeps the current state
        inSession: true,
        clockState: 'PAUSED',

      };

    case END_SESSION:

      return {
        ...state, //keeps the current state
        inSession: false,
        clockState: 'STOPPED',

      };
    default:
      // console.log("in default")
      return state;
  }
};

export default sessionReducer;
