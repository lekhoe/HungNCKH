import React, { useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { StyledSemester } from '../Semesters/styled';
import { getTopicDetails } from './action';


const TopicDetail = () => {
  console.log('hhdakdajfalfjaflafjlaf;jafjlj');
   let { idDeTai } = useParams();
   console.log({idDeTai,useParams},'topic detail');
//   let {tenHocKy} = useParams();
 console.log("ParamsIDdetai" + idDeTai);

   const dispatch = useDispatch();
   const topicDetailSelecter = useSelector((state) => state.reducerTopicDetail.list);
    console.log("topicDetailSelecter " + topicDetailSelecter);
   useEffect(() => {
       dispatch(getTopicDetails(idDeTai));
     }, []);
  return (
    <div>
      <h1>Chi tiết Đề Tài</h1>
      <StyledSemester.Body>
      <table>
          <thead>
            <tr>
              <th>Mã đề tài</th>
              <th>Tên đề tài</th>
              <th>Tên sinh viên</th>
              <th>Tên Học kỳ</th>
              <th>Tên Môn học</th>
              <th>Mã GVHD</th>
              <th>Tên GVHD</th>
              <th>Điểm trung bình</th>
              <th>Đạt</th>
              <th>Ngày tạo</th>
              <th>Người tạo</th>
              
              <th colspan="2">Hành động</th>
              
              
            </tr>
          </thead>
          <tbody>
              {topicDetailSelecter?.map ((item, index ) => (

            <tr key= {index}>
               
              <td>{item.maDeTai}</td>
              <td>{item.tenDeTai}</td>
              <td>{item.tenSinhVien}</td>
              <td>{item.tenHocKy}</td>
              <td>{item.tenMonHoc}</td>
              <td>{item.chiTietDeTai.maGVHD}</td>
              <td>{item.chiTietDeTai.tenGVHD}</td>
              <td>{item.diemTrungBinh}</td>
              <td>{item.isDat}</td>
              <td>{item.ngayTao}</td>
              <td>{item.nguoiTao}</td>
              <td><StyledSemester.ButtonAdd>Sửa</StyledSemester.ButtonAdd></td>
              <td><StyledSemester.Delete>Xóa</StyledSemester.Delete></td>
              
                
              
            </tr>
            ))}
          </tbody>
        </table>
        </StyledSemester.Body>
    </div>
  );
};

export default TopicDetail;