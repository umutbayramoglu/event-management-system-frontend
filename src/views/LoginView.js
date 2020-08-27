import React, { Component } from 'react'
import { Row } from "reactstrap";
import LoginForm from "../components/login/LoginForm"
import { LoginSidebar } from "../components/login/LoginSidebar";
import { connect } from "react-redux"
import { withRouter } from 'react-router';

export class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false
        }
    }

    componentDidMount() {
        const {isLoggedIn,history} = this.props;
        if(isLoggedIn)
            history.push("/");
       
    }

    render() {
        return (
            <div class="full-container">
                <Row className="h-100" >
                    <LoginSidebar />
                    <div className="col-lg col-md offset-lg-4 offset-md-4 login-right-container">
                        <h3 className="text-center font-weight-bold text-primary mb-4">eventBell </h3>
                        <LoginForm />
                    </div>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
    }
}

export default withRouter(connect(mapStateToProps, null)(LoginView));