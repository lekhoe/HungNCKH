import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { AcctionTypes, addLogin,} from "./action";

const POST_API_LOGIN_URL= "http://auth.quanlydoan.live/connect/token";
//------------POST------------------------------
export function* sagaAddLogins(action) {
    console.log(action.payload,'saga');
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      const params = new URLSearchParams()
        params.append('client_id', 'GHMSOFTCLIENT')
        params.append('grant_type', 'password')
        params.append('userName', action.payload.userName)
        params.append('password', action.payload.password)
        params.append('client_secret', 'GHMSOFT')

        console.log("params ", params);
   try {
       const response = yield axios.post(POST_API_LOGIN_URL, params, config);
       

       //  yield reponse && put(addLoginSuccess(action.payload));
       if(response) {
           yield put({type: AcctionTypes.ADD_LOGINS_SUCCESS, payload: response})
           console.log("chạy vào đây ",{response});
       }
   } catch (error) {
    yield put({type: AcctionTypes.ADD_LOGINS_ERROR, payload: {status: 400}})
       console.log({error});
   }
 }
 
export function* watchSagaAddLogins() {
   yield takeLatest(AcctionTypes.ADD_LOGINS, sagaAddLogins);
 }
