import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { API_FEEDBACK, API_TOPIC } from '../../commonConstants/enpoint';
import HeaderMonHoc from '../../layout/HeaderMonHoc';
import Button from '../CommonComponent/Button/Button';
import Modal from '../CommonComponent/Modal/Modal';
import { getLisTeacherSemesters } from '../ListTeacherSemesters/action';
import GetToken from '../Login/getToken';
import { StyledSemester } from '../Semesters/styled';
import { getTopics } from '../Topics/action';
import { getStudents } from "./action";
import './chooseTopic.css'

function Student() {
  const GET_API_STUDENTS_URL = "https://api.quanlydoan.live/api"
  const [save, setSave] = useState([]);
  const [showPopupAssign, setShowPopupAssign] = useState(false);
  const [changeBodyPopup, setChangeBodyPopup] = useState(true); //true: là phân hướng dẫn --- false: là phân phản biện
  const [idGVHD, setIdGVHD] = useState('');
  const [textTitle, setTextTitel] = useState('');
  const [topicSelecter, setTopicSelecter] = useState([]);

  let { idHocKy } = useParams();
  let { tenHocKy } = useParams();
  let { idMonHoc } = useParams();
  let {typeApprover} = useParams();

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.reducerStudent.isLoading);

  // const topicSelecter = useSelector((state) => state.reducerTopic.list);
  const teacherSelecter = useSelector((state) => state.reducerListTeacherSemester.list);
  
  function CallApiGetListTopicAssignInstructions() {
    axios.get(API_TOPIC.GET_API_TOPIC_ALL.format(idHocKy, idMonHoc), GetToken()).then((response) => setTopicSelecter(response.data.data))
  }

  function CallApiGetListTopicAssignFeedback(idGVHD){
    axios.get(API_TOPIC.GET_API_TOPIC_ASSIGN_FEEDBACK.format(idHocKy, idMonHoc, idGVHD), GetToken()).then((response) => setTopicSelecter(response.data.data))
  }

  // useEffect(() => {
  //   // dispatch(getTopics(idHocKy));
  //   CallApiGetListTopic()
  // }, []);

  useEffect(() => {
    dispatch(getLisTeacherSemesters(idHocKy));
  }, []);
  //================Hiện chọn đề tài-------------------

  // const onShow = (magv) => {
  //   console.log("Mã gv : ", magv.idGVHDTheoKy);
  //   // setHide(false);
  //   setIdGVHD(magv.idGVHDTheoKy);
  //   //console.log("teacherSelecter.maGVHD = ", teacherSelecter);
  //   if (save.length > 0) {
  //     try {
  //       let data = {
  //         iddetai: save[0],
  //         idGVHD: save[1]
  //       }
  //       console.log("data", { data });
  //       // const update =await axios.post(`https://quanlydoan.live/api/ChiTietDeTai/ChiTietDeTai/${save[0]}/${save[1]}`,data)
  //       // console.log({update});                         
  //     } catch (error) {
  //       console.log('loi update detai');
  //     }
  //   }
  // }

  const [listIdDeTai, setListIdDeTai] = useState([])
  const handleChange = (selected) => {

    if (listIdDeTai.find((item) => item.idDeTai == selected.idDeTai) != undefined) {
      setListIdDeTai(listIdDeTai.filter((item) =>
        item.idDeTai !== selected.idDeTai))
    }
    else {
      setListIdDeTai(listIdDeTai.concat([
        {
          "idDeTai": selected.idDeTai
        }
      ]))
    }

  }
  // useEffect(() => {
  //   console.log(listIdDeTai);
  // }, [listIdDeTai]);
  // const onHide = (idDT) => {
  //   // setHide(true);

  // }

  // // let hide = document.getElementById("hide");
  // // window.onclick = function(event) {
  // //   if (event.target == hide) {
  // //     setHide(true);
  // //   }
  // // }

  // //------------------------

  // const onHandelTopic = (idDT) => {
  //   console.log('chay vao day', idDT.target.value);
  //   setSave(idDT.target.value.split(','))

  // }
  // const clearValueSaved = () => {
  //   setSave([]);
  // }
  // useEffect(() => {
  //   console.log({ save });
  //   return () => {

  //   }
  // }, [save])
  // const updateTopic = async () => {
  //   if (save.length > 0) {
  //     try {
  //       let data = {
  //         iddetai: save[0],
  //         idGVHD: save[1]
  //       }
  //       console.log({ data });
  //       const update = await axios.post(`https://quanlydoan.live/api/ChiTietDeTai/ChiTietDeTai/${save[0]}/${save[1]}`, data)
  //       console.log({ update });
  //     } catch (error) {
  //       console.log('loi update detai');
  //     }
  //   }
  // }

  function TopicAssign() {
    changeBodyPopup ? 
    axios.post(GET_API_STUDENTS_URL + `/ChiTietDeTai/ListChiTietDeTai/${idGVHD}/${idHocKy}/${idMonHoc}`, listIdDeTai, GetToken()) 
    :
    axios.post(API_FEEDBACK.POST_API_FEEDBACK_LIST_TOPIC.format(idGVHD, idHocKy, idMonHoc),listIdDeTai, GetToken()).then(response => { alert(response.data.message) }).catch((err) => { alert(err.response.data.message) })
    setListIdDeTai([])
    setShowPopupAssign(false)
  }

  useEffect(() => {
      console.log(listIdDeTai)
    }, [listIdDeTai])

  function AssignInstructions(item) {
    setTextTitel('hướng dẫn')
    CallApiGetListTopicAssignInstructions()
    setIdGVHD(item.idGVHDTheoKy)
    setChangeBodyPopup(true)
    setShowPopupAssign(true)
  }

  function AssignFeedback(item) {
    setTextTitel('phản biện')
    CallApiGetListTopicAssignFeedback(item.idGVHD)
    setIdGVHD(item.idGVHD)
    setChangeBodyPopup(false)
    setShowPopupAssign(true)
  }

  return (
    <>
      <Modal
        width={'1000px'}
        title={"Chọn đề tài " + textTitle}
        button={[
          <Button
            name={"Lưu"}
            onClick={() => TopicAssign()}
            disabled={listIdDeTai == '' ? true : false}
            background={'#2ecc71'}
          />
        ]}
        body={[
          <div className="table-list-topic">
            <table >
              <thead>
                <tr>
                  <th>Mã đề tài</th>
                  <th>Tên đề tài</th>
                  <th>Tên sinh viên</th>
                  <th>Tên Môn học</th>
                  <th>Chọn</th>

                </tr>
              </thead>
              <tbody>
                {topicSelecter?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.maDeTai}</td>
                    <td>{item.tenDeTai}</td>
                    <td>{item.tenSinhVien}</td>
                    <td>{item.tenMonHoc}</td>
                    <td><input
                      type="checkbox"
                      value={item.id}
                      id="checkbox1"
                      onChange={() => handleChange(item)}
                    /></td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>]}
        show={showPopupAssign}
        onClickClose={() => setShowPopupAssign(false)}
      />
      <StyledSemester.Flex>
        <div><HeaderMonHoc /></div>
        <div className="Body">
          <div className="BodyDiv">
            <h1> Phân công đề tài cho giảng viên {tenHocKy}</h1>
            {isLoading ? (
              <div>Loading</div>
            ) : (

              <StyledSemester.Body style={{height: '470px', overflowY: "scroll"}}>

                <table>
                  <thead>
                    <tr>
                      <th>Mã giảng viên</th>
                      <th>Họ tên</th>
                      <th>Đơn vị công tác</th>
                      <th>Hòm thư</th>
                      <th>Điện thoại</th>
                      {/* <th>Chọn đề tài</th> */}
                      <th colSpan="2">Phân công</th>

                    </tr>
                  </thead>
                  <tbody>
                    {teacherSelecter?.map((item, index) => (

                      <tr key={index}>
                        <td>{item.maGVHD}</td>
                        <td>{item.tenGVHD}</td>
                        <td>{item.donViCongTac}</td>
                        <td>{item.email}</td>
                        <td>{item.dienThoai}</td>
                        <td>
                          <button className="tutorial" onClick={() => { AssignInstructions(item) }}>Hướng dẫn</button>
                        </td>
                        <td>
                          <StyledSemester.See style={typeApprover == "GangVien" || typeApprover == "HoiDong" ? {display: "none"} : {display: "block"}} onClick={() => { AssignFeedback(item) }}>
                            Phản biện
                          </StyledSemester.See>
                        </td>


                        {/* <td>
                  
                    <select name="myName" onChange={onHandelTopic}>
                    {topicSelecter?.map ((i, index ) => (
                        <option value={[i.idDeTai,item.maGVHD]} >{i.tenDeTai} </option>
                        ))}
                        </select>
                        </td>
              <td><button type="submit" onClick={updateTopic}>Lưu</button></td> */}



                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* <StyledSemester.Popup id="hide" >
                  <StyledSemester.PopupContent>
                    <div className="Divpopup">
                      <StyledSemester.PopupTitle>
                        <StyledSemester.Popuptext> Chọn đề tài</StyledSemester.Popuptext>
                        <StyledSemester.Close onClick={onHide}>&times;</StyledSemester.Close>
                      </StyledSemester.PopupTitle>
                      <div className="save">
                        <button className="button-save" onClick={() => topicAssign()}>Lưu</button>
                      </div>
                      
                    </div>
                  </StyledSemester.PopupContent>
                </StyledSemester.Popup> */}
              </StyledSemester.Body>

            )}
          </div>
        </div>
      </StyledSemester.Flex>
    </>
  );
};

export default Student;