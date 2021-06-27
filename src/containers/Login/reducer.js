import {AcctionTypes} from "./action";

export const INITSTALL = {
    list: [],
    status: "",
    isLogin: false
  };

  const default_list = (state = INITSTALL, action) => {
    switch(action.type){

        case AcctionTypes.ADD_LOGINS:
            return {
                ...state,
                isLoading: true,
                getLogin: true
            };

        case AcctionTypes.ADD_LOGINS_SUCCESS:
           console.log("reducer act " ,{action});
           
            return {
                ...state,
                list: action.payload.status,
                isLoading: false,
                status: action?.payload?.data?.access_token,
            };
        case AcctionTypes.ADD_LOGINS_ERROR:
           console.log("reducer err ", {action});
            return {
                ...state,
                list: action.payload.status,
                isLoading: false,
                
            };

        default:
            return state;
    }
};

export default default_list;