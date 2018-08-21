import React from 'react'
import { Card, Row, Col, Button, Input, Modal } from 'react-materialize'
import QRCode from 'qrcode.react'

const QrCodeReader = ({ 
    clientName, clientInformation, cpfFull, qrCodeNfceReader, onSearchSefaz, client,
    onChangeText, onClickRead, onClickPrintCoupom, onRePrintCoupon, onClickCancel, callbackRead, config
}) => {

    let form = { }

    // console.log(clientInformation)

    const { totalAccumulated, totalCoupons, currentBalance, currentFormatedBalance, currentCoupons } = clientInformation

    const _onJustify = (event) => {
        form[event.target.id] = event.target.value
    }

    const _onAccessCheck = (index) => {
        let validate = false, field = `permission-${index}`

        if (form[field] == '3irm@0s') validate = true

        if (validate) {
            window.$(`#modal-permission-${index}`).modal('close')
            window.$(`#modal-justify-${index}`).modal('open')
        } else showToast('A senha está errada, por favor tente novamente!')

        window.$(`#${field}`).val('').parent().find('label').removeClass('active')
    }

    const _change = (event) => {
        //
    }



    const _onClick = (index, item) => {
        let validate = false, field = `justify-${index}`

        if (form[field] === '') validate = true

        if (!validate) {
            item.justify = form[field]
            showToast('Iniciando Re-impressão!')

            onRePrintCoupon(item)

            window.$(`#modal-justify-${index}`).modal('close')
        } else showToast('Existem campos que precisam ser preenchidos')

        window.$(`#${field}`).val('').parent().find('label').removeClass('active')
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

                        <Button waves='light' className={config.app.secondaryColor + ' col s6'}
                            onClick={() => {
                                onClickRead(); document.getElementById('qrCode').focus() }}>Verificar Cupom</Button>

                        <Button waves='light' className={config.app.primaryColor + ' col s6'}
                            onClick={() => onSearchSefaz()}>Buscar Chave de Acesso </Button>

                        <Button waves='light' style={{ marginTop: 15 }}  className={config.app.primaryColor + ' col s12'}
                            onClick={() => window.$('#modal-crud').modal('open')}>Ver cadastro</Button>

                        <Button waves='light' style={{ marginTop: 15 }} className={config.app.cancelColor + ' col s12'}
                            onClick={() => onClickCancel()}>Digitar novo CPF</Button>

                        <Modal
                            id={`modal-crud`} header='Editar Cadastro'
                            actions={
                                <div>
                                    <button type="button"
                                        className={config.app.secondaryColor + ' btn waves-effect waves-light'}
                                        onClick={() => window.$(`#modal-crud`).modal('close')}>Cancelar</button>
                                    <button type="button"
                                        className={config.app.primaryColor + ' btn waves-effect waves-light'}
                                        >Confirmar</button>
                                </div>
                            }>
                            <Row>
                                <Input s={4} label="CPF" defaultValue={cpfFull} disabled />
                                <Input s={8} id='name' defaultValue={client.name} onChange={_change} label="Nome" />
                                <Input s={12} id='address' defaultValue={client.address} onChange={_change} label="Endereço" />
                                <Input s={4} id='district' defaultValue={client.district} onChange={_change} label="Bairro" />
                                <Input s={4} id='city' defaultValue={client.city} onChange={_change} label="Cidade" />
                                <Input s={4} id='phone' defaultValue={client.phone} onChange={_change} label="Telefone para Contato" />
                            </Row>
                        </Modal>
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
                                <th style={{ width: '50%' }}>Chave de Acesso</th>
                                <th style={{ width: '15%' }}>Valor</th>
                                <th className="center-align" style={{ width: '15%' }}>Re-impressões</th>
                                <th style={{ width: '20%' }}></th>
                            </tr>
                        </thead>
                    </table>
                    <div id="clientInfoNotAccumulated">
                        <table className="highlight">
                            <tbody>
                                {clientInformation.items.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={{ width: '50%' }}>{item.key}</td>
                                            <td style={{ width: '15%' }}>R$ {item.value}</td>
                                            <td className="center-align" style={{ width: '15%' }}>{item.reprint ? item.reprint : 0}</td>
                                            <td style={{ width: '20%' }}>
                                                <button type="button" onClick={() => {
                                                    form[`permission-${index}`] = ''
                                                    form[`justify-${index}`] = ''

                                                    window.$(`#permission-${index}`).val('').parent().find('label').removeClass('active')
                                                    window.$(`#justify-${index}`).val('').parent().find('label').removeClass('active')

                                                    window.$(`#modal-permission-${index}`).modal('open')
                                                }} className={config.app.primaryColor + ' btn waves-effect waves-light'}>Reimprimir</button>
                                                <Modal
                                                    id={`modal-permission-${index}`} header='Acesso restrito' bottomSheet
                                                    actions={
                                                        <div>
                                                            <button type="button"
                                                                className={config.app.secondaryColor + ' btn waves-effect waves-light'}
                                                                onClick={() => window.$(`#modal-permission-${index}`).modal('close')}>Cancelar</button>
                                                            <button type="button"
                                                                className={config.app.primaryColor + ' btn waves-effect waves-light'}
                                                                onClick={() => _onAccessCheck(index)}>Confirmar</button>
                                                        </div>
                                                    }>
                                                    <Input s={12} id={`permission-${index}`} type="password" onChange={(text) => _onJustify(text)} label="Senha" />
                                                </Modal>
                                                <Modal
                                                    id={`modal-justify-${index}`} header='Justifique o motivo da Re-impressão...'
                                                    actions={
                                                        <div>
                                                            <button type="button"
                                                                className={config.app.secondaryColor + ' btn waves-effect waves-light'}
                                                                onClick={() => window.$(`#modal-justify-${index}`).modal('close')}>Cancelar</button>
                                                            <button type="button"
                                                                className={config.app.primaryColor + ' btn waves-effect waves-light'}
                                                                onClick={() => _onClick(index, item)}>Confirmar</button>
                                                        </div>
                                                    }>
                                                    <Row>
                                                        <div>Chave: {item.key}</div>
                                                        <div>Valor: R$ {item.value}</div>
                                                        <div>Re-impressões: {item.reprint ? item.reprint : 0}</div>
                                                        <div>&nbsp;</div>
                                                        <Input s={12} id={`justify-${index}`} onChange={(text) => _onJustify(text)} label="Justificativa" />
                                                    </Row>
                                                </Modal>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </Row>
            )}
        </Card>
    )
}
export default QrCodeReader