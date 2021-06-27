import { AcctionTypes, addFolder, addFolderSuccess, getFolders, getFolderSuccess } from "../Folder/action";
import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

import Cookies from 'js-cookie';
import GetToken from "../Login/getToken";

const GET_API_FOLDER_URL= `https://api.quanlydoan.live/api/Folder/SelectAll`;//"https://quanlydoan.live/api/Hocky/GetAllHocKy" ; 
const ADD_API_FOLDER_URL=`https://api.quanlydoan.live/api/Folder/Insert/`

//--------- get------------------------
export function* sagaGetFolders () {
  
  //console.log("coki get =", Cookies.get('token'));
  
  
    try{
      //console.log("chạy vào reponsive");
        const response = yield axios.get(GET_API_FOLDER_URL, GetToken()
         
           );
         //console.log("aa"+ response);
        
        if(response) {
          yield put({type: AcctionTypes.GET_FOLDER_SUCCESS,payload: response})
          
      }
        
    }catch(error){
      console.log("lỗi = ",error);
    }
}

export function* watchSagaGetFolders(){
 
    yield takeLatest(AcctionTypes.GET_FOLDER, sagaGetFolders);
}

//------------add------------------------------
export function* sagaAddFolders(action, getPro) {
  console.log( "add= ", action);
    
     console.log(`${ADD_API_FOLDER_URL}${action.payload}`);
    try {
        const reponse = yield axios.post(`${ADD_API_FOLDER_URL}${action.payload}`,action.payload ,GetToken());
        
        //  yield reponse && put(addFolderSuccess(action.payload));
        
        if(reponse) yield addFolderSuccess();
       
    } catch (error) {

        console.log({error});
    }
  }
  
export function* watchSagaAddFolders() {
    yield takeLatest(AcctionTypes.GET_FOLDER, sagaAddFolders);
  }

