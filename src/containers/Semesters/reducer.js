import {AcctionTypes} from "./action";

export const INITSTALL = {
    list: [],
  };

const default_list = (state = INITSTALL, action) => {
    switch(action.type){
        //---------- GetAPI-------------------
        case AcctionTypes.GET_SEMESTERS: 
            return{
                ...state,
                isLoading: false,
            };
        
        case AcctionTypes.GET_SEMESTERS_SUCCESS:
            console.log({action},'reducer get HK sc');
            return {
                ...state,
                list: action.payload.data.data,
                isLoading: false,
            };
        //----- ADD --------------------------------
        case AcctionTypes.ADD_SEMESTERS:
            return {
                ...state,
                isLoading: true,
            };

        case AcctionTypes.ADD_SEMESTERS_SUCCESS:
           console.log({action},'reducer add hoc ky sc');
            return {
                ...state,
                list: [...state.list, action.payload.data.data],
                isLoading: false,
            };

            //--- Delete-------------------------------------

            case AcctionTypes.DELETE_SEMESTERS:
                return {
                    ...state,
                    success: action.payload,
                    isLoading: true,
                };

            case AcctionTypes.DELETE_SEMESTERS_SUCCESS:
                return {
                    ...state,
                    list: state.list.filter((idHocKy) => idHocKy.idHocKy !== action.payload.data.idHocKy),
                    isLoading: false,
                };

            //------Put---------------------------------
            case AcctionTypes.PUT_SEMESTERS:
                return {
                    ...state,
                    list: [...state.list],
                    isLoading: true,
                };

            case AcctionTypes.PUT_SEMESTERS_SUCCESS:
                const list = state.list.filter((idHocKy) => idHocKy.idHocKy !== action.payload.idHocKy);
                console.log({ list });
                return {
                    ...state,
                    list: [
                    ...state.list.filter((idHocKy) => idHocKy.idHocKy !== action.payload.idHocKy),
                    action.payload,
                    ],
                    isLoading: false,
                };


        default:
            return state;
    }
};

export default default_list;