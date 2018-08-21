import React, { Component } from 'react'
import { Row, Col, Button, Card, Preloader } from 'react-materialize'
import firebase from "firebase/app"

import { Link } from 'react-router-dom'

import 'firebase/database'

import '../../assets/styles.css'

import Search from './Search'
import Register from './Register'
import QrCodeReader from './QrCodeReader'

export default class Basic extends Component {

    constructor() {
        super()

        const INITIAL_STATE = {
            preload: {
                items: false,
                coupons: false,
                client: false,
            },
            user: {}, items: [],
            session: {
                cpfNumber: '',
                cpfFull: '',
                isValidCpf: false,
                isModeRegister: false,
                isLoadClient: false,
                isLoadItems: false,
                isLoadCoupons: false,
                qrCodeNfceReader: '',
                spoolPrint: 0,
                nfce: {
                    key: '',
                    value: 0,
                }
            },
            layout: {
                col: 4,
                offset: 'm4'
            },
            loading: true,
        }

        this.state = INITIAL_STATE
    }

    componentWillMount() {
        this.setState({ user: this.props.user })
    }

    componentDidMount() {
        this.database = firebase.database();

        this.database.ref('items/').on('value', snapshot => {
            console.log(`# # carregando items no firebase # #`)
            let snap = [], i = 0

            snapshot.forEach((s) => { snap[i++] = s.val() });

            this.setState({ items: snap, itemsObj: snapshot.val(), loading: false })
        });
    }

    isValidCpf(cpf) { // return  true ou false
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
                        }, layout: { col: 12, offset: '' }, loading: true
                    }) // 08737049402

                    if (this.props.config.app.firebaseMethodLoad === `v2`) { 
                        let clientItems = this.database.ref().child('items').orderByChild('clientId').equalTo(cpfNumber)
                        let clientCoupons = this.database.ref().child('coupons').orderByChild('clientId').equalTo(cpfNumber)

                        clientItems.on('value', snapshot => {
                            console.log(`# # carregando items no firebase # #`)
                            let snap = [], i = 0

                            snapshot.forEach((s) => {
                                snap[i++] = s.val()
                            });

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

                                snapshot.forEach((s) => {
                                    snap[i++] = {
                                        value: s.val(),
                                        key: s.key
                                    }
                                });

                                console.log(snap)
                                this.setState({
                                    session: {
                                        ...this.state.session, isLoadCoupons: true
                                    }, coupons: snap, loading: false
                                })
                            });
                        } else this.setState({ coupons: 0, loading: false })
                    } else this.setState({ loading: false })
                } else this.setState({
                    session: {
                        ...this.state.session, isModeRegister: true
                    },
                    layout: { col: 8, offset: 'm2' }
                })
            }, (error) => console.log(error))
    }

    onChangeText(input, event) {
        if (input === 'cpf') {
            let cpfNumber = event.target.value.replace(".", "").replace(".", "").replace("-", "")

            this.setState({
                session: {
                    ...this.state.session, cpfNumber: cpfNumber, cpfFull: event.target.value
                }
            })
        } else if (input === 'nfce') {
            this.setState({
                session: {
                    ...this.state.session, qrCodeNfceReader: event.target.value
                }
            })
        }
    }

    onClickNext() { //void
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
        console.log(form)

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

        this.firebaseCheckClient()
    }
    onClickRead() {

        this.setState({ loading: true })

        const { qrCodeNfceReader, cpfNumber } = this.state.session

        let params = [], url = qrCodeNfceReader ? qrCodeNfceReader.split("/") : ''

        if (url !== '' && url.length > 3) {
            let url_formatada = url[4] ? url[4].split("&") : ''

            if (url_formatada.length > 1) {
                for (let i of url_formatada) { let x = i.split("="); params[x[0]] = x[1] }

                if (params['consultarNFCe?chNFe'].includes(this.props.config.company.cnpj)) {
                    this.database.ref().child('items').orderByChild('key').equalTo(params['consultarNFCe?chNFe']).once('value')
                        .then(snapshot => snapshot.val()).then((result) => {
                            if (result == null) {
                                let currentDate = new Date().toISOString()

                                let currentValue = parseFloat(params['vNF'])

                                let newItem = {
                                    clientId: cpfNumber,
                                    key: params['consultarNFCe?chNFe'],
                                    value: currentValue,
                                    createdAt: currentDate,
                                    updatedAt: currentDate
                                }

                                // gravar no firebase
                                this.database.ref().child("items").push(newItem)

                                if (!this.props.config.app.accumulated) {
                                    let currentCoupons = Math.floor(currentValue / this.props.config.company.couponValue)

                                    console.log(`## value: ${currentValue}`)
                                    console.log(`## print: ${currentCoupons}`)

                                    let time = 0

                                    for (let i = 0; i < currentCoupons; i++) {
                                        let newTime = time
                                        setTimeout(() => {
                                            this.onClickPrintCoupom()
                                            
                                            console.log(`#### time ${newTime} print ${i + 1}/${currentCoupons}`)
                                            this.showToast(`Imprimindo ${i + 1}/${currentCoupons} cupons de sorteio!`)
                                        }, newTime);

                                        time = time + 3500
                                    }
                                } else this.showToast(`Cupom cadastrado com sucesso!`)
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

        this.setState({ loading: false })
    }
    onClickPrintCoupom() {
        console.log(`# Iniciando processo de Resgate de Cupom`)

        const { cpfNumber, cpfFull, client } = this.state.session

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
        
        if (this.props.config.app.accumulated) this.showToast('Imprimindo cupom de sorteio...')

        this.firebaseCheckClient()

        let params = `client_cpf=${cpfFull}&client_name=${client.name}&client_address=${client.address}&client_district=${client.district}&client_city=${client.city}&client_phone=${client.phone}&coupom_key=${newCoupomKey}`

        let url = `http://${this.props.config.company.printServer}/index.php?action=cupom&${params}`

        fetch(url)
    }
    onClickRePrintCoupon(item) {
        console.log(item)
        
        let currentDate = new Date().toISOString()

        let currentCoupons = Math.floor(item.value / this.props.config.company.couponValue)

        console.log(`## value: ${item.value}`)
        console.log(`## print: ${currentCoupons}`)

        let newRePrint = {
            clientId: this.state.session.cpfNumber,
            nfce: {
                key: item.key,
                value: item.value,
                coupons: currentCoupons
            },
            createdAt: currentDate,
            justify: item.justify,
            user: this.state.user.uuid
        }

        let count = this.state.session.client.reprint ? this.state.session.client.reprint + 1 : 1
        let countItem = item.reprint ? item.reprint + 1 : 1

        this.setState({
            session: {
                ...this.state.session,
                client: {
                    ...this.state.session.client,
                    reprint: count
                }
            }
        })

        // gravar no firebase
        this.database.ref().child(`clients/${this.state.session.cpfNumber}/reprint`).set(count)
        this.database.ref().child(`items/${item.id}/reprint`).set(countItem)
        this.database.ref().child("re-print").push(newRePrint)

        // start re-print
        let time = 0
        for (let i = 0; i < currentCoupons; i++) {
            let newTime = time
            setTimeout(() => {
                this.onClickPrintCoupom()

                console.log(`#### time ${newTime} print ${i + 1}/${currentCoupons}`)
                this.showToast(`Imprimindo ${i + 1}/${currentCoupons} cupons de sorteio!`)
            }, newTime);

            time = time + 3500
        }
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

    onSearchSefaz() {
        const { qrCodeNfceReader } = this.state.session

        console.log('# # start buscar na sefaz', qrCodeNfceReader)

        let url = `https://www.sefaz.rs.gov.br/ASP/AAE_ROOT/NFE/SAT-WEB-NFE-COM_2.asp?HML=false&chaveNFe=${qrCodeNfceReader}`

        window.open(url)
    }

    showToast(message) {
        // window.M.toast({ html: message })
        window.Materialize.toast(message, 4000)
    }

    clientInformation() {
        const { items, session, itemsObj } = this.state

        if (this.props.config.app.accumulated) {
            let totalAccumulated = 0, currentBalance = 0, currentCoupons = 0, totalCoupons = session.client.coupons

            if (this.props.config.app.firebaseMethodLoad === `v2`) {
                if (items) {
                    for (let item of items) totalAccumulated = totalAccumulated + item.value
                }
            } else for (let i of items) if (i.clientId === session.cpfNumber) totalAccumulated = totalAccumulated + i.value

            currentBalance = totalAccumulated - (totalCoupons * this.props.config.company.couponValue)
            currentCoupons = Math.floor(currentBalance / this.props.config.company.couponValue)

            return {
                totalAccumulated: totalAccumulated.toFixed(2).replace(".", ","),
                totalCoupons,
                currentBalance: currentBalance.toFixed(2),
                currentFormatedBalance: currentBalance.toFixed(2).replace(".", ","),
                currentCoupons
            }
        } else {
            let temp = [],
                tempObj = [],
             total = 0, count = 0, showInfo = false

            for (let iObj of Object.keys(itemsObj)) {
                
                if (itemsObj[iObj].clientId === session.cpfNumber){

                    let newItem = itemsObj[iObj]
                    
                    newItem.id = iObj

                    tempObj.push(newItem)
                }
            }

            console.log(tempObj)

            for (let i of items) {
                if (session.cpfNumber === '08761042439') {
                    count++
                    showInfo = true
                    total = total + i.value
                } 

                if (i.clientId === session.cpfNumber) temp.push(i)
            }

            return {
                showInfo,
                items: tempObj,
                count,
                currentBalance: total.toFixed(2),
                currentFormatedBalance: total.toFixed(2).replace(".", ","),
            }
        }
    }

    render() {
        const { isValidCpf, isModeRegister, isLoadClient, cpfFull, client, qrCodeNfceReader } = this.state.session
        const { col, offset } = this.state.layout
        return (
            <Row>
                {this.state.loading && (
                    <Card style={{ textAlign: 'center' }}>
                        <Preloader flashing />
                    </Card>
                )}

                {!this.state.loading && (
                    <Col s={12} m={col} offset={offset} className='grid-example'>
                        {!isValidCpf && !isModeRegister && (
                            <Search config={this.props.config} cpfFull={cpfFull}
                                onChangeText={(text) => this.onChangeText('cpf', text)}
                                onClickNext={() => this.onClickNext()} />
                        )}

                        {isValidCpf && isModeRegister && (
                            <Register config={this.props.config} cpfFull={cpfFull}
                                onClickRegister={(form) => this.onClickRegister(form)}
                                onClickCancel={() => this.onClickCancel()} />
                        )}

                        {isValidCpf && !isModeRegister && isLoadClient && (
                            <QrCodeReader config={this.props.config} 
                                client={client}
                                clientName={client.name} cpfFull={cpfFull} qrCodeNfceReader={qrCodeNfceReader}
                                clientInformation={this.clientInformation()}

                                onChangeText={(text) => this.onChangeText('nfce', text)}
                                onSearchSefaz={() => this.onSearchSefaz()}
                                onClickRead={() => this.onClickRead()}
                                onClickCancel={() => this.onClickCancel()}
                                onClickPrintCoupom={() => this.onClickPrintCoupom()} 
                                onRePrintCoupon={(item) => this.onClickRePrintCoupon(item)} />

                        ) /*03724848404*/}
                    </Col>
                )}

                <Button floating fab='vertical' icon='menu' className={this.props.config.app.primaryColor} large style={{ bottom: '45px', right: '24px' }}>
                    {this.state.user.access.admin.dashboard.read && (
                        <Link to='/admin'>
                            <Button floating icon='dashboard' className='blue' />
                        </Link>
                    )}

                    <Button floating icon='exit_to_app' className='red' onClick={() => this.props.logout()} />
                </Button>
            </Row>
        );
    }
}