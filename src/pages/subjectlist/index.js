import React from "react";
import { SubjectList } from "../../containers";
import { useParams } from "react-router-dom";
import axios from "axios";
const SubjectListss = () => {
  // let { tenHocKy } = useParams();
  // console.log('test', tenHocKy);

  // const getHocKyById  = async () => {
  //   const response = await axios.get(`https://quanlydoan.live/api/MonHoc/${tenHocKy}`);
    
  // }
  return (
    <>
     {/* <h1>{tenHocKy}</h1> */}
      
      <SubjectList />
    </>
  );
};

export default SubjectListss;
