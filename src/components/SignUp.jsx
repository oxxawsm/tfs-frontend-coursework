import { Button, Container, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import styles from './SignUp.module.css';

import { registerUser } from "../actions/";


const SignUp = ({ auth }) => {

    const dispatch = useDispatch();
    const [state, setState] = useState({
        displayName: '',
        email: '',
        password: '',
    });

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        });
    };

    const navigateTo = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(registerUser(state.email, state.password, state.displayName));
        navigateTo("/");
    };


    return (
        <Container component='main' maxWidth='xs'>
        <div className={styles.formWrapper}>
            <h2>
                Регистрация
            </h2>
            <form className={styles.form} onSubmit={handleSignUp}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    name="userName"
                    autoComplete="nickname"
                    color='secondary'
                    onChange={onChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    color='secondary'
                    onChange={onChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Пароль (более 6 знаков)"
                    type="password"
                    id="password"
                    color='secondary'
                    onChange={onChange}
                />
                <div>{auth.errorMessage}</div>
                <Button
                    className={styles.button}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"    
                >
                    Зарегистрироваться
                </Button>
                <div>
                    <Link to='/signin' variant="body2" component={NavLink}>
                        {"Уже есть аккаунт? Войти"}
                    </Link>
                </div>
            </form>
        </div>
    </Container> 
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(SignUp);