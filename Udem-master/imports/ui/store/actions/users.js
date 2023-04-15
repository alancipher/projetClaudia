// TODO set up users prop

import { SET_USERS, SET_USERSEARCHARRAY } from './types';

const generateEmailsArray = (baseArray) => {
//   this method goes through the given array of user  docs and generates an array of all the emails registered
var emailsArray = [];
baseArray.forEach(userDoc => {
    for(var i = 0; i < userDoc.emails.length ; i++){
        emailsArray.push(userDoc.emails[i].address);
    }
});
console.log("email array is ");
console.log(emailsArray);

}

export const setUserSearchArray = (searchArray) => {
    console.log("USER search array is being set to " );
    console.log(searchArray);
    return {
        type: SET_USERSEARCHARRAY,
        payload: searchArray
    };
}; 
export const setUsers = (users) => {
    console.log("the users have been added");
    return {
        type: SET_USERS,
        usersArray: users,
        emailsArray: generateEmailsArray(users),
        
    };
};