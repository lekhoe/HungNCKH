import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSemesters } from '../Semesters/action';

const ChooseTeacher = () => {
    const dispatch = useDispatch();

    const semesterSelecter = useSelector((state) => state.reducerSemester.list);
    useEffect(() => {
        dispatch(getSemesters());
      }, []);
       

      const handleSelectHocKy = (value) => {
          console.log('value select : ', value);
           if(typeof window !== undefined){
               localStorage.setItem('hocKySelect, ', JSON.stringify(value))
           }
      }
    return (
        <>
        <h1>Chọn Giảng Viên Hướng Dẫn theo kỳ </h1>
            {semesterSelecter.map ((item, index ) => {
               return (
                <div key={index}>
                    <Link to='/danh-sach-giang-vien'>
                    <button onClick={() => handleSelectHocKy(item)}>{item.tenHocKy}</button>
                    </Link>
                </div>
                ) 
            })}
           
        </>
    );
};

export default ChooseTeacher;