import React from 'react'
import { Card, Row, Col, Button, Input } from 'react-materialize'
import QRCode from 'qrcode.react'

const config = {
    size: '192',
    fgColor: '#000000',
    bgColor: '#ffffff',
    level: 'L',
    renderAs: 'svg',
    result: 'Aguardando leitura do cupom',
}

const QrCodeReader = ({ 
    clientName, clientInformation, cpfFull, qrCodeNfceReader, 
    onChangeText, onClickRead, onClickCancel, callbackRead,
}) => {

    console.log(clientInformation)

    return (
        <Card title={`Cliente: ${clientName}` + "\n" + `[CPF: ${cpfFull}]`} textClassName='center-align'>
            <Row>
                <Col m={6} className='grid-example'>
                    {qrCodeNfceReader != '' && (
                        <QRCode value={qrCodeNfceReader} size={config.qrcode_size}
                            fgColor={config.qrcode_fgColor} bgColor={config.qrcode_bgColor}
                            level={config.qrcode_level} renderAs={config.qrcode_renderAs} />
                    )}

                    {qrCodeNfceReader == '' && (<p>{config.result}</p>)}
                </Col>

                <Col m={6} className='grid-example'>
                    <Row>
                        <Input s={12} value={qrCodeNfceReader} id="qrCode"
                            onChange={(text) => onChangeText(text)} 
                            label="Cupom NFCe" autoFocus={true} />

                        <Button waves='light' className='blue'
                            onClick={() => {
                                onClickRead()
                                document.getElementById('qrCode').focus()
                            } }> Verificar Cupom </Button>
                        <Button waves='light' className='red'
                            onClick={() => onClickCancel()}> Digitar novo CPF </Button>
                    </Row>
                </Col>
            </Row>
            <Row>
                {/* Row 2 > render informacoes */}
                <ul>
                    <li>
                        Valor Total Acumulado: R$ {clientInformation.totalAccumulated.toFixed(2).replace(".", ",")}
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Cupons Resgatados: {clientInformation.totalCoupons}
                    </li>
                    <li className="divider"></li>
                    <li>Saldo Acumulado: R$ {clientInformation.currentBalance.toFixed(2).replace(".", ",")} {clientInformation.currentBalance.toFixed(2) > 50 && (<em>({clientInformation.currentCoupons} cupo{clientInformation.currentCoupons == 1 ? 'm' : 'ns'} disponíve{clientInformation.currentCoupons == 1 ? 'l' : 'is'})</em>)}
                    </li>

                    {/* {currentBalance.toFixed(2) > 50 && (
                        <li>
                            <button className="btn blue waves-effect waves-light col s12" type="button" onClick={this.onClickResgatarCupom}>Resgatar Cupom</button>
                        </li>
                    )} */}

                </ul>
            </Row>
        </Card>
    )
}
export default QrCodeReader