import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Headers from '../../layout/Header';
import { StyledSemester } from '../Semesters/styled';
import { getLisTeacherSemesters } from './action';

const ListTeacherSemester = () => {

  let { idHocKy } = useParams();
    let {tenHocKy} = useParams();
    console.log("tên học kỳ" + tenHocKy);

    const dispatch = useDispatch();
    const listTeacherSemesterSelecter =useSelector((state) => state.reducerListTeacherSemester.list);

    useEffect(() => {
        dispatch(getLisTeacherSemesters(idHocKy));
      }, []);
    return (
      <StyledSemester.Flex>
      <div><Headers /></div>
        <div className="Body">
          <div>
          
            <h1>Danh sách giảng viên đã chọn {tenHocKy}</h1>
            <StyledSemester.Body>
            <table>
          <thead>
            <tr>
              <th>Mã giảng viên</th>
              <th>Họ tên</th>
              <th>Đơn vị công tác</th>
              <th>Hòm thư</th>
              <th>Điện thoại</th>
              <th>Ngày tạo</th>
              <th colspan="2">Hành động</th>
              
            </tr>
          </thead>
          <tbody>
          {listTeacherSemesterSelecter?.map ((item, index ) => ( 

            <tr key= {index}>
               
              <td>{item.maGVHD}</td>
              <td>{item.tenGVHD}</td>
              <td>{item.donViCongTac}</td>
              <td>{item.email}</td>
              <td>{item.dienThoai}</td>
              <td>{item.ngayTao}</td>
              <td><StyledSemester.ButtonAdd>Sửa</StyledSemester.ButtonAdd></td>
              <td><StyledSemester.Delete>Xóa</StyledSemester.Delete></td>
                
              
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