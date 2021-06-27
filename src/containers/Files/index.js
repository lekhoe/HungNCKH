import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Folder from '../Folder';
import { addFile, getFiles } from './action';
import { ImFileExcel } from 'react-icons/im';
import { StyledSemester } from '../Semesters/styled';
import { AiOutlineDownload } from 'react-icons/ai';
import UpFile from './uploadFile';
import axios from 'axios';
import GetToken from '../Login/getToken';
import Cookies from 'js-cookie';
//import GetToken from "../Login/getToken";

const File = () => {

    let {id} = useParams();
    const fileSelecter = useSelector((state) => state.reducerFile.list);
    console.log("fileSelecter ", fileSelecter);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFiles(id));
      }, []);

    //--- upload file--------------------------------
    const [upLoadFile, setUpLoadFile] = useState();
    const getPro =()=> {
        dispatch(getFiles())  ;
      };
    const onAddSubmit = ()=>{
        const add ={id, upLoadFile};
        dispatch(addFile(add,getPro()));
    }
    //-- down load file --------------------------------

    const someFunction= (idFile, fileUrl)=>{
        
            console.log("id ",idFile);
          
          const method =    `GET`;
          const url = `https://api.quanlydoan.live/api/File/downloads/${idFile}`;
       
          axios
            .request({
              url,
              headers: { 
                'Authorization': 'Bearer ' + `${Cookies.get('token')}`, 
                
              }, 
              
              method,
              
              responseType: `blob`, //important
            })
            .then(({ data }) => {
              const downloadUrl = window.URL.createObjectURL(new Blob([data]));
              const link = document.createElement('a');
              link.href = downloadUrl;
              link.setAttribute('download', fileUrl); //any other extension
              document.body.appendChild(link);
              link.click();
              link.remove();
            });
       
      }
    return (
        <StyledSemester.Flex>
            <UpFile />
            {/* <form>
                <input type="file" onChange={(e) => setUpLoadFile(e.target.files)} />
                <br />
                <input type="submit" onClick={() => onAddSubmit()}/>
            </form> */}
            {/* <div className="FolderFile"><Folder /></div> */}
            <StyledSemester.Body className="flexFile">
            
            <div className="divFile">
                <div>
                    <h1>Quản lý File</h1>
                    {fileSelecter?.map ((item, index ) => (
                        
                        <div className="bodyFile" key={index}>
                            <div className="iconFile"><ImFileExcel /></div>
                    <div className="nameFile">{item.fileName}</div>
                    
                    <div className="iconDown" onClick={() =>someFunction(item.idFile, item.url)}><AiOutlineDownload /></div>

                    </div>
                    ))}
                </div>
            </div>
            </StyledSemester.Body>
        </StyledSemester.Flex>
    );
};

export default File;