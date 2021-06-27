export const AcctionTypes= {
  GET_SEMESTERS: "GET_SEMESTERS",
  GET_SEMESTERS_SUCCESS: "GET_SEMESTERS_SUCCESS",
  GET_SEMESTERS_ERROR: "GET_SEMESTERS_ERROR",

  ADD_SEMESTERS: "ADD_SEMESTERS",
  ADD_SEMESTERS_SUCCESS: "ADD_SEMESTERS_SUCCESS",
  ADD_SEMESTERS_ERROR: "ADD_SEMESTERS_ERROR",

  DELETE_SEMESTERS: "DELETE_SEMESTERS",
  DELETE_SEMESTERS_SUCCESS: "DELETE_SEMESTERS_SUCCESS",
  DELETE_SEMESTERS_ERROR: "DELETE_SEMESTERS_ERROR",

  PUT_SEMESTERS: "PUT_SEMESTERS",
  PUT_SEMESTERS_DATA: "PUT_SEMESTERS_DATA",
  PUT_SEMESTERS_SUCCESS: "PUT_SEMESTERS_SUCCESS",
  PUT_SEMESTERS_ERROR: "PUT_SEMESTERS_ERROR",
};
//------------ Call Api --------------------------
export function getSemesters() {
    return {
      type: AcctionTypes.GET_SEMESTERS,
    };
  }
  
  export function getSemesterSuccess(action) {
     console.log({action},'get Hoc ky success');
    return {
      type: AcctionTypes.GET_SEMESTERS_SUCCESS,
      payload: action,

    };
  }
  
  export function getSemesterError(err) {
    return {
      type: AcctionTypes.GET_SEMESTERS_ERROR,
      payload: err,
    };
  }

  // -------------- ADD ---------------------
  export function addSemester(data, getPro) {
    console.log({data},'action add HK');
    return {
      type: AcctionTypes.ADD_SEMESTERS,
      
      payload: data,
      getPro
    };
  }
  
  export function addSemesterSuccess(success) {
    console.log({success});
    return {
      type: AcctionTypes.ADD_SEMESTERS_SUCCESS,
      payload: success,
    };
  }
  
  export function addSemestersError(err) {
    return {
      type: AcctionTypes.GET_SEMESTERS_ERROR,
      payload: err,
    };
  }

  // --------------- Delete---------------
  
  export function deleteSemesters(data, getSem) {
    return {
      type: AcctionTypes.DELETE_SEMESTERS,
      payload: data,
      getSem,
    };
  }
  
  export function deleteSemesterSuccess(success) {
    return {
      type: AcctionTypes.DELETE_SEMESTERS_SUCCESS,
      payload: success,
    };
  }
  
  export function deleteSemesterError(err) {
    return {
      type: AcctionTypes.DELETE_SEMESTERS_SUCCESS,
      payload: err,
    };
  }

  //-----------PUT----------------------------------

  export function putSemesters(id, add) {
    return {
      type: AcctionTypes.PUT_SEMESTERS,
      payloadid: id,
      payloaddata: add,
     
    };
  }
  
  export function putSemestersSuccess(success) {
    return {
      type: AcctionTypes.PUT_SEMESTERS_SUCCESS,
      payload: success,
    };
  }
  
  export function putSemestersError(err) {
    return {
      type: AcctionTypes.PUT_SEMESTERS_ERROR,
      payload: err,
    };
  }
   