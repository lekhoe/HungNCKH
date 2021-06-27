import {AcctionTypes} from "./action";

export const INITSTALL = {
    list: [],
  };

const default_list = (state = INITSTALL, action) => {
    switch(action.type){
        case AcctionTypes.GET_STUDENTS: 
            return{
                ...state,
                isLoading: false,
            };
        
        case AcctionTypes.GET_STUDENTS_SUCCESS:
            return {
                ...state,
                list: action.payload.data,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default default_list;