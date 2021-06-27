export const AcctionTypes= {
  ADD_LOGINS: "ADD_LOGINS",
  ADD_LOGINS_SUCCESS: "ADD_LOGINS_SUCCESS",
  ADD_LOGINS_ERROR: "ADD_LOGINS_ERROR",
};

// -------------- ADD ---------------------
export function addLogin(data, getPro) {
    console.log({data},'data');
    return {
      type: AcctionTypes.ADD_LOGINS,
      
      payload: data,
      getPro
    };
  }
  
  export function addLoginSuccess(success) {
    console.log( "success ",{success});
    return {
      type: AcctionTypes.ADD_LOGINS_SUCCESS,
      payload: success,
    };
  }
  
  export function addLoginsError(err) {
    return {
      type: AcctionTypes.ADD_LOGINS_ERROR,
      payload: err,
    };
  }
