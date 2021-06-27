import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { useParams } from "react-router";
import GetToken from "../Login/getToken";
import qs from 'qs';

import { AcctionTypes, getSubjectLists, getSubjectListSuccess, putSubjectListsSuccess } from "./action";

const GET_API_SUBJECTLISTS_URL= `https://api.quanlydoan.live/api/MonHoc/` ; // ${idHocKy}


//--------- get------------------------
export function* sagaGetSubjectLists (idHocKy) {
    console.log("idHocKy.payload " + idHocKy.payload);
    try{
        
        const reponse = yield axios.get(`${GET_API_SUBJECTLISTS_URL}${idHocKy.payload}`, GetToken());
        console.log("aa"+ reponse);
        console.log(reponse.statusCode);
        if (reponse) {
            yield put({type: AcctionTypes.GET_SUBJECTLISTS_SUCCESS,payload: reponse})
        }
        
    }catch(error){}
}

export function* watchSagaGetSubjectLists(){
    yield takeLatest(AcctionTypes.GET_SUBJECTLISTS, sagaGetSubjectLists);
}

//------------add------------------------------
export function* sagaAddSubjectLists( action) {
    console.log("saga action ", {action});
    
   try {
       const reponse = yield axios.post(`${GET_API_SUBJECTLISTS_URL}${action.payload.maMonHoc}/${action.payload.tenMonHoc}/${action.payload.idHocKy}/${action.payload.typeApprover}`,
      action.payload.maMonHoc + action.payload.tenMonHoc + action.payload.idHocKy +  action.payload.typeApprover, GetToken());

       //  yield reponse && put(addSubjectListSuccess(action.payload));
       if(reponse) yield getSubjectLists();
   } catch (error) {

       console.log({error});
   }
 }
 
export function* watchSagaAddSubjectLists() {
   yield takeLatest(AcctionTypes.ADD_SUBJECTLISTS, sagaAddSubjectLists);
 }

 //------------Delete---------------------------

//  export function* sagaDeleteSubjectLists(action) {
//      console.log(action.payload);
     
//    try {
//      const reponse = yield axios.delete(`${DELETE_API_SubjectList_URL}${action.payload}`);
     
//      if (reponse.status === 200) {
//        yield put(deleteSubjectListSuccess(reponse));
//      } else {
//        yield put(deleteSubjectListError(reponse.error));
//      }
//    } catch (error) {
//      console.log({ error });
//    }
//  }
 
//  export function* watchSagaDeleteSubjectLists() {
//    yield takeLatest(AcctionTypes.DELETE_SubjectListS, sagaDeleteSubjectLists);
//  }

 //------------PUT---------------------------------------

 export function* sagaPutSubjectLists(action) {
     console.log(action.payloaddata.maHocKy);
   try {
     const reponse = yield axios.put(`${GET_API_SUBJECTLISTS_URL}${action.payloadid}/${action.payloaddata.maHocKy}/${action.payloaddata.tenHocKy}`,
       action.payloadid + action.payloaddata.maHocKy + action.payloaddata.tenHocKy,GetToken()
     );
     if (reponse) {
       yield put(putSubjectListsSuccess(reponse.data));
     }
   } catch (error) {
     console.log({ error });
   }
 }
 
 export function* watchSagaPutSubjectLists() {
   yield takeLatest(AcctionTypes.PUT_SubjectListS, sagaPutSubjectLists);
 }