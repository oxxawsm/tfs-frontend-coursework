import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import { Route, BrowserRouter as Router, Routes, Navigate, useNavigate } from "react-router-dom";


import Header from './components/Navbar/header';
import Board from './components/Board/Board';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import BoardList from './components/BoardsList/BoardList';

function App(props) {
  
  const { isAuthenticated, isLoading, loginError} = props.auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (loginError) {
      navigate("/")
    }
  }, [loginError])


  if (isLoading) {
    return <div>Loading...</div>;
  }

  const commonRoutes = <Fragment>
    <Route path='/signin' element={<SignIn />}/>
    <Route path='/signup' element={<SignUp />}/>
    <Route path='*' element={<Navigate to='/'/>}/>
  </Fragment>;

  const privateRoutes = <Fragment>
    {commonRoutes}
    <Route path='/' element={<Navigate to='/boards'/>}/>
    <Route path='/boards' element={<BoardList/>}/>
    <Route path='/board/:id' element={<Board/>}/>
  </Fragment>

  const publicRoutes = <Fragment>
    {commonRoutes}
    <Route path='/' element={<Navigate to='/signin'/>}/>
  </Fragment>

  return (
    <>
      <Header isAuthenticated={isAuthenticated} isLoading={isLoading}/>
      <Routes>
        {isAuthenticated ? privateRoutes : publicRoutes}
        {/* {!isAuthenticated ? <Route path="/" element={<SignIn/>} /> : <Route path='/' element={<BoardList/>} isAuthenticated={isAuthenticated} isLoading={isLoading}/>}

        <Route path='/' element={<BoardList/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>

        <Route path='/board/:id' element={<Board/>} isAuthenticated={isAuthenticated}  isLoading={isLoading}/>  */}
      </Routes>
    </>
  );
}

function mapStateToProps(state) {
  return {
      auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
