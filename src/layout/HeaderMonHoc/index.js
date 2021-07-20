import React, { useState } from "react";
import { FcPrevious } from 'react-icons/fc';
import { FaPencilRuler } from 'react-icons/fa';
import { ImCompass } from 'react-icons/im';
import { AiOutlineUnorderedList, AiFillFolderOpen } from 'react-icons/ai';
import { BsListTask } from 'react-icons/bs';

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
      
        <StyledHeader.Menu1><Link className="color" to={`/mon-hoc/${tenHocKy}/${idHocKy}/mon-hoc`}><FcPrevious /><span>Môn học</span></Link></StyledHeader.Menu1>  
        
        <StyledHeader.Menu1 ><Link className="color" to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/danh-sach-de-tai`}><FaPencilRuler /><span>Đề tài</span></Link></StyledHeader.Menu1>
        <StyledHeader.Menu1><Link className="color" to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/chon-de-tai-cho-GV`}><ImCompass /><span>Phân ĐT cho GV</span></Link></StyledHeader.Menu1>
        
       
        <StyledHeader.Menu1 style={typeApprover == "GangVien" || typeApprover == "HoiDong" ? {display: "none"} : {display: "block"}}><Link className="color" to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/phan-bien`}><AiOutlineUnorderedList /><span>Danh sách phản biện</span></Link></StyledHeader.Menu1>
        <StyledHeader.Menu1 style={typeApprover == "GangVien" ? {display: "none"} : {display: "block"}}><Link className="color" to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/hoi-dong-tot-nghiep`}><BsListTask /><span>Hội đồng tốt nghiệp</span></Link></StyledHeader.Menu1>
        <StyledHeader.Menu1><Link className="color" to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/quan-ly-folder`}><AiFillFolderOpen /><span>Quản lý Folder</span></Link></StyledHeader.Menu1>
        
      </StyledHeader.MenuBody>
      <Switch>
        
         
        
      </Switch>
    </StyledHeader.Body>
  );
};

export default HeaderMonHoc;
