import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Section from './Section';

import styles from './Board.module.css'
import {loadBoard, updateBoard, sorting } from '../../actions/board';
import AddButton from './AddButton';

class Board extends Component {


    render() {
        return (

                    <div className={styles.board}>
                               <div className={styles.sectionWrapper}>
                                        <Section 
                                        />

                                    <AddButton type='section'/>
                                </div>

                    </div>
        )
    }
}

export default Board