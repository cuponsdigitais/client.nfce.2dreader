import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Card, Preloader } from 'react-materialize'

import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'

import moment from 'moment'

import Login from './Login'
import Basic from './basic/index'
import Admin from './Admin/index'
import AtualizaRegistros from './Admin/AtualizaRegistros'

class Main extends Component {

    constructor() {
        super()

        const INITIAL_STATE = {
            session: {
                token: null,
                user: {},
                cash: {
                    day: {
                        default: moment(new Date()).format("YYYY-MM-DD")
                    }, state: 'cash-not-found'
                }
            },
            loginError: { email: '', password: '' },
            loading: true
        }

        this.state = INITIAL_STATE

        this.logout = this.logout.bind(this)
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((signedUser) => {
            if (signedUser) {
                firebase.database().ref(`users/${signedUser.uid}`).once('value')
                    .then(snap => {
                        if (snap.val()) {
                            this.setState({
                                session: {
                                    ...this.state.session,
                                    user: snap.val(),
                                    token: signedUser.refreshToken,
                                }, loading: false
                            })
                        }
                    })
            } else {
                console.log({ user: 'no-user' })

                this.setState({ loading: false })
            }
        });
    }

    componentDidMount() {
        // this.setState({ loading: true })

        // // firebase.database().ref(`cash/${moment(new Date()).format("YYYY-MM-DD")}`).on('value', snapshot => {
        // //     if (snapshot.val()) {
        // //         this.setState({
        // //             session: {
        // //                 ...this.state.session, cash: snapshot.val(), loading: false
        // //             }
        // //         })
        // //     }
        // // })
    }

    logout() {
        console.log(`clicou em <onClickLogout> a`)
        firebase.auth().signOut()
            .then((() => {
                this.setState({
                    session: {
                        ...this.state.session, user: {}, token: null
                    }
                })

                localStorage.clear('token')
            }))
    }

    login(form) {
        firebase.auth().signInWithEmailAndPassword(form.data.email, form.data.password)
            .then(response => {
                firebase.database().ref(`users/${response.user.uid}`).once('value')
                    .then(snap => {
                        if (snap.val()) {
                            this.setState({
                                session: {
                                    ...this.state.session, user: snap.val(), token: response.user.refreshToken
                                }
                            })
                        }
                    })
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    render() {
        return (
            <div id="main">
                {this.state.session.token != null && (
                    <Router>
                        <Switch>
                            <Route exact path='/'>
                                <Basic config={this.props.config} user={this.state.session.user} logout={this.logout} />
                            </Route>
                            {this.state.session.user.access.admin.dashboard.read && (
                                <Route path='/admin'>
                                    <Admin config={this.props.config} user={this.state.session.user} logout={this.logout} />
                                </Route>
                            )}
                        </Switch>
                    </Router>
                )}

                {this.state.session.token == null && (
                    <div>
                        {this.state.loading && (
                            <Card style={{ textAlign: 'center' }}>
                                <Preloader flashing />
                            </Card>
                        )}

                        {!this.state.loading && (
                            <Login config={this.props.config} login={(form) => this.login(form)} callback={this.state.loginError} />
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Main;
