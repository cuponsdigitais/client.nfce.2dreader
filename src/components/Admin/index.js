import React, { Component } from 'react'
import { Row, Col, Toast, Card, CardTitle, Navbar, NavItem } from 'react-materialize'
import firebase from "firebase"

import config from '../../config'
import logotipo from '../../assets/logo.jpg'

import Scene1 from './Scene1'

export default class Admin extends Component {

    constructor() {
        super()

        const INITIAL_STATE = {
            session: {
                token: null,
                username: '',
                email: '',
            }
        }

        this.state = INITIAL_STATE
    }

    componentDidMount() {
        this.database = firebase.database();
    }

    showToast(message) {
        // window.M.toast({ html: message })
        window.Materialize.toast(message, 4000)
    }

    render() {
        return (
            <div id="admin">
                {this.state.session.token != null && (
                    <Scene1 logotipo={logotipo} />
                )}
            </div>
        )
    }
}