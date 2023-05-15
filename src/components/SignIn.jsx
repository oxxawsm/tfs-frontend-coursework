import { Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import styles from './SignIn.module.css'

import { loginUser } from "../actions";

export default function SignIn(props) {

    const dispatch = useDispatch();
    const [state, setState] = useState({
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

    async function handleSignIn(e) {
        e.preventDefault();
        dispatch(loginUser(state.email, state.password, props.history));
        setState({ toFrontpage: true });
    };

    // const redirect = (
    //     <Navigate to="/" />
    // );

    return (
        <Container component='main' maxWidth='xs'>
        <div className={styles.formWrapper}>
            <h2>
                Sign In
            </h2>
            <form className={styles.form}>
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
                    <Link to='/signup' variant="body2" component={NavLink}>
                        {"Ещё не с нами? Создать аккаунт"}
                    </Link>
                </div>
            </form>
        </div>
    </Container> 
    )
    

}