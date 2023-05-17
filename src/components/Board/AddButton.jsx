import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import TextAreaAutosize from 'react-textarea-autosize';
import styles from './AddButton.module.css'

import { addCard, addSection, updateBoard } from '../../actions/board';

class AddButton extends Component {
    state = {
        formOpen: false,
        text: ''
    }

    openForm = () => {
        this.setState({
            formOpen: true
        })
    }

    closeForm = e => {
        this.setState({
            formOpen: false,
            text: e.target.value
        })
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    handleAddSection = () => {
        const { text } = this.state;
        if (text) {
            this.props.addSection(text);
        }
        setTimeout(() => {
            this.props.updateBoard(this.props.board);
        }, 100);
    }

    handleAddCard = () => {
        const { text } = this.state;
        if (text) {
            this.setState({ text: "" });
            this.props.addCard(this.props.sectionId, text);
        }
        setTimeout(() => {
            this.props.updateBoard(this.props.board);
        }, 100);
    }

    renderAddButton = () => {

        const section = this.props.section
        const buttonText = section ? 'Add another card' : 'Add another section';

        return (
            <Button className={styles.button}>
                <AddIcon/>
                <p>{buttonText}</p>
            </Button>
        )
    }

    renderForm = () => {
        const { section } = this.props;
        const placeholderText = section ? 'Добавить имя карточки...' : 'Добавить название раздела...';
        const buttonText = section ? 'Добавить карточку' : 'Добавить раздел';

        return (
            <div>
                <Card
                 style={{
                    margin: '8px',
                    overflow: 'hidden',
                    minHeight: '80px',
                    minWidth: '272px'
                }}>
                    <TextAreaAutosize
                        placeholder={placeholderText}
                        autoFocus onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleInputChange}
                        style={{
                            resize: 'none',
                            width: '93%',
                            border: 'none',
                            outline: 'none',
                            margin: '8px',
                            height: '300px'
                        }}
                    />
                </Card>

                <div className={styles.buttons}>
                    <Button
                        style={{
                            color: 'white',
                            backgroundColor: '#5aac44',
                            margin: '0px 8px 8px 8px',
                            textTransform: 'capitalize',
                            fontSize: '14px',
                        }}
                        onMouseDown={section ? this.handleAddCard : this.handleAddSection}
                        title={buttonText}
                        variant='contained'
                    >
                        {buttonText}
                    </Button>
                    <Button 
                    style={{
                        margin: '0px 8px 8px 0px',
                        fontSize: '14px',
                        textTransform: 'capitalize',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'black',
                    }} 
                    variant='contained'>
                        close
                    </Button>
                </div>

                
            </div>
        )
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton()
    }
}

const mapStateToProps = state => ({
    board: state.board
});

export default connect(mapStateToProps, { addSection, addCard, updateBoard })(AddButton)