import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { useParams } from "react-router";

import qs from 'qs';

import { AcctionTypes, getFiles, getFileSuccess, putFilesSuccess } from "./action";
import GetToken from "../Login/getToken";

const GET_API_FILE_URL= `https://api.quanlydoan.live/api/File/SearchAll/FolderName/` ; // ${idHocKy}
const ADD_API_FILE_URL= `https://api.quanlydoan.live/api/File/uploads/`

//--------- get------------------------
export function* sagaGetFiles (FolderId) {
    console.log("FolderId.payload " + FolderId.payload);
    try{
        
        const reponse = yield axios.get(`${GET_API_FILE_URL}${FolderId.payload}`, GetToken());
        console.log("aa"+ reponse);
        console.log(reponse.statusCode);
        if (reponse) {
            
            yield put({type: AcctionTypes.GET_FILES_SUCCESS,payload: reponse})
        }
        
    }catch(error){}
}

export function* watchSagaGetFiles(){
    yield takeLatest(AcctionTypes.GET_FILES, sagaGetFiles);
}

//------------add------------------------------
export function* sagaAddFiles( action) {

    const dataArray = new FormData();
      //dataArray.append("superHeroName", superHero);
      dataArray.append("uploadFile", action.payload.upLoadFile);
    console.log("saga action ", {action});
    
   try {
       const reponse = yield axios.post(`${ADD_API_FILE_URL}${action.payload.id}`,
      action.payload.upLoadFile , GetToken());

       //  yield reponse && put(addFileSuccess(action.payload));
       if(reponse) yield getFiles();
   } catch (error) {

       console.log({error});
   }
 }
 
export function* watchSagaAddFiles() {
   yield takeLatest(AcctionTypes.ADD_FILES, sagaAddFiles);
 }