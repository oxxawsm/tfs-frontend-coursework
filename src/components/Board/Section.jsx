import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useStore } from 'react-redux';
import BoardCard from './Card';
import AddButton from './AddButton';

import DeleteIcon from '@material-ui/icons/Delete';
import styles from './Section.module.css'
import { deleteSection, updateBoard } from '../../actions/board';


const Section = ({title, cards, sectionId, index}) => {

    const dispatch = useDispatch();
    const store = useStore();

    const handleDeleteSection = () => {
        dispatch(deleteSection(sectionId));
        const tempboard = store.getState().board;
        dispatch(updateBoard(tempboard));
    }
    
    return (
            
                <div className={styles.section}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.options} onMouseUp={handleDeleteSection}><DeleteIcon /></div>
                    </div>
                    {(cards != null) ?
                        cards.map((card) => (
                       <BoardCard   text={card.text} key={card.id} id={card.id} sectionId={sectionId}/>
                       )) : null
                    }

                    <AddButton sectionId={sectionId} section />
                </div>
    )

}

export default Section