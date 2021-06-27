import {AcctionTypes} from "./action";

export const INITSTALL = {
    list: [],
    list1: [],
  };

const default_list = (state = INITSTALL, action) => {
    switch(action.type){
        //---------- GetAPI-------------------
        case AcctionTypes.GET_STUDENT: 
            return{
                ...state,
                isLoading: false,
            };
        
        case AcctionTypes.GET_STUDENT_SUCCESS:
            console.log({action},'reducer get student sc');
            return {
                ...state,
                list: action.payload.data.data,
                isLoading: false,
            };
        //--------GET API LOCAL----------------------
        case AcctionTypes.GET_STUDENT_LOCAL: 
            return{
                ...state,
                isLoading: false,
            };
        
        case AcctionTypes.GET_STUDENT_LOCAL_SUCCESS:
            console.log({action},'reducer get student sc');
            return {
                ...state,
                list1: action.payload.data.data,
                isLoading: false,
            };
            default:
                return state;
        }
    };
    
    export default default_list;