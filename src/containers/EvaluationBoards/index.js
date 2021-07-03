import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//import { useParams } from "react-router";
import HeaderMonHoc from "../../layout/HeaderMonHoc";
import { StyledSemester } from "../Semesters/styled";
import { getTopics } from "../Topics/action";
import { getEvaluationBoards } from "./action";
import axios from "axios";
import GetToken from "../Login/getToken";
import { FcFolder } from 'react-icons/fc';
import Cookies from 'js-cookie';
import { ImFileExcel } from 'react-icons/im';
import { AiOutlineDownload } from 'react-icons/ai';
import { getFolders } from './action';
import './evaluationBoards.css';
import { Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom";

const EvaluationBoard = () => {
  const GET_API_STUDENTS_URL = "https://api.quanlydoan.live/api"
  const dispatch = useDispatch();

  let { idMonHoc } = useParams();
  let { idHocKy } = useParams();
  let {tenHocKy} = useParams();
  let {tenMonHoc} = useParams();
  let{typeApprover}= useParams();

  const GET_API_FILE_URL = `https://api.quanlydoan.live/api/File/SearchAll/FolderName/`;
  const evaluationBoardSelecter = useSelector((state) => state.reducerEvaluationBoard.list);
  const isLoading = useSelector((state) => state.reducerEvaluationBoard.isLoading);
  console.log("evaluationBoardSelecter = ", evaluationBoardSelecter);
  useEffect(() => {
    dispatch(getEvaluationBoards(idHocKy));
  }, []);
  const folderSelecter = useSelector((state) => state.reducerFolder.list);
  //--Phân đề tài-----
  const [hide, setHide] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupAdd, setShowPopupAdd] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [showPopupMess, setShowPopupMess] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [maHoiDong, setMaHoiDong] = useState('');
  const [tenHoiDong, setTenHoiDong] = useState('');
  const [ngayBaoVe, setNgayBaoVe] = useState('');
  const [idHoiDong, setIdHoiDong] = useState('');
  const [mess, setMess] = useState('');
  const [confirm, setConfirm] = useState(false);

  const topicSelecter = useSelector((state) => state.reducerTopic.list);
  const [fileSelecter, setFileSelecter] = useState([]);

  useEffect(() => {
    dispatch(getTopics(idHocKy, idMonHoc));


  }, []);
  useEffect(() => {
    dispatch(getFolders());

  }, []);
  const onHide = () => {
    setHide(true);

  };
  const onShow = () => {
    setHide(false);

  };
  const handleChange = () => {

  }

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

  function callApiLoadFile(item) {
    setShowFile(true);
    try {
      axios.get(`${GET_API_FILE_URL}${item.id}`, GetToken()).then(response => { setFileSelecter(JSON.parse(response.request.response)) })
    } catch (error) { }

  }

  function SaveCouncil() {
    let body =
    {
      "maHoiDong": maHoiDong,
      "tenHoiDong": tenHoiDong,
      "ngayBaoVe": ngayBaoVe,
    }
    if (showPopupAdd) {

      axios.post(GET_API_STUDENTS_URL + `/HoiDongTotNghiep/InsertHoiDong/${idHocKy}/${idMonHoc}`, body, GetToken()).then(response => { alert(response.data.message) })
    }
    if (showPopupEdit) {
      axios.put(GET_API_STUDENTS_URL + `/HoiDongTotNghiep/UpdateHoiDong/${idHoiDong}/${idHocKy}/${idMonHoc}`, body, GetToken()).then(response => { alert(response.data.message) })
    }

    // setMaHoiDong('')
    // setTenHoiDong('')
    // setNgayBaoVe('')
  }

  function ConformDeleteCouncil(item) {
    // alert("Bạn có chắc muốn xóa hội đồng có id " + <span style={{ fontWeight: 'bold' }}>{item.idHoiDong}</span> + "không? ");
    setShowPopupMess(true)
    setMess("Bạn có chắc muốn xóa hội đồng có id " + item.maHoiDong + " không? ")
    setIdHoiDong(item.idHoiDong)
  }

  function Delete(){
      axios.delete(GET_API_STUDENTS_URL + `/HoiDongTotNghiep/DeleteHoiDongAsync/${idHoiDong}`, GetToken()).then(response => { alert(response.data.message) })
      setShowPopupMess(false)
  }

  function EditCouncil(item) {
    setIdHoiDong(item.idHoiDong)
    setShowPopupEdit(true)
    setMaHoiDong(item?.maHoiDong)
    setTenHoiDong(item?.tenHoiDong)
    // var d = new Date(item?.ngayBaoVe);
    // var n = d.toLocaleDateString();
    // setNgayBaoVe(n)
  }

  function closePopup() {
    setShowPopupAdd(false);
    setShowPopupEdit(false)
  }

  useEffect(() => {
    console.log(ngayBaoVe)

  }, [ngayBaoVe]);

  return (
    <>
      <StyledSemester.Flex>
        <div><HeaderMonHoc /></div>
        <div className="Body">
          {showPopupMess ? <div className="full-screen-popup">
            <div className="popup-mess">
              <div className="popup-mess-header">
                <span className="label-mess-header">Thông báo</span>
                <button className="close-mess-popup" onClick={() => setShowPopupMess(false)}>x</button>
              </div>
              <div className="popup-content">
                {mess}
                <button className="close-popup" onClick={() => setShowPopupMess(false)}>Hủy</button>
              <button className="close-popup" onClick={() => Delete()}>Xóa</button>
              </div>
            </div>
          </div> : ''}
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

          {showPopupAdd || showPopupEdit ? <div className="full-screen-popup">
            <div className="popup">
              <div className="popup-header">
                <span className="label-header">Hội đồng tốt nghiệp</span>
                <button className="close-popup" onClick={() => closePopup()}>x</button>
              </div>
              <div className="popup-content">
                {/* <h1>Quản lý các Folder</h1> */}
                <StyledSemester.Body>
                  <div className="container-add">
                    <div className="item">
                      <div className="item-title">Mã hội đồng</div>
                      <input className="item-input" required type="text" placeholder="Mã hội đồng" defaultValue={maHoiDong} onChange={(val) => setMaHoiDong(val.target.value)} />
                      {/* {!maHoiDong ?<p>Vui lòng nhập thông tin</p>:''} */}
                    </div>
                    <div className="item">
                      <div className="item-title">Tên hội đồng</div>
                      <input className="item-input" required type="text" placeholder="Tên hội đồng" defaultValue={tenHoiDong} onChange={(val) => setTenHoiDong(val.target.value)} />
                    </div>
                    <div className="item">
                      <div className="item-title">Ngày Bảo vệ</div>
                      <input className="item-input" required type="date" onChange={(val) => setNgayBaoVe(val.target.value)} />
                    </div>
                    <div className="item-submit">
                      <button className="submit-form" disabled={!maHoiDong || !tenHoiDong || !ngayBaoVe ? true : false} onClick={() => SaveCouncil()}>Lưu</button>
                    </div>
                  </div>
                </StyledSemester.Body>

              </div>
            </div>
          </div> : ''}
          <div>
            <h1 style={{ display: 'flex', marginRight: 'auto' }}>Danh sách Hội đồng tốt nghiệp
              <button className="button-add" onClick={() => setShowPopupAdd(true)}>Thêm mới</button>
              <button className="button-add-point-evaluationBoards" onClick={() => setShowPopup(true)}>Vào điểm</button>

            </h1>
            {isLoading ? (
              <div>Loading</div>
            ) : (
              <StyledSemester.Body>
                <table>
                  <thead>
                    <tr>
                      <th>Mã hội đồng</th>
                      <th>Tên hội đồng</th>
                      <th>Tên Môn học</th>

                      <th>Tên học kỳ</th>
                      <th>Địa điểm bảo vệ</th>
                      <th>Chi tiết</th>
                      <th>Phân công</th>
                      <th colspan="2">Hành động</th>

                    </tr>
                  </thead>
                  <tbody>
                    {evaluationBoardSelecter?.map((item, index) => (

                      <tr key={index}>
                        <td>{item.maHoiDong}</td>
                        <td>{item.tenHoiDong}</td>
                        <td>{item.tenMonHoc}</td>

                        <td>{item.tenHocKy}</td>
                        <td>Tầng 701-Bộ môn CNPM</td>
                        <td><StyledSemester.See><Link to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/hoi-dong-tot-nghiep/chi-tiet`}>Chi tiết</Link></StyledSemester.See></td>
                        <td >
                          <StyledSemester.See
                            onClick={() => onShow(item)}>
                            Đề tài
                          </StyledSemester.See>

                        </td>
                        <td><StyledSemester.ButtonAdd onClick={() => EditCouncil(item)}>sửa</StyledSemester.ButtonAdd></td>
                        <td><StyledSemester.Delete onClick={() => ConformDeleteCouncil(item)}>xóa</StyledSemester.Delete></td>

                      </tr>
                    ))}
                  </tbody>
                </table>
                <StyledSemester.Popup id="hide" style={hide ? { display: "none" } : { display: "block" }} >
                  <StyledSemester.PopupContent>
                    <div className="Divpopup">
                      <StyledSemester.PopupTitle>
                        <StyledSemester.Popuptext> Phân công đề tài cho hội đồng </StyledSemester.Popuptext>
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

export default EvaluationBoard;
