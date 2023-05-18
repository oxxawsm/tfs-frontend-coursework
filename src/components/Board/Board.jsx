import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import FadeIn from 'react-fade-in';

import Section from './Section';
import styles from './Board.module.css'
import AddButton from './AddButton';
// import BoardMenu from '../Navbar/BoardMenu';
import { listenBoard, loadBoard, updateBoard, sorting } from '../../actions/board';



class Board extends Component {

    constructor(props) {
        super(props);

        const boardId = this.props?.match?.params?.id;
        this.props.loadBoard(boardId);
    }

    componentDidMount() {
        const boardId = this.props?.match?.params?.id;
        this.props.listenBoard(boardId);
    }

    componentWillUnmount() {}

    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }
        this.props.sorting(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type
        );
        this.props.updateBoard(this.props.board);
    }


    render() {
        const {sections} = this.props.board
        return (
            <FadeIn>
            {this.props.auth.isAuthenticated }
            <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className={styles.board}>
                    <Droppable droppableId="all-sections" direction="horizontal" type="section">
                            {provided => (
                               <div className={styles.sectionWrapper} {...provided.droppableProps} ref={provided.innerRef}>
                               {(sections != null) ? sections.map((section, index) => (
                                        <Section 
                                            index={index}
                                            sectionId={section.id}
                                            title={section.title}
                                            key={section.id}
                                            cards={section.cards}
                                        />
                                )) : null}
                                {provided.placeholder}
                                    <AddButton type='section'/>
                                </div>
                                )}
                </Droppable>
                    </div>
                    </DragDropContext>
                    </FadeIn>
            
        )
    }
}

const mapStateToProps = (state) => {
    return{
        board: state.board,
        auth: state.auth,
    }
};


export default connect(mapStateToProps, { sorting, updateBoard, loadBoard, listenBoard})(Board)