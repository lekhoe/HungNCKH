export const AcctionTypes= {
  GET_TOPICS_DETAIL: "GET_TOPICS_DETAIL",
  GET_TOPICS_DETAIL_SUCCESS: "GET_TOPICS_DETAIL_SUCCESS",
  GET_TOPICS_DETAIL_ERROR: "GET_TOPICS_DETAIL_ERROR",
};
//------------ Call Api --------------------------
export function getTopicDetails(idDeTai) {
  console.log("idDetaiTopic " + idDeTai);
    return {
      type: AcctionTypes.GET_TOPICS_DETAIL,
      payload: idDeTai,
    };
  }
  
  export function getTopicDetailSuccess(action) {
    console.log("Detail", action);
    return {
      type: AcctionTypes.GET_TOPICS_DETAIL_SUCCESS,
      payload: action,

    };
  }
  
  export function getTopicDetailError(err) {
    return {
      type: AcctionTypes.GET_TOPICS_DETAIL_ERROR,
      payload: err,
    };
  }


  //-------------
  