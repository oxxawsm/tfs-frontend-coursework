import { Button, Container, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import styles from './SignIn.module.css';
import { loginUser } from "../actions";

export default function SignIn(props) {

    const dispatch = useDispatch();
    const [state, setState] = useState({
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

    async function handleSignIn(e) {
        e.preventDefault();
        dispatch(loginUser(state.email, state.password));
        navigateTo("/");
    };

    return (
        <Container component='main' maxWidth='xs'>
        <div className={styles.formWrapper}>
            <h2>
                Вход
            </h2>
            <form onSubmit={handleSignIn} className={styles.form}  noValidate>
                
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
                    
                    onChange={onChange}
                />

                <Button
                    className={styles.button}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"    
                >
                    Войти
                </Button>
                <div>
                    <Link variant="body2" to='/signup' component={NavLink}>
                        {"Ещё не с нами? Создать аккаунт"}
                    </Link>
                </div>
            </form>
        </div>
    </Container> 
    )

}