import React from 'react'
import { Card, Row, Col, Button, Input, Modal } from 'react-materialize'
import QRCode from 'qrcode.react'

const QrCodeReader = ({ 
    clientName, clientInformation, cpfFull, qrCodeNfceReader, onSearchSefaz,
    onChangeText, onClickRead, onClickPrintCoupom, onRePrintCoupon, onClickCancel, callbackRead, config
}) => {

    let form = {
        justify: ''
    }

    // console.log(clientInformation)

    const { totalAccumulated, totalCoupons, currentBalance, currentFormatedBalance, currentCoupons } = clientInformation

    const _onJustify = (event) => {
        form.justify = event.target.value
    }

    const _onClick = (item) => {
        console.log(form)

        let validate = false

        if (form.justify === '') validate = true

        if (!validate) {
            item.justify = form.justify
            showToast('Iniciando Re-impressão!')

            onRePrintCoupon(item)
            window.$('#modal-justify').modal('close')
            window.$('#justify').val('').parent().find('label').removeClass('active')
        } else {
            showToast('Existem campos que precisam ser preenchidos')
        }
    }

    const showToast = (message) => {
        // window.M.toast({ html: message })
        window.Materialize.toast(message, 4000)
    }

    return (
        <Card title={`Cliente: ${clientName}` + "\n" + `[CPF: ${cpfFull}]`} textClassName='center-align'>
            <Row>
                <Col m={6} className='grid-example'>
                    {qrCodeNfceReader !== '' && (
                        <QRCode value={qrCodeNfceReader} size={config.app.qrCodeReader.qrcode_size}
                            fgColor={config.app.qrCodeReader.qrcode_fgColor} bgColor={config.app.qrCodeReader.qrcode_bgColor}
                            level={config.app.qrCodeReader.qrcode_level} renderAs={config.app.qrCodeReader.qrcode_renderAs} />
                    )}

                    {qrCodeNfceReader === '' && (<p>{config.app.qrCodeReader.result}</p>)}
                </Col>

                <Col m={6} className='grid-example'>
                    <Row>
                        <Input s={12} value={qrCodeNfceReader} id="qrCode"
                            onChange={(text) => onChangeText(text)} 
                            label="Cupom NFCe" autoFocus={true} />

                        <Button waves='light' className={config.app.secondaryColor + ' col s12'}
                            onClick={() => {
                                onClickRead()
                                document.getElementById('qrCode').focus()
                            }}> Verificar Cupom </Button>

                        <Button waves='light' style={{ marginTop: 15 }} className={config.app.primaryColor + ' col s12'}
                            onClick={() => onSearchSefaz()}> Buscar Chave de Acesso </Button>

                        <Button waves='light' style={{ marginTop: 15 }} className={config.app.cancelColor + ' col s12'}
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
                                <em>({currentCoupons} cupo{currentCoupons === 1 ? 'm' : 'ns'} disponíve{currentCoupons === 1 ? 'l' : 'is'})</em>
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

            {!config.app.accumulated && (
                <Row>
                    {clientInformation.showInfo && (
                        <ul>
                            <li>Cupons fiscais: {clientInformation.count}</li>
                            <li>Total: R$ {currentFormatedBalance}</li>
                        </ul>
                    )}
                    <table>
                        <thead>
                            <tr>
                                <th>Chave de Acesso</th>
                                <th>Valor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientInformation.items.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.key}</td>
                                        <td>R$ {item.value}</td>
                                        <td>
                                            <Modal
                                                id='modal-justify'
                                                header='Justifique o motivo da Re-impressão...'
                                                trigger={
                                                    <button type="button"
                                                        className={config.app.primaryColor + ' btn waves-effect waves-light'}
                                                    >Reimprimir</button>
                                                }
                                                actions={
                                                    <div>
                                                        <button type="button"
                                                            className={config.app.secondaryColor + ' btn waves-effect waves-light'}
                                                            onClick={() => {
                                                                window.$('#modal-justify').modal('close')
                                                                window.$('#justify').val('').parent().find('label').removeClass('active')
                                                            }}>Cancelar</button>
                                                        <button type="button"
                                                            className={config.app.primaryColor + ' btn waves-effect waves-light'}
                                                            onClick={() => _onClick(item)}>Confirmar</button>
                                                    </div>
                                                }>
                                                <Input s={12} id="justify" onChange={(text) => _onJustify(text)} label="Justificativa" />
                                            </Modal>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Row>
            )}
        </Card>
    )
}
export default QrCodeReader