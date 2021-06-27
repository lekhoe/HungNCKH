import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import GetToken from "../Login/getToken";
import { AcctionTypes, getStudentSuccess } from "./action";

const GET_API_STUDENTS_URL= "https://api.quanlydoan.live/api/SinhVien/get-all" ; //https://603ced5df4333a0017b68a5c.mockapi.io/api/apiaxios



export function* sagaGetStudents () {
    try{
        const reponse = yield axios.get(GET_API_STUDENTS_URL,GetToken());
        console.log(reponse.statusCode);
        if (reponse) {
            yield put(getStudentSuccess(reponse));
        }
        
    }catch(error){}
}

export function* watchSagaGetStudents(){
    yield takeLatest(AcctionTypes.GET_STUDENTS, sagaGetStudents);
}