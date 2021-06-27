import React, { useState } from "react";
import { FcPrevious } from 'react-icons/fc';

import { Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { AssignReviewer, AssignReviewerChoose, EvaluationBoard, ListTeacher, ListTeacherSemester, Student, Subject, SubjectList, Teacher, Topic, TopicDetail } from "../../containers";
import { StyledHeader } from "../Header/styled";

const HeaderMonHoc = () => {
  let {path, url} = useRouteMatch();
  console.log("match.url ",url);
  console.log("match.path ",path);
  let { idHocKy } = useParams();
  let {tenHocKy} = useParams();

  let {idMonHoc} = useParams();
  let {tenMonHoc} = useParams();
  let{typeApprover}= useParams();

  
  return (
    
    <StyledHeader.Body>
      

      {/* ==========Menu========================== */}

      <StyledHeader.MenuBody>
      
        <StyledHeader.Menu1><Link to={`/mon-hoc/${tenHocKy}/${idHocKy}/mon-hoc`}><FcPrevious /><span>Môn học</span></Link></StyledHeader.Menu1>  
        
        <StyledHeader.Menu1 ><Link to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/danh-sach-de-tai`}>Đề tài</Link></StyledHeader.Menu1>
        <StyledHeader.Menu1><Link to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/chon-de-tai-cho-GV`}>Phân công ĐT cho GV</Link></StyledHeader.Menu1>
        
       
        <StyledHeader.Menu1 style={typeApprover<2 ? {display: "none"} : {display: "block"}}><Link to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/phan-bien`}>Danh sách phản biện</Link></StyledHeader.Menu1>
        <StyledHeader.Menu1 style={typeApprover<1 ? {display: "none"} : {display: "block"}}><Link to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/hoi-dong-tot-nghiep`}>Hội đồng tốt nghiệp</Link></StyledHeader.Menu1>
        <StyledHeader.Menu1><Link to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/quan-ly-folder`}>Quản lý Folder</Link></StyledHeader.Menu1>
        
      </StyledHeader.MenuBody>
      <Switch>
        
         
        
      </Switch>
    </StyledHeader.Body>
  );
};

export default HeaderMonHoc;
