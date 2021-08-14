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
import Modal from "../CommonComponent/Modal/Modal";




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
  const [isShowPopupLookData, setIsShowPopupLookData] = useState(false);
  const [semesterSelecter, setSemesterSelecter] = useState([]);
  const [semester, setSemester] = useState(1);

  // const semesterSelecter = useSelector((state) => state.reducerSemester.list);
  const isLoading = useSelector((state) => state.reducerSemester.isLoading);

  useEffect(() => {
    CallApiGetListSemester()
  }, []);

  const onAdd = () => {
    setChangeVersion1(true);

  };

  function CallApiGetListSemester() {
    axios.get(API_SEMESTER.GET_API_SEMESTER_LIST, GetToken()).then((response) => { setSemesterSelecter(response.data.data) })
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

  function ConfirmLookDataSemester(item) {
    setIdHocky(item.idHocKy)
    setIsShowPopupLookData(true)
    setTenHocKy(item.tenHocKy)
  }

  function LookDataSemester() {
    axios.put(API_SEMESTER.PUT_API_SEMESTER_LOOK.format(idHocKy, true), '', GetToken()).then((response) => { alert(response.data.message) })
    setIsShowPopupLookData(false)
    setTimeout(function () { CallApiGetListSemester(); }, 500);
  }

  return (
    <>
      <Modal
        show={isShowPopupLookData}
        onClickClose={() => setIsShowPopupLookData(false)}
        title={"Thông báo"}
        button={[
          <Button
            name={"Hủy"}
            onClick={() => setIsShowPopupLookData(false)}
          // className="add-edit-semester-submit"
          />,
          <Button
            name={"Look"}
            background={"#3498db"}
            onClick={() => LookDataSemester()}
          // className="add-edit-semester-submit"
          />
        ]}
        mess={"Bạn có muốn look data " + tenHocKy + " không?"}
      />
      <Modal
        show={changeVersion1}
        onClickClose={() => setChangeVersion1(false)}
        title={"Khởi tạo học kỳ"}
        button={[
          <Button
            name={"Hủy"}
            onClick={() => setChangeVersion1(false)}
            className="add-edit-semester-submit"
          />,
          <Button
            name={"Thêm"}
            background={"#3498db"}
            onClick={() => SubmitSemester()}
            className="add-edit-semester-submit"
          />
        ]}
        body={[
          <div className="add-semester">
            <p>Chọn học kỳ</p>
            <select className="choose-semester" onChange={(val) => setSemester(val.target.value)}>
              <option value="1">Kỳ 1</option>
              <option value="2">Kỳ 2</option>
              <option value="3">Kỳ 3</option>
            </select>
          </div>
        ]}
      />
      <StyledSemester.Div>
        <div style={{width:"100%"}}>
          <h1>Danh sách Học kỳ </h1>
          <StyledSemester.Body>
            <div>
              <div className="list-semester-header">
                <Button
                  name={"Thêm học kỳ"}
                  onClick={() => onAdd()}
                  background={'#3498db'}
                />
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Xử lý</th>
                  <th>Mã học kỳ</th>
                  <th>Tên học kỳ</th>
                  <th>Năm học</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {semesterSelecter.map((item, index) => {
                  // console.log(item);
                  return (
                    <tr key={index}>

                      <td>
                        {item.lockData ==true ? <Button name={"Xử lý"} background={"#1abc9c"} disabled={true}/> : <Link to={`/mon-hoc/${item?.tenHocKy}/${item?.idHocKy}/${item?.idBoMon}`}>
                          <Button name={"Xử lý"} background={"#1abc9c"} />
                        </Link>}
                        
                      </td>
                      <td>{item?.maHocKy ?? ''}</td>
                      <td>{item?.tenHocKy ?? ''}</td>

                      <td>2020-2021</td>
                      {/* <td><StyledSemester.ButtonAdd onClick={() => OnPutSemesters(item.idHocKy, item)}>Sửa</StyledSemester.ButtonAdd></td> */}
                      <td><Button onClick={() => ConfirmLookDataSemester(item)} name={"Khóa"} background={"#e74c3c"} disabled={item.lockData}/></td>

                    </tr>
                  )
                })}
              </tbody>
            </table>

          </StyledSemester.Body>
          {/* )} */}
        </div>
      </StyledSemester.Div>
    </>
  );
};

export default Semester;
