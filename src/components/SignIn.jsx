import { Button, Container, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, Navigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import styles from './SignIn.module.css'

export default function SignIn(props) {
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