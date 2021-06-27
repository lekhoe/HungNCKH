export const AcctionTypes= {
    GET_SUBJECTLISTS: "GET_SUBJECTLISTS",
    GET_SUBJECTLISTS_SUCCESS: "GET_SUBJECTLISTS_SUCCESS",
    GET_SUBJECTLISTS_ERROR: "GET_SUBJECTLISTS_ERROR",

    ADD_SUBJECTLISTS: "ADD_SUBJECTLISTS",
  ADD_SUBJECTLISTS_SUCCESS: "ADD_SUBJECTLISTS_SUCCESS",
  ADD_SUBJECTLISTS_ERROR: "ADD_SUBJECTLISTS_ERROR",

  DELETE_SUBJECTLISTS: "DELETE_SUBJECTLISTS",
  DELETE_SUBJECTLISTS_SUCCESS: "DELETE_SUBJECTLISTS_SUCCESS",
  DELETE_SUBJECTLISTS_ERROR: "DELETE_SUBJECTLISTS_ERROR",

  PUT_SUBJECTLISTS: "PUT_SUBJECTLISTS",
  PUT_SUBJECTLISTS_DATA: "PUT_SUBJECTLISTS_DATA",
  PUT_SUBJECTLISTS_SUCCESS: "PUT_SUBJECTLISTS_SUCCESS",
  PUT_SUBJECTLISTS_ERROR: "PUT_SUBJECTLISTS_ERROR",
  };

  export function getSubjectLists(idHocKy) {
      console.log({idHocKy});
    return {
      type: AcctionTypes.GET_SUBJECTLISTS,
      payload: idHocKy,
      
    };
  }
  
  export function getSubjectListSuccess(action) {
    console.log({action});
    return {
      type: AcctionTypes.GET_SUBJECTLISTS_SUCCESS,
      payload: action,

    };
  }
  
  export function getSubjectListError(err) {
    return {
      type: AcctionTypes.GET_SUBJECTLISTS_ERROR,
      payload: err,
    };
  }

  // -------------- ADD ---------------------
  export function addSubjectList(data, getPro) {
    console.log("action add data: ", {data},'action add HK');
    // console.log("action idHocKy ",idHocKy );
    return {
      type: AcctionTypes.ADD_SUBJECTLISTS,
      
      payload: data,
      getPro
    };
  }
  
  export function addSubjectListSuccess(success) {
    console.log({success});
    return {
      type: AcctionTypes.ADD_SUBJECTLISTS_SUCCESS,
      payload: success,
    };
  }
  
  export function addSubjectListsError(err) {
    return {
      type: AcctionTypes.ADD_SUBJECTLISTS_ERROR,
      payload: err,
    };
  }

  // --------------- Delete---------------
  
  export function deleteSubjectLists(data, getSem) {
    return {
      type: AcctionTypes.DELETE_SUBJECTLISTS,
      payload: data,
      getSem,
    };
  }
  
  export function deleteSubjectListSuccess(success) {
    return {
      type: AcctionTypes.DELETE_SUBJECTLISTS_SUCCESS,
      payload: success,
    };
  }
  
  export function deleteSubjectListError(err) {
    return {
      type: AcctionTypes.DELETE_SUBJECTLISTS_ERROR,
      payload: err,
    };
  }

  //-----------PUT----------------------------------

  export function putSubjectLists(id, add) {
    return {
      type: AcctionTypes.PUT_SUBJECTLISTS,
      payloadid: id,
      payloaddata: add,
     
    };
  }
  
  export function putSubjectListsSuccess(success) {
    return {
      type: AcctionTypes.PUT_SUBJECTLISTS_SUCCESS,
      payload: success,
    };
  }
  
  export function putSubjectListsError(err) {
    return {
      type: AcctionTypes.PUT_SUBJECTLISTS_ERROR,
      payload: err,
    };
  }
   