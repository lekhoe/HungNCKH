import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import HeaderMonHoc from "../../layout/HeaderMonHoc";
import { StyledSemester } from "../Semesters/styled";
import { getTopics } from "../Topics/action";
import { getAssignReviewers } from "./action";
import { getFolders, AcctionTypes } from './action';
import { FcFolder } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import './assignReviewers.css'
import GetToken from "../Login/getToken";
import axios from "axios";
import { ImFileExcel } from 'react-icons/im';
import Cookies from 'js-cookie';
import { AiOutlineDownload } from 'react-icons/ai';

const AssignReviewer = () => {
  let { idHocKy } = useParams();
  let { tenHocKy } = useParams();
  let { idMonHoc } = useParams();
  let { typeApprover } = useParams();
  let { tenMonHoc } = useParams();

  //-----------------------------
  const [idPhanBien, setIdPhanBien] = useState();
  const [maGVPB, setMaGVPB] = useState();
  const [tenGVPB, setTenGVPB] = useState();
  const [maDetai, setMaDetai] = useState();
  const [diem, setDiem] = useState();
  const [note, setNote] = useState();
  const [changeVersion, setChangeVersion] = useState(true);
  const [changeVersion1, setChangeVersion1] = useState(false);
  const [hide, setHide] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showFile, setShowFile] = useState(false);

  //-------------------sửa-----------------------------
  const OnPutSemesters = (idPhanBien, item) => {
    setChangeVersion1(true);
    setChangeVersion(false);
    setIdPhanBien(idPhanBien);
    setMaGVPB(item.maGVPB);


  };



  const dispatch = useDispatch();
  const GET_API_FILE_URL = `https://api.quanlydoan.live/api/File/SearchAll/FolderName/`;
  const folderSelecter = useSelector((state) => state.reducerFolder.list);
  const assignReviewerSelecter = useSelector((state) => state.reducerAssignReviewer.list);
  const isLoading = useSelector((state) => state.reducerAssignReviewer.isLoading);
  // const fileSelecter = useSelector((state) => state.reducerFile.list);

  useEffect(() => {
    dispatch(getAssignReviewers(idHocKy));
  }, []);

  //----phân công đề tài--------------------------------
  const onShow = () => {
    setHide(false);

  };
  useEffect(() => {
    dispatch(getTopics(idHocKy, idMonHoc));


  }, []);
  useEffect(() => {
    dispatch(getFolders());
    
  }, []);
  const onHide = () => {
    setHide(true);

  };
  const handleChange = () => {

  }
  const topicSelecter = useSelector((state) => state.reducerTopic.list);
  const [fileSelecter, setFileSelecter] = useState([]);

  function callApiLoadFile(item) {
    setShowFile(true);
    try {
      axios.get(`${GET_API_FILE_URL}${item.id}`, GetToken()).then(response => { setFileSelecter(JSON.parse(response.request.response)) })
    } catch (error) { }

  }

  useEffect(() => {
    console.log(fileSelecter)
  }, [fileSelecter]);

  const someFunction = (idFile, fileUrl) => {

    console.log("id ", idFile);

    const method = `GET`;
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
    <>
      <StyledSemester.Flex>
        <div><HeaderMonHoc /></div>
        <div className="Body">
          {showPopup ? <div className="full-screen-popup">
            <div className="popup">
              <div className="popup-header">
                <span className="label-header">Tệp điểm</span>
                <button className="close-popup" onClick={() => setShowPopup(false)}>x</button>
              </div>
              <div className="popup-content">
                {/* <h1>Quản lý các Folder</h1> */}
                {!showFile ? <StyledSemester.Body>
                  {folderSelecter.map((item, index) => {
                    return (
                      // <Link to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/quan-ly-folder/file/${item.id}`}>
                      <div className="folder" key={index} onClick={() => callApiLoadFile(item)}>
                        <div className="folderIcon"><FcFolder /></div>
                        <div className="nameFolder">{item.folderName}</div>
                      </div>
                      // </Link>
                    )
                  })}


                </StyledSemester.Body>
                  :
                  <StyledSemester.Body>
                    <button className="close-popup123" onClick={() => setShowFile(false)}>x</button>
                    {fileSelecter?.map((item, index) => (

                      <div className="bodyFile" key={index}>
                        <div className="iconFile"><ImFileExcel /></div>
                        <div className="nameFile">{item.fileName}</div>

                        <div className="iconDown" onClick={() => someFunction(item.idFile, item.url)}><AiOutlineDownload /></div>

                      </div>
                    ))}
                  </StyledSemester.Body>}

              </div>
            </div>
          </div> : ''}
          <div style={{ width: '850px' }}>
            <h1 style={{ display: 'flex' }}><span className="title">Danh sách phân công phản biện {tenHocKy}</span>
              <button className="button-add-point" onClick={() => setShowPopup(true)}>Vào điểm</button></h1>
            {isLoading ? (
              <div>Loading</div>
            ) : (
              <StyledSemester.Body>
                <div>
                  {/* <StyledSemester.ButtonAdd className="bottom" >Thêm GV phản biện</StyledSemester.ButtonAdd> */}

                  <table style={changeVersion1 ? { display: "block" } : { display: "none" }}>
                    <thead>
                      <tr>
                        <td>{changeVersion ? "Thêm GV phản biện" : "Sửa GV phản biện"}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            placeholder="Nhập mã GVPB"
                            type="text"
                            value={maGVPB}
                            onChange={(maGVPB) => setMaGVPB(maGVPB.target.value)}

                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            placeholder="Nhập tên học kỳ"
                            value={tenHocKy}
                            type="text"

                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button type="submit" > Thêm
                            {/* {changeVersion ? "Thêm" : "Sửa"} */}
                          </button>
                          <button type="submit" >Hủy</button>

                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Mã giảng viên phản biện</th>
                      <th>Tên Giảng viên phản biện</th>
                      <th>Mã đề tài</th>
                      <th>Tên đề tài</th>
                      <th>Điểm</th>
                      <th>Note</th>
                      <th colspan="2">Hành động</th>

                    </tr>
                  </thead>
                  <tbody>
                    {assignReviewerSelecter?.map((item, index) => (

                      <tr key={index}>
                        <td>{item.maGVPB}</td>
                        <td>{item.tenGVPB}</td>
                        <td>{item.maDeTai}</td>
                        <td>{item.tenDeTai}</td>
                        <td>{item.diem}</td>
                        <td>{item.note}</td>
                        <td><StyledSemester.ButtonAdd onClick={() => OnPutSemesters(item.idPhanBien, item)}>Sửa</StyledSemester.ButtonAdd></td>
                        <td><StyledSemester.Delete >Xóa</StyledSemester.Delete></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <StyledSemester.Popup id="hide" style={hide ? { display: "none" } : { display: "block" }} >
                  <StyledSemester.PopupContent>
                    <div className="Divpopup">
                      <StyledSemester.PopupTitle>
                        <StyledSemester.Popuptext> Phân công đề tài cho Phản biện</StyledSemester.Popuptext>
                        <StyledSemester.Close onClick={onHide}>&times;</StyledSemester.Close>
                      </StyledSemester.PopupTitle>
                      <div className="save">
                        <StyledSemester.ButtonAdd>Lưu</StyledSemester.ButtonAdd>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Mã đề tài</th>
                            <th>Tên đề tài</th>
                            <th>Tên sinh viên</th>
                            <th>Tên Học kỳ</th>
                            <th>Tên Môn học</th>
                            <th>Chọn</th>

                          </tr>
                        </thead>
                        <tbody>
                          {topicSelecter?.map((item, index) => (
                            <tr key={index}>
                              <td>{item.maDeTai}</td>
                              <td>{item.tenDeTai}</td>
                              <td>{item.tenSinhVien}</td>
                              <td>{item.tenHocKy}</td>
                              <td>{item.tenMonHoc}</td>
                              <td><input
                                type="checkbox"
                                value={item.id}
                                id="checkbox1"
                                onChange={() => handleChange(item)}
                              /></td>
                            </tr>
                          ))}

                        </tbody>
                      </table>
                    </div>
                  </StyledSemester.PopupContent>
                </StyledSemester.Popup>
              </StyledSemester.Body>
            )}
          </div>
        </div>
      </StyledSemester.Flex>
    </>
  );
};

export default AssignReviewer;
