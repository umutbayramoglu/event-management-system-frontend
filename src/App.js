import React, {Component} from 'react';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import './assets/css/main-dashboard.css';
import routes from "./RouteList";
import {Route} from "react-router-dom";
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {getProfile} from "./redux/actions/UserActions/UserActions"
import {alertActions} from "./redux/actions/AlertActions/";
import Messages from "./components/snackbar/messages"
import {
    getNotificationAction,
    updateNotificationAction
} from "./redux/actions/UserActions/NotificationActions";
import SockJsClient from "react-stomp";
import {WEBSOCKET_BASE_URL} from "./constants";
import {setWebTokenClientRefAction} from "./redux/actions/SetWebsocketClientRef";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.props.clearAlerts();
        }

        if (this.props.user && this.props.user.username && localStorage.getItem('token')) {
            this.props.getNotificationAction(this.props.user.username)
        }

    }

    componentDidMount() {
        this.props.getProfile();
    }

    render() {
        const {user,loginResponseStatus,history} = this.props;
        return (

            <div>
                {
                    routes.map((route,
                                index) => {

                        return (
                            <Route
                                history={history}
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={() => {
                                    if(route.needLoggedIn && loginResponseStatus && !user){
                                        history.push("/login");
                                    }
                                    else if(route.needAdminPermission && loginResponseStatus && user && !user.hasWritePerm){
                                        history.push("/")
                                    }
                                    return (
                                        <route.layout>
                                            {this.props.user &&
                                            <SockJsClient url={WEBSOCKET_BASE_URL}
                                                          topics={['/topic/notifications/' + this.props.user.username]}
                                                          onConnect={() => {
                                                          }}
                                                          onDisconnect={() => {
                                                          }}
                                                          onMessage={(notification) => {
                                                              this.props.updateNotificationAction(notification)
                                                          }}
                                                          ref={(client) => {
                                                              this.props.setWebTokenClientRefAction(client);
                                                          }}/>}

                                            <Messages success={this.props.alert.success}
                                                      failed={this.props.alert.failed}
                                                      message={this.props.alert.message}/>
                                            <route.component/>
                                        </route.layout>
                                    );
                                }}
                            >
                            </Route>

                        )
                    })
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        alert: state.alert,
        loginResponseStatus: state.auth.loginResponseStatus,
    }
}

const actionCreators = {
    getProfile: getProfile,
    clearAlerts: alertActions.clear,
    getNotificationAction,
    updateNotificationAction,
    setWebTokenClientRefAction,
};


export default withRouter(connect(mapStateToProps, actionCreators)(App));
