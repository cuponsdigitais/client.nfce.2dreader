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
                token: 123,
                username: '',
                email: '',
            },
            charts: {
                pieChart: null,
                barChart: null,
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


    buildPieChart = () => {
        return {
            title: 'GRAFICO PIZZA',
            data: {
                labels: ['Red', 'Green', 'Yellow'],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            }
        }
    }

    buildHorizontalBarChart = () => {
        return {
            title: 'GRAFICO HORIZONTAL BAR',
            data: {
                labels: ['Red', 'Green', 'Yellow'],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            }
        }
    }

    buildChart = () => {
        return {
            pieChart: this.buildPieChart(),
            horizontalBarChart: this.buildHorizontalBarChart(),
        }
    }

    render() {
        return (
            <div id="admin">
                {this.state.session.token != null && (
                    <Scene1 logotipo={logotipo} chartsData={this.buildChart()} />
                )}
            </div>
        )
    }
}