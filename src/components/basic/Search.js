import React from 'react'
import { Card, CardTitle, Row, Button } from 'react-materialize'
import InputMask from 'react-input-mask'

const Search = ({ onChangeText, onClickNext, cpfFull, config }) => {
    return (
        <Card header={<CardTitle image={config.company.logotipo} />} style={{ padding: 10, minWidth: 300 }}>
            <Row>
                <label className="active">Digite o número do CPF</label>
                <InputMask {...this.props} onChange={(text) => onChangeText(text)} value={cpfFull} id="searchCpf"
                    mask="999.999.999-99" autoComplete="off" autoFocus={true} />
            </Row>

            <Row>
                <Button waves='light' className={config.app.primaryColor + ' col s12'} onClick={() => onClickNext()}> Continuar </Button>
            </Row>
        </Card>
    )
}

export default Search