import {AcctionTypes} from "./action";

export const INITSTALL = {
    list: [],
  };

const default_list = (state = INITSTALL, action) => {
    console.log("action Detail ", action);
    switch(action.type){
        case AcctionTypes.GET_TOPICS_DETAIL: 
            return{
                ...state,
                
            };
        
        case AcctionTypes.GET_TOPICS_DETAIL_SUCCESS:
            return {
                ...state,
                list: action.payload.data.data,
                
            };

        default:
            return state;
    }
};

export default default_list;

//==================
