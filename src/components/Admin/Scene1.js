import React from 'react'
import { Row, Col, Toast, Card, CardTitle, Navbar, NavItem } from 'react-materialize'

const Scene1 = ({ logotipo }) => {
    return (
        <div>
            <Navbar className="white" brand={<img src={logotipo} className="responsive-img" style={{ width: 124, marginLeft: 15, marginTop: 0 }} />} right>
                <NavItem onClick={() => console.log('clicou em <Link>')}>
                    <div className="black-text">Link</div>
                </NavItem>
                <NavItem onClick={() => console.log('clicou em <Sair>')}>
                    <div className="black-text">Sair</div>
                </NavItem>
            </Navbar>
            <Row>
                <Col s={12} m={12} className='grid-example'>
                    <Card style={{ padding: 10 }}>
                        <Row>
                            <div>Hello word! Admin's page here!</div>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Scene1