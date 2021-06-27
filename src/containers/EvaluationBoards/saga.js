import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import GetToken from "../Login/getToken";
import { AcctionTypes, getEvaluationBoardSuccess} from "./action";

const GET_API_EVELUATIONBOARDS_URL= "https://api.quanlydoan.live/api/HoiDongTotNghiep/GetAllHoiDong/" ; //https://603ced5df4333a0017b68a5c.mockapi.io/api/apiaxios



export function* sagaGetEvaluationBoards (idHocKy) {
    try{
        const reponse = yield axios.get(`${GET_API_EVELUATIONBOARDS_URL}${idHocKy.payload}`, GetToken());
        console.log(reponse.statusCode);
        if (reponse) {
            yield put(getEvaluationBoardSuccess(reponse));
        }
        
    }catch(error){}
}

export function* watchSagaGetEvaluationBoards(){
    yield takeLatest(AcctionTypes.GET_EVALUATIONBOARDS, sagaGetEvaluationBoards);
}