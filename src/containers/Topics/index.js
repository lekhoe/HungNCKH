import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import HeaderMonHoc from '../../layout/HeaderMonHoc';
import { getLisTeacherSemesters } from '../ListTeacherSemesters/action';
import { StyledSemester } from '../Semesters/styled';
import TopicDetail from '../TopicDetail';
import { getTopics } from './action';
import './topic.css';
import { getFolders } from './action';
import { FcFolder } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import axios from "axios";
import GetToken from "../Login/getToken";
import Modal from '../CommonComponent/Modal/Modal';
import Button from '../CommonComponent/Button/Button';
import { API_FILE, API_TOPIC } from '../../commonConstants/enpoint';
import { ImFileExcel } from 'react-icons/im';
import Cookies from 'js-cookie';


const Topic = () => {
  let { idHocKy } = useParams();
  let { tenHocKy } = useParams();
  let { tenMonHoc } = useParams();
  let { idMonHoc } = useParams();
  let { typeApprover } = useParams();
  let {idBoMon} =useParams();
  const GET_API_STUDENTS_URL = "https://api.quanlydoan.live/api"
  //upload file ex
  const fileSelecters = useSelector((state) => state.reducerFile.list);

  //const [fileSelecters, setFileSelecters] = useState([]);
  const [addFileEx, setAddFileEx]= useState(false);

  // function CallApiGetListSemester() {
  //   axios.get(GET_API_STUDENTS_URL + ``, GetToken()).then((response) => { setSemesterSelecter(response.data.data) })
  // };
  const submitFileEx =(idFile) =>{

    axios.post(GET_API_STUDENTS_URL + `/SinhVien/InsertExcel/${idFile}/${idHocKy}`,'', GetToken()).then(response => { alert(response.data.message+ "abc")}).catch(err => {alert(err.response.data.message)}) ;
    setAddFileEx(false);

  }
//--------------------
  const [showPopupAdd, setShowPopupAdd] = useState(false);
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [showPopupInputPoint, setShowPopupInputPoint] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showPopupDetail, setShowPopupDetail] = useState(false);
  const [idDeTai, setidDeTai] = useState('');
  const [maDeTai, setMaDeTai] = useState('');
  const [tenDeTai, setTenDeTai] = useState('');
  const [idStudent, setIdStudent] = useState('0');
  const [listStudent, setListStudent] = useState([]);
  const [detailTopic, setDetailTopic] = useState([]);
  const [messRespon, setMessRespon] = useState('');
  const [point, setPoint] = useState('');
  const [showFile, setShowFile] = useState(false);
  const [fileSelecter, setFileSelecter] = useState([]);
  const [topicSelecter, setTopicSelecter] = useState([]);

  const dispatch = useDispatch();
  // const topicSelecter = useSelector((state) => state.reducerTopic.list);
  // console.log("topicSelecter " + topicSelecter);
  let match = useRouteMatch();
  const [hide, setHide] = useState(false);

  function CallApiGetListTopic() {
    axios.get(API_TOPIC.GET_API_TOPIC_ALL.format(idHocKy, idMonHoc), GetToken()).then((response) => setTopicSelecter(response.data.data))
  }

  useEffect(() => {
    CallApiGetListTopic()
    axios.get(GET_API_STUDENTS_URL + `/SinhVien/SinhVienGetAll/${idHocKy}`, GetToken()).then(response => { setListStudent(response.data.data) });
  }, []);



  useEffect(() => {
    return () => {
      setHide(false);
    }
  }, [])
  //------------phân công phản biện-------------
  const [hide1, setHide1] = useState(true);
  const teacherSelecter = useSelector((state) => state.reducerListTeacherSemester.list);
  useEffect(() => {
    dispatch(getLisTeacherSemesters(idHocKy));
  }, []);
  // console.log("teacherSelecter = ", teacherSelecter);
  const handleChange = () => {

  }
  const onShow = () => {
    setHide1(false);

  }
  const onShow1 = () => {
    setHide1(false);
    setAssign(false);

  }

  //--- phân công hội đồng---------
  const [assign, setAssign] = useState(true);
  const folderSelecter = useSelector((state) => state.reducerFolder.list);
  useEffect(() => {
    dispatch(getFolders());
    console.log("danh sach sinh vien", listStudent)
  }, []);
  // console.log("folderSelecter.folderName = ", folderSelecter);

  function closePopup() {
    setShowPopupAdd(false);
    setShowPopupEdit(false)
    setShowPopupInputPoint(false)
    setShowPopupDelete(false)
    
  }

  function SaveTopic() {
    let body =
    {
      "tenDeTai": tenDeTai,
      "diemTrungBinh": 0,
      "isApprove": true
    }
    if (showPopupAdd) {

      axios.post(GET_API_STUDENTS_URL + `/DeTai/InsertDeTai/${maDeTai}/${idHocKy}/${idMonHoc}/${idStudent}`, body, GetToken()).then(response => { alert(response.data.message) }).catch((err) => alert(err.response.data.message))
    }
    if (showPopupEdit) {
      axios.put(GET_API_STUDENTS_URL + `/DeTai/Update/${idDeTai}`, body, GetToken()).then(response => { alert(response.data.message) })
    }
    if (showPopupInputPoint) {
      axios.put(GET_API_STUDENTS_URL + `/DeTai/UpdateDiemSX/${idDeTai}/${point}`, body, GetToken()).then(response => { alert(response.data.message) })
    }
    setShowPopupEdit(false)
    setShowPopupAdd(false)
    setShowPopupInputPoint(false)
    setTenDeTai('')
    setMaDeTai('')
  }

  function EditTopic(item) {
    setShowPopupEdit(true)
    setPoint(item.diemTrungBinh)
    setMaDeTai(item.maDeTai)
    setTenDeTai(item.tenDeTai)
    setidDeTai(item.idDeTai)
  }

  function InputPoint(item) {
    setShowPopupInputPoint(true)
    setPoint(item.diemTrungBinh)
    setMaDeTai(item.maDeTai)
    setTenDeTai(item.tenDeTai)
    setidDeTai(item.idDeTai)
  }

  function ConsfirmDeleteTopic(item) {
    setidDeTai(item.idDeTai)
    setMaDeTai(item.maDeTai)
    setShowPopupDelete(true)
  }

  function DeleteTopic() {
    axios.delete(API_TOPIC.DELETE_API_TOPIC.format(idDeTai), GetToken()).then((response) => { alert(response.data.message) })
    setShowPopupDelete(false)
  }

  function CallApiGetTeacherInTopic(item) {
    axios.get(API_TOPIC.GET_API_TOPIC_DETAIL_LIST.format(item.idDeTai), GetToken()).then((response) => { setDetailTopic(response.data.data) })
    setShowPopupDetail(true)
  }
  //setDetailTopic(response.data.data)
  useEffect(() => {
    console.log(detailTopic[0]?.chiTietDeTai[0])
  }, [detailTopic]);
  // const DetailTopic = (item) => {
  //   setTenDeTai(item.tenDeTai)
  //   setMaDeTai(item.maDeTai)
  //   setShowPopupDetail(true)


  // }

  function callApiLoadFile(item) {
    setShowFile(true);
    try {
      axios.get(API_FILE.GET_API_FILE_LIST.format(item.id), GetToken()).then(response => { setFileSelecter(JSON.parse(response.request.response)) })
    } catch (error) { }

  }

  //download file
  // fun someFunction = (idFile, fileUrl) => {

  //   console.log("id ", idFile);

  //   const method = `GET`;
  //   const url = `https://api.quanlydoan.live/api/File/downloads/${idFile}`;

  //   axios
  //     .request({
  //       url,
  //       headers: {
  //         'Authorization': 'Bearer ' + `${Cookies.get('token')}`,
  //       },

  //       method,

  //       responseType: `blob`, //important
  //     })
  //     .then(({ data }) => {
  //       const downloadUrl = window.URL.createObjectURL(new Blob([data]));
  //       const link = document.createElement('a');
  //       link.href = downloadUrl;
  //       link.setAttribute('download', fileUrl); //any other extension
  //       document.body.appendChild(link);
  //       link.click();
  //       link.remove();
  //     });

  // }

  //Gọi api tính điểm cho đề tài
  function CallApiScoring() {
    axios.put(API_TOPIC.PUT_API_TOPIC_SCORING.format(idHocKy, idMonHoc), '', GetToken()).then((response) => { alert(response.data.message) }).catch((err) => { alert(err.response.data.message) })
    setTimeout(function () { CallApiGetListTopic() }, 500);
    
  }


  return (
    <>
      
      <Modal
        width={'1000px'}
        show={showPopupDetail}
        onClickClose={() => setShowPopupDetail(false)}
        button={[
          <Button
            name={'Đóng'}
            onClick={() => setShowPopupDetail(false)}
          />
        ]}
        title={'Chi tiết đề tài:   ' + maDeTai}
        body={[
          <div className="council-content">
            <div className="council-name">
              <div className="council-name-title">
                Tên đề tài:
              </div>
              <div className="council-name-detail">
                {detailTopic[0]?.tenDeTai}
              </div>
            </div>
            <div className="council-name">
              <div className="council-name-title">
                Tên môn học:
              </div>
              <div className="council-name-detail">
                {detailTopic[0]?.tenMonHoc}
              </div>
            </div>
            <div className="list-teacher-council">
              <div className="list-teacher-council-header">
                <div className="list-teacher-council-header-title">Giảng viên hướng dẫn</div>
                <div className="list-teacher-council-header-button-add">
                  {/* <Button
                    name={'Thêm'}
                    onClick={() => GetListPersonAddCouncil()}
                  /> */}
                </div>
              </div>
              <div className="list-teacher-council-content">
                <div className="list-teacher-council-content-list">
                  <table className="table-list" border='1px'>
                    <thead>
                      <tr>
                        <th>Mã giảng viên</th>
                        <th>Tên giảng viên</th>
                        <th>Nhận xét</th>
                        <th>Điểm số</th>
                        {/* <th>Xóa</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {detailTopic[0]?.chiTietDeTai?.map((item, index) => (

                        <tr key={index}>
                          <td>{item.maGVHD}</td>
                          <td>{item.tenGVHD}</td>
                          <td>{item.nhanXet}</td>
                          <td>{item.diemSo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ]}
      />
      <Modal 
      show={addFileEx}
      onClickClose={() => setAddFileEx(false)}
      title={'Thêm File Excel'}
      body={[
        <div>
        {/* <form onSubmit={submitForm}>
        <br />
        <input type="file" onChange={(e) => setUploadFile(e.target.files[0])} />
        <br />
        <input type="submit" />
      </form> */}

{fileSelecters?.map ((item, index ) => (
                        <StyledSemester.Flex>
                        <div className="bodyFile" key={index} onClick={()=>submitFileEx(item.idFile)}>
                            <div className="iconFile"><ImFileExcel /></div>
                    <div className="nameFile">{item.fileName}</div>
                    
                   

                    </div>
                    </StyledSemester.Flex>
       ))}
      </div>
     
      ]}
      />
      <Modal
        show={showPopupAdd || showPopupEdit || showPopupInputPoint || showPopupDelete}
        title={showPopupAdd ? 'Thêm đề tài' : showPopupEdit ? 'Sửa đề tài' : showPopupDelete ? 'Thông báo' : 'Sửa điểm'}
        body={[
          showPopupDelete == false ? (<div className="container-add">
            <div className="item">
              <div className="item-title">Tên đề tài</div>
              {!showPopupInputPoint ?
                <input className="item-input" required type="text" placeholder="Tên đề tài" autoFocus={true} defaultValue={tenDeTai} onChange={(val) => setTenDeTai(val.target.value)} />
                :
                <input className="item-input" required type="text" placeholder="Tên đề tài" defaultValue={tenDeTai} readOnly />
              }

            </div>
            {!showPopupEdit && !showPopupInputPoint ? <select onChange={(val) => setIdStudent(val.target.value)} className="dropdown-choose-studen">
              <option value={'0'}>
                Chọn sinh viên - - -
              </option>,
              {listStudent?.map((item, index) => (
                <option value={item.idSinhVien}>
                  {item.tenSinhVien} ({item.maSinhVien})
                </option>
              ))}
            </select> : <div className="item">
              <div className="item-title">Nhập điểm</div>
              {typeApprover == "GangVien" && !showPopupEdit ?
                <input className="item-input" required type="text" placeholder="Nhập điểm" defaultValue={point} autoFocus={true} onChange={(val) => setPoint(val.target.value)} />
                :
                <input className="item-input" required type="text" placeholder="Nhập điểm" defaultValue={point} readOnly />}

            </div>}
            {/* <div className="item-submit">
            <button className="submit-form" disabled={ tenDeTai == '' ? true : false} onClick={() => SaveTopic()}>Lưu</button>
          </div> */}
          </div>) : (
            <div className="container-add">Bạn có muốn xóa đề tài {maDeTai} ?</div>
          )
        ]}
        onClickClose={() => closePopup()}
        button={showPopupDelete == false ? [
          <Button
            name={'Lưu'}
            onClick={() => SaveTopic()}
            disabled={tenDeTai == '' ? true : false}
          />] :
          [
            <Button
              name={'Hủy'}
              onClick={() => setShowPopupDelete(false)}
            />,
            <Button
              name={'Xóa'}
              background={'#e74c3c'}
              color={'#ffffff'}
              onClick={() => DeleteTopic()}
            />
          ]}
      />
      <StyledSemester.Flex>
        <div><HeaderMonHoc /></div>
        <div className="Body">

          <div className="BodyDiv">
            <div style={hide ? { display: "block" } : { display: "none" }}>
            </div>
            <div >
              <h1
                style={{ display: 'flex', alignItems: 'center' }}>{hide ? "" : `Đề tài - ${tenHocKy}`}
                {/* <button className="button-add" onClick={() => setShowPopupAdd(true)}>Thêm mới</button>
                <button className="button-add-point" onClick={() => setShowPopup(true)}>Tính điểm</button> */}
              </h1>
              <StyledSemester.Body >
                <div className="download-file-council">
                  <Button
                    name={"Thêm mới"}
                    background={"#3498db"}
                    color={"#ffffff"}
                    className={"button-add-council"}
                    onClick={() => setShowPopupAdd(true)}
                  />
                  <Button
                    name={"Thêm mới bằng file excel"}
                    background={"#3498db"}
                    color={"#ffffff"}
                    className={"button-add-council"}
                    onClick={() => setAddFileEx(true)}
                  />
                  <Button
                    name={"Tính điểm"}
                    background={"#f39c12"}
                    color={"#ffffff"}
                    className={"button-add-point-evaluationBoards-council"}
                    onClick={() => CallApiScoring()}
                  /></div>
                <table style={hide ? { display: "none" } : { display: "inline-table" }}>
                  <thead>
                    <tr>
                      <th>Mã đề tài</th>
                      <th>Tên đề tài</th>
                      <th>Tên sinh viên</th>
                      <th>Tên Học kỳ</th>
                      <th>Tên Môn học</th>
                      <th>Điểm trung bình</th>
                      {/* <th>Đạt</th> */}
                      {/* <th style={typeApprover<2 ? {display: "none"} : {display: "block"}}>Phân công</th> */}

                      <th colspan={typeApprover == "GangVien" ? "4" : "3"}>Hành động</th>

                      {/* <th>Chi tiết đề tài</th> */}
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
                        <td>{item.diemTrungBinh}</td>
                        {/* <td>{item.isDat}</td> */}
                        {typeApprover == "GangVien" ? <td><StyledSemester.ButtonAdd onClick={() => InputPoint(item)}>Nhập điểm</StyledSemester.ButtonAdd></td> : ''}
                        <td><StyledSemester.ButtonAdd onClick={() => EditTopic(item)}>Sửa</StyledSemester.ButtonAdd></td>
                        <td><StyledSemester.Delete onClick={() => ConsfirmDeleteTopic(item)}>Xóa</StyledSemester.Delete></td>
                        <td><StyledSemester.See onClick={() => CallApiGetTeacherInTopic(item)}>Chi tiết</StyledSemester.See></td>


                      </tr>

                    ))}
                  </tbody>
                </table>
                <StyledSemester.Popup id="hide" style={hide1 ? { display: "none" } : { display: "block" }} >
                  <StyledSemester.PopupContent>
                    <div className="Divpopup">
                      <StyledSemester.PopupTitle>
                        <StyledSemester.Popuptext> Phân công giảng viên phản biện </StyledSemester.Popuptext>
                        {/* <StyledSemester.Close onClick={DetailTopic}>&times;</StyledSemester.Close> */}
                      </StyledSemester.PopupTitle>
                      <div className="save">
                        <StyledSemester.ButtonAdd>Lưu</StyledSemester.ButtonAdd>
                      </div>
                      <table className="table">
                        <div className="scroll-table">
                          <thead>
                            <tr>
                              <th>Mã Giảng viên</th>
                              <th>Họ tên</th>
                              <th>Đơn vị công tác</th>
                              <th>Hòm thư</th>
                              <th>Điện thoại</th>
                              <th>Chọn</th>

                            </tr>
                          </thead>
                          <tbody>
                            {teacherSelecter?.map((item, index) => (
                              <tr key={index}>
                                <td>{item.maGVHD}</td>
                                <td>{item.tenGVHD}</td>
                                <td>{item.donViCongTac}</td>
                                <td>{item.email}</td>
                                <td>{item.dienThoai}</td>
                                <td><input
                                  type="checkbox"
                                  value={item.id}
                                  id="checkbox1"
                                  onChange={() => handleChange(item)}
                                /></td>
                              </tr>
                            ))}

                          </tbody>
                        </div>
                      </table>

                    </div>
                  </StyledSemester.PopupContent>
                </StyledSemester.Popup>

              </StyledSemester.Body>
            </div>

          </div>
        </div>
      </StyledSemester.Flex>
    </>
  );
};

export default Topic;