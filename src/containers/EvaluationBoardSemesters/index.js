import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSemesters } from '../Semesters/action';

const EvaluationBoardSemester = () => {
    const dispatch = useDispatch();
    const [Id_hocky, setId_hocky] = useState(null);

    const semesterSelecter = useSelector((state) => state.reducerSemester.list);
    useEffect(() => {
        dispatch(getSemesters());
      }, []);
     
    // const setIdHocky =(id)=>{
    //     console.log({id});
    //     dispatch(saveIdHocky)
    // }
    return (
        <div>
            <h1>Danh sách hội đồng tốt nghiệp theo kỳ </h1>
            {semesterSelecter.map ((item, index ) => {
               return (
                <div key={index}>
                    <Link to={`/danh-sach-hoi-dong-tot-nghiep/${item?.tenHocKy}/${item?.idHocKy}`}>
                    <button>{item.tenHocKy}</button>
                    </Link>
                </div>
                ) 
            })}
        </div>
    );
};

export default EvaluationBoardSemester;