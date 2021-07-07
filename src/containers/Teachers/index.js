import axios from "axios";
import { get } from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from 'react-router'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Headers from "../../layout/Header";
import { getSemesters } from "../Semesters/action";
import { StyledSemester } from "../Semesters/styled";
import { getTeachers, getTeacherSuccess } from "./action";
import ListTeacher from "../ListTeachers";
import GetToken from '../Login/getToken';

const Teacher = () => {
  const dispatch = useDispatch();
  let { idHocKy } = useParams();
  const [maGiangVien, setMaGiangVien] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [donViCongTac, setDonViCongTac] = useState("");
  const [dienThoai, setDienThoai] = useState("");
  const [listSelected, setListSelected] = useState([]);
  const GET_API_TEACHERS_URL = "http://localhost:8006/api/GiangVien/get-thongtin_giangvien";
  const API_POST_TEACHERS_URL = "https://api.quanlydoan.live/api/api/GiangVienHuongDan";



  // const teacherSelecter = useSelector((state) => console.log("khỏe lê", state));
  const [teacherSelecter, setTeacherSelecter] = useState([]);

  const isLoading = useSelector((state) => state.reducerTeacher.isLoading);

  const SemesterSelecter = useSelector((state) => state.reducerSemester.list);

  const idBoMonselect = SemesterSelecter[0]?.idBoMon;

  useEffect(() => {
    dispatch(getTeachers());
  }, []);

  useEffect(() => {
    dispatch(getSemesters());
  }, [isLoading]);


  const [values, setValues] = useState([]);

  const handleChange = (selected) => {
    // console.log(selected,'gv dc chon'); 
    setListSelected([...listSelected, selected])
  }

  useEffect(() => {
    axios.get(GET_API_TEACHERS_URL + `/${idBoMonselect}`).then(response => { setTeacherSelecter(response.data.data) })
  }, []);

  // useEffect(() => {
  //   console.log(listSelected)
  // }, [listSelected]);


  // console.log('value :', listSelected);

  // const handleChangeCheck = (selected) => {

  //   if (listIdDeTai.find((item) => item.idDeTai == selected.idDeTai) != undefined) {
  //     setListIdDeTai(listIdDeTai.filter((item) =>
  //       item.idDeTai !== selected.idDeTai))
  //   }
  //   else {
  //     setListIdDeTai(listIdDeTai.concat([
  //       {
  //         "idDeTai": selected.idDeTai
  //       }
  //     ]))
  //   }

  // }

  function ChooseTeacher() {
    let body = [listSelected.map((item) => {
      return ({
        "idGVHD": item.id,
        "maGVHD": item.maGiangVien,
        "tenGVHD": item.hoTen,
        "donViCongTac": item.donViCongTac,
        "email": item.homThu,
        "dienThoai": item.dienThoai,
        "type": 1
      })
    })]
    debugger
    axios.post(API_POST_TEACHERS_URL + `/${idHocKy}`, body[0], GetToken()).then(response => { debugger })
  }



  return (
    <>
      <StyledSemester.Flex>
        <div><Headers /></div>
        <div className="Body">
          <div>
            <h1>Giảng viên hướng dẫn</h1>

            {isLoading ? (
              <div>Loading</div>
            ) : (
              <StyledSemester.Body>
                <div className="luu">
                  <StyledSemester.ButtonAdd onClick={() => ChooseTeacher()}>Lưu</StyledSemester.ButtonAdd>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Mã giảng viên</th>
                      <th>Họ tên</th>
                      <th>Hòm thư</th>
                      <th>Đơn vị công tác</th>
                      <th>Điện thoại</th>
                      <th>Chọn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherSelecter?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.maGiangVien}</td>
                        <td>{item.hoTen}</td>
                        <td>{item.homThu}</td>
                        <td>{item.donViCongTac}</td>
                        <td>{item.dienThoai}</td>

                        <td><input
                          type="checkbox"
                          value={item.id}
                          id="checkbox1"
                          // checked={true}
                          onChange={() => handleChange(item)}
                        /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </StyledSemester.Body>
            )}
          </div>
        </div>
      </StyledSemester.Flex>
    </>
  );
};

export default Teacher;
