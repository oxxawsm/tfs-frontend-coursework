import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import TextAreaAutosize from 'react-textarea-autosize';
import styles from './AddButton.module.css'

import styled from 'styled-components';

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
            this.setState({ text: "" });
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
        const buttonText = section ? 'Добавить карточку' : 'Добавить раздел';
        const buttonTextColor = section ? '#5e6c84' : 'white';
        const buttonTextBackground = section ? 'inherit' : 'rgba(0, 0, 0, 0.16)';

        // изменение оформления кнопки в зависимости от расположения
        const Button = styled.div`
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        margin: 8px 8px 8px 8px;
        cursor: pointer;
        border-radius: 6px;
        height: 36px;
        width: 275px;
        padding-left: 8px;
        min-width: 275px;
        font-size: 14px;

        color: ${buttonTextColor};
        background-color: ${buttonTextBackground};
        
        &:hover {
            background-color: ${section ? '#e1e2e6' : 'rgba(0, 0, 0, 0.1)'};
            transition: 0.3s; 
        }
        `

        return (
            <Button onClick={this.openForm}>
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
                        onMouseDown={section ? this.handleAddCard : this.handleAddSection}
                        title={buttonText}
                        variant='contained'
                        style={{
                            color: 'white',
                            backgroundColor: '#b185db',
                            margin: '0px 8px 8px 8px',
                            textTransform: 'capitalize',
                            fontSize: '14px',
                        }}
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
                        закрыть
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