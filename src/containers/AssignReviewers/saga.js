import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import GetToken from "../Login/getToken";
import { AcctionTypes, deleteAssignReviewerError, deleteAssignReviewerSuccess, getAssignReviewers, getAssignReviewerSuccess, putAssignReviewersSuccess } from "./action";

const GET_API_ASSIGNREVIEWER_URL= `https://api.quanlydoan.live/api/PhanBien/` ; //https://603ced5df4333a0017b68a5c.mockapi.io/api/apiaxios


//------------------GET---------------------------------
export function* sagaGetAssignReviewers (idHocKy) {
    console.log("sagaidHocky ", idHocKy.payload);
    try{
        const reponse = yield axios.get(`${GET_API_ASSIGNREVIEWER_URL}${idHocKy.payload}`,GetToken());
        console.log(reponse.statusCode);
        if (reponse) {
            yield put(getAssignReviewerSuccess(reponse));
        }
        
    }catch(error){}
}

export function* watchSagaGetAssignReviewers(){
    yield takeLatest(AcctionTypes.GET_ASIGNREVIEWERS, sagaGetAssignReviewers);
}

//------------add------------------------------
export function* sagaAddAssignReviewers(action) {
    console.log(action.payload,'saga');
    
   try {
       const reponse = yield axios.post(GET_API_ASSIGNREVIEWER_URL, action.payload);

       //  yield reponse && put(addAssignReviewerSuccess(action.payload));
       if(reponse) yield getAssignReviewers();
   } catch (error) {

       console.log({error});
   }
 }
 
export function* watchSagaAddAssignReviewers() {
   yield takeLatest(AcctionTypes.ADD_ASIGNREVIEWERS, sagaAddAssignReviewers);
 }

 //------------Delete---------------------------

 export function* sagaDeleteAssignReviewers(action) {
     console.log(action.payload);
     
   try {
     const reponse = yield axios.delete(`${GET_API_ASSIGNREVIEWER_URL}${action.payload}`);
     
     if (reponse.status === 200) {
       yield put(deleteAssignReviewerSuccess(reponse));
     } else {
       yield put(deleteAssignReviewerError(reponse.error));
     }
   } catch (error) {
     console.log({ error });
   }
 }
 
 export function* watchSagaDeleteAssignReviewers() {
   yield takeLatest(AcctionTypes.DELETE_ASIGNREVIEWERS, sagaDeleteAssignReviewers);
 }

 //------------PUT---------------------------------------

 export function* sagaPutAssignReviewers(action) {
     console.log(action.payloaddata.maHocKy);
   try {
     const reponse = yield axios.put(
       `${GET_API_ASSIGNREVIEWER_URL}${action.payloadid}/${action.payloaddata.iddetai}/${action.payloaddata.idhocky}/${action.payloaddata.idPhanBien}`,
       action.payloadid + action.payloaddata.maHocKy + action.payloaddata.tenHocKy
     );
     if (reponse) {
       yield put(putAssignReviewersSuccess(reponse.data));
     }
   } catch (error) {
     console.log({ error });
   }
 }
 
 export function* watchSagaPutAssignReviewers() {
   yield takeLatest(AcctionTypes.PUT_ASIGNREVIEWERS, sagaPutAssignReviewers);
 }
 