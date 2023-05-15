import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Provider } from 'react-redux/es';

import Header from './components/Navbar/header';
import Board from './components/Board/Board';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateBoard from './components/BoardsList/CreateBoard';
import BoardList from './components/BoardsList/BoardList';
import BoardCard from './components/Board/Card'
import Section from './components/Board/Section';


function App(props) {
  const { isAuthenticated} = props.auth || {};

  return (
      
    <Router>
      <Header isAuthenticated={isAuthenticated}/>
      {/* <SignIn/> */}
      {/* <SignUp/>  */}
      {/* <BoardList/> */}
      {/* <BoardCard/> */}
     {/* <Section/> */}
     {/* <Board/> */}

      <Routes>
        {!isAuthenticated ? <Route path="/signin" element={SignIn} /> : <Route path="/" element={BoardList} />}
 
        {/* <Route path='/signin' element={SignIn}/> */}
        <Route path='/signup' element={SignUp}/>
        <Route path='/board/:id'/> 
      </Routes>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
      auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
