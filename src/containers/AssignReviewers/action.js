export const AcctionTypes= {
  GET_ASIGNREVIEWERS: "GET_ASIGNREVIEWERS",
  GET_ASIGNREVIEWERS_SUCCESS: "GET_ASIGNREVIEWERS_SUCCESS",
  GET_ASIGNREVIEWERS_ERROR: "GET_ASIGNREVIEWERS_ERROR",

  ADD_ASIGNREVIEWERS: "ADD_ASIGNREVIEWERS",
  ADD_ASIGNREVIEWERS_SUCCESS: "ADD_ASIGNREVIEWERS_SUCCESS",
  ADD_ASIGNREVIEWERS_ERROR: "ADD_ASIGNREVIEWERS_ERROR",

  DELETE_ASIGNREVIEWERS: "DELETE_ASIGNREVIEWERS",
  DELETE_ASIGNREVIEWERS_SUCCESS: "DELETE_ASIGNREVIEWERS_SUCCESS",
  DELETE_ASIGNREVIEWERS_ERROR: "DELETE_ASIGNREVIEWERS_ERROR",

  PUT_ASIGNREVIEWERS: "PUT_ASIGNREVIEWERS",
  PUT_ASIGNREVIEWERS_DATA: "PUT_ASIGNREVIEWERS_DATA",
  PUT_ASIGNREVIEWERS_SUCCESS: "PUT_ASIGNREVIEWERS_SUCCESS",
  PUT_ASIGNREVIEWERS_ERROR: "PUT_ASIGNREVIEWERS_ERROR",
  GET_FOLDER: "GET_FOLDER",
    GET_FOLDER_SUCCESS: "GET_FOLDER_SUCCESS",
    GET_FOLDER_ERROR: "GET_FOLDER_ERROR",
};
//------------ Call Api --------------------------

export function getFolders() {
  return {
    type: AcctionTypes.GET_FOLDER,
  };
}

export function getFolderSuccess(action) {
   console.log({action},'get Hoc ky success');
  return {
    type: AcctionTypes.GET_FOLDER_SUCCESS,
    payload: action,

  };
}

export function getFolderError(err) {
  return {
    type: AcctionTypes.GET_FOLDER_ERROR,
    payload: err,
  };
}

export function getAssignReviewers(idHocKy) {
    return {
      type: AcctionTypes.GET_ASIGNREVIEWERS,
      payload: idHocKy,
    };
  }
  
  export function getAssignReviewerSuccess(action) {
    console.log(action);
    return {
      type: AcctionTypes.GET_ASIGNREVIEWERS_SUCCESS,
      payload: action,

    };
  }
  
  export function getAssignReviewerError(err) {
    return {
      type: AcctionTypes.GET_ASIGNREVIEWERS_ERROR,
      payload: err,
    };
  }

   // -------------- ADD ---------------------
   export function addAssignReviewer(data, getPro) {
    console.log({data},'action add HK');
    return {
      type: AcctionTypes.ADD_ASIGNREVIEWERS,
      payload: data,
      getPro
    };
  }
  
  export function addAssignReviewerSuccess(success) {
    console.log({success});
    return {
      type: AcctionTypes.ADD_ASIGNREVIEWERS_SUCCESS,
      payload: success,
    };
  }
  
  export function addAssignReviewersError(err) {
    return {
      type: AcctionTypes.ADD_ASIGNREVIEWERS_ERROR,
      payload: err,
    };
  }

  // --------------- Delete---------------
  
  export function deleteAssignReviewers(data, getSem) {
    return {
      type: AcctionTypes.DELETE_ASIGNREVIEWERS,
      payload: data,
      getSem,
    };
  }
  
  export function deleteAssignReviewerSuccess(success) {
    return {
      type: AcctionTypes.DELETE_ASIGNREVIEWERS_SUCCESS,
      payload: success,
    };
  }
  
  export function deleteAssignReviewerError(err) {
    return {
      type: AcctionTypes.DELETE_ASIGNREVIEWERS_ERROR,
      payload: err,
    };
  }

  //-----------PUT----------------------------------

  export function putAssignReviewers(id, add) {
    return {
      type: AcctionTypes.PUT_ASIGNREVIEWERS,
      payloadid: id,
      payloaddata: add,
     
    };
  }
  
  export function putAssignReviewersSuccess(success) {
    return {
      type: AcctionTypes.PUT_ASIGNREVIEWERS_SUCCESS,
      payload: success,
    };
  }
  
  export function putAssignReviewersError(err) {
    return {
      type: AcctionTypes.PUT_ASIGNREVIEWERS_SUCCESS,
      payload: err,
    };
  }
   