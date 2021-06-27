export const AcctionTypes= {
    GET_FOLDER: "GET_FOLDER",
    GET_FOLDER_SUCCESS: "GET_FOLDER_SUCCESS",
    GET_FOLDER_ERROR: "GET_FOLDER_ERROR",
  
    ADD_FOLDERS: "ADD_FOLDERS",
    ADD_FOLDERS_SUCCESS: "ADD_FOLDERS_SUCCESS",
    ADD_FOLDERS_ERROR: "ADD_FOLDERS_ERROR",
  };
  export function getFolders() {
    return {
      type: AcctionTypes.GET_FOLDER,
    };
  }
  
  export function getFolderSuccess(action) {
     //console.log({action},'get Hoc ky success');
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
  //-------------------ADD---------------------------------------------
  export function addFolder(data, getPro) {
    console.log({data},'action add HK');
    return {
      type: AcctionTypes.ADD_FOLDERS,
      
      payload: data,
      getPro
    };
  }
  
  export function addFolderSuccess(success) {
    console.log("success ",{success});
    return {
      type: AcctionTypes.ADD_FOLDERS_SUCCESS,
      payload: success,
    };
  }
  
  export function addFoldersError(err) {
    return {
      type: AcctionTypes.ADD_FOLDERS_ERROR,
      payload: err,
    };
  }