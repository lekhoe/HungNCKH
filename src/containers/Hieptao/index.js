import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";

const HiepPage = () => {
    let { path, url } = useRouteMatch();

    return (
        <h1>ddddddddddddddddddddd</h1>
    );
};

export default HiepPage;