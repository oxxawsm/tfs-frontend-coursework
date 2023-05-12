import { Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import styles from './SignUp.module.css'

const SignUp = () => {
    const signUp = (
        <Container component='main' maxWidth='xs'>
        <div className={styles.formWrapper}>
            <h2>
                Sign Up
            </h2>
            <form className={styles.form}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    name="userName"
                    autoComplete="nickname"
                    // onChange={onChange}
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
                    // onChange={onChange}
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
                    // onChange={onChange}
                />

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

    return signUp
}

export default SignUp