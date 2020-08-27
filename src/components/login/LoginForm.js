import React, { Component } from "react";
import {connect} from "react-redux";
import {login} from "../../redux/actions/UserActions/LoginActions"
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import {
  Row,
  Col,
  Button,
  Form,
  FormCheckbox,
  FormInput,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";

class LoginForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      isCompleted:false,
      checked:false
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {email,pass} = this.state;
    this.props.login({email,pass},this.props.history);
   
  }

  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
  }

  handleCheckbox = (e) => {
    this.setState({checked : !this.state.checked})
  }

  render() {
    const {email,pass,checked} = this.state;
    return (
      <div className="col-sm-10 col-md-9 col-xl-5 col-lg-7 mx-auto">
        <div className="card py-lg-2 py-md-2 ">
          <div className="card-body">
            <h3 className="text-center">Login</h3>
            <hr />
            <Form onSubmit = {this.onSubmit}>
              {/* EMAIL FIELD */}
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon type="prepend">
                    <InputGroupText><i className="material-icons ">person</i></InputGroupText>
                  </InputGroupAddon>
                  <FormInput
                    id="email"
                    name="email"
                    type=""
                    placeholder="Email"
                    onChange = {this.onChange}
                  />
                </InputGroup>
              </FormGroup>

              {/* PASSWORD FIELD */}
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon type="prepend">
                    <InputGroupText><i className="material-icons ">lock</i></InputGroupText>
                  </InputGroupAddon>
                  <FormInput
                    id="fePassword"
                    name = "pass"
                    type="password"
                    placeholder="Password"
                    onChange = {this.onChange}
                  />
                </InputGroup>

              </FormGroup>

              {/* CHECKBOX FIELD */}
              <Row className="justify-content-center">
                <Col md="12" className="form-group">
                  <FormCheckbox
                    onChange = {this.handleCheckbox}
                    checked={checked}

                  >
                    I agree with your{" "}
                    <a href="/">Privacy Policy</a>.
                    </FormCheckbox>
                </Col>
              </Row>

              {/* LOGIN BUTTON FIELD */}
              <Row className="justify-content-center">
                <Button className="btn btn-primary" disabled={!email || !pass || !checked}>Login</Button>
              </Row>

            </Form>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

const mapStatetoProps = (state) => {
  return {
    user : state.auth.user,
    isLoggedIn : state.auth.isLoggedIn
  }
}

export default withRouter(connect(mapStatetoProps,{login}) (LoginForm));
