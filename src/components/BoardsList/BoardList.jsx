
import React, { Component } from 'react'
import { connect } from 'react-redux';

import CreateBoard from './CreateBoard';
import styles from './BoardList.module.css'
import BoardMini from './BoardMini';


import { loadBoard, loadUserBoards} from '../../actions';

class BoardList extends Component {
    constructor(props) {
        super(props);
        this.handleClickBoard = this.handleClickBoard.bind(this);
    };

    componentDidMount() {
        this.props.loadUserBoards();

    };

    handleClickBoard(e, boardId) {
        const { history } = this.props;
        this.props.loadBoard(boardId);
        history.push("/board/" + boardId);

    };


    render () {
        return (
            <div className={styles.collection}>
                <div className={styles.wrapper}>
                <h3>Ваши доски</h3>
                    <div className={styles.boards}>
                    {
                        this.props.boards.boards.map((board, index) => (
                            <BoardMini onClick={(e) => this.handleClickBoard(e, board.boardId)} index={index} title={board.title} key={board.boardId} boardId={board.boardId}>

                            </BoardMini>
                        ))
                    }

                    <CreateBoard />
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    boards: state.boards
});

export default connect(mapStateToProps, { loadUserBoards, loadBoard })(BoardList)