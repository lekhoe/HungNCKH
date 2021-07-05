import React from 'react';
import { Link } from 'react-router-dom';
import { StyledHeader } from '../Header/styled';
import './banner.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addLogin } from '../../containers/Login/action';

const Banner = () => {
    let history = useHistory();
    const dispatch = useDispatch();
function logout(){
   history.replace("/"); dispatch(addLogin(''))
}
    return (
        <div className="banner">
            <StyledHeader.Img src="/images/header/imgheader.png" />
            {/* <Link to={history.replace("/")}> */}
                <div className="banner-logout">
                    <button className="banner-logout-button" onClick={()=>logout()}>Đăng xuất</button>
                </div>
            {/* </Link> */}
        </div>
    );
};

export default Banner;