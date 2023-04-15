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
} from './types';

export const addSessionCase = (sessionCase) => {
   console.log("the session's case will be  set to : "+ sessionCase);
    // console.log( );
    return {
        type: ADD_SESSIONCASE,
        payload: sessionCase,
        
    };
};

export const setSessionTime = (sessionTime) => {
console.log("in session time of action.js "+sessionTime)

var minutes = Math.floor(sessionTime / 60);
var seconds = sessionTime % 60;

    return {
        type: SET_SESSIONTIME,
        payload: sessionTime,
        sessionTimeSplit: { min: minutes, sec: seconds }

    };
};

export const setSessionPage = (sessionPage) => {
    console.log("the session's page has been set to " + sessionPage);

    return {
        type: SET_SESSIONPAGE,
        payload: sessionPage
    };
};

export const setTimeItTook = (timeItTook) => {
    console.log("the session's time case has been set");

    return {
        type: SET_TIMEITTOOK,
        payload: timeItTook
    };
};

export const deleteSessionCase = () => {

    return {
        type: DELETE_SESSIONCASE,

    };
};

export const selectSessionCase = (key) => {
    // OPTIMIZE revamp or make useful
    return {
        type: SELECT_SESSIONCASE,
        payload: key
   
    };
};

export const deselectSessionCase = () => {
    return {
        type: DESELECT_SESSIONCASE
    };
};

export const startSession = () => {
    
    return {
        type: START_SESSION,

    };
};

export const setClockState = (clockState) => {
    
    return {
        type: SET_CLOCKSTATE,
        payload: clockState
    };
};

export const resumeSession = () => {
    return {
        type: RESUME_SESSION,
        
    };
};

export const pauseSession = () => {
    return {
        type: PAUSE_SESSION,
        
    };
};

export const endSession = () => {
    return {
        type: END_SESSION
    };
};

// TODO function setRecapCase - %


// TODO function setFirstScore - %

// TODO function setFirstScoreAverage - %

// TODO function setLastScore - %

// TODO function setFirstScore -  %

// TODO function setFirstime:boolean 
