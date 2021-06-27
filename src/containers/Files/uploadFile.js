import axios from 'axios';
import React, { Component, useState } from 'react';
import { useParams } from 'react-router';

import GetToken from '../Login/getToken';
import Cookies from 'js-cookie';

export default function () {
  let { id } = useParams();
  const [uploadFile, setUploadFile] = React.useState();
  const [superHero, setSuperHero] = React.useState();
  const [uploadResponse, setUploadResponse] = React.useState();
  // console.log("uploadResponse ", uploadResponse);

  const submitForm = (event) => {
    event.preventDefault();

    const dataArray = new FormData();
    //dataArray.append("superHeroName", superHero);
    dataArray.append("formFileCollection", uploadFile);

    axios
      .post(`https://api.quanlydoan.live/api/File/uploads/${id}`, dataArray, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: 'Bearer ' + `${Cookies.get('token')}`
        }

      })
      .then((response) => {
        console.log('response', response)
        // setUploadResponse(
        //   response.data
        // );
      })
      .catch((error) => {
        setUploadResponse("err: ", error);
      });
    ////------------------------------------------------

  };
  ////-------------------dowload file chưa được
  //const dowloadFile = () => {
    // axios.get('https://api.quanlydoan.live/api/File/downloadsDiemPhanBien/08b1918a-58ca-4eba-9ca8-8aa777e20920/2aaa04d9-bba8-46a7-a521-a66a429fe1c3', {
    //   responseType: 'blob',
    //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //   headers: {
    //     "content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //     // "Accept": "application/json",
    //     Authorization: 'Bearer ' + `${Cookies.get('token')}`
    //   }
    // })
    //   .then((response) => {
    //     console.log('readFile', response)
    //     const reader = new window.FileReader();
    //     reader.readAsBinaryString(response.data);
    //     reader.onload = function () {
    //       const imageDataUrl = reader.result;
    //       // resolve(imageDataUrl);
    //       return imageDataUrl;
    //     };
    //   })
    //   .catch((err) => {
    //     // reject(err);
    //   });
    ///---cach dowload 2
    // axios.get('https://api.quanlydoan.live/api/File/downloadsDiemPhanBien/08b1918a-58ca-4eba-9ca8-8aa777e20920/2aaa04d9-bba8-46a7-a521-a66a429fe1c3'
    //   , {
    //     responseType: 'blob',
    //     headers: {
    //       //"content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //       // "Accept": "application/json",
    //       Authorization: 'Bearer ' + `${Cookies.get('token')}`
    //     }
    //   })
    //   .then((response) => {
    //     const reader = new window.FileReader();
    //     reader.readAsBinaryString(response.data);
    //     reader.onload = function () {
    //       const imageDataUrl = reader.result;
    //       return (imageDataUrl);
    //     };
    //   })
    //   .catch((err) => {
    //     //reject(err);
    //   });
 // }

  console.log('file:', uploadFile);
  return (
    <div className="App">
      <form onSubmit={submitForm}>
        <br />
        <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
        <br />
        <input type="submit" />
      </form>
      <hr />
      {/* <button onClick={() => dowloadFile()}>
        dowloadFile
      </button> */}
    </div>
  );
};




