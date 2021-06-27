import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { StyledSemester } from '../Semesters/styled';
import { addLogin } from './action';
//import Cookies from 'universal-cookie';
import Cookies from 'js-cookie';

const Login = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    //----useState--------------------
    const [client_id, setClient_id] = useState('GHMSOFTCLIENT')
    const [grant_type, setGrant_type] = useState('password')
    const [userName, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [client_secret, setClient_secret] = useState('GHMSOFT')
    //------Selecter----------------------
    const loginSelecter = useSelector((state) => state.reducerLogin.list);

    console.log("loginSelecter: ", loginSelecter);

    
  //const tokenSelecter = useSelector((state)=> state.reducerLogin.status);
  //console.log("tokenSelecter = ", tokenSelecter);

  const tokenSelecter = useSelector((state)=> state.reducerLogin.status);

useEffect(() => {
    if(tokenSelecter){
 
  const cookies = new Cookies();
  const timestamp = new Date().getTime();
  const expire = 86400   + (60 * 60 * 24 * 1000 * 3);
  const expireDate = new Date(expire);
  Cookies.set('myCat', 'dsfdsfdfs',  { expires: 1, path: '' });
  Cookies.set('token', `${tokenSelecter}`, { expires: 1, path: '' });
  console.log(Cookies.get("token")); 
  console.log("cooki tokenSelecter ", tokenSelecter);

}
}, [tokenSelecter])


    const data= { client_id, grant_type, userName, password, client_secret }


    const dangnhap = () => {
        console.log({userName,password});
        if(userName && password){
            
            
            dispatch(addLogin(data));
           
            
        } else {
            alert("vui lòng nhập thông tin");
        }
        setUserName("");
        setPassWord("");
        
    };

    useEffect(() => {
        
        
            if(loginSelecter == 200){
                history.replace("/hoc-ky");
                
            }else{
                if(loginSelecter===400)
                alert("Tài khoản không tồn tại");
                return;

            }
     }, [loginSelecter])
    return (
        <StyledSemester.LoginDiv>
            <StyledSemester.Login>
                <div>
            <h1>ĐĂNG NHẬP</h1>
            <StyledSemester.Form>
                <div>
                <label>
                    Tên đăng nhập <br />
                    <input placeholder="Nhập tên đăng nhập" value={userName} type="text" name="name" onChange={e => setUserName(e.target.value)} />
                </label>
                <br />
                <label>
                    Mật Khẩu <br />
                    <input placeholder="Nhập mật khẩu" type="password" name="password" value={password} onChange={e => setPassWord(e.target.value)} />
                </label>
                </div>
            </StyledSemester.Form>
            <div className="button">
                <button onClick={dangnhap}>ĐĂNG NHẬP</button>
                </div>
                <p>Quên mật khẩu ?</p>
                </div>
                </StyledSemester.Login>
                </StyledSemester.LoginDiv> 
    );
};

export default Login;