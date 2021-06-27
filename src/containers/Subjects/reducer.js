import {AcctionTypes} from "./action";

export const INITSTALL = {
    Id_hocky: null,
  };

const default_list = (state = INITSTALL, action) => {
    switch(action.type){
        case AcctionTypes.SET_IDHOCKY: 
            return{
                ...state,
                Id_hocky: action.payload,
            };

        default:
            return state;
    }
};

export default default_list;