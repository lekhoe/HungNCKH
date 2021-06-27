export const AcctionTypes= {
  GET_EVALUATIONBOARDS: "GET_EVALUATIONBOARDS",
  GET_EVALUATIONBOARDS_SUCCESS: "GET_EVALUATIONBOARDS_SUCCESS",
  GET_EVALUATIONBOARDS_ERROR: "GET_EVALUATIONBOARDS_ERROR",

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

export function getEvaluationBoards(idHocKy) {
    return {
      type: AcctionTypes.GET_EVALUATIONBOARDS,
      payload: idHocKy,
    };
  }
  
  export function getEvaluationBoardSuccess(action) {
    console.log(action);
    return {
      type: AcctionTypes.GET_EVALUATIONBOARDS_SUCCESS,
      payload: action,

    };
  }
  
  export function getEvaluationBoardError(err) {
    return {
      type: AcctionTypes.GET_EVALUATIONBOARDS_ERROR,
      payload: err,
    };
  }