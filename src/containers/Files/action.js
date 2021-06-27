export const AcctionTypes= {
    GET_FILES: "GET_FILES",
    GET_FILES_SUCCESS: "GET_FILES_SUCCESS",
    GET_FILES_ERROR: "GET_FILES_ERROR",

    ADD_FILES: "ADD_FILES",
    ADD_FILES_SUCCESS: "ADD_FILES_SUCCESS",
    ADD_FILES_ERROR: "ADD_FILES_ERROR",
};

export function getFiles(FolderId) {
    console.log("FolderId ", {FolderId});
  return {
    type: AcctionTypes.GET_FILES,
    payload: FolderId,
    
  };
}

export function getFileSuccess(action) {
  console.log({action});
  return {
    type: AcctionTypes.GET_FILES_SUCCESS,
    payload: action,

  };
}

export function getFileError(err) {
  return {
    type: AcctionTypes.GET_FILES_ERROR,
    payload: err,
  };
}

  // -------------- ADD ---------------------
  export function addFile(data, getPro) {
    console.log("action add data: ", {data},'action add HK');
    // console.log("action idHocKy ",idHocKy );
    return {
      type: AcctionTypes.ADD_FILES,
      
      payload: data,
      getPro
    };
  }
  
  export function addFileSuccess(success) {
    console.log({success});
    return {
      type: AcctionTypes.ADD_FILES_SUCCESS,
      payload: success,
    };
  }
  
  export function addFilesError(err) {
    return {
      type: AcctionTypes.ADD_FILES_ERROR,
      payload: err,
    };
  }
