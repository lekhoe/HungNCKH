export const AcctionTypes= {
    GET_STUDENTS: "GET_STUDENTS",
    GET_STUDENTS_SUCCESS: "GET_STUDENTS_SUCCESS",
    GET_STUDENTS_ERROR: "GET_STUDENTS_ERROR",
  };
  //------------ Call Api --------------------------
  export function getStudents() {
      return {
        type: AcctionTypes.GET_STUDENTS,
      };
    }
    
    export function getStudentSuccess(action) {
      console.log(action);
      return {
        type: AcctionTypes.GET_STUDENTS_SUCCESS,
        payload: action,
  
      };
    }
    
    export function getStudentError(err) {
      return {
        type: AcctionTypes.GET_STUDENTS_ERROR,
        payload: err,
      };
    }