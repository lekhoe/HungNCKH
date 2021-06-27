import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Headers from '../../layout/Header';
import { StyledSemester } from '../Semesters/styled';
import { getStudentLocals, getStudents } from './action';

const StudentList = () => {
  const [idSinhVien, setIdSinhVien] = useState("");
  const [maSinhVien, setMaSinhVien] = useState("");
  const [tenSinhVien, setTenSinhVien] = useState("");
  const [email , setEmail ] = useState("");
  const [dienThoai, setDienThoai] = useState("");
  const [donViThucTap, setDonViThucTap] = useState("");
  const [lopHoc , setLopHoc ] =useState("");
  const [hide, setHide]=useState(true);

  const dispatch = useDispatch();

  let {idHocKy} = useParams();

  useEffect(() => {
    dispatch(getStudents(idHocKy));
  }, []);
  const StudentListSelecter = useSelector((state) => state.reducerStudentList.list);

  // thêm mới sinh viên 
  const onShow= ()=>{
    setHide(false);

  };
  const onHide= ()=>{
    setHide(true);

  };
  useEffect(() => {
    dispatch(getStudentLocals());
  }, []);
  const StudentListSelecter1 = useSelector((state) => state.reducerStudentList.list1);
  const handleChange = (selected) => {
    console.log("đề tài được chọn ",selected); 
    
       
  
  }
    return (
      < >
      <StyledSemester.Flex>
      <div><Headers /></div>
        <div className="Body">
          <div>
          
            <h1>Danh sách Sinh viên</h1>
            <StyledSemester.Body>
              <StyledSemester.ButtonAdd  onClick={()=> onShow()}>Thêm sinh viên</StyledSemester.ButtonAdd>
            <table>
          <thead>
            <tr>
              <th>Mã Sinh viên</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Đơn vị thực tập</th>
              <th>Lớp học</th>
              <th>Hành động</th>
              
            </tr>
          </thead>
          <tbody>
          {StudentListSelecter?.map ((item, index ) => ( 

            <tr key= {index}>
               
              <td>{item.maSinhVien}</td>
              <td>{item.tenSinhVien}</td>
              <td>{item.email}</td>
              <td>{item.dienThoai}</td>
              <td>{item.donViThucTap}</td>
              <td>{item.lopHoc}</td>
              <td><StyledSemester.ButtonAdd>Sửa</StyledSemester.ButtonAdd></td>
              
                
              
            </tr>
            ))}
          </tbody>
        </table>

        <StyledSemester.Popup id="hide" style={hide ? {display: "none"} : {display: "block"}} >
          <StyledSemester.PopupContent>
            <div className="Divpopup">
           <StyledSemester.PopupTitle>
          <StyledSemester.Popuptext> Thêm sinh viên </StyledSemester.Popuptext>
          <StyledSemester.Close onClick={onHide}>&times;</StyledSemester.Close>
          </StyledSemester.PopupTitle> 
          <div className="save">
          <StyledSemester.ButtonAdd>Lưu</StyledSemester.ButtonAdd>
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
            {StudentListSelecter1?.map ((item, index ) => (
              <tr key= {index}>
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
                  onChange={()=> handleChange(item)}
                  /></td>
              </tr>
              ))}
             
            </tbody>
          </table>
          </div>
          </StyledSemester.PopupContent>
        </StyledSemester.Popup>
        
        </StyledSemester.Body>
        </div>
        </div>
        </StyledSemester.Flex>
        </>
    );
};

export default StudentList;