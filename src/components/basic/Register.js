import React from 'react'
import { Card, Row, Button, Input } from 'react-materialize'

let form = {
    name: '', phone: '', address: '', district: '', city: ''
}

const _change = (e) => {
    form[e.target.id] = e.target.value.toUpperCase()
}

const Register = ({ cpfFull, onClickRegister, onClickCancel, config }) => {

    const _onClickRegister = () => {
        onClickRegister(form)

        document.getElementById('name').value = ''
        document.getElementById('phone').value = ''
        document.getElementById('address').value = ''
        document.getElementById('district').value = ''
        document.getElementById('city').value = ''
    }

    return (
        <Card title='Cadastrar Novo Cliente'>
            <Row>
                <Input s={12} label="CPF" defaultValue={cpfFull} disabled />
                <Input s={12} id='name' onChange={(text) => _change(text)} label="Nome" />
                <Input s={12} id='phone' onChange={(text) => _change(text)} label="Telefone para Contato" />
                <Input s={12} id='address' onChange={(text) => _change(text)} label="Endereço" />
                <Input s={6} id='district' onChange={(text) => _change(text)} label="Bairro" />
                <Input s={6} id='city' onChange={(text) => _change(text)} label="Cidade" />

                <Button waves='light' className={config.app.primaryColor} 
                    onClick={() => _onClickRegister()}> Cadastrar </Button>
                <Button waves='light' className={config.app.cancelColor} 
                    onClick={() => onClickCancel()}> Cancelar </Button>
            </Row>
        </Card>
    )
}
export default Register