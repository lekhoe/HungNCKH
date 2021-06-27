import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

import Cookies from 'js-cookie';
import GetToken from "../Login/getToken";
import { AcctionTypes, addSemesterSuccess, deleteSemesterError, deleteSemesterSuccess, getSemesters, getSemesterSuccess, putSemestersSuccess } from "./action";

const GET_API_SEMESTER_URL= "https://api.quanlydoan.live/api/Hocky/GetAllHocKy";//"https://quanlydoan.live/api/Hocky/GetAllHocKy" ; 
const ADD_API_SEMESTER_URL= `https://api.quanlydoan.live/api/Hocky/InsertAsyncHocKy/`;

const DELETE_API_SEMESTER_URL= `https://api.quanlydoan.live/api/Hocky/` ; 

//--------- get------------------------
export function* sagaGetSemesters (action) {
  console.log("action saga get = ", action);
  console.log("coki get =", Cookies.get('token'));
  
  
    try{
      console.log("chạy vào reponsive");
        const response = yield axios.get(GET_API_SEMESTER_URL, GetToken()
         
           );
         console.log("aa"+ response);
        
        if(response) {
          yield put({type: AcctionTypes.GET_SEMESTERS_SUCCESS,payload: response})
          
      }
        
    }catch(error){
      console.log("lỗi = ",error);
    }
}

export function* watchSagaGetSemesters(){
 
    yield takeLatest(AcctionTypes.GET_SEMESTERS, sagaGetSemesters);
}

//------------add------------------------------
export function* sagaAddSemesters(action) {
  console.log( "add= ", {action});
    
     
    try {
        const reponse = yield axios.post(`${ADD_API_SEMESTER_URL}${action.payload.maHocKy}/${action.payload.tenHocKy}`,action.payload.maHocKy + action.payload.tenHocKy,GetToken());

        //  yield reponse && put(addSemesterSuccess(action.payload));
        
        if(reponse) yield addSemesterSuccess();
    } catch (error) {

        console.log({error});
    }
  }
  
export function* watchSagaAddSemesters() {
    yield takeLatest(AcctionTypes.ADD_SEMESTERS, sagaAddSemesters);
  }

  //------------Delete---------------------------

  export function* sagaDeleteSemesters(action) {
      console.log(action.payload);
      
    try {
      const reponse = yield axios.delete(`${DELETE_API_SEMESTER_URL}${action.payload}`,GetToken());
      
      if (reponse.status === 200) {
        yield put(deleteSemesterSuccess(reponse));
      } else {
        yield put(deleteSemesterError(reponse.error));
      }
    } catch (error) {
      console.log({ error });
    }
  }
  
  export function* watchSagaDeleteSemesters() {
    yield takeLatest(AcctionTypes.DELETE_SEMESTERS, sagaDeleteSemesters);
  }

  //------------PUT---------------------------------------

  export function* sagaPutSemesters(action) {
      console.log(action.payloaddata.maHocKy);
    try {
      const reponse = yield axios.put(
        `${DELETE_API_SEMESTER_URL}${action.payloadid}/${action.payloaddata.maHocKy}/${action.payloaddata.tenHocKy}` ,
        action.payloadid + action.payloaddata.maHocKy + action.payloaddata.tenHocKy, GetToken()
      );
      if (reponse) {
        yield put(putSemestersSuccess(reponse.data));
      }
    } catch (error) {
      console.log({ error });
    }
  }
  
  export function* watchSagaPutSemesters() {
    yield takeLatest(AcctionTypes.PUT_SEMESTERS, sagaPutSemesters);
  }
  
  