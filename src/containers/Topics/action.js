export const AcctionTypes= {
  GET_TOPICS: "GET_TOPICS",
  GET_TOPICS_SUCCESS: "GET_TOPICS_SUCCESS",
  GET_TOPICS_ERROR: "GET_TOPICS_ERROR",
  GET_FOLDER: "GET_FOLDER",
    GET_FOLDER_SUCCESS: "GET_FOLDER_SUCCESS",
    GET_FOLDER_ERROR: "GET_FOLDER_ERROR",
};

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
//------------ Call Api --------------------------
export function getTopics(idHocKy, idMonHoc) {
  console.log("idHocKyTopic " + idHocKy);
  console.log("idMonhocTopic " + idMonHoc);
    return {
      type: AcctionTypes.GET_TOPICS,
      payload: {
        idHocKy: idHocKy,
        idMonHoc: idMonHoc,
      }
      
      
    };
  }
  
  export function getTopicSuccess(action) {
    console.log("action ",action);
    return {
      type: AcctionTypes.GET_TOPICS_SUCCESS,
      payload: action,

    };
  }
  
  export function getTopicError(err) {
    return {
      type: AcctionTypes.GET_TOPICS_ERROR,
      payload: err,
    };
  }


  //-------------
  