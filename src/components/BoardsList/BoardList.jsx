
import React, { Component } from 'react'
import { connect } from 'react-redux';

import CreateBoard from './CreateBoard';
import styles from './BoardList.module.css'
import BoardMini from './BoardMini';

// import { loadBoard } from '../../actions/board';

class BoardList extends Component {
    constructor(props) {
        super(props);
        this.handleClickBoard = this.handleClickBoard.bind(this);
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
                    

                    <CreateBoard />
                    </div>
                </div>
            </div>
        )
    }

}

export default BoardList