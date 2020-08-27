import React, { Component } from 'react'
import { Snackbar, } from '@material-ui/core'
import { Alert } from '@material-ui/lab';

class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = { showSnackbar: true }
    }

    handleClose = () => {
        this.setState({ showSnackbar: false })
    }

    render() {
        return (

            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={this.props.success && this.state.showSnackbar}
                    autoHideDuration={4000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        {this.props.message}
                    </Alert>
                </Snackbar>

                <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                    open={this.props.failed && this.state.showSnackbar}
                    autoHideDuration={4000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        {this.props.message}
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

export default (Messages);

