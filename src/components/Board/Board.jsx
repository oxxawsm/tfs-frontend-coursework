import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Section from './Section';

import styles from './Board.module.css'
import { listenBoard, loadBoard, updateBoard, sorting } from '../../actions/board';
import AddButton from './AddButton';
import Header from '../Navbar/header';

class Board extends Component {

    constructor(props) {
        super(props);

        const boardId = this.props.match?.params?.id;
        this.props.loadBoard(boardId);
    }

    componentDidMount() {
        const boardId = this.props.match?.params?.id;
        this.props.listenBoard(boardId);
    }

    componentWillUnmount() {

    }



    render() {
        const {sections} = this.props.board
        return (
            <div>
            {this.props.auth.isAuthenticated}
                    <div className={styles.board}>
                               <div className={styles.sectionWrapper}>
                               {(sections != null) ? sections.map((section, index) => (
                                        <Section 
                                            index={index}
                                            listID={section.id}
                                            title={section.title}
                                            key={section.id}
                                            cards={section.cards}
                                        />
                                )) : null}
                                    <AddButton type='section'/>
                                </div>

                    </div>
                    </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        board: state.board,
        auth: state.auth,
    }
};


export default connect(mapStateToProps, { updateBoard, loadBoard, listenBoard})(Board)