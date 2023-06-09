import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch } from "react-redux";
import styles from './BoardMini.module.css'

import { deleteBoard } from '../../actions';


export default function BoardMini(props) {
    const dispatch = useDispatch();

    const handleDeleteBoard = (e) => {
        e.preventDefault()
        dispatch(deleteBoard(props.boardId));
    }

    return (
            <div className={styles.miniboard} onClick={props.onClick}>
                <div className={styles.options}  onClick={handleDeleteBoard}>
                    <DeleteIcon />
                </div>
                <div className={styles.text}>{props.title}</div>
            </div>
    )
}