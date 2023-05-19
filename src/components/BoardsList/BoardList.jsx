import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './BoardList.module.css';
import FadeIn from 'react-fade-in';

import CreateBoard from './CreateBoard';
import BoardMini from './BoardMini';
import { withRouter } from '../withRouter/withRouter';

import {  loadUserBoards, loadBoard} from '../../actions';


class BoardList extends Component {
    constructor(props) {
        super(props);
        this.handleClickBoard = this.handleClickBoard.bind(this);
    }

    
    componentDidMount() {
        this.props.loadUserBoards();
    };

    handleClickBoard(e, boardId) {
        if (e.target.className instanceof SVGAnimatedString ) {} 
        else {
            e.preventDefault();
            this.props.loadBoard(boardId);
            this.props.navigate(`/board/${boardId}`);
        }
    };


    render () {
        return (
            
            <div className={styles.collection}>
                <div className={styles.wrapper}>
                <h3>Ваши доски</h3>
                <FadeIn>
                    <div className={styles.boards}>
                        {this.props.boards.boards.map((board, index) => (
                                <div key={board.boardId}>
                                    <BoardMini 
                                    onClick={(e) => this.handleClickBoard(e, board.boardId)} 
                                    index={index} 
                                    title={board.title}
                                    key={board.boardId} 
                                    boardId={board.boardId}
                                    />
                                </div>

                            ))}
                    </div>
                    </FadeIn>
                    <CreateBoard />
                </div>
            </div>
            
        )
    }

}

const mapStateToProps = state => ({
    boards: state.boards
});

export default connect(mapStateToProps, { loadUserBoards, loadBoard })(withRouter(BoardList))