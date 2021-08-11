import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { API_STUDENT } from '../../commonConstants/enpoint';
import Headers from '../../layout/Header';
import GetToken from '../Login/getToken';
import { getSemesters } from '../Semesters/action';
import { StyledSemester } from '../Semesters/styled';
import { getStudentLocals, getStudents } from './action';
import './student.css';
import Button from '../CommonComponent/Button/Button';

const StudentList = () => {
  const [idSinhVien, setIdSinhVien] = useState("");
  const [maSinhVien, setMaSinhVien] = useState("");
  const [tenSinhVien, setTenSinhVien] = useState("");
  const [email, setEmail] = useState("");
  const [dienThoai, setDienThoai] = useState("");
  const [donViThucTap, setDonViThucTap] = useState("");
  const [lopHoc, setLopHoc] = useState("");
  const [studentListSelecter, setStudentListSelecter] = useState([]);
  const [studentListSelecter1, setStudentListSelecter1] = useState([]);
  const [listSelected, setListSelected] = useState([]);
  const [hide, setHide] = useState(true);

  const dispatch = useDispatch();

  let { idHocKy } = useParams();
  // const StudentListSelecter = useSelector((state) => state.reducerStudentList.list);
  const SemesterSelecter = useSelector((state) => state.reducerSemester.list);

  const idBoMonselect = SemesterSelecter[0]?.idBoMon;
  // console.log("idBoMon ", idBoMonselect);

  // thêm mới sinh viên 
  const onShow = () => {
    setHide(false);

  };
  const onHide = () => {
    setHide(true);

  };
  useEffect(() => {
    dispatch(getStudentLocals(idBoMonselect));
  }, []);
  // const StudentListSelecter1 = useSelector((state) => state.reducerStudentList.list1);

  //Call api
  useEffect(() => {
    // dispatch(getSemesters());
    CallApiGetDataStudentChoose()
  }, []);

  useEffect(() => {
    if (hide == false)
      axios.get(API_STUDENT.GET_API_STUDENT.format(idBoMonselect)).then((response) => { setStudentListSelecter1(response.data.data) }).catch((err) => { alert(err.response.data.message) })

  }, [hide]);

  function CallApiGetDataStudentChoose() {
    axios.get(API_STUDENT.GET_API_STUDENT_CHOOSE.format(idHocKy), GetToken()).then((response) => { setStudentListSelecter(response.data.data) }).catch((err) => { alert(err.response.data.message) })
  }

  //Funtion xử lý nghiệp vụ
  function handleChange(selected) {
    if (listSelected.find((item) => item.maSinhVien == selected.maSinhVien) != undefined) {
      setListSelected(listSelected.filter((item) =>
        item.maSinhVien !== selected.maSinhVien))
    }
    else {
      setListSelected(listSelected.concat([selected]))
    }
  }

  function ChooseStudent() {
    let body = [listSelected.map((item) => {
      return ({
        "maSinhVien": item.maSinhVien,
        "tenSinhVien": item.hoTen,
        "email": item.homThu,
        "dienThoai": item.dienThoai,
        "donViThucTap": '',
        "maLopHoc": item.maLop,
        "lopHoc": item.tenLop,
        "maChuyenNganh": item.maChuyenNganh,
        "tenChuyenNganh": item.tenChuyenNganh
      })
    })]
    console.log(body)
    axios.post(API_STUDENT.INSERT_API_LIST_STUDENT.format(idHocKy), body[0], GetToken()).then(response => { console.log(response) })
    setHide(true)
    setTimeout(function () { CallApiGetDataStudentChoose(); }, 500);
  }

  function InputUpdatePracticeUnit(item) {
    setIdSinhVien(item.idSinhVien)
  }

  function UpdatePracticeUnit() {
    let body = [{
      "idSinnhVien": idSinhVien,
      "donViThucTap": donViThucTap,
    }]
    axios.put(API_STUDENT.UPDATE_API_STUDENT.format(idSinhVien), body, GetToken()).then(response => { console.log(response) })
    setTimeout(function () { CallApiGetDataStudentChoose(); }, 500);
  }
  return (
    < >
      <StyledSemester.Popup id="hide" style={hide ? { display: "none" } : { display: "block" }} >
        <StyledSemester.PopupContent>
          <div className="Divpopup">
            <StyledSemester.PopupTitle>
              <StyledSemester.Popuptext> Thêm sinh viên </StyledSemester.Popuptext>
              <StyledSemester.Close onClick={onHide}>&times;</StyledSemester.Close>
            </StyledSemester.PopupTitle>
            <div className="save">
              <Button
                name={"Lưu"}
                background={'#2ecc71'}
                color={"#ffffff"}
                onClick={() => { ChooseStudent() }}
                className={'save-studen-button'}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Mã sinh viên</th>
                  <th>Tên sinh viên</th>
                  <th>Hòm thư</th>
                  <th>Điện thoại</th>
                  <th>Tên Môn học</th>
                  <th>Tên Lớp</th>

                  <th>Chọn</th>

                </tr>
              </thead>
              <tbody>
                {studentListSelecter1?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.maSinhVien}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.tenSinhVien}</td>
                    <td>{item.homThu}</td>
                    <td>{item.dienThoai}</td>
                    <td>{item.tenLop}</td>
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
      <StyledSemester.Flex>
        <div><Headers /></div>
        <div className="Body">
          <div className="BodyDiv">

            <h1>Danh sách Sinh viên</h1>
            <div className="save-studen">
              {/* <button className="button-save-student" onClick={() => ChooseStudent()}>Lưu</button> */}
              <Button
                name={"Thêm sinh viên"}
                background={'#2ecc71'}
                color={"#ffffff"}
                onClick={() => setHide(false)}
                className={'save-studen-button'}
              />
            </div>
            <StyledSemester.Body style={{height: '470px', overflowY: "scroll"}}>
              {/* <StyledSemester.ButtonAdd  onClick={()=> onShow()}>Thêm sinh viên</StyledSemester.ButtonAdd> */}
              <table>
                <thead>
                  <tr>
                    <th>Mã Sinh viên</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Điện thoại</th>
                    <th>Đơn vị thực tập</th>
                    <th>Lớp học</th>
                    <th>Chuyên ngành</th>

                  </tr>
                </thead>
                <tbody>
                  {studentListSelecter?.map((item, index) => (

                    <tr key={index}>

                      <td>{item.maSinhVien}</td>
                      <td>{item.tenSinhVien}</td>
                      <td>{item.email}</td>
                      <td>{item.dienThoai}</td>
                      <td><div onClick={() => InputUpdatePracticeUnit(item)}><input className="input-practice-unit" onChange={(val) => setDonViThucTap(val.target.value)} onBlur={() => UpdatePracticeUnit()} defaultValue={item.donViThucTap} value={index.donViThucTap} /></div></td>
                      <td>{item.lopHoc}</td>
                      <td>{item.tenChuyenNganh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </StyledSemester.Body>
          </div>
        </div>
      </StyledSemester.Flex>
    </>
  );
};

export default StudentList;