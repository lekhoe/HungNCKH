import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import HeaderMonHoc from "../../layout/HeaderMonHoc";
import { StyledSemester } from "../Semesters/styled";
import { getTopics } from "../Topics/action";
import { getAssignReviewers } from "./action";
import { getFolders, AcctionTypes } from './action';
import { FcFolder } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import './assignReviewers.css'
import GetToken from "../Login/getToken";
import axios from "axios";
import { ImFileExcel } from 'react-icons/im';
import Cookies from 'js-cookie';
import { AiOutlineDownload } from 'react-icons/ai';
import Button from "../CommonComponent/Button/Button";
import { API_FEEDBACK, API_FILE } from "../../commonConstants/enpoint";
import Modal from "../CommonComponent/Modal/Modal";

const AssignReviewer = () => {
  let { idHocKy } = useParams();
  let { tenHocKy } = useParams();
  let { idMonHoc } = useParams();
  let { typeApprover } = useParams();
  let { tenMonHoc } = useParams();

  //-----------------------------
  const [idPhanBien, setIdPhanBien] = useState();
  const [maGVPB, setMaGVPB] = useState();
  const [tenGVPB, setTenGVPB] = useState();
  const [maDetai, setMaDetai] = useState();
  const [point, setPoint] = useState();
  const [note, setNote] = useState();
  const [changeVersion, setChangeVersion] = useState(true);
  const [changeVersion1, setChangeVersion1] = useState(false);
  const [hide, setHide] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showFile, setShowFile] = useState(false);
  const [showPopupSaveFile, setShowPopupSaveFile] = useState(false);
  const [showPopupDeleteFeeback, setShowPopupDeleteFeeback] = useState(false);
  const [showPopupChooseFilePoint, setShowPopupChooseFilePoint] = useState(false);
  const [fileName, setFileName] = useState('');
  const [idFile, setIdFile] = useState('');
  const [assignReviewerSelecter, setAssignReviewerSelecter] = useState([]);

  //-------------------s???a-----------------------------
  const OnPutSemesters = (idPhanBien, item) => {
    setChangeVersion1(true);
    setChangeVersion(false);
    // setIdPhanBien(idPhanBien);
    setMaGVPB(item.maGVPB);


  };



  const dispatch = useDispatch();
  const GET_API_FILE_URL = `https://api.quanlydoan.live/api/File/SearchAll/FolderName/`;
  const folderSelecter = useSelector((state) => state.reducerFolder.list);
  // const assignReviewerSelecter = useSelector((state) => state.reducerAssignReviewer.list);
  const isLoading = useSelector((state) => state.reducerAssignReviewer.isLoading);
  // const fileSelecter = useSelector((state) => state.reducerFile.list);

  useEffect(() => {
    // dispatch(getAssignReviewers(idHocKy));
    CallApiGetListAssign()
  }, []);

  function CallApiGetListAssign() {
    axios.get(API_FEEDBACK.GET_API_FEEDBACK_LIST.format(idHocKy), GetToken()).then((response) => { setAssignReviewerSelecter(response.data.data) })
  }

  //----ph??n c??ng ????? t??i--------------------------------
  const onShow = () => {
    setHide(false);

  };
  useEffect(() => {
    dispatch(getTopics(idHocKy, idMonHoc));


  }, []);
  useEffect(() => {
    dispatch(getFolders());

  }, []);
  const onHide = () => {
    setHide(true);

  };
  const handleChange = () => {

  }
  const topicSelecter = useSelector((state) => state.reducerTopic.list);
  const [fileSelecter, setFileSelecter] = useState([]);

  function callApiLoadFile(item) {
    setShowFile(true);
    try {
      axios.get(`${GET_API_FILE_URL}${item.id}`, GetToken()).then(response => { setFileSelecter(JSON.parse(response.request.response)) })
    } catch (error) { }

  }

  useEffect(() => {
    console.log(fileSelecter)
  }, [fileSelecter]);

  const someFunction = (idFile, fileUrl) => {

    console.log("id ", idFile);

    const method = `GET`;
    const url = `https://api.quanlydoan.live/api/File/downloads/${idFile}`;

    axios
      .request({
        url,
        headers: {
          'Authorization': 'Bearer ' + `${Cookies.get('token')}`,

        },

        method,

        responseType: `blob`, //important
      })
      .then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileUrl); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });

  }

  function ExportFileCouncil() {
    axios.get(API_FILE.GET_API_DOWNLOAD_FILE_REVIEWL.format(idHocKy, idMonHoc)
      , {
        responseType: 'blob',
        headers: {
          //"content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          // "Accept": "application/json",
          Authorization: 'Bearer ' + `${Cookies.get('token')}`
        }
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        window.open(url);

      })
      .catch((err) => {
        //reject(err);
      });
  }

  //x??c nh???n file v??o ??i???m
  function ConfirmSaveFilePoint(item) {
    setFileName(item.fileName)
    setIdFile(item.idFile)
    setShowPopupSaveFile(true)
  }

  function CallApiSaveFilePoint() {
    axios.post(API_FEEDBACK.POST_API_FEEDBACK_POINT.format(idFile), '', GetToken()).then((response) => { alert(response.data.message) })
    setShowPopupSaveFile(false)
    setShowPopupChooseFilePoint(false)
  }

  function InputUpdateFeedbackPoint(item) {
    setIdPhanBien(item.idPhanBien)
  }

  function UpdatePointFeedback() {
    let body = {
      "note": '',
      "diem": point,
    }
    axios.put(API_FEEDBACK.PUT_API_FEEDBACK_POINT.format(idPhanBien), body, GetToken()).then(response => { console.log(response) })
    setTimeout(function () { CallApiGetListAssign(); }, 500);
  }

  function ConfirmDeleteFeedback(item) {
    if (item.diem == '') {
      setMaGVPB(item.maGVPB)
      setIdPhanBien(item.idPhanBien)
      setShowPopupDeleteFeeback(true)
    }
  }

  function DeleteFeedback() {
    axios.delete(API_FEEDBACK.DELETE_API_FEEDBACK.format(idPhanBien, idHocKy, idMonHoc), GetToken()).then((response) => { alert(response.data.message) }).catch((err) => { alert(err.response.data.message) })
    setTimeout(function () { CallApiGetListAssign(); }, 500);
  }

  return (
    <>
      <Modal
        show={showPopupDeleteFeeback}
        mess={"B???n c?? mu???n x??a gi???ng vi??n ph???n bi???n " + maGVPB + " kh??ng?"}
        button={[
          <Button
            name={"H???y"}
            onClick={() => { setShowPopupDeleteFeeback(false) }}
          />,
          <Button
            name={"OK"}
            onClick={() => DeleteFeedback()}
          />
        ]}
        onClickClose={() => { setShowPopupDeleteFeeback(false) }}
      />
      <Modal
        show={showPopupChooseFilePoint}
        title={"T???p ??i???m"}
        body={
          !showFile ? [
            <div className="list-folder">
              {folderSelecter.map((item, index) => {
                return (
                  <div className="folder-choose-point" key={index} onClick={() => callApiLoadFile(item)}>
                    <div className="folder-icon"><FcFolder /></div>
                    <div className="name-folder">{item.folderName}</div>
                  </div>
                );
              })}
            </div>
          ] :
            [
              <div className="list-folder">
                {fileSelecter?.map((item, index) => (
                  <div className="folder-choose-point" key={index} onClick={() => ConfirmSaveFilePoint(item)}>
                    <div className="folder-icon"><ImFileExcel /></div>
                    <div className="name-folder">{item.fileName}</div>
                  </div>
                ))}
              </div>]}
        button={showFile ? [
          <Button
            name={"Folder"}
            onClick={() => setShowFile(false)}
          />
        ] : ''}
        onClickClose={() => setShowPopupChooseFilePoint(false)}
      />
      <Modal
        show={showPopupSaveFile}
        mess={"B???n c?? mu???n nh???p ??i???m t??? file " + fileName + " kh??ng?"}
        button={[
          <Button
            name={"H???y"}
            className={"button-input-point"}
            onClick={() => setShowPopupSaveFile(false)}
          />,
          <Button
            name={"OK"}
            background={'#3498db'}
            color
            onClick={() => CallApiSaveFilePoint()}
          />
        ]}
        onClickClose={() => setShowPopupSaveFile(false)}
      />
      <StyledSemester.Flex>
        <div><HeaderMonHoc /></div>
        <div className="Body">
          <div  className="BodyDiv">
            <h1 style={{ display: 'flex' }}><span className="title">Ph???n bi???n - {tenHocKy}</span></h1>
            {isLoading ? (
              <div>Loading</div>
            ) : (
              <StyledSemester.Body>
                <div>
                  <div className="download-file-council">
                    <Button
                      name={"V??o ??i???m"}
                      background={"#f39c12"}
                      color={"#ffffff"}
                      className={"button-add-point-evaluationBoards-council"}
                      onClick={() => setShowPopupChooseFilePoint(true)}
                    />
                    <Button
                      name={"Xu???t Excel"}
                      background={"#1abc9c"}
                      color={"#ffffff"}
                      className={"download-file-council-button"}
                      onClick={() => ExportFileCouncil()}
                    />
                  </div>
                  <table style={changeVersion1 ? { display: "block" } : { display: "none" }}>
                    <thead>
                      <tr>
                        <td>{changeVersion ? "Th??m GV ph???n bi???n" : "S???a GV ph???n bi???n"}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            placeholder="Nh????p m?? GVPB"
                            type="text"
                            value={maGVPB}
                            onChange={(maGVPB) => setMaGVPB(maGVPB.target.value)}

                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input
                            placeholder="Nh????p t??n h???c k???"
                            value={tenHocKy}
                            type="text"

                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <button type="submit" > Th??m
                            {/* {changeVersion ? "Th??m" : "S???a"} */}
                          </button>
                          <button type="submit" >Hu??y</button>

                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>M?? gi???ng vi??n</th>
                      <th>T??n Gi???ng vi??n</th>
                      <th>M?? ????? t??i</th>
                      <th>T??n ????? t??i</th>
                      <th>??i???m</th>
                      <th>Ghi ch??</th>
                      <th colspan="2">H??nh ?????ng</th>

                    </tr>
                  </thead>
                  <tbody>
                    {assignReviewerSelecter?.map((item, index) => (

                      <tr key={index}>
                        <td>{item.maGVPB}</td>
                        <td>{item.tenGVPB}</td>
                        <td>{item.maDeTai}</td>
                        <td>{item.tenDeTai}</td>
                        <td><div onClick={() => InputUpdateFeedbackPoint(item)}><input className="input-point-feedback" onChange={(val) => setPoint(val.target.value)} onBlur={() => UpdatePointFeedback()} defaultValue={item.diem} value={index.point} /></div></td>
                        <td>{item.note}</td>

                        {/* <td><StyledSemester.ButtonAdd onClick={() => OnPutSemesters(item.idPhanBien, item)}>S???a</StyledSemester.ButtonAdd></td> */}
                        <td>{item.diem == '' ? <Button onClick={() => ConfirmDeleteFeedback(item)}
                          name={"X??a"}
                          background={'#e74c3c'}
                        /> : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <StyledSemester.Popup id="hide" style={hide ? { display: "none" } : { display: "block" }} >
                  <StyledSemester.PopupContent>
                    <div className="Divpopup">
                      <StyledSemester.PopupTitle>
                        <StyledSemester.Popuptext> Ph??n c??ng ????? t??i cho Ph???n bi???n</StyledSemester.Popuptext>
                        <StyledSemester.Close onClick={onHide}>&times;</StyledSemester.Close>
                      </StyledSemester.PopupTitle>
                      <div className="save">
                        <StyledSemester.ButtonAdd>L??u</StyledSemester.ButtonAdd>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>M?? ????? t??i</th>
                            <th>T??n ????? t??i</th>
                            <th>T??n sinh vi??n</th>
                            <th>T??n H???c k???</th>
                            <th>T??n M??n h???c</th>
                            <th>Ch???n</th>

                          </tr>
                        </thead>
                        <tbody>
                          {topicSelecter?.map((item, index) => (
                            <tr key={index}>
                              <td>{item.maDeTai}</td>
                              <td>{item.tenDeTai}</td>
                              <td>{item.tenSinhVien}</td>
                              <td>{item.tenHocKy}</td>
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
                    </div>
                  </StyledSemester.PopupContent>
                </StyledSemester.Popup>
              </StyledSemester.Body>
            )}
          </div>
        </div>
      </StyledSemester.Flex>
    </>
  );
};

export default AssignReviewer;
