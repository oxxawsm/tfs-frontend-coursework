
import React from 'react';
import { connect, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import styles from './header.module.css'

const Header = (props) => {

    return (
        <nav className={styles.headerNav}>
            <Link to='/'>
            <button className={styles.Buttons}>
                <HomeIcon/>
            </button>
            </Link>
            <button className={styles.Buttons}>Войти</button>
        </nav>

    )
}

export default Header