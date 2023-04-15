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
} from './types';

generateReasonArray = (baseArray) => {

    var reasonObject = [];
    console.log('in generateReasonArray');
    console.log('base aray is ');
    console.log(baseArray);
    console.log('now creating reasonObect');
    baseArray.forEach(function (caseDoc) {
      console.log(reasonObject)
      reasonObject = reasonObject.concat(caseDoc.gabarit.reason);
    });

    console.log("Reason array is ");
    console.log(reasonObject);

    //remove duplicates from the array 
    var finalReasonObject = reasonObject.filter(function (value, index, self) {

      return self.indexOf(value) == index;
    });

    console.log("final reason object is :");
    console.log(finalReasonObject)
    return Array.from(finalReasonObject);
  };


  generateSystemeArray = (baseArray) => {

    var systemeObject = [];
    console.log('in generateSystemeArray');
    console.log('base aray is ');
    console.log(baseArray);
    console.log('now creating systemeObect');
    baseArray.forEach(function (caseDoc) {
      console.log(systemeObject)
      systemeObject = systemeObject.concat(caseDoc.gabarit.systeme);
    });

    console.log("Systeme array is ");
    console.log(systemeObject);

    //remove duplicates from the array 
    var finalSystemeObject = systemeObject.filter(function (value, index, self) {

      return self.indexOf(value) == index;
    });

    console.log("final systeme object is :");
    console.log(finalSystemeObject)
    return Array.from(finalSystemeObject);
  };


  generateNameArray = (baseArray) => {

    var systemeObject = [];
    console.log('in generateNameArray');
    console.log('base aray is ');
    console.log(baseArray);
    console.log('now creating NameObect');
    baseArray.forEach(function (caseDoc) {
      console.log(systemeObject)
      systemeObject = systemeObject.concat(caseDoc.gabarit.nom);
    });

    console.log("Systeme name is ");
    console.log(systemeObject);

    //remove duplicates from the array 
    var finalSystemeObject = systemeObject.filter(function (value, index, self) {

      return self.indexOf(value) == index;
    });

    console.log("final systeme object is :");
    console.log(finalSystemeObject)
    return Array.from(finalSystemeObject);
  };

export const setAdminCases = (adminCases) => {
    console.log("admin cases are being added");
    return {
        type: SET_ADMINCASES,
        payload: adminCases
    };
};

export const setSearchArray = (searchArray) => {
    console.log("search array is being set to " );
    console.log(searchArray);
    return {
        type: SET_SEARCHARRAY,
        payload: searchArray
    };
};

export const setUserCases = (userCases) => {
    console.log("user cases are being added");
    return {
        type: SET_USERCASES,
        payload: userCases,
        nameArray: generateNameArray(userCases),
        systemeArray: generateSystemeArray(userCases),
        reasonArray: generateReasonArray(userCases),
    };
};

export const setReasonArray = (reasonArray) => {
    console.log("in set reason Array");
    return {
        type: SET_REASONARRAY,
        payload: reasonArray
    };
};

export const setNameArray = (nameArray) => {
    console.log("in set name array");
    return {
        type: SET_NAMEARRAY,
        payload: nameArray
    };
};

export const setSystemeArray = (systemeArray) => {
    console.log("in set systeme array");
    return {
        type: SET_SYSTEMEARRAY,
        payload: systemeArray
    };
};



export const addCaseDoc = (caseDocName) => {
    console.log("potatoe has been added");
    return {
        type: ADD_CASEDOC,
        caseDocName: caseDocName
    };
};

export const deleteCaseDoc = () => {
    return {
        type: DELETE_CASEDOC
    };
};

export const selectCaseDoc = (key) => {
    return {
        type: SELECT_CASEDOC,
        caseDocKey: key
    };
};

export const deselectCaseDoc = () => {
    return {
        type: DESELECT_CASEDOC
    };
};