import {AcctionTypes} from "./action";

export const INITSTALL = {
    list: [],
  };

const default_list = (state = INITSTALL, action) => {
    switch(action.type){
        //----------GET------------------------
        case AcctionTypes.GET_SUBJECTLISTS: 
            return{
                ...state,
                isLoading: false,
            };
        
        case AcctionTypes.GET_SUBJECTLISTS_SUCCESS:
            return {
                ...state,
                list: action.payload.data.data,
                isLoading: false,
            };
        
        //----- ADD --------------------------------
        case AcctionTypes.ADD_SUBJECTLISTS:
            return {
                ...state,
                isLoading: true,
            };

        case AcctionTypes.ADD_SUBJECTLISTS_SUCCESS:
           console.log("add success", {action},'reducer add hoc ky sc');
            return {
                ...state,
                list: [...state.list, action.payload.data.data],
                isLoading: false,
            };

            //--- Delete-------------------------------------

            case AcctionTypes.DELETE_SUBJECTLISTS:
                return {
                    ...state,
                    success: action.payload,
                    isLoading: true,
                };

            case AcctionTypes.DELETE_SUBJECTLISTS_SUCCESS:
                return {
                    ...state,
                    list: state.list.filter((idHocKy) => idHocKy.idHocKy !== action.payload.data.idHocKy),
                    isLoading: false,
                };

            //------Put---------------------------------
            case AcctionTypes.PUT_SUBJECTLISTS:
                return {
                    ...state,
                    list: [...state.list],
                    isLoading: true,
                };

            case AcctionTypes.PUT_SUBJECTLISTS_SUCCESS:
                const list = state.list.filter((idMonHoc) => idMonHoc.idMonHoc !== action.payload.idMonHoc);
                console.log({ list });
                return {
                    ...state,
                    list: [
                    ...state.list.filter((idMonHoc) => idMonHoc.idMonHoc !== action.payload.idMonHoc),
                    action.payload,
                    ],
                    isLoading: false,
                };


        default:
            return state;
    }
};

export default default_list;