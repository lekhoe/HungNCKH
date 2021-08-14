import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation, useParams, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import Headers from '../../layout/Header';
import { StyledSemester } from '../Semesters/styled';
import { addSubjectList, getSubjectLists, putSubjectLists } from './action';
import axios from "axios";
import GetToken from "../Login/getToken";
import Button from '../CommonComponent/Button/Button';
import './subjectList.css'
import Modal from '../CommonComponent/Modal/Modal';
import { API_SUBJECT } from '../../commonConstants/enpoint';

const SubjectList = () => {
  const match = useRouteMatch();
  const GET_API_STUDENTS_URL = "https://api.quanlydoan.live/api"
  //----------useState----------------------
  const [idMonHoc, setIdMonHoc] = useState("");
  const [maMonHoc, setMaMonHoc] = useState("");
  const [tenMonHoc, setTenMonHoc] = useState("");
  const [nameMonTienQuyet, setNameMonTienQuyet] = useState("");
  const [soLuongGVHD, setSoLuongGVHD] = useState(0);
  const [soLuongPhanBien, setSoLuongPhanBien] = useState(0);
  const [typeApprover, setTypeApprover] = useState("0");
  const [changeVersion, setChangeVersion] = useState(true);
  const [subjectListSelecters, setSubjectListSelecters] = useState([]);
  const [idPrerequisite, setIdPrerequisite] = useState('0');
  const [hide, setHide] = useState(false);
  const [showPopupDeleteSubject, setShowPopupDeleteSubject] = useState(false);
  const [subjectListSelecter, setSubjectListSelecter] = useState([]);




  let test = useLocation()
  // console.log(test);
  let { idHocKy } = useParams();
  let { tenHocKy } = useParams();
  let {idBoMon} =useParams();
  //console.log("tên học kỳ" + tenHocKy);
  // console.log(idHocKy);
  // console.log(tenHocKy);

  const dispatch = useDispatch();
  // const subjectListSelecter = useSelector((state) => state.reducerSubjectList.list);
  // console.log("subjectListSelecter ", subjectListSelecter);

  function CallGetListSubject(){
    axios.get(API_SUBJECT.GET_API_SUBJECT_LIST.format(idHocKy), GetToken()).then((response) => { setSubjectListSelecter(response.data.data) })
  }
  useEffect(() => {
    // dispatch(getSubjectLists(idHocKy));
    CallGetListSubject()
  }, []);
  useEffect(() => {
    console.log(idPrerequisite);
  }, [idPrerequisite]);



  useEffect(() => {
    let data = [
      {
        "idMonTienQuyet": "0",
        "idMonHoc": "0",
        "tenMonHoc": "Bỏ qua"
      },
      ...subjectListSelecter
    ]
    setSubjectListSelecters(data)
  }, [subjectListSelecter]);

  const getPro = () => {
    dispatch(getSubjectLists());
  };

  //-------------------sửa-----------------
  const onAddSubmit = () => {
      console.log("typeApprover "+typeApprover);
    if (maMonHoc && tenMonHoc ) {
      if(typeApprover==null){
        
      
      if (changeVersion) {
        let body =
        {
          "idMonTienQuyet": idPrerequisite,
          "soLuongGVHD": soLuongGVHD,
          "soLuongPhanBien": soLuongPhanBien
        }
        axios.post(GET_API_STUDENTS_URL + `/MonHoc/${maMonHoc}/${tenMonHoc}/${idHocKy}/${typeApprover}`, body, GetToken()).then(response => { alert(response.data.message) })
        setTimeout(function () { CallGetListSubject() }, 500);
      }
      else {
        debugger
        let bodyEdit =
        {
          "idMonTienQuyet": idPrerequisite,
          "soLuongGVHD": soLuongGVHD,
          "soLuongPhanBien": soLuongPhanBien
        }
        axios.put(API_SUBJECT.PUT_API_SUBJECT.format(maMonHoc, idHocKy, tenMonHoc, idMonHoc, typeApprover), bodyEdit, GetToken()).then(response => { alert(response.data.message) })
        setTimeout(function () { CallGetListSubject() }, 500);
      }}else{
        alert("Bạn chưa chọn cấp độ đánh giá");
      }
    } else {
      alert("vui lòng nhập thông tin");
    }
    setHide(false)
  };

  useEffect(() => {
    if(!hide)
    {
      setMaMonHoc("");
      setTenMonHoc("");
      setTypeApprover("");
      setSoLuongGVHD(0)
      setSoLuongPhanBien(0)
    }
  }, [hide]);

  const onAdd = () => {
    setHide(true);
    setChangeVersion(true);

  };

  const onPut = (item) => {
    setHide(true);
    setChangeVersion(false);
    setIdMonHoc(item.idMonHoc);
    setMaMonHoc(item.maMonHoc);
    setTenMonHoc(item.tenMonHoc);
    setNameMonTienQuyet(item.nameMonTienQuyet);
    setSoLuongPhanBien(item.soLuongPhanBien);
    setSoLuongGVHD(item.soLuongGVHD)
    setTypeApprover(item.typeApprover)

  }

  function ConsfirmDeleteSubject(item) {
    setIdMonHoc(item.idMonHoc)
    setTenMonHoc(item.tenMonHoc)
    setShowPopupDeleteSubject(true)
  }

  function DeleteSubject(){
    axios.delete(API_SUBJECT.DELETE_API_SUBJECT.format(idMonHoc), GetToken()).then((response) => { alert(response.data.message) }).catch((err) => { alert(err.response.data.message) })
    setShowPopupDeleteSubject(false)
    setTimeout(function () { CallGetListSubject() }, 500);
    
  }

  //------------ẩn/hiện popup-------------

  return (
    <>
      <Modal
        title={"Thống báo"}
        show={showPopupDeleteSubject}
        mess={"Bạn có muốn xóa môn học " + tenMonHoc + " không?"}
        button={[
          <Button
            name={'Hủy'}
            onClick={() => setShowPopupDeleteSubject(false)}
          />,
          <Button
            name={'Xóa'}
            background={'#e74c3c'}
            color={'#ffffff'}
            onClick={() => DeleteSubject()}
          />
        ]}
        onClickClose={() => setShowPopupDeleteSubject(false)}
      />
      <Modal
        title={changeVersion ? "Thêm môn học" : "Sửa môn học"}
        show={hide}
        onClickClose={() => setHide(false)}
        body={[
          <div className="add-edit-subject">
            <div className="item">
              <p>Nhập mã môn học</p>
              <input
                placeholder="Nhập mã môn học"
                type="text"
                value={maMonHoc}
                onChange={(maMonHoc) => setMaMonHoc(maMonHoc.target.value)}
              />
            </div>
            <div className="item">
              <p>Nhập tên môn học</p>
              <input
                placeholder="Nhập tên môn học"
                type="text"
                value={tenMonHoc}
                onChange={(tenMonHoc) => setTenMonHoc(tenMonHoc.target.value)}
              />
            </div>
            <div className="item">
              <p>Nhập môn học tiên quyết</p>

              <select onChange={(val) => setIdPrerequisite(val.target.value)} defaultValue={tenMonHoc}>
                {subjectListSelecters?.map((item, index) => (
                  <option value={item.idMonHoc}>
                    {item.tenMonHoc}
                  </option>
                ))}
              </select>
            </div>
            <div className="item">
              <p>Cấp độ đánh giá</p>
              <select onChange={(val) => setTypeApprover(val.target.value)} defaultValue={typeApprover}>
              <option value={3}>
                  Chọn cấp độ đánh giá
                </option>
              <option value={0}>
                  Giảng viên hướng dẫn
                </option>
                <option value={1}>
                  Hội đồng
                </option>
               
                <option value={2}>
                  Phản biện và hội đồng
                </option>
              </select>
            </div>
            <div className="item">
              <p>Giảng viên phản biện</p>
              <select onChange={(val) => setSoLuongPhanBien(val.target.value)} defaultValue={soLuongPhanBien}>
                <option value={0}>
                  0
                </option>
                <option value={1}>
                  1
                </option>
                <option value={2}>
                  2
                </option>
                <option value={3}>
                  3
                </option>
              </select>
            </div>
            <div className="item">
              <p>Giảng viên hướng dẫn</p>
              <select onChange={(val) => setSoLuongGVHD(val.target.value)} defaultValue={soLuongGVHD}>
                <option value={0}>
                  0
                </option>
                <option value={1}>
                  1
                </option>
                <option value={2}>
                  2
                </option>
                <option value={3}>
                  3
                </option>
              </select>
            </div>
          </div>
        ]}
        button={[
          <Button name={"Hủy"} onClick={() => setHide(false)} />,
          <Button name={changeVersion ? "Thêm" : "Sửa"} onClick={() => onAddSubmit()} background={changeVersion ? "#3498db" : "#2ecc71"} />
        ]}
      />
      <StyledSemester.Flex>
        <div><Headers /></div>
        <div className="Body">
          <div className="BodyDiv">

            <h1>Môn Học - {tenHocKy}</h1>
            <StyledSemester.Body>
              <div className="subject-header"><Button name={"Thêm môn học"} background={"#3498db"} onClick={() => onAdd()} /></div>
              {/* <StyledSemester.ButtonAdd onClick={() => onAdd()}>Thêm môn học</StyledSemester.ButtonAdd> */}
              {/* <StyledSemester.Popup style={hide ? { display: "block" } : { display: "none" }}>
                <StyledSemester.PopupContent1>
                  <StyledSemester.DivSpan>
                    <span onClick={() => setHide(false)}>&times;</span>
                  </StyledSemester.DivSpan>
                  <h1 >{changeVersion ? "Thêm" : "Sửa"} môn học</h1>
                  <StyledSemester.DivInput>
                    <StyledSemester.DivLable>
                      <label>Nhập mã môn học</label>
                      <input
                        placeholder="Nhập mã môn học"
                        type="text"
                        value={maMonHoc}
                        onChange={(maMonHoc) => setMaMonHoc(maMonHoc.target.value)}
                      />
                    </StyledSemester.DivLable>
                    <StyledSemester.DivLable>
                      <label>Nhập tên môn học</label>
                      <input
                        placeholder="Nhập tên môn học"
                        type="text"
                        value={tenMonHoc}
                        onChange={(tenMonHoc) => setTenMonHoc(tenMonHoc.target.value)}
                      />
                    </StyledSemester.DivLable>
                    <StyledSemester.DivLable>
                      <label>Nhập môn học tiên quyết</label>

                      <select onChange={(val) => setIdPrerequisite(val.target.value)}>
                        {subjectListSelecters?.map((item, index) => (
                          <option value={item.idMonHoc}>
                            {item.tenMonHoc}
                          </option>
                        ))}
                      </select>

                      <label>Cấp độ đánh giá</label>
                      <select onChange={(val) => setTypeApprover(val.target.value)}>
                        <option value={0}>
                          Giảng viên hướng dẫn
                        </option>
                        <option value={1}>
                          Hội đồng
                        </option>
                        <option value={2}>
                          Phản biện và hội đồng
                        </option>
                      </select>

                      <label>Giảng viên phản biện</label>
                      <select onChange={(val) => setSoLuongPhanBien(val.target.value)}>
                        <option value={0}>
                          0
                        </option>
                        <option value={1}>
                          1
                        </option>
                        <option value={2}>
                          2
                        </option>
                        <option value={3}>
                          3
                        </option>
                      </select>

                      <label>Giảng viên hướng dẫn</label>
                      <select onChange={(val) => setSoLuongGVHD(val.target.value)}>
                        <option value={0}>
                          0
                        </option>
                        <option value={1}>
                          1
                        </option>
                        <option value={2}>
                          2
                        </option>
                        <option value={3}>
                          3
                        </option>
                      </select>
                    </StyledSemester.DivLable>

                    <StyledSemester.DivButton>
                      <button type="submit" onClick={() => onAddSubmit()}>
                        Thêm
                      </button>
                      <button type="submit" onClick={() => setHide(false)}>Hủy</button>
                    </StyledSemester.DivButton>
                  </StyledSemester.DivInput>

                </StyledSemester.PopupContent1>
              </StyledSemester.Popup> */}
              <table>
                <thead>
                  <tr>
                    <th>Xử lý thông tin</th>
                    <th>Mã môn học</th>
                    <th>Tên môn học</th>
                    <th>Môn học tiên quyết</th>
                    <th colspan="2">Hành động</th>

                  </tr>
                </thead>
                <tbody>
                  {subjectListSelecter?.map((item, index) => (
                    <tr key={index}>
                      <Link to={`/mon-hoc/${tenHocKy}/${idHocKy}/${idBoMon}/${item.tenMonHoc}/${item.idMonHoc}/${item.typeApprover}`}>
                        <td><StyledSemester.See>Xử lý thông tin</StyledSemester.See></td>
                      </Link>
                      <td>{item.maMonHoc}</td>
                      <td>{item.tenMonHoc}</td>
                      <td>{item.nameMonTienQuyet}</td>
                      <td><StyledSemester.ButtonAdd onClick={() => onPut(item)}>Sửa</StyledSemester.ButtonAdd></td>
                      <td><StyledSemester.Delete onClick={() => ConsfirmDeleteSubject(item)}>Xóa</StyledSemester.Delete></td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </StyledSemester.Body>

          </div>
        </div>
      </StyledSemester.Flex>
    </>
  );
};

export default SubjectList;

