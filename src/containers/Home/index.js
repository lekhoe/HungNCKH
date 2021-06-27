import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSemesters } from '../Semesters/action';

const Home = () => {
    const dispatch = useDispatch();

    const semesterSelecter = useSelector((state) => state.reducerSemester.list);
    useEffect(() => {
        dispatch(getSemesters());
      }, []);
      
    return (
        <div>
            <h1>Học kỳ </h1>
            {semesterSelecter.map ((item, index ) => {
               return (
                <div key={index}>
                    <Link to={`/danh-sach-gvhd-theo-ky/${item?.tenHocKy}/${item?.idHocKy}`}>
                    <button>{item.tenHocKy}</button>
                    </Link>
                </div>
                ) 
            })}
        </div>
    );
};

export default Home;