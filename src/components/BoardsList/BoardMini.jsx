import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch } from "react-redux";
import styles from './BoardMini.module.css'

import { deleteBoard } from '../../actions';


export default function BoardMini(props) {
    const dispatch = useDispatch();

    const handleDeleteBoard = (e) => {
        dispatch(deleteBoard(props.boardId));
    }

    return (
            <div className={styles.miniboard} onClick={props.onClick}>
                <div className={styles.options} onMouseDown={handleDeleteBoard}>
                    <DeleteIcon />
                </div>
                <div className={styles.text}>{props.title}</div>
            </div>
    )
}