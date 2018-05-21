import React from 'react'
import { Card, Row, Button, Input } from 'react-materialize'

let form = {
    name: '', phone: '', address: '', district: '', city: ''
}

const onChangeText = (input, event) => {
    form[input] = event.target.value
}

const Register = ({ cpfFull, onClickRegister, onClickCancel }) => {
    
    return (
        <Card title='Cadastrar Novo Cliente'>
            <Row>
                <Input s={12} label="CPF" defaultValue={cpfFull} disabled />
                <Input s={12} defaultValue={form.name} onChange={(text) => onChangeText('name', text)} label="Nome" />
                <Input s={12} defaultValue={form.phone} onChange={(text) => onChangeText('phone', text)} label="Telefone para Contato" />
                <Input s={12} defaultValue={form.address} onChange={(text) => onChangeText('address', text)} label="Endereço" />
                <Input s={6} defaultValue={form.district} onChange={(text) => onChangeText('district', text)} label="Bairro" />
                <Input s={6} defaultValue={form.city} onChange={(text) => onChangeText('city', text)} label="Cidade" />

                <Button waves='light' className='blue' 
                    onClick={() => onClickRegister(form)}> Cadastrar </Button>
                <Button waves='light' className='red' 
                    onClick={() => onClickCancel()}> Cancelar </Button>
            </Row>
        </Card>
    )
}
export default Register