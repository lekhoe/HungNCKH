import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
//import Cookies from "universal-cookie";
import Cookies from 'js-cookie';
import GetToken from "../Login/getToken";
import { AcctionTypes, addStudentSuccess, deleteStudentError, deleteStudentSuccess, getStudents, getStudentSuccess, putStudentsSuccess } from "./action";

const GET_API_STUDENT_URL= `https://api.quanlydoan.live/api/SinhVien/SinhVienGetAll/`;//"https://quanlydoan.live/api/Hocky/GetAllHocKy" ; 
const GET_API_STUDENT_URL_Local=`http://localhost:8006/api/SinhVien/get-thongtin_sinhvien_byIdChuyenNganh/TKT012`;

//--------- get------------------------
export function* sagaGetStudents (idHocKy) {
 
 console.log("idHocky ", idHocKy.payload);
  console.log("coki get =", Cookies.get('token'));
  
  
    try{
      console.log("chạy vào reponsive");
        const response = yield axios.get(`${GET_API_STUDENT_URL}${idHocKy.payload}`, GetToken()
         
           );
         console.log("aa"+ response);
       
        if(response) {
            
          yield put({type: AcctionTypes.GET_STUDENT_SUCCESS,payload: response})

      }
        
    }catch(error){
      console.log("lỗi = ",error);
    }
}

export function* watchSagaGetStudentList(){
 
    yield takeLatest(AcctionTypes.GET_STUDENT, sagaGetStudents);
}


//--------- get student local------------------------
export function* sagaGetStudentLocals () {
 
  //console.log("idHocky ", idHocKy.payload);
   console.log("coki get =", Cookies.get('token'));
   
   
     try{
       console.log("chạy vào reponsive");
         const response = yield axios.get(`${GET_API_STUDENT_URL_Local}`
          
            );
          console.log("aa"+ response);
        
         if(response) {
             
           yield put({type: AcctionTypes.GET_STUDENT_LOCAL_SUCCESS,payload: response})
 
       }
         
     }catch(error){
       console.log("lỗi = ",error);
     }
 }
 
 export function* watchSagaGetStudenLocal(){
  
     yield takeLatest(AcctionTypes.GET_STUDENT_LOCAL, sagaGetStudentLocals);
 }