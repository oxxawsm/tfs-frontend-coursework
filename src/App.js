import React from 'react';
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Header from './components/Navbar/header';
import Board from './components/Board/Board';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import BoardList from './components/BoardsList/BoardList';


function App(props) {
  const { isAuthenticated} = props.auth;

  return (
      
    <Router>
      <Header isAuthenticated={isAuthenticated}/>

      <Routes>
        {!isAuthenticated ? <Route path="/signin" element={<SignIn/>} /> : <Route path='/' element={<BoardList/>} />}
 
        {/* <Route path='/signin' element={<SignIn/>}/> */}
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/board/:id' element={<Board/>} isAuthenticated={isAuthenticated}/> 
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
