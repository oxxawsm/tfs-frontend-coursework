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
        <Draggable draggableId={String(sectionId)} index={index}>
             {provided => (
                <div className={styles.section} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>{title}</div>
                        <div className={styles.options} onClick={handleDeleteSection}><DeleteIcon /></div>
                    </div>
                    <Droppable droppableId={String(sectionId)}>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {(cards != null) ?
                                        cards.map((card, index) => (
                                            <BoardCard  index={index}  text={card.text} key={card.id} id={card.id} sectionId={sectionId}/>
                                    )) : null
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                    </Droppable>
                    <AddButton sectionId={sectionId} section />
                </div>
             )}
        </Draggable>
    )

}

export default Section