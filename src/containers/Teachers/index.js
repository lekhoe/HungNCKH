import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Headers from "../../layout/Header";
import { getSemesters } from "../Semesters/action";
import { StyledSemester } from "../Semesters/styled";
import { getTeachers } from "./action";

const Teacher = () => {
  const dispatch = useDispatch();
  const [maGiangVien, setMaGiangVien] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [donViCongTac, setDonViCongTac] = useState("");
  const [dienThoai, setDienThoai] = useState("");
  const [listSelected, setListSelected] = useState([]);


  const teacherSelecter = useSelector((state) => state.reducerTeacher.list);
  const semesterSelecter = useSelector((state) => state.reducerSemester.list);

  const isLoading = useSelector((state) => state.reducerTeacher.isLoading);

  useEffect(() => {
    dispatch(getTeachers());
  }, []);

  useEffect(() => {
    dispatch(getSemesters());
  }, [isLoading]);


  const [values, setValues] = useState([]);
  
  const handleChange = (selected) => {
    console.log(selected,'gv dc chon'); 
    setListSelected([...listSelected,selected])  
       
  
  }


  console.log('value :', listSelected);



  return (
    <>
    <StyledSemester.Flex>
    <div><Headers /></div>
    <div className="Body">
      <div>
      <h1>Chọn Giảng giảng viên Hướng dẫn Kỳ</h1>

      {isLoading ? (
        <div>Loading</div>
      ) : (
        <StyledSemester.Body>
          <div className="luu">
            <StyledSemester.ButtonAdd>Lưu</StyledSemester.ButtonAdd>
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
