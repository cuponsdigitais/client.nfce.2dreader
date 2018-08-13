import React from 'react'
import { Row, Col, Card, CardTitle, Input, Button } from 'react-materialize'

import '../assets/styles.css'

const Login = ({ login, callback, config }) => {
    let form = {
        email: '', password: ''
    }

    const _onClick = (form) => {
        let validate = true //opcionais = [],

        if (form.email === '') validate = false
        if (form.password === '') validate = false

        if (validate) login({ status: 'success', data: form })
        else login({ status: 'error', message: 'Existem dados que precisam ser preenchidos!', data: form })
    }

    const _handlerChange = (e) => {
        form[e.target.name] = e.target.value
    }

    return (
        <Row>
            <Col m={4} offset="m4">
                <Card header={<CardTitle image={config.company.logotipo} />} style={{ textAlign: 'center', marginTop: 100, padding: 10, minWidth: 300 }}>

                    <Row>
                        <Input s={12} label="E-mail" name="email" onChange={(text) => _handlerChange(text)} error={callback.email} />
                        <Input s={12} label="Senha" type="password" name="password" onChange={(text) => _handlerChange(text)} error={callback.password} />

                        <Button waves='light' className={'col s12 ' + config.app.primaryColor} onClick={() => _onClick(form)}>Entrar</Button>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

export default Login
