import "./Chart.css"
import React, { useState } from "react";
import Chart from "./Chart";

const ChartPage = () => {
    const [data, setData] = useState(['20', '30', '40', '50']);
    const [inputData, setInputData] = useState('');

    const handleClick = () => {
        console.log('inputData', inputData);
        setData(inputData.split(','))
    }

    return (
        <div>
            <input value = {inputData} onChange={(e) => setInputData(e.target.value)} />
            <div>{inputData}</div>
            <button onClick={handleClick}>Add Chart Data</button>
            <Chart data={data} />
        </div>
    )
}

export default ChartPage;