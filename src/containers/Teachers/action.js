export const AcctionTypes= {
  GET_TEACHERS: "GET_TEACHERS",
  GET_TEACHERS_SUCCESS: "GET_TEACHERS_SUCCESS",
  GET_TEACHERS_ERROR: "GET_TEACHERS_ERROR",
};
//------------ Call Api --------------------------
export function getTeachers() {
    return {
      type: AcctionTypes.GET_TEACHERS,
    };
  }
  
  export function getTeacherSuccess(action) {
    console.log(action);
    return {
      type: AcctionTypes.GET_TEACHERS_SUCCESS,
      payload: action,

    };
  }
  
  export function getTeacherError(err) {
    return {
      type: AcctionTypes.GET_TEACHERS_ERROR,
      payload: err,
    };
  }