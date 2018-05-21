import React, { Component } from 'react';
import { Row, Col, Toast } from 'react-materialize'
import firebase from "firebase";
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'

import config from '../config'

import Search from './Search'
import Register from './Register'
import QrCodeReader from './QrCodeReader'

export default class Main extends Component {

    constructor() {
        super()

        const INITIAL_STATE = {
            session: {
                cpfNumber: '',
                cpfFull: '',
                isValidCpf: false,
                isModeRegister: false,
                isLoadClient: false,
                isLoadItems: false,
                isLoadCoupons: false,
                qrCodeNfceReader: ''
            },
            layout: {
                col: 4,
                offset: 'm4'
            }
        }

        this.state = INITIAL_STATE
    }

    componentDidMount() {
        this.database = firebase.database();
    }

    isValidCpf(cpf) {
        const { cpfNumber } = this.state.session

        let soma = 0, resto, isValid = true

        console.log(cpfNumber)

        if (cpfNumber === "00000000000") isValid = false;

        for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpfNumber.substring(i - 1, i)) * (11 - i)

        resto = (soma * 10) % 11

        if ((resto === 10) || (resto === 11)) resto = 0
        if (resto !== parseInt(cpfNumber.substring(9, 10))) isValid = false

        soma = 0

        for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpfNumber.substring(i - 1, i)) * (12 - i)

        resto = (soma * 10) % 11

        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpfNumber.substring(10, 11))) isValid = false

        if (isValid) return true

        return false
    }

    firebaseCheckClient() {
        const { cpfNumber } = this.state.session

        this.database.ref('clients/' + cpfNumber).once('value').then(snapshot => snapshot.val())
            .then((result) => {

                if (result != null) {
                    this.setState({
                        session: {
                            ...this.state.session, client: result, isModeRegister: false, isLoadClient: true
                        }, layout: { col: 12, offset: '' }
                    })

                    // 08737049402

                    let clientItems = this.database.ref().child('items').orderByChild('clientId').equalTo(cpfNumber)
                    let clientCoupons = this.database.ref().child('coupons').orderByChild('clientId').equalTo(cpfNumber)

                    clientItems.on('value', snapshot => {
                        console.log(`# # carregando items no firebase # #`)
                        let snap = [], i = 0

                        snapshot.forEach((s) => { snap[i++] = s.val() });

                        this.setState({
                            session: {
                                ...this.state.session, isLoadItems: true
                            }, items: snap
                        })
                    });

                    if (result.coupons > 0) {
                        clientCoupons.on('value', snapshot => {
                            console.log(`# # carregando coupons no firebase # #`)
                            let snap = [], i = 0

                            snapshot.forEach((s) => { snap[i++] = s.val() });

                            this.setState({
                                session: {
                                    ...this.state.session, isLoadCoupons: true
                                }, coupons: snap
                            })
                        });
                    } else this.setState({ coupons: 0 })
                } else this.setState({
                    session: {
                        ...this.state.session, isModeRegister: true
                    },
                    layout: { col: 8, offset: 'm2' }
                })
            }, (error) => console.log(error))
    }

    onChangeText(input, event) {
        if (input == 'cpf') {
            console.log(event.target.value)
            let cpfNumber = event.target.value.replace(".", "").replace(".", "").replace("-", "")

            this.setState({
                session: {
                    ...this.state.session, cpfNumber: cpfNumber, cpfFull: event.target.value
                }
            })
        } else if (input == 'nfce') {
            this.setState({
                session: {
                    ...this.state.session, qrCodeNfceReader: event.target.value
                }
            })
        }
    }

    onClickNext() {
        const { cpfNumber } = this.state.session

        let isValid = this.isValidCpf()

        if (isValid) {
            this.setState({ session: { ...this.state.session, isValidCpf: isValid } })

            this.firebaseCheckClient()
        } else {
            this.showToast(`CPF não é válido!`)
            document.getElementById('searchCpf').focus()
        } 
    }
    onClickRegister(form) {

        let newClient = { 
            id: this.state.session.cpfNumber,
            name: form.name,
            phone: form.phone,
            address: form.address,
            district: form.district,
            city: form.city,
            coupons: 0
        }

        this.database.ref("clients/" + this.state.session.cpfNumber).set(newClient);

        this.setState({
            message: ["success", "Cliente cadastrado com sucesso!"],
            session: {
                ...this.state.session, isModeRegister: false, qrCodeNfceText: ''
            },
        })
    }
    onClickRead() {

        const { qrCodeNfceReader, cpfNumber } = this.state.session

        let params = [], isItem = false, url = qrCodeNfceReader ? qrCodeNfceReader.split("/") : ''

        if (url !== '' && url.length > 3) {
            let url_formatada = url[4] ? url[4].split("&") : ''

            if (url_formatada.length > 1) {
                for (let i of url_formatada) { let x = i.split("="); params[x[0]] = x[1] }

                if (params['consultarNFCe?chNFe'].includes(config.company.cnpj)) {
                    this.database.ref().child('items').orderByChild('key').equalTo(params['consultarNFCe?chNFe']).once('value')
                        .then(snapshot => snapshot.val()).then((result) => {
                            if (result == null) {
                                let currentDate = new Date().toISOString()

                                let newItem = {
                                    clientId: cpfNumber,
                                    key: params['consultarNFCe?chNFe'],
                                    value: parseFloat(params['vNF']),
                                    createdAt: currentDate,
                                    updatedAt: currentDate
                                }

                                // gravar no firebase
                                this.database.ref().child("items").push(newItem)

                                this.showToast('Cupom cadastrado com sucesso!')
                            } else this.showToast('Cupom já cadastrado!')
                        }, (error) => console.log(error))
                    
                    this.setState({
                        session: {
                            ...this.state.session, qrCodeNfceReader: ''
                        }
                    })
                }
            } else this.showToast('Cupom fiscal inválido!')
        } else this.showToast('Cupom fiscal inválido!')
    }
    onClickPrintCoupom() {
        console.log(`# Iniciando processo de Resgate de Cupom`)

        const { cpfNumber, cpfFull, client, qrCodeNfceReader } = this.state.session

        let currentDate = new Date().toISOString()

        let newCoupom = { 
            clientId: cpfNumber, 
            created_at: currentDate,
            updated_at: currentDate
        }

        let updateClient = {
            ...client, coupons: (client.coupons + 1)
        }

        var newCoupomKey = this.database.ref().child('coupons').push().key;

        var updates = {}
        updates['/coupons/' + newCoupomKey] = newCoupom
        updates['/clients/' + cpfNumber] = updateClient

        // gravar no firebase
        this.database.ref().update(updates);
        this.showToast('Cupom cadastrado com sucesso!')

        this.firebaseCheckClient()

        let params = `client_cpf=${cpfFull}&client_name=${client.name}&client_address=${client.address}&client_district=${client.district}&client_city=${client.city}&client_phone=${client.phone}&coupom_key=${newCoupomKey}`

        let url = `http://${config.company.printServer}/index.php?action=cupom&${params}`

        // fetch(url)
    }
    onClickCancel() {
        console.log(`Restart Application`)

        this.setState({
            session: {
                cpfNumber: '',
                cpfFull: '',
                isValidCpf: false,
                isModeRegister: false,
                isLoadClient: false,
                isLoadItems: false,
                isLoadCoupons: false,
                qrCodeNfceReader: ''
            },
            layout: {
                col: 4,
                offset: 'm4'
            }
        })
    }

    showToast(message) {
        window.M.toast({ html: message })
    }

    clientInformation() {
        const { items, session } = this.state
        let totalAccumulated = 0, currentBalance = 0, currentCoupons = 0, totalCoupons = session.client.coupons

        if (items) {
            for (let item of items) totalAccumulated = totalAccumulated + item.value

            currentBalance = totalAccumulated - (totalCoupons * config.company.couponValue)
            currentCoupons = Math.floor(currentBalance / config.company.couponValue)
        }

        return {
            totalAccumulated: totalAccumulated.toFixed(2).replace(".", ","),
            totalCoupons,
            currentBalance: currentBalance.toFixed(2),
            currentFormatedBalance: currentBalance.toFixed(2).replace(".", ","),
            currentCoupons
        }
    }

    render() {
        const { isValidCpf, isModeRegister, isLoadClient, cpfFull, client, qrCodeNfceReader } = this.state.session
        const { col, offset } = this.state.layout
        return (
            <Row>
                <Col s={12} m={col} offset={offset} className='grid-example'>
                    {!isValidCpf && !isModeRegister && (
                        <Search cpfFull={cpfFull} 
                            onChangeText={(text) => this.onChangeText('cpf', text)} 
                            onClickNext={() => this.onClickNext()} />
                    )}

                    {isValidCpf && isModeRegister && (
                        <Register cpfFull={cpfFull} 
                            onClickRegister={(form) => this.onClickRegister(form)}
                            onClickCancel={() => this.onClickCancel()} />
                    )}

                    {isValidCpf && !isModeRegister && isLoadClient && (
                        <QrCodeReader
                            clientName={client.name} cpfFull={cpfFull} qrCodeNfceReader={qrCodeNfceReader}
                            clientInformation={this.clientInformation()}

                            onChangeText={(text) => this.onChangeText('nfce', text)}
                            onClickRead={() => this.onClickRead()}
                            onClickCancel={() => this.onClickCancel()}
                            onClickPrintCoupom={() => this.onClickPrintCoupom()} />

                    ) /*03724848404*/}
                </Col>
            </Row>
        );
    }
}
