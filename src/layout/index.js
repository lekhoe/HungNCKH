import React from "react";
import Headers from "./Header";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Teachers from "../containers";
function Layout(props) {
  const { children } = props;
  return (

     <h1>lay out</h1>
    // <Router>
    //   <Headers />

    //   <Switch>
    //     <Route exact path="/">
    //       <h1>Home pae</h1>
    //     </Route>
    //     <Route path="/teacher">
    //       <Teachers />
    //     </Route>
    //   </Switch>

      
    //   <h1>This is Footer</h1>
    // </Router>
  );
}

export default Layout;

export const StyledLayoutBody = styled.div``;
