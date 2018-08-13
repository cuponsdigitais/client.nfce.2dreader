import React from 'react'
import { Card, Row, Col, Button, Input } from 'react-materialize'
import QRCode from 'qrcode.react'

const QrCodeReader = ({ 
    clientName, clientInformation, cpfFull, qrCodeNfceReader, 
    onChangeText, onClickRead, onClickPrintCoupom, onClickCancel, callbackRead, config
}) => {

    console.log(clientInformation)

    const { totalAccumulated, totalCoupons, currentBalance, currentFormatedBalance, currentCoupons } = clientInformation

    return (
        <Card title={`Cliente: ${clientName}` + "\n" + `[CPF: ${cpfFull}]`} textClassName='center-align'>
            <Row>
                <Col m={6} className='grid-example'>
                    {qrCodeNfceReader != '' && (
                        <QRCode value={qrCodeNfceReader} size={config.app.qrCodeReader.qrcode_size}
                            fgColor={config.app.qrCodeReader.qrcode_fgColor} bgColor={config.app.qrCodeReader.qrcode_bgColor}
                            level={config.app.qrCodeReader.qrcode_level} renderAs={config.app.qrCodeReader.qrcode_renderAs} />
                    )}

                    {qrCodeNfceReader == '' && (<p>{config.app.qrCodeReader.result}</p>)}
                </Col>

                <Col m={6} className='grid-example'>
                    <Row>
                        <Input s={12} value={qrCodeNfceReader} id="qrCode"
                            onChange={(text) => onChangeText(text)} 
                            label="Cupom NFCe" autoFocus={true} />

                        <Button waves='light' className={config.app.primaryColor + ' col s12'}
                            onClick={() => {
                                onClickRead()
                                document.getElementById('qrCode').focus()
                            } }> Verificar Cupom </Button>
                        <Button waves='light' className={config.app.cancelColor + ' col s12'}
                            onClick={() => onClickCancel()}> Digitar novo CPF </Button>
                    </Row>
                </Col>
            </Row>

            {/* Row 2 > render informacoes */}

            {config.app.accumulated && (
                <Row>
                    <ul>
                        <li>
                            Valor Total Acumulado: R$ {totalAccumulated}
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Cupons Resgatados: {totalCoupons}
                        </li>
                        <li className="divider"></li>
                        <li>
                            Saldo Acumulado: R$ {currentFormatedBalance}&nbsp;
                            {currentBalance > 50 && (
                                <em>({currentCoupons} cupo{currentCoupons == 1 ? 'm' : 'ns'} disponíve{currentCoupons == 1 ? 'l' : 'is'})</em>
                            )}
                        </li>

                        {currentBalance > 50 && (
                            <li>
                                <button className={config.app.primaryColor + ' btn waves-effect waves-light col s12'} type="button" 
                                    onClick={() => onClickPrintCoupom()}>Resgatar Cupom</button>
                            </li>
                        )}

                    </ul>
                </Row>
            )}

            {/* {!this.props.config.app.accumulated && (
                <Row>
                    <ul>
                        <li>
                            Valor Total Acumulado: R$ {totalAccumulated}
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Cupons Resgatados: {totalCoupons}
                        </li>
                        <li className="divider"></li>
                        <li>
                            Saldo Acumulado: R$ {currentFormatedBalance}&nbsp;
                            {currentBalance > 50 && (
                                <em>({currentCoupons} cupo{currentCoupons == 1 ? 'm' : 'ns'} disponíve{currentCoupons == 1 ? 'l' : 'is'})</em>
                            )}
                        </li>

                        {currentBalance > 50 && (
                            <li>
                                <button className={config.app.primaryColor + ' btn waves-effect waves-light col s12'} type="button"
                                    onClick={() => onClickPrintCoupom()}>Resgatar Cupom</button>
                            </li>
                        )}

                    </ul>
                </Row>
            )} */}
        </Card>
    )
}
export default QrCodeReader