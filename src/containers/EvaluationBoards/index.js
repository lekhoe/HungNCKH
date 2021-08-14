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
import { API_COUNCIL, API_FILE, API_TEACHER, API_TOPIC } from "../../commonConstants/enpoint";
import Button from "../CommonComponent/Button/Button";
import Modal from "../CommonComponent/Modal/Modal";

const EvaluationBoard = () => {
  const GET_API_STUDENTS_URL = "https://api.quanlydoan.live/api"
  const dispatch = useDispatch();

  let { idMonHoc } = useParams();
  let { idHocKy } = useParams();
  let { tenHocKy } = useParams();
  let { tenMonHoc } = useParams();
  let { typeApprover } = useParams();

  const GET_API_FILE_URL = `https://api.quanlydoan.live/api/File/SearchAll/FolderName/`;
  // const evaluationBoardSelecter = useSelector((state) => state.reducerEvaluationBoard.list);
  const isLoading = useSelector((state) => state.reducerEvaluationBoard.isLoading);
  // console.log("evaluationBoardSelecter = ", evaluationBoardSelecter);
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
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [address, setAddress] = useState('');
  const [maHoiDong, setMaHoiDong] = useState('');
  const [tenHoiDong, setTenHoiDong] = useState('');
  const [tenMonHocDetail, setTenMonHocDetail] = useState('');
  const [diaDiem, setDiaDiem] = useState('');
  const [ngayBaoVe, setNgayBaoVe] = useState('');
  const [idHoiDong, setIdHoiDong] = useState('');
  const [idDetailCouncil, setIdDetailCouncil] = useState('');
  const [maGiangVien, setMaGiangvien] = useState('');
  const [mess, setMess] = useState('');
  const [showDetailCouncil, setshowDetailCouncil] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // const topicSelecter = useSelector((state) => state.reducerTopic.list);
  const [evaluationBoardSelecter, setEvaluationBoardSelecter] = useState([]);
  const [topicSelecter, setTopicSelecter] = useState([]);
  const [fileSelecter, setFileSelecter] = useState([]);
  const [listSelected, setListSelected] = useState([]);
  const [listTeacherChoose, setListTeacherChoose] = useState([]);
  const [listAddTeacherChoose, setListAddTeacherChoose] = useState([]);
  const [listPersonChoose, setListPersonChoose] = useState([]);
  const [showAddPerson, setShowAddPerson] = useState(true);
  const [fileName, setFileName] = useState('');
  const [idFile, setIdFile] = useState('');
  const [showPopupSaveFile, setShowPopupSaveFile] = useState(false);
  const [showPopupAddEdit, setShowPopupAddEdit] = useState(false);
  const [showPopupChooseFilePoint, setShowPopupChooseFilePoint] = useState(false);

  //call api--------------------------------

  //hàm call api lấy danh sách hội đồng
  function CallApiGetListCouncilOfSubject() {
    axios.get(API_COUNCIL.GET_API_COUNCIL_OF_SUBJECT.format(idHocKy, idMonHoc), GetToken()).then((response) => { setEvaluationBoardSelecter(response.data.data) })
  }

  //hàm call api lấy Danh sách đề tài chưa phân công trong môn học
  function CallApiGetListTopic() {
    axios.get(API_TOPIC.GET_API_TOPIC.format(idHocKy, idMonHoc), GetToken()).then((response) => { setTopicSelecter(response.data.data) })
  }

  //CALL api khi mở màn hình
  useEffect(() => {
    CallApiGetListCouncilOfSubject()
    CallApiGetListTopic()
  }, []);

  // useEffect(() => {
  //   dispatch(getFolders());

  // }, []);
  const onHide = () => {
    setHide(true);

  };

  const onShow = (item) => {
    setHide(false);
    setIdHoiDong(item.idHoiDong)
  };

  const handleChange = (selected) => {
    if (listSelected.find((item) => item.idDeTai == selected.idDeTai) != undefined) {
      setListSelected(listSelected.filter((item) =>
        item.idDeTai !== selected.idDeTai))
    }
    else {
      setListSelected(listSelected.concat([selected]))
    }
  }

  //download file
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

  //Thêm mới và sửa
  function SaveCouncil() {
    let body =
    {
      // "maHoiDong": maHoiDong,
      "tenHoiDong": tenHoiDong,
      "diaDiem": address,
      "ngayBaoVe": ngayBaoVe,
    }
    if (!showPopupEdit) {

      axios.post(GET_API_STUDENTS_URL + `/HoiDongTotNghiep/InsertHoiDong/${idHocKy}/${idMonHoc}`, body, GetToken()).then(response => { alert(response.data.message) })
    }else{
      axios.put(GET_API_STUDENTS_URL + `/HoiDongTotNghiep/UpdateHoiDong/${idHoiDong}/${idHocKy}/${idMonHoc}`, body, GetToken()).then(response => { alert(response.data.message) })
    }
    setShowPopupAddEdit(false)
    setTimeout(function () { CallApiGetListCouncilOfSubject() }, 500);
  }

  //confirm xóa hội đồng
  function ConformDeleteCouncil(item) {
    // alert("Bạn có chắc muốn xóa hội đồng có id " + <span style={{ fontWeight: 'bold' }}>{item.idHoiDong}</span> + "không? ");
    setShowPopupMess(true)
    setMaHoiDong(item.maHoiDong)
    setIdHoiDong(item.idHoiDong)
  }

  //call api xóa hội đồng
  function Delete() {
    axios.delete(GET_API_STUDENTS_URL + `/HoiDongTotNghiep/DeleteHoiDongAsync/${idHoiDong}`, GetToken()).then(response => { alert(response.data.message) })
    CallApiGetListCouncilOfSubject()
    setShowPopupMess(false)
  }

  //xử lý sụ kiện nhấn nút sửa hội đồng
  function EditCouncil(item) {
    setShowPopupAddEdit(true)
    setIdHoiDong(item.idHoiDong)
    setShowPopupEdit(true)
    setAddress(item?.diaDiem)
    setTenHoiDong(item?.tenHoiDong)
  }

  function ActionAdd(){
    setShowPopupAddEdit(true)
    setShowPopupEdit(false)
  }

  //call api phân đề tài 
  function TopicAssignment() {
    let body = [listSelected.map((item) => {
      return (
        {
          "idDeTai": item.idDeTai
        }
      )
    })];

    axios.post(API_COUNCIL.POST_API_COUNCIL_OF_SUBJECT.format(idHoiDong, idHocKy, idMonHoc), body[0], GetToken()).then(response => { alert(response.data.message) })
  }

  //xử lý sự kiện click chi tiết hội đồng
  function DetailCouncil(item) {
    setShowAddPerson(true)
    setshowDetailCouncil(true)
    setIdHoiDong(item.idHoiDong)
    setMaHoiDong(item?.maHoiDong)
    setTenHoiDong(item?.tenHoiDong)
    setTenMonHocDetail(item?.tenMonHoc)
    setDiaDiem(item?.diaDiem)
    CallAPIListPerson(item.idHoiDong)
  }

  //call api lấy danh sách giảng viên để chọn
  function GetListPersonAddCouncil() {
    setShowAddPerson(false)
    axios.get(API_TEACHER.GET_API_TEACHER_CHOOSE.format(idHocKy), GetToken()).then((response) => setListTeacherChoose(response.data.data))
  }

  //xử lý chọn giảng viên để thêm vào hội đồng
  function ChooseTeacherCouncil(selected) {
    if (listAddTeacherChoose.find((item) => item.idGVHDTheoKy == selected.idGVHDTheoKy) != undefined) {
      setListAddTeacherChoose(listAddTeacherChoose.filter((item) =>
        item.idGVHDTheoKy !== selected.idGVHDTheoKy))
    }
    else {
      setListAddTeacherChoose(listAddTeacherChoose.concat([selected]))
    }
  }

  //call api lấy danh sách thành viên
  function CallAPIListPerson(_idHoiDong) {
    axios.get(API_COUNCIL.GET_API_COUNCIL_DETAIL_LIST_PERSON.format(_idHoiDong), GetToken()).then((response) => setListPersonChoose(response.data.data))
  }

  //call api thêm giảng viên cho hội đồng
  function AddTeacherChoose() {
    let body = [listAddTeacherChoose.map((item) => {
      return (
        {
          "idGvhdTheoKy": item.idGVHDTheoKy
        }
      )
    })];
    axios.post(API_COUNCIL.POST_API_COUNCIL_LIST_PERSON.format(idHoiDong, idHocKy, idMonHoc), body[0], GetToken()).then(response => { alert(response.data.message) }).catch(err => { alert(err.response.data.message) })
    setShowAddPerson(true)
    setTimeout(function () { CallAPIListPerson(idHoiDong) }, 500);

  }

  //confirm xóa giảng viên trong hội đồng
  function DeleteTeacherInCouncil(item) {
    setIdDetailCouncil(item.idChiTietHoiDong)
    setMaGiangvien(item.maGVHD)
    setIdHoiDong(item.idHoiDong)
    setShowPopupDelete(true)
  }

  //call api xóa giảng viên trong hội đồng
  function CallApiDeleteTeacherInCouncil() {
    axios.delete(API_COUNCIL.DELETE_API_COUNCIL_PERSON.format(idDetailCouncil), GetToken()).then(response => { alert(response.data.message) })
    setShowPopupDelete(false)
    setTimeout(function () { CallAPIListPerson(idHoiDong) }, 500);
  }

  //Xuất file excel 
  function ExportFileCouncil() {
    axios.get(API_FILE.GET_API_DOWNLOAD_FILE_COUNCIL.format(idHocKy, idMonHoc)
      , {
        responseType: 'blob',
        headers: {
          //"content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          // "Accept": "application/json",
          Authorization: 'Bearer ' + `${Cookies.get('token')}`
        }
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        window.open(url);

      })
      .catch((err) => {
        //reject(err);
      });
  }

  //xác nhận file vào điểm
  function ConfirmSaveFilePoint(item){
    setFileName(item.fileName)
    setIdFile(item.idFile)
    setShowPopupSaveFile(true)
  }

function CallApiSaveFilePoint(){
  axios.post(API_COUNCIL.POST_API_COUNCIL_POINT.format(idFile, idMonHoc),'', GetToken()).then((response)=>{alert(response.data.message)})
  setShowPopupSaveFile(false)
  setShowPopupChooseFilePoint(false)
}

useEffect(() => {
  if(!showPopupAddEdit)
  {
    setTenHoiDong("")
    setAddress("")
  }
}, [showPopupAddEdit]);

  return (
    <>
    <Modal
        show={showPopupMess}
        mess={"Bạn có muốn Xóa hội đồng " + maHoiDong +  " không?"}
        button={[
          <Button
            name={"Hủy"}
            onClick={()=>setShowPopupMess(false)}
          />,
          <Button
            name={"Xóa"}
            background={'#e74c3c'}
            color
            onClick={()=>Delete()}
          />
        ]}
        onClickClose={()=>setShowPopupMess(false)}
      />
      <Modal
        show={showPopupAddEdit}
        title={"Thêm mới Hội đồng"}
        body={[
          <div className="container-add">
          {/* <div className="item">
            <div className="item-title">Mã hội đồng</div>
            <input className="item-input" required type="text" placeholder="Mã hội đồng" defaultValue={maHoiDong} onChange={(val) => setMaHoiDong(val.target.value)} />
            {!maHoiDong ?<p>Vui lòng nhập thông tin</p>:''}
          </div> */}
          <div className="item">
            <div className="item-title">Tên hội đồng</div>
            <input className="item-input" required type="text" placeholder="Tên hội đồng" defaultValue={tenHoiDong} onChange={(val) => setTenHoiDong(val.target.value)} />
          </div>
          <div className="item">
            <div className="item-title">Ngày Bảo vệ</div>
            <input className="item-input" required type="date" onChange={(val) => setNgayBaoVe(val.target.value)} />
          </div>
          <div className="item">
            <div className="item-title">Địa điểm bảo vệ</div>
            <input className="item-input" required type="text" placeholder="Địa điểm bảo vệ" defaultValue={address} onChange={(val) => setAddress(val.target.value)} />
            {/* {!maHoiDong ?<p>Vui lòng nhập thông tin</p>:''} */}
          </div>
          {/* <div className="item-submit">
            <button className="submit-form" disabled={!tenHoiDong || !ngayBaoVe ? true : false} onClick={() => SaveCouncil()}>Lưu</button>
          </div> */}
        </div>]}
        button={[
          <Button
            name={"Lưu"}
            background={"#2ecc71"}
            onClick={() => SaveCouncil()}
            disabled={!tenHoiDong || !ngayBaoVe || !address ? true : false}
          />
        ]}
        onClickClose={()=> setShowPopupAddEdit(false)}
      />
      <Modal
        show={showPopupChooseFilePoint}
        title={"Tệp điểm"}
        body={
          !showFile ? [
            <div className="list-folder">
              {folderSelecter.map((item, index) => {
                return (
                  <div className="folder-choose-point" key={index} onClick={() => callApiLoadFile(item)}>
                    <div className="folder-icon"><FcFolder /></div>
                    <div className="name-folder">{item.folderName}</div>
                  </div>
                );
              })}
            </div>
          ] :
            [
              <div className="list-folder">
                {fileSelecter?.map((item, index) => (
                  <div className="folder-choose-point" key={index} onClick={() => ConfirmSaveFilePoint(item)}>
                    <div className="folder-icon"><ImFileExcel /></div>
                    <div className="name-folder">{item.fileName}</div>
                  </div>
                ))}
              </div>]}
        button={showFile ? [
          <Button
            name={"Folder"}
            onClick={() => setShowFile(false)}
          />
        ] : ''}
        onClickClose={()=> setShowPopupChooseFilePoint(false)}
      />
      <Modal
        show={showPopupSaveFile}
        mess={"Bạn có muốn nhập điểm từ file " + fileName +  " không?"}
        button={[
          <Button
            name={"Hủy"}
            onClick={()=>setShowPopupSaveFile(false)}
          />,
          <Button
            name={"OK"}
            background={'#3498db'}
            color
            onClick={()=>CallApiSaveFilePoint()}
          />
        ]}
        onClickClose={()=>setShowPopupSaveFile(false)}
      />
      <Modal
        width={'1000px'}
        show={showDetailCouncil}
        onClickClose={() => setshowDetailCouncil(false)}
        button={[
          <Button
            name={'Đóng'}
            onClick={() => !showAddPerson ? setShowAddPerson(true) : setshowDetailCouncil(false)}
          />
        ]}
        title={'Chi tiết hội đồng:   ' + maHoiDong}
        body={[
          showAddPerson ? (<div className="council-content">
            <div className="council-name">
              <div className="council-name-title">
                Tên hội đồng:
              </div>
              <div className="council-name-detail">
                {tenHoiDong}
              </div>
            </div>
            <div className="council-name">
              <div className="council-name-title">
                Tên môn học:
              </div>
              <div className="council-name-detail">
                {tenMonHocDetail}
              </div>
            </div>
            <div className="council-name">
              <div className="council-name-title">
                Địa điểm bảo vệ:
              </div>
              <div className="council-name-detail">
                {diaDiem}
              </div>
            </div>
            <div className="list-teacher-council">
              <div className="list-teacher-council-header">
                <div className="list-teacher-council-header-title">Thành viên</div>
                <div className="list-teacher-council-header-button-add">
                  <Button
                    name={'Thêm'}
                    onClick={() => GetListPersonAddCouncil()}
                  />
                </div>
              </div>
              <div className="list-teacher-council-content">
                <div className="list-teacher-council-content-list">
                  <table className="table-list" border='1px'>
                    <thead>
                      <tr>
                        <th>Mã giảng viên</th>
                        <th>Tên giảng viên</th>
                        <th>Email</th>
                        <th>Điện thoại</th>
                        <th>Đơn vị công tác</th>
                        <th>Quản lý</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listPersonChoose?.map((item, index) => (

                        <tr key={index}>
                          <td>{item.maGVHD}</td>
                          <td>{item.tenGVHD}</td>
                          <td>{item.email}</td>
                          <td>{item.dienThoai}</td>
                          <td>{item.donViCongTac}</td>
                          <td>{item.type == "NgoaiTruong" ? 'Ngoài trường' : 'Trong trường'}</td>
                          <td><Button
                            name={'Xóa'}
                            background={'#e74c3c'}
                            color={'#ffffff'}
                            onClick={() => { DeleteTeacherInCouncil(item) }}
                          /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>) : (
            <div className="add-person-council">
              <div className="add-person-council-header">
                <Button
                  name={'Lưu'}
                  background={'#2ecc71'}
                  color={'#ffffff'}
                  onClick={() => AddTeacherChoose()}
                  disabled={listAddTeacherChoose == '' ? true : false}
                />
              </div>
              <table className="table-list" border='1px'>
                <thead>
                  <tr>
                    <th>Mã giảng viên</th>
                    <th>Tên giảng viên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Đơn vị công tác</th>
                    <th>Chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {listTeacherChoose?.map((item, index) => (

                    <tr key={index}>
                      <td style={{ textAlign: 'center' }}>{item.maGVHD}</td>
                      <td>{item.tenGVHD}</td>
                      <td>{item.email}</td>
                      <td style={{ textAlign: 'center' }}>{item.dienThoai}</td>
                      <td>{item.donViCongTac}</td>
                      <td>
                        <input
                          type="checkbox"
                          value={item.id}
                          id="checkbox1"
                          onChange={() => ChooseTeacherCouncil(item)}
                        />
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ]}
      />
      <Modal
        show={showPopupDelete}
        mess={'Bạn có muốn xóa giảng viên ' + maGiangVien + ' ?'}
        button={[
          <Button
            name={'Hủy'}
            onClick={() => setShowPopupDelete(false)}
          />,
          <Button
            name={'Xóa'}
            background={'#e74c3c'}
            color={'#ffffff'}
            onClick={() => CallApiDeleteTeacherInCouncil()}
          />
        ]}
        onClickClose={() => setShowPopupDelete(false)}
      />
      <StyledSemester.Flex>
        <div><HeaderMonHoc /></div>
        <div className="Body">
          {/* {showPopupMess ? <div className="full-screen-popup">
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
          </div> : ''} */}
          <div className="BodyDiv">
            <h1 style={{ display: 'flex', marginRight: 'auto' }}>Hội đồng - {tenHocKy}

            </h1>
            {isLoading ? (
              <div>Loading</div>
            ) : (
              <StyledSemester.Body>
                <div className="download-file-council">
                  <Button
                    name={"Thêm mới"}
                    background={"#3498db"}
                    color={"#ffffff"}
                    className={"button-add-council"}
                    onClick={() => ActionAdd()}
                  />
                  <Button
                    name={"Vào điểm"}
                    background={"#f39c12"}
                    color={"#ffffff"}
                    className={"button-add-point-evaluationBoards-council"}
                    onClick={() => setShowPopupChooseFilePoint(true)}
                  />
                  <Button
                    name={"Xuất Excel"}
                    background={"#1abc9c"}
                    color={"#ffffff"}
                    className={"download-file-council-button"}
                    onClick={() => ExportFileCouncil()}
                  />
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Mã hội đồng</th>
                      <th>Tên hội đồng</th>
                      <th>Tên Môn học</th>
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
                        <td>{item.diaDiem}</td>
                        <td><Button
                          name={'Chi tiết'}
                          onClick={() => { DetailCouncil(item) }
                          }
                        /></td>
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
                        <Button
                          name={"Lưu"}
                          background={'#2ecc71'}
                          color={'#ffffff'}
                          onClick={() => { TopicAssignment() }}
                          disabled={listSelected == '' ? true : false}
                        />
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
