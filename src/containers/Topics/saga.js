import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import GetToken from "../Login/getToken";
import { AcctionTypes, getTopicSuccess } from "./action";

const GET_API_TOPICS_URL= `https://api.quanlydoan.live/api/DeTai/GetCT/` ; // //https://quanlydoan.live/api



export function* sagaGetTopics (idHocKy) {
    //console.log("URL ", GET_API_TOPICS_URL);
    let idhocky= idHocKy.payload.idHocKy;
    let idmonhoc=idHocKy.payload.idMonHoc;
    console.log("idHocky+ idMonHoc " +  idHocKy.payload.idHocKy, {idhocky},JSON.stringify(idHocKy.payload.idMonHoc));
    try{
        const reponse = yield axios.get(`${GET_API_TOPICS_URL}${idhocky}/${idmonhoc}`,GetToken());
        console.log("reponse ", reponse);
        console.log(reponse.statusCode);
        if (reponse) {
            console.log("chạy vào đây");
            yield put(getTopicSuccess(reponse));
        }
        
    }catch(error){}
}

export function* watchSagaGetTopics(){
    yield takeLatest(AcctionTypes.GET_TOPICS, sagaGetTopics);
}

//===================================
