import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import GetToken from "../Login/getToken";
import { AcctionTypes, getTopicDetailSuccess } from "./action";

const GET_API_TOPICS_DETAIL_URL= `https://api.quanlydoan.live/api/ChiTietDeTai/SerchByIdDeTai/` ; // https://quanlydoan.live//api



export function* sagaGetTopicDetails (idDeTai) {
    console.log("sagaTopic" + idDeTai.payload);
    try{
        const reponse = yield axios.get(`${GET_API_TOPICS_DETAIL_URL}${idDeTai.payload}`,GetToken());
        console.log(reponse.statusCode);
        if (reponse) {
            
            yield put(getTopicDetailSuccess(reponse));
        }
        
    }catch(error){
        console.log(error);
    }
}

export function* watchSagaGetTopicDetails(){
    yield takeLatest(AcctionTypes.GET_TOPICS_DETAIL, sagaGetTopicDetails);
}

//===================================
