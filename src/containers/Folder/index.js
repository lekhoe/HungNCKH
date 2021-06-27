import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderMonHoc from '../../layout/HeaderMonHoc';
import { StyledSemester } from '../Semesters/styled';
import { addFolder, getFolders } from './action';
import { FcFolder } from 'react-icons/fc';
import { Link, useParams } from 'react-router-dom';

const Folder = () => {
    let { idHocKy } = useParams();
    let {tenHocKy} = useParams();
    let { tenMonHoc } = useParams();
    let {idMonHoc} = useParams();
    let {typeApprover} = useParams();
    const dispatch = useDispatch();
    const folderSelecter = useSelector((state) => state.reducerFolder.list);
    useEffect(() => {
        dispatch(getFolders());
        
      }, []);
      //console.log("folderSelecter.folderName = ", folderSelecter);
      //-------------Thêm folder--------------------------------
      const [nameFolder, setNameFolder] = useState();
      console.log("nameFolder ", nameFolder);
      const [changeVersion1, setChangeVersion1] = useState(false);
      const onAdd =() =>{
        setChangeVersion1(true);
      }
      const getPro =()=> {
        dispatch(getFolders())  ;
      };
      const onAddSubmit = (e) => {
        // dispatch(addFolder(nameFolder,getPro()));
        // setChangeVersion1(false);
      }
    return (
        <StyledSemester.Flex>
            <div><HeaderMonHoc /></div>
        <div className="Body">
{/* ---------------Popup------------------------------------------------------------ */}
        <StyledSemester.Popup style={changeVersion1 ? {display: "block"} : {display: "none"}}>
                <StyledSemester.PopupContent1>
                  <StyledSemester.DivSpan>
                <span onClick={()=> setChangeVersion1(false)}>&times;</span>
                </StyledSemester.DivSpan>
                  <h1 >Thêm Folder</h1>
                  <StyledSemester.DivInput>
                    <StyledSemester.DivLable>
                    <label>Nhập Tên folder</label>
                    <input
                      placeholder="Nhập tên folder"
                      type="text"
                      value={nameFolder}
                      onChange={(nameFolder) => setNameFolder(nameFolder.target.value)}
                    />
                        </StyledSemester.DivLable>
                       
                       
                        <StyledSemester.DivButton>
                  <button type="submit" onClick={() => onAddSubmit()}>
                  Thêm
                    </button>
                    <button type="submit" onClick={()=> setChangeVersion1(false)}>Hủy</button>
                    </StyledSemester.DivButton>
                    </StyledSemester.DivInput>
                    </StyledSemester.PopupContent1>
              </StyledSemester.Popup>
            
        <div>
        <StyledSemester.ButtonAdd onClick={() =>onAdd()}>Thêm Folder</StyledSemester.ButtonAdd>
            <h1>Quản lý các Folder</h1>
            <StyledSemester.Body>
                {folderSelecter.map ((item, index ) => {
                    return (
            <Link to={`/mon-hoc/${tenHocKy}/${idHocKy}/${tenMonHoc}/${idMonHoc}/${typeApprover}/quan-ly-folder/file/${item.id}`}>
                <div className="folder" key={index}>
                    <div className="folderIcon"><FcFolder /></div>
                    <div className="nameFolder">{item.folderName}</div> 
                </div>
                </Link>
                )})}
            </StyledSemester.Body>
        </div>
        </div>
        </StyledSemester.Flex>
    );
};

export default Folder;