import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { AcctionTypes, getTeacherSuccess } from "./action";

const GET_API_TEACHERS_URL= "http://localhost:8006/api/GiangVien/get-thongtin_giangvien" ; //https://603ced5df4333a0017b68a5c.mockapi.io/api/apiaxios



export function* sagaGetTeachers (idBoMon) {
    //console.log("idBoMon "+idBoMon);
    try{
        
        const reponse = yield axios.get(GET_API_TEACHERS_URL + `/${idBoMon}`);
        // console.log("aa"+ reponse);
        // console.log(reponse.statusCode);
        if (reponse) {
            yield put(getTeacherSuccess(reponse));
        }
        
    }catch(error){}
}

export function* watchSagaGetTeachers(){
    yield takeLatest(AcctionTypes.GET_TEACHERS, sagaGetTeachers);
}