import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './Card.module.css'
import { deleteCard, updateBoard } from '../../actions/board';

const BoardCard = ({text, id, index, sectionId}) => {


    return (
            <div className={styles.wrapper}>
                <Card className={styles.card}>
                    <CardContent className={styles.cardContent}>
                        {'pookich'}
                    </CardContent>
                    <div className={styles.options}><DeleteIcon/></div>
                </Card>
            </div>
    )
}

export default BoardCard