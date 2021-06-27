import {AcctionTypes} from "./action";

export const INITSTALL = {
    list: [],
  };

const default_list = (state = INITSTALL, action) => {
    console.log("action ", action);
    switch(action.type){
        //----------GET------------------------
        case AcctionTypes.GET_FILES: 
            return{
                ...state,
                isLoading: false,
            };
        
        case AcctionTypes.GET_FILES_SUCCESS:
            return {
                ...state,
                list: action.payload.data,
                isLoading: false,
            };

        //----- ADD --------------------------------
        case AcctionTypes.ADD_FILES:
            return {
                ...state,
                isLoading: true,
            };

        case AcctionTypes.ADD_FILES_SUCCESS:
           console.log("add success", {action},'reducer add hoc ky sc');
            return {
                ...state,
                list: [...state.list, action.payload.data.data],
                isLoading: false,
            };
            default:
                return state;
        }
    };
    
    export default default_list;