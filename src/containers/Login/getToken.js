import React from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const GetToken = () => {
    
    console.log("coki get =", Cookies.get('token'));
    return (
      
  {
    headers: {
       "Accept": "application/json",
 //"Content-Type": "application/json",
 'Content-Type': 'application/json',
//"Content-Type": "multipart/form-data",
     
        Authorization: 'Bearer ' + `${Cookies.get('token')}`

      }
      
}

      
    );
};

export default GetToken;