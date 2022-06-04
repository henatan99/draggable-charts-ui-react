import './ChartPage.css';
import React, { useEffect, useRef, useState } from 'react';
import LineChart from './charts/lineChart/LineChart';
import Gadget from './gadget/Gadget';
import GadgetsWrapper from './gadgetsWrapper/GadgetsWrapper';
import ChartArea from './chartArea/chartArea';

const ChartPage = () => {
  const [data, setData] = useState(['20', '30', '40', '50']);
  const [plugged, setPlugged] = useState(true);
  const chartArea1 = useRef();
  const chartArea2 = useRef();
  
  useEffect(() => {
    const chartArea1Dim = {x: chartArea1.current.offsetLeft, y: chartArea1.current.offsetTop }
    const chartArea2Dim = {x: chartArea2.current.offsetLeft, y: chartArea2.current.offsetTop }
    console.log('chart area 1', chartArea1Dim);
    console.log('chart area 2', chartArea2Dim);
  }, [])
  

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
          <ChartArea chart={<LineChart data={data}  />} plugged={plugged} myRef={chartArea1} />
          <ChartArea chart={<LineChart data={data}/>}  myRef={chartArea2} />
        </div>
        <div className="right">
            <GadgetsWrapper gadgets={gadgets} />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
