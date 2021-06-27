export const AcctionTypes= {
    GET_LISTTEACHERSEMESTERS: "GET_LISTTEACHERSEMESTERS",
    GET_LISTTEACHERSEMESTERS_SUCCESS: "GET_LISTTEACHERSEMESTERS_SUCCESS",
    GET_LISTTEACHERSEMESTERS_ERROR: "GET_LISTTEACHERSEMESTERS_ERROR",
  };

  export function getLisTeacherSemesters(idHocKy) {
      console.log({idHocKy});
    return {
      type: AcctionTypes.GET_LISTTEACHERSEMESTERS,
      payload: idHocKy,
      
    };
  }
  
  export function getLisTeacherSemesterSuccess(action) {
    console.log({action});
    return {
      type: AcctionTypes.GET_LISTTEACHERSEMESTERS_SUCCESS,
      payload: action,

    };
  }
  
  export function getLisTeacherSemesterError(err) {
    return {
      type: AcctionTypes.GET_LISTTEACHERSEMESTERS_ERROR,
      payload: err,
    };
  }