import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@mui/icons-material/Close';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import styles from './CreateBoard.module.css'


import { createBoard, loadUserBoards } from '../../actions/';

class CreateBoard extends Component {
    state = {
        open: false,
        title: '',
    }

    Open = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        // попытка зарегаться
        this.props.createBoard(this.state.title);
        this.props.loadUserBoards();
        this.Open();
    }

    render() {
        return (
            <Fragment>
                <Button variant="contained" color="primary" onClick={this.Open}>
                        Создать доску
                </Button>
                <Dialog open={this.state.open} onClose={this.Open} >
                    <DialogTitle>Создать доску</DialogTitle>
                    <form action="/" method="POST" onSubmit={this.onSubmit}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Название доски"
                                type="text"
                                required={true}
                                fullWidth
                                onChange={this.onChange}
                            />
                        </DialogContent>
                        <DialogActions className={styles.creationWindow}>
                            <Button type="submit" color="primary">
                                Создать
                            </Button>
                            <IconButton color="primary" onClick={this.Open}>
                                <CloseIcon />
                            </IconButton>
                        </DialogActions>
                    </form>
                </Dialog>
            </Fragment>
        )
    }
}

export default connect(null, { createBoard, loadUserBoards })(CreateBoard)