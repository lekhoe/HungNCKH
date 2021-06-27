import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { useParams } from "react-router";
import GetToken from "../Login/getToken";

import { AcctionTypes, getLisTeacherSemesterSuccess } from "./action";

const GET_API_LISTTEACHERSEMESTERS_URL= `https://api.quanlydoan.live/api/GiangVienHuongDan/GetAllGiangVienHuongDan/` ; // ${idHocKy} /api/GiangVienHuongDan/GetAllGiangVienHuongDan/{idhocky}



export function* sagaGetListTeacherSemesters (idHocKy) {
    console.log("idHocKy.payload " + idHocKy.payload);
    try{
        
        const reponse = yield axios.get(`${GET_API_LISTTEACHERSEMESTERS_URL}${idHocKy.payload}`,GetToken());
        console.log("aa"+ reponse);
        console.log(reponse.statusCode);
        if (reponse) {
            yield put(getLisTeacherSemesterSuccess(reponse));
        }
        
    }catch(error){}
}

export function* watchSagaGetListTeacherSemesters(){
    yield takeLatest(AcctionTypes.GET_LISTTEACHERSEMESTERS, sagaGetListTeacherSemesters);
}