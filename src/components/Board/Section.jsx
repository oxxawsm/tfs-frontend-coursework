import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useStore } from 'react-redux';
import BoardCard from './Card';
import AddButton from './AddButton';

import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Section.module.css'


const Section = ({title, cards, sectionId, index}) => {
    
    return (

                <div className={styles.section}>
                    <div className={styles.titleContainer}>
                        <div className={styles.title}>{'Section'}</div>
                        <div className={styles.options}><DeleteIcon /></div>
                    </div>

                       <BoardCard sectionId={sectionId} />

                    <AddButton sectionId={sectionId} section />
                </div>

    )


}

export default Section