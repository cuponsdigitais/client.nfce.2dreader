import React from 'react'
import { Card, CardTitle, Row, Button } from 'react-materialize'
import InputMask from 'react-input-mask'

import logotipo from '../assets/logo.jpg'

const Search = ({ onChangeText, onClickNext, cpfFull }) => {
    return (
        <Card header={<CardTitle image={logotipo} />} style={{ padding: 10 }}>
            <Row>
                <label className="active">Digite o número do CPF</label>
                <InputMask {...this.props} onChange={(text) => onChangeText(text)} value={cpfFull}
                    mask="999.999.999-99" autoComplete="off" autoFocus={true} />
            </Row>

            <div>
                <Button waves='light' className='blue' onClick={() => onClickNext()}> Continuar </Button>
            </div>
        </Card>
    )
}

export default Search