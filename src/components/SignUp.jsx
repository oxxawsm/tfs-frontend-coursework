import { Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { NavLink, Navigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import styles from './SignUp.module.css';

import { registerUser } from "../actions/";


const SignUp = ({ auth, history }) => {

    const dispatch = useDispatch();
    const [state, setState] = useState({
        displayName: '',
        email: '',
        password: '',
        toFrontpage: false,
    });

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(registerUser(state.email, state.password, state.displayName, () => history.push("/")));
    };

    const redirect = (
        <Navigate to="/" />
    );


    const signUp = (
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
                    label="Пароль"
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

    if (state.toFrontpage) {
        return redirect;
    } else {
        return signUp;
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(SignUp);