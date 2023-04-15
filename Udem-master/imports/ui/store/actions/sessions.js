import { ADD_SESSION, DELETE_SESSION, SELECT_SESSION, DESELECT_SESSION } from './types';

export const addSession = (placeName) => {
    console.log("potatoe has been added");
    return {
        type: ADD_SESSION,
        placeName: placeName
    };
};

export const deleteSession = () => {
    return {
        type: DELETE_SESSION
    };
};

export const selectSession = (key) => {
    return {
        type: SELECT_SESSION,
        placeKey: key
    };
};

export const deselectSession = () => {
    return {
        type: DESELECT_SESSION
    };
};