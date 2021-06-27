export const AcctionTypes= {
    GET_STUDENT: "GET_STUDENT",
    GET_STUDENT_SUCCESS: "GET_STUDENT_SUCCESS",
    GET_STUDENT_ERROR: "GET_STUDENT_ERROR",
  
    GET_STUDENT_LOCAL: "GET_STUDENT_LOCAL",
    GET_STUDENT_LOCAL_SUCCESS: "GET_STUDENT_LOCAL_SUCCESS",
    GET_STUDENT_LOCAL_ERROR: "GET_STUDENT_LOCAL_ERROR",
    
  };
  export function getStudents(idHocKy) {
      
    return {
      type: AcctionTypes.GET_STUDENT,
      payload: idHocKy,
    };
  }
  
  export function getStudentSuccess(action) {
     console.log({action},'get student success');
    return {
      type: AcctionTypes.GET_STUDENT_SUCCESS,
      payload: action,

    };
  }
  
  export function getStudentError(err) {
    return {
      type: AcctionTypes.GET_STUDENT_ERROR,
      payload: err,
    };
  }
//---GET STUDENT LOCALHOST -------------------------------
  export function getStudentLocals() {
      
    return {
      type: AcctionTypes.GET_STUDENT_LOCAL,
      
    };
  }
  
  export function getStudentLocalSuccess(action) {
     console.log({action},'get student success');
    return {
      type: AcctionTypes.GET_STUDENT_LOCAL_SUCCESS,
      payload: action,

    };
  }
  
  export function getStudentLocalError(err) {
    return {
      type: AcctionTypes.GET_STUDENT_LOCAL_ERROR,
      payload: err,
    };
  }