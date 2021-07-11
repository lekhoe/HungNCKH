import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { API_TEACHER } from '../../commonConstants/enpoint';
import Headers from '../../layout/Header';
import GetToken from '../Login/getToken';
import { StyledSemester } from '../Semesters/styled';
import { getLisTeacherSemesters } from './action';
import Modal from '../CommonComponent/Modal/Modal';
import Button from '../CommonComponent/Button/Button';
import './listTeacherSemesters.css'

const ListTeacherSemester = () => {

  let { idHocKy } = useParams();
  let { tenHocKy } = useParams();
  console.log("tên học kỳ" + tenHocKy);

  const dispatch = useDispatch();
  const listTeacherSemesterSelecter = useSelector((state) => state.reducerListTeacherSemester.list);

  useEffect(() => {
    dispatch(getLisTeacherSemesters(idHocKy));
  }, []);

  //---Thêm giảng viên -------------------
  const [hide, setHide] = useState(false);
  const [changeVersion, setChangeVersion] = useState(true);
  const [idGV, setIdGV] = useState('')
  const [idGVHDTheoKy, setIdGVHDTheoKy] = useState('')
  const [maGV, setMaGV] = useState('')
  const [hoTen, setHoTen] = useState('')
  const [donViCongTac, setDonViCongTac] = useState('')
  const [homThu, setHomThu] = useState('')
  const [soDienThoai, setSoDienThoai] = useState('')
  const [showPopupMess, setShowPopupMess] = useState(false);
  const onAdd = () => {
    setHide(true);
    setChangeVersion(true);

  };
  const onAddSubmit = () => {
    let bodyAdd = {
      "maGVHD": maGV,
      "tenGVHD": hoTen,
      "donViCongTac": donViCongTac,
      "email": homThu,
      "dienThoai": soDienThoai
    }
    let bodyUpdate = {
      "donViCongTac": donViCongTac,
      "tenGVHD": hoTen,
      "email": homThu,
      "dienThoai": soDienThoai
    }
    {
      changeVersion ? axios.post(API_TEACHER.INSERT_API_TEACHER.format(idHocKy, 0), bodyAdd, GetToken()).then((response) => alert(response.data.message)).catch((err) => alert(err))
        :
        axios.put(API_TEACHER.UPDATE_API_TEACHER.format(idGVHDTheoKy, 0), bodyUpdate, GetToken()).then((response) => alert(response.data.message)).catch((err) => alert(err))
    }
    setHide(false);
  };

  function UpDateTeacher(item) {
    setHide(true);
    setChangeVersion(false);
    setIdGVHDTheoKy(item.idGVHDTheoKy)
    setIdGV(item.idGVHD)
    setMaGV(item.maGVHD)
    setHoTen(item.tenGVHD)
    setDonViCongTac(item.donViCongTac)
    setHomThu(item.email)
    setSoDienThoai(item.dienThoai)
  }

  function DeleteTeacher(item) {
    setShowPopupMess(true)
    setHoTen(item.tenGVHD)
    setIdGVHDTheoKy(item.idGVHDTheoKy)

  }

  function ConfirmDelete() {
    axios.delete(API_TEACHER.DELETE_API_TEACHER.format(idGVHDTheoKy), GetToken()).then((response) => alert(response.data.message)).catch((err) => alert(err))
    setShowPopupMess(false)
  }

  return (

    <StyledSemester.Flex>

      <Modal
        show={showPopupMess}
        mess={"Bạn có muốn xóa giảng viên tên " + hoTen + " ?"}
        onClickClose={() => { setShowPopupMess(false) }}
        button={[<button onClick={() => setShowPopupMess(false)}>Hủy</button>,
        <button style={{ backgroundColor: '#e74c3c', color: '#ffffff', border: 0 }} onClick={() => ConfirmDelete()}>Xóa</button>]}
      />
      <div><Headers /></div>
      <div className="Body">
        <div>
          <h1>Giảng viên {tenHocKy}</h1>
          <StyledSemester.Body>
            <StyledSemester.ButtonAdd onClick={() => onAdd()}>Thêm giảng viên</StyledSemester.ButtonAdd>
            <StyledSemester.Popup style={hide ? { display: "block" } : { display: "none" }}>
              <StyledSemester.PopupContent1>
                <StyledSemester.DivSpan>
                  <span onClick={() => setHide(false)}>&times;</span>
                </StyledSemester.DivSpan>
                <h1 >{changeVersion ? "Thêm giảng viên" : "Sửa giảng viên"}</h1>
                <StyledSemester.DivInput>
                  <StyledSemester.DivLable>
                    <label>Nhập mã giảng viên</label>
                    <input
                      placeholder="Nhập mã giảng viên"
                      type="text"
                      value={maGV}
                      onChange={(val) => setMaGV(val.target.value)}
                    />
                  </StyledSemester.DivLable>
                  <StyledSemester.DivLable>
                    <label>Nhập họ tên</label>
                    <input
                      placeholder="Nhập họ tên"
                      type="text"
                      value={hoTen}
                      onChange={(val) => setHoTen(val.target.value)}
                    />
                  </StyledSemester.DivLable>
                  <StyledSemester.DivLable>
                    <label>Nhập đơn vị công tác</label>
                    <input
                      placeholder="Nhập đơn vị công tác"
                      type="text"
                      value={donViCongTac}
                      onChange={(val) => setDonViCongTac(val.target.value)}
                    />
                  </StyledSemester.DivLable>
                  <StyledSemester.DivLable>
                    <label>Nhập hòm thư</label>
                    <input
                      placeholder="Nhập hòm thư"
                      type="text"
                      value={homThu}
                      onChange={(val) => setHomThu(val.target.value)}
                    />
                  </StyledSemester.DivLable>
                  <StyledSemester.DivLable>
                    <label>Nhập số điện thoại</label>
                    <input
                      placeholder="Nhập số điện thoại"
                      type="text"
                      value={soDienThoai}
                      onChange={(val) => setSoDienThoai(val.target.value)}
                    />
                  </StyledSemester.DivLable>

                  <div className="button-add-edit">
                    <Button
                      name={changeVersion ? "Thêm" : "Sửa"}
                      background={'#3498db'}
                      color={'#ffffff'}
                      onClick={() => onAddSubmit()}
                    />
                    {/* <button type="submit" onClick={() => setHide(false)}>Hủy</button> */}
                    <Button
                      name={"Hủy"}
                      background={'#ecf0f1'}
                      onClick={() => setHide(false)}
                    />
                  </div>
                </StyledSemester.DivInput>

              </StyledSemester.PopupContent1>
            </StyledSemester.Popup>
            <table>
              <thead>
                <tr>
                  <th>Mã giảng viên</th>
                  <th>Họ tên</th>
                  <th>Đơn vị công tác</th>
                  <th>Hòm thư</th>
                  <th>Điện thoại</th>
                  <th colSpan="2">Hành động</th>

                </tr>
              </thead>
              <tbody>
                {listTeacherSemesterSelecter?.map((item, index) => (

                  <tr key={index}>

                    <td>{item.maGVHD}</td>
                    <td>{item.tenGVHD}</td>
                    <td>{item.donViCongTac}</td>
                    <td>{item.email}</td>
                    <td>{item.dienThoai}</td>
                    <td>{
                      item.type == "NgoaiTruong" ? <StyledSemester.ButtonAdd onClick={() => UpDateTeacher(item)}>Sửa</StyledSemester.ButtonAdd> : ''
                    }</td>
                    <td><StyledSemester.Delete onClick={() => DeleteTeacher(item)}>Xóa</StyledSemester.Delete></td>

                  </tr>
                ))}
              </tbody>
            </table>
          </StyledSemester.Body>
        </div>
      </div>
    </StyledSemester.Flex>
  );
};

export default ListTeacherSemester;