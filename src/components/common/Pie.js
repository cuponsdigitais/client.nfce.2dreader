import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ title, data }) => {

    return (
        <div style={{ alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', alignSelf: 'center' }}>{title}</div>
            <Pie data={data} />
        </div>
    )
}

export default PieChart