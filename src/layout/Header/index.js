import React, { useState } from "react";
import { StyledHeader } from "./styled";
import { Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { AssignReviewer, AssignReviewerChoose, EvaluationBoard, ListTeacher, ListTeacherSemester, Student, Subject, SubjectList, Teacher, Topic, TopicDetail } from "../../containers";
import { FcPrevious } from 'react-icons/fc';
import { ImBook } from 'react-icons/im';
import { IoIosPeople } from 'react-icons/io';
import { BsFillPeopleFill, BsPersonPlusFill } from 'react-icons/bs';

const Headers = () => {
  let match = useRouteMatch();
  console.log("match.url ",match.url);
  let { idHocKy } = useParams();
  let {tenHocKy} = useParams();
  //console.log("tên học kỳ" + tenHocKy);
  console.log(idHocKy);
  console.log(tenHocKy);
  
  
  return (
    // <h1>Header</h1>

      //  <ul>
      //    <li>
      //      <Link to='/'>Home</Link>
      //    </li>
      //    <li>
      //      <Link to='/giang-vien'>Giang vien</Link>
      //    </li>
      //    <li>
      //      <Link to='/lien-he'>Lien he</Link>
      //    </li>
      //  </ul>
    <StyledHeader.Body>
      

      {/* ==========Menu========================== */}

      <StyledHeader.MenuBody>
      <StyledHeader.MenuDiv>
        <StyledHeader.Menu1><Link className="color" to='/hoc-ky'><FcPrevious /><span>Học Kỳ</span></Link></StyledHeader.Menu1>  
        <StyledHeader.Menu1><Link className="color" to={`/mon-hoc/${tenHocKy}/${idHocKy}/mon-hoc`}><ImBook /><span >Môn Học</span></Link></StyledHeader.Menu1>   
        <StyledHeader.Menu1><Link className="color" to={`/mon-hoc/${tenHocKy}/${idHocKy}/chon-giang-vien`}><BsPersonPlusFill /> <span >Chọn Giảng viên</span></Link></StyledHeader.Menu1>
        <StyledHeader.Menu1><Link className="color" to={`/mon-hoc/${tenHocKy}/${idHocKy}/danh-sach-gvhd`}><BsFillPeopleFill /><span >Danh sách GVHD</span></Link></StyledHeader.Menu1> 
        <StyledHeader.Menu1><Link className="color" to={`/mon-hoc/${tenHocKy}/${idHocKy}/danh-sach-sinhvien`}><IoIosPeople /><span >Danh sách Sinh viên</span></Link></StyledHeader.Menu1>
        {/* <StyledHeader.Menu1 ><Link to={`${match.url}/danh-sach-de-tai`}>Đề tài</Link></StyledHeader.Menu1>
        <StyledHeader.Menu1><Link to={`${match.url}/chon-de-tai-cho-GV`}>Phân công ĐT cho GV</Link></StyledHeader.Menu1> */}
        
        {/* <StyledHeader.Menu1><Link to={`${match.url}/phan-cong-phan-bien`}>Phân công phản biện</Link></StyledHeader.Menu1>
        <StyledHeader.Menu1><Link to={`${match.url}/phan-bien`}>Danh sách phản biện</Link></StyledHeader.Menu1>
        <StyledHeader.Menu1><Link to={`${match.url}/hoi-dong-tot-nghiep`}>Hội đồng tốt nghiệp</Link></StyledHeader.Menu1> */}
        </StyledHeader.MenuDiv>
      </StyledHeader.MenuBody>
      <Switch>
        
      
        {/* <Route path={`${match.path}chon-giang-vien`}>
          <Teacher/>
        </Route> */}
        {/* <Route path={`${match.path}danh-sach-gvhd`}>
          <ListTeacherSemester/>
        </Route> */}
        <Route path={`${match.path}/chon-de-tai-cho-GV`}>
          <Student/>
        </Route>
        <Route path={`${match.path}/danh-sach-de-tai`}>
          <Topic />
        </Route>
        <Route path={`${match.path}/phan-cong-phan-bien`}>
          <AssignReviewerChoose/>
        </Route>
        <Route path={`${match.path}/phan-bien`}>
          <AssignReviewer/>
        </Route>
        <Route path={`${match.path}/hoi-dong-tot-nghiep`}>
          <EvaluationBoard/>
        </Route>
        {/* <Route  path={`${match.path}/:idDeTai`}>
          <TopicDetail />
        </Route> */}
       
         
        
      </Switch>
    </StyledHeader.Body>
  );
};

export default Headers;
