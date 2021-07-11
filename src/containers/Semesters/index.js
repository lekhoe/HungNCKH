import { debounce } from "@redux-saga/core/effects";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { API_SEMESTER } from "../../commonConstants/enpoint";
import Headers from "../../layout/Header";
import GetToken from '../Login/getToken';
import { addSemester, deleteSemesters, getSemesters, putSemesters } from "./action";
import { StyledSemester } from "./styled";
import Button from '../CommonComponent/Button/Button';
import './semesters.css'




const Semester = () => {
  const API_ROUTER = "https://api.quanlydoan.live/api"
  const dispatch = useDispatch();
  let match = useRouteMatch();
  // console.log("match.url ", match.url);

  const [idHocKy, setIdHocky] = useState("");
  const [maHocKy, setMaHocKy] = useState("");
  const [tenHocKy, setTenHocKy] = useState("");
  const [changeVersion, setChangeVersion] = useState(true);
  const [changeVersion1, setChangeVersion1] = useState(false);
  const [semester, setSemester] = useState(1);
  // const [ngayTao, setNgayTao] = useState("");
  // const [ngayXoa, setNgayXoa] = useState(null);
  // const [isActive, setIsActive] = useState(true);
  // const [isDelete, setIsDelete] = useState(false);
  //const [ngayTao, setNgayTao] = useState("");
  // useState

  const semesterSelecter = useSelector((state) => state.reducerSemester.list);
  const isLoading = useSelector((state) => state.reducerSemester.isLoading);
  // console.log("semesterSelecter ", { semesterSelecter });

  useEffect(() => {
    dispatch(getSemesters());

  }, [isLoading]);

  // const getSem = () =>{
  //   dispatch(getSemesters());
  // };

  const onAdd = () => {
    setChangeVersion1(true);

  };

  const getPro = () => {
    dispatch(getSemesters());
  };
  // ----------------- Thêm ---------------------

  const onAddSubmit = (e) => {
    // console.log({ maHocKy, tenHocKy });
    //const add = {maHocKy, tenHocKy };
    let body = []
    axios.post(API_SEMESTER.INSERT_API_SEMESTER.format(semester), body, GetToken()).then(response => { alert(response.data.message) }).catch((err) => { alert(err.response.data.message) })

    // if (maHocKy && tenHocKy) {
    //   const add = { maHocKy, tenHocKy };
    if (changeVersion === true) {
      // dispatch(addSemester(add, getPro()));
      // // debounce(dispatch(getSemesters()), 2000)
      // console.log(isLoading);
      // debugger
      // axios.post(API_ROUTER + `/api/Hocky/InsertAsyncHocKy/${semester}`, GetToken())
      // debugger
      // console.log(API_SEMESTER.INSERT_API_SEMESTER.f("2"))
      // setChangeVersion1(false);
    } else {

      // dispatch(putSemesters(idHocKy, add, getSemesters));XZ
      //dispatch(getSemesters());
      // debounce(dispatch(getSemesters()), 2000)
      // dispatch(getSemesters());
      setChangeVersion(true);
    }



    // dispatch(getSemesters());
    // debounce(dispatch(getSemesters()), 2000);
    // } else {
    //   alert("vui lòng nhập thông tin");
    // }
    setMaHocKy("");
    setTenHocKy("");
  };

  //------------ Xóa ---------------------

  const onDeleteSemesters = (idHocKy) => {
    dispatch(deleteSemesters(idHocKy, getSemesters));
  };

  //------ sửa -------------------------------------
  const OnPutSemesters = (idHocKy, item) => {
    setChangeVersion1(true);
    setChangeVersion(false);
    // setIdHocky(idHocKy);
    // setMaHocKy(item.maHocKy);
    // setTenHocKy(item.tenHocKy);
    // setSemester()

  };
  const onHuy = () => {
    setChangeVersion1(false);

  };

  function SubmitSemester() {
    onAddSubmit();
    setChangeVersion1(false);
    dispatch(getSemesters());
  }

  return (
    <StyledSemester.Div>
      <div>
        <h1>Danh sách Học kỳ </h1>
        {/* {isLoading ? (
        <div>Loading</div>
      ) : ( */}
        <StyledSemester.Body>
          <div>
            <StyledSemester.ButtonAdd className="bottom" type="submit" onClick={() => onAdd()}>Thêm học kỳ</StyledSemester.ButtonAdd>
            {/* ------popup------------------------------ */}
            <StyledSemester.Popup style={changeVersion1 ? { display: "block" } : { display: "none" }}>
              <StyledSemester.PopupContent1>
                <StyledSemester.DivSpan>
                  <span onClick={() => setChangeVersion1(false)}>&times;</span>
                </StyledSemester.DivSpan>
                <div className="popup-add-edit-semester">
                  <h1 >{changeVersion ? "Thêm Học kỳ" : "Sửa học kỳ"}</h1>
                  <label>Chọn học kỳ</label>
                  <select className="choose-semester" onChange={(val) => setSemester(val.target.value)}>
                    <option value="1">Kỳ 1</option>
                    <option value="2">Kỳ 2</option>
                    <option value="3">Kỳ 3</option>
                  </select>
                  <Button
                    name={changeVersion ? "Thêm" : "Sửa"}
                    onClick={() => SubmitSemester()}
                    className="add-edit-semester-submit"
                  />
                  <button type="submit" onClick={() => setChangeVersion1(false)}>Hủy</button>
                </div>
              </StyledSemester.PopupContent1>
            </StyledSemester.Popup>




          </div>
          <table>
            <thead>
              <tr>
                <th>Xem</th>
                <th>Mã học kỳ</th>
                <th>Tên học kỳ</th>

                <th>Năm học</th>
                <th colspan="2">Hành động</th>


              </tr>
            </thead>
            <tbody>
              {semesterSelecter.map((item, index) => {
                // console.log(item);
                return (
                  <tr key={index}>
                    <Link to={`/mon-hoc/${item?.tenHocKy}/${item?.idHocKy}`}>
                      <td><StyledSemester.See>Xem Thông tin</StyledSemester.See></td>
                    </Link>
                    <td>{item?.maHocKy ?? ''}</td>
                    <td>{item?.tenHocKy ?? ''}</td>

                    <td>2020-2021</td>
                    <td><StyledSemester.ButtonAdd onClick={() => OnPutSemesters(item.idHocKy, item)}>Sửa</StyledSemester.ButtonAdd></td>
                    <td><StyledSemester.Delete onClick={() => onDeleteSemesters(item.idHocKy)}>Xóa</StyledSemester.Delete></td>

                  </tr>


                )

              })}
            </tbody>
          </table>

        </StyledSemester.Body>
        {/* )} */}
      </div>
    </StyledSemester.Div>
  );
};

export default Semester;
