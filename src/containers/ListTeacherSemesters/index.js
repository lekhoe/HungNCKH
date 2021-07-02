import React, { useEffect, useState } from 'react';
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

      //---Thêm giảng viên -------------------
      const [hide, setHide] = useState(false);
      const [changeVersion, setChangeVersion] = useState(true);
      const onAdd = () => {
        setHide(true);
        setChangeVersion(true);
    
      };
      const onAddSubmit = () => {
        
    
      };
      
    return (
      <StyledSemester.Flex>
      <div><Headers /></div>
        <div className="Body">
          <div>
          
            <h1>Danh sách giảng viên đã chọn {tenHocKy}</h1>
            <StyledSemester.Body>
            <StyledSemester.ButtonAdd onClick={() => onAdd()}>Thêm giảng viên</StyledSemester.ButtonAdd>
            <StyledSemester.Popup style={hide ? { display: "block" } : { display: "none" }}>
              <StyledSemester.PopupContent1>
                <StyledSemester.DivSpan>
                  <span onClick={() => setHide(false)}>&times;</span>
                </StyledSemester.DivSpan>
                <h1 >Thêm giảng viên</h1>
                <StyledSemester.DivInput>
                  <StyledSemester.DivLable>
                    <label>Nhập họ tên</label>
                    <input
                      placeholder="Nhập họ tên"
                      type="text"
                      // value={maMonHoc}
                      // onChange={(maMonHoc) => setMaMonHoc(maMonHoc.target.value)}
                    />
                  </StyledSemester.DivLable>
                  <StyledSemester.DivLable>
                    <label>Nhập đơn vị công tác</label>
                    <input
                      placeholder="Nhập đơn vị công tác"
                      type="text"
                      // value={tenMonHoc}
                      // onChange={(tenMonHoc) => setTenMonHoc(tenMonHoc.target.value)}
                    />
                  </StyledSemester.DivLable>
                  <StyledSemester.DivLable>
                    <label>Nhập hòm thư</label>
                    <input
                      placeholder="Nhập hòm thư"
                      type="text"
                      // value={maMonHoc}
                      // onChange={(maMonHoc) => setMaMonHoc(maMonHoc.target.value)}
                    />
                  </StyledSemester.DivLable>
                  <StyledSemester.DivLable>
                    <label>Nhập số điện thoại</label>
                    <input
                      placeholder="Nhập số điện thoại"
                      type="text"
                      // value={tenMonHoc}
                      // onChange={(tenMonHoc) => setTenMonHoc(tenMonHoc.target.value)}
                    />
                  </StyledSemester.DivLable>
                  
                  <StyledSemester.DivButton>
                    <button type="submit" onClick={() => onAddSubmit()}>
                      Thêm
                    </button>
                    <button type="submit" onClick={() => setHide(false)}>Hủy</button>
                  </StyledSemester.DivButton>
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
              
              <th >Hành động</th>
              
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
              
              {/* <td><StyledSemester.ButtonAdd>Sửa</StyledSemester.ButtonAdd></td> */}
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