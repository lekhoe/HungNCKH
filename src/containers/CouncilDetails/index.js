import React, { useState } from 'react';
import { StyledSemester } from '../Semesters/styled';

const CounciDetail = () => {
    //---ẩn hiện popup--------
    const [changeVersion1, setChangeVersion1] = useState(false);
    return (
        <div>
            <h1>Thành viên trong hội đồng</h1>
            
            <StyledSemester.Body>
                <button className="button-add" onClick={()=> setChangeVersion1(true)}>Thêm thành viên</button>
                
                <StyledSemester.Popup style={changeVersion1 ? {display: "block"} : {display: "none"}}>
                <StyledSemester.PopupContent1>
                  <StyledSemester.DivSpan>
                <span onClick={()=> setChangeVersion1(false)}>&times;</span>
                </StyledSemester.DivSpan>
                  <h1 >Thêm thành viên</h1>
                  <StyledSemester.DivInput>
                    <StyledSemester.DivLable>
                    <label>Nhập mã giảng viên</label>
                    <input
                      placeholder="Nhập mã giảng viên"
                      type="text"
                      
                      
                    />
                        </StyledSemester.DivLable>
                        <StyledSemester.DivLable>
                   <label>Nhập tên giảng viên</label>
                   <input
                      placeholder="Nhập tên giảng viên"
                      
                      type="text"
                      
                    />
                        </StyledSemester.DivLable>
                        <StyledSemester.DivLable>
                    <label>Nhập hòm thư</label>
                    <input
                      placeholder="Nhập hòm thư"
                      type="text"
                      
                      
                    />
                        </StyledSemester.DivLable>
                        <StyledSemester.DivLable>
                   <label>Nhập số điện thoại</label>
                   <input
                      placeholder="Nhập số điện thoại"
                      
                      type="text"
                      
                    />
                        </StyledSemester.DivLable>
                  
                        <StyledSemester.DivButton>
                  <button type="submit" >
                  Thêm
                    </button>
                    <button type="submit" onClick={()=> setChangeVersion1(false)}>Hủy</button>
                    </StyledSemester.DivButton>
                    </StyledSemester.DivInput>
                    </StyledSemester.PopupContent1>
              </StyledSemester.Popup>
               <table>
                   <thead>
                        <tr>
                            <th>Mã giảng viên</th>
                            <th>Tên giảng viên</th>
                            <th>Hòm thư</th>
                            <th>Điện thoại</th>
                        </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>1122aa</td>
                           <td>Hoàng Anh Đức</td>
                           <td>hoanganhduc@gmail.com</td>
                           <td>0358100337</td>
                       </tr>
                   </tbody>
                </table> 

                
            </StyledSemester.Body>
        </div>
    );
};

export default CounciDetail;