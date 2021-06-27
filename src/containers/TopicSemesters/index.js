import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSemesters } from '../Semesters/action';

const TopicSemester = () => {
    const dispatch = useDispatch();

    const semesterSelecter = useSelector((state) => state.reducerSemester.list);
    useEffect(() => {
        dispatch(getSemesters());
      }, []);
      
    return (
        <div>
            <h1>Danh sách Đề tài theo kỳ </h1>
            {semesterSelecter.map ((item, index ) => {
               return (
                <div key={index}>
                    <Link to={`/danh-sach-de-tai-theo-ky/${item?.tenHocKy}/${item?.idHocKy}`}>
                    <button>{item.tenHocKy}</button>
                    </Link>
                </div>
                ) 
            })}
        </div>
    );
};

export default TopicSemester;