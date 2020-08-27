import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';

export default class ConfirmModal extends Component {

    render() {
        return (

            <Modal show={this.props.show} onHide={this.props.handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body><div style={{
                    color: "#960f26",
                }}>{this.props.body}</div></Modal.Body>
                <Modal.Footer>
                    {this.props.opt1Show === "true" && <Button variant="secondary" onClick={this.props.handleClose}>
                        {this.props.opt1}
                    </Button>}
                    {this.props.opt2Show === "true" && <Button variant="primary" onClick={this.props.saveForm}>
                        {this.props.opt2}
                    </Button>}
                </Modal.Footer>
            </Modal>

        )
    }
}
