import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@mui/icons-material/Delete';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './Card.module.css'
import { deleteCard, updateBoard } from '../../actions';

const BoardCard = ({text, id, index, sectionId}) => {
    const dispatch = useDispatch();
    const store = useStore();


    const handleDeleteCard = () => {
        dispatch(deleteCard(id, sectionId));
        const tempboard = store.getState().board; 
        dispatch(updateBoard(tempboard));
    }


    return (
        <div>

        
        {(provided) => (
            <div className={styles.wrapper} ref={provided.innerRef}>
                <Card className={styles.card}>
                    <CardContent className={styles.cardContent}>
                        {'pookich'}
                    </CardContent>
                    <div className={styles.options} onMouseUp={handleDeleteCard}><DeleteIcon/></div>
                </Card>
            </div>
        )}
        </div>
    )
    
}

export default BoardCard