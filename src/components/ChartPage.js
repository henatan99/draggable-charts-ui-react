import './ChartPage.css';
import React, { useState } from 'react';
import LineChart from './charts/lineChart/LineChart';
import Gadget from './gadget/Gadget';
import GadgetsWrapper from './gadgetsWrapper/GadgetsWrapper';
import ChartArea from './chartArea/chartArea';

const ChartPage = () => {
  const [data, setData] = useState(['20', '30', '40', '50']);
  const [inputData, setInputData] = useState('');

  const defaultData = ['20', '30', '40', '50'];

  const gadgets = [
    <Gadget title={'Pie Chart'} chart={<LineChart data={defaultData}/>} /> ,
    <Gadget title={'Line Chart'} chart={<LineChart data={defaultData}/>} /> ,
    <Gadget title={'Funnel Chart'} chart={<LineChart data={defaultData}/>} /> ,
  ]

  const handleClick = () => {
    console.log('inputData', inputData);
    setData(inputData.split(','));
  };

  return (
    <div className='chart-page'>
      <input value={inputData} onChange={(e) => setInputData(e.target.value)} />
      <div>{inputData}</div>
      <button onClick={handleClick}>Add Chart Data</button>
      <div className="chart-screen">
        <div className="left">
          <ChartArea chart={<LineChart data={defaultData}/>} />
          <ChartArea chart={<Gadget title={'Pie Chart'} chart={<LineChart data={defaultData}/>} /> }/>
        </div>
        <div className="right">
            <GadgetsWrapper gadgets={gadgets} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
