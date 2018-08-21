import React, { Component } from 'react'
import { Row, Col, Card, Button } from 'react-materialize'

import { Link } from 'react-router-dom';

import firebase from "firebase/app"
import 'firebase/database'

class Admin extends Component {

    state = {
        loading: true,
        clients: [],
        ranking: {
            selected: {
                clients: []
            },
        },
        count: {
            cpf: 0,
            currency: 0,
            coupons: 0
        }
    }

    componentWillMount() {
        this.database = firebase.database();

        this.database.ref('items/').on('value', snapshot => {
            console.log(`# # carregando items no firebase # #`)
            let snap = [], i = 0, currency = 0

            snapshot.forEach((s) => {
                snap[i++] = s.val()
                currency = currency + s.val().value
            });

            this.setState(prev => {
                return {
                    count: {
                        ...this.state.count,
                        coupons: i,
                        currency: currency.toFixed(2).replace(".", ",")
                    }, items: snap, itemsObj: snapshot.val()
                }
            })
        });
        
        this.database.ref('clients/').once('value')
            .then(snapshot => {
                console.log(`# # carregando clients no firebase # #`)
                let snap = [], i = 0, coupons = 0, countCity = {}

                snapshot.forEach((s) => {
                    snap[i++] = {
                        ...s.val(),
                        key: s.key
                    }

                    coupons = coupons + s.val().coupons
                });

                console.log(countCity)

                this.setState(prev => ({
                    count: { ...this.state.count, cpf: i, print: coupons, city: countCity },
                    clients: snap, clientsObj: snapshot.val(), loading: false
                }))
            });
    }

    rankingCity() {

        const { clients } = this.state

        let count = [], ranking = [], i = 0

        for (let client of clients) {
            count[client.city] = {
                city: client.city,
                count: count[client.city] ? count[client.city].count + 1 : 1,
                obj: count[client.city] ? [...count[client.city].obj, client] : [client]
            }
        }

        for (let city in count) ranking[i++] = count[city]

        console.log(ranking)

        return ranking.sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0).map(rank => {
            return (
                <tr key={rank.city}>
                    <td style={{ paddingTop: 5, paddingBottom: 5, borderBottom: '1px solid #ebebeb' }}>{rank.city}</td>
                    <td style={{ paddingTop: 5, paddingBottom: 5, borderBottom: '1px solid #ebebeb' }}>{rank.count}</td>
                </tr>
            )
        })
    }

    rankingCity() {

        const { clients } = this.state

        let count = [], ranking = []

        for (let client of clients) {

            const { city } = client

            count[city] = {
                city: city,
                count: count[city] ? count[city].count + 1 : 1,
                coupons: count[city] ? count[city].coupons + client.coupons : client.coupons,
                clients: count[city] ? [...count[city].clients, client] : [client]
            }
        }

        for (let city in count) ranking.push(count[city])

        console.log(ranking)

        return ranking.sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0).map(rank => {
            return (
                <tr key={rank.city} onClick={this.selectCity.bind(this, rank)} style={{ cursor: 'pointer' }}>
                    <td className='rowRanking' style={{ width: '70%' }}>{rank.city}</td>
                    <td className='rowRanking center-align' style={{ width: '15%' }}>{rank.count}</td>
                    <td className='rowRanking center-align' style={{ width: '15%' }}>{rank.coupons}</td>
                </tr>
            )
        })
    }

    selectCity(city, evt) {
        console.log(city)

        this.setState({
            ranking: {
                ...this.state.ranking,
                selected: city
            }
        })
    }

    rankingDistrict() {

        const { selected } = this.state.ranking

        let count = [], districts = []

        for (let client of selected.clients) {

            const { district } = client

            count[district] = {
                district: district,
                count: count[district] ? count[district].count + 1 : 1,
                coupons: count[district] ? count[district].coupons + client.coupons : client.coupons,
                clients: count[district] ? [...count[district].clients, client] : [client]
            }
        }

        for (let district in count) districts.push(count[district])


        console.log(districts)

        return districts.sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0).map(rank => {
            return (
                <tr key={rank.district}>
                    <td className='rowRanking' style={{ width: '70%' }}>{rank.district}</td>
                    <td className='rowRanking center-align' style={{ width: '15%' }}>{rank.count}</td>
                    <td className='rowRanking center-align' style={{ width: '15%' }}>{rank.coupons}</td>
                </tr>
            )
        })
    }

    render() {
        if (!this.state.loading) {
            return (
                <Card style={{ padding: 10, width: 1024 }}>
                    <Row className='center-align'><h5>RESUMO DE INFORMAÇÕES - PROMOÇÃO TORCIDA NOBRE</h5></Row>
                    <Row>
                        <Col s={12} m={2} className='grid-example' className='center-align' style={{ padding: 0 }}>
                            <div style={{ marginRight: 2, border: '1px solid #d0d0d0'}}>
                                <div>CPF Cadastrados</div><div>{this.state.count.cpf}</div>
                            </div>
                        </Col>
                        <Col s={12} m={2} className='grid-example' className='center-align' style={{ padding: 0 }}>
                            <div style={{ marginRight: 2, border: '1px solid #d0d0d0'}}>
                                <div>Cupons Fiscais</div><div>{this.state.count.coupons}</div>
                            </div>
                        </Col>
                        <Col s={12} m={3} className='grid-example' className='center-align' style={{ padding: 0 }}>
                            <div style={{ marginRight: 2, border: '1px solid #d0d0d0'}}>
                                <div>Total Cupons Fiscais</div><div>R$ {this.state.count.currency}</div>
                            </div>
                        </Col>
                        <Col s={12} m={2} className='grid-example' className='center-align' style={{ padding: 0 }}>
                            <div style={{ marginRight: 2, border: '1px solid #d0d0d0'}}>
                                <div>Cupons de Sorteio</div><div>{this.state.count.print}</div>
                            </div>
                        </Col>
                        <Col s={12} m={3} className='grid-example' className='center-align' style={{ padding: 0 }}>
                            <div style={{ border: '1px solid #d0d0d0'}}>
                                <div>Total Cupons de Sorteio</div><div>R$ {this.state.count.print * 50},00</div>
                            </div>
                        </Col>

                        <code id='code'>
                            {this.state.districtInfo}
                        </code>
                    </Row>
                    <Row>
                        <Col s={12} m={6} className='center-align' style={{ borderRight: '1px solid #d0d0d0' }}>
                            <span style={{ fontWeight: 'bold' }}>RANKING DE CIDADES</span>
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '70%' }}>Cidade</th>
                                        <th className='center-align' style={{ width: '15%' }}>Clientes</th>
                                        <th className='center-align' style={{ width: '15%' }}>Cupons</th>
                                    </tr>
                                </thead>
                            </table>
                            <div style={{ overflow: 'auto', height: 300 }}>
                                <table>
                                    <tbody>
                                        {this.rankingCity()}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                        <Col s={12} m={6} className='center-align'>
                            <span style={{ fontWeight: 'bold' }}>RANKING DE BAIRROS</span> | {this.state.ranking.selected.city ? this.state.ranking.selected.city : 'SELECIONE CIDADE'}
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{ width: '70%' }}>Bairro</th>
                                        <th className='center-align' style={{ width: '15%' }}>Clientes</th>
                                        <th className='center-align' style={{ width: '15%' }}>Cupons</th>
                                    </tr>
                                </thead>
                            </table>
                            <div style={{ overflow: 'auto', height: 300 }}>
                                <table>
                                    <tbody>
                                        {this.rankingDistrict()}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>

                    <Button floating fab='vertical' icon='menu' className={this.props.config.app.primaryColor} large style={{ bottom: '45px', right: '24px' }}>
                        <Link to='/'>
                            <Button floating icon='beenhere' className='blue' />
                        </Link> 

                        <Button floating icon='exit_to_app' className='red' onClick={() => this.props.logout()} />
                    </Button>
                </Card>
            )
        } else return null
    }
}

export default Admin


// Quantos cpf
// Quantos cupons
// Qual a cidade que teve mais pessoas
// Na cidade ganhadora quais os bairros
