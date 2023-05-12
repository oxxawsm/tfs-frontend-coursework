import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './BoardMini.module.css'
// import { deleteBoard } from '../../actions';
import { useDispatch } from "react-redux";

export default function BoardMini(props) {
    const dispatch = useDispatch();

    // const handleDeleteBoard = (e) => {
    //     dispatch(deleteBoard(props.boardId));
    // }

    return (
            <div className={styles.miniboard} onClick={props.onClick}>
                <div className={styles.options}>
                    <DeleteIcon/>
                </div>
                <div className={styles.text} >{props.title}</div>
            </div>
    )
}