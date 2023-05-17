
import React from 'react';
import { connect, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import styles from './header.module.css'

import { logoutUser } from "../../actions";

const Header = (props) => {

    const { isAuthenticated} = props;


    const dispatch = useDispatch();
    // const history = useNavigate();

    const handleSignOut = () => {
        dispatch(logoutUser());
        // history.push('/signin');
    }

    const isLoggedIn = (
        <button className={styles.Buttons} onMouseDown={handleSignOut}>Выйти</button>
    );

    const isLoggedOut = (
        <div className={styles.buttonsCont}>
            <Link to="/signin" className={styles.signLink}><button className={styles.Buttons}>Вход</button></Link>
            <Link to="/signup" className={styles.signLink}><button className={styles.Buttons}>Регистрация</button></Link>
        </div>
    );

    return (
        <nav className={styles.headerNav}>
            <Link to='/'>
                <button className={styles.Buttons}>
                    <HomeIcon/>
                </button>
            </Link>
            <div className={styles.buttonsCont}>
            {(isAuthenticated ? isLoggedIn : isLoggedOut) || null}
            </div>
        </nav>

    )
}

export default Header