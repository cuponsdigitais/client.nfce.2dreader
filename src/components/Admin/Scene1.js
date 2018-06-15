import React from 'react'
import { Row, Col, Toast, Card, CardTitle, Navbar, NavItem } from 'react-materialize'

import PieChart from './common/Pie'

const Header = ({ logotipo }) => (
    <Navbar className="white" brand={<img src={logotipo} className="responsive-img" style={{ width: 124, marginLeft: 15, marginTop: 0 }} />} right>
        <NavItem onClick={() => console.log('clicou em <Link>')}>
            <div className="black-text">Link</div>
        </NavItem>
        <NavItem onClick={() => console.log('clicou em <Sair>')}>
            <div className="black-text">Sair</div>
        </NavItem>
    </Navbar>
)

const Scene1 = ({ logotipo, chartsData }) => {

    const { pieChart, horizontalBarChart } = chartsData

    return (
        <div>
            <Header logotipo={logotipo} />
            <Row>
                <Col s={12} m={12} className='grid-example'>
                    <Card style={{ padding: 10 }}>
                        <Row>
                            <div>Hello word! Admin's page here!</div>
                        </Row>
                        <Row>
                            <Col s={12} m={4} className='grid-example'>
                                <PieChart title={pieChart.title} data={pieChart.data} />
                            </Col>
                            <Col s={12} m={4} className='grid-example'>
                                <PieChart title={horizontalBarChart.title} data={horizontalBarChart.data} />
                            </Col>
                            <Col s={12} m={4} className='grid-example'>
                                <PieChart title={pieChart.title} data={pieChart.data} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Scene1