import './ChartPage.css';
import React, { useEffect, useRef, useState } from 'react';
import LineChart from './charts/lineChart/LineChart';
import Gadget from './gadget/Gadget';
import GadgetsWrapper from './gadgetsWrapper/GadgetsWrapper';
import ChartArea from './chartArea/chartArea';

const ChartPage = () => {
  const [data, setData] = useState(['20', '30', '40', '50']);
  const [plugged1, setPlugged1] = useState(localStorage.getItem('plgu1'));
  const [plugged2, setPlugged2] = useState(localStorage.getItem('plug2'));

  const chartArea1 = useRef();
  const chartArea2 = useRef();

  const [dragState, setDragState] = useState({name: '', dragging: {}, coord: {x: 0,  y: 0}});
  
  useEffect(() => {
    const chartArea1Dim = {x: chartArea1.current.offsetLeft, y: chartArea1.current.offsetTop }
    const chartArea2Dim = {x: chartArea2.current.offsetLeft, y: chartArea2.current.offsetTop }
    const chartArea1Size = {w: chartArea1.current.clientWidth, h: chartArea1.current.clientHeight }
    const chartArea2Size = {x: chartArea2.current.clientWidth, y: chartArea2.current.clientHeight }
    console.log('chartArea1Size1', chartArea1Size);
    console.log('dragState',dragState );
  }, [])
  

  const [inputData, setInputData] = useState('');

  const defaultData = ['20', '30', '40', '50'];

  const gadgets = [
    <Gadget title={'Pie Chart'} chart={<LineChart data={defaultData} myName='pie' draggable={true} propDragState={dragState} setPropDragState={setDragState}/>} /> ,
    <Gadget title={'Line Chart'} chart={<LineChart data={defaultData} myName='line' draggable={true} propDragState={dragState} setPropDragState={setDragState}/>} /> ,
    <Gadget title={'Funnel Chart'} chart={<LineChart data={defaultData} myName='funnel' draggable={true} propDragState={dragState} setPropDragState={setDragState}/>} /> ,
  ]

  const handleUnPlug1 = () => {
    const plug1 = localStorage.setItem('plug1', null);
    setPlugged1(plug1);
  }
  
  const handleUnPlug2 = () => {
    const plug2 = localStorage.setItem('plug2', null);
    setPlugged2(plug2);
  }

  const plug1 = () => {
    const plug1 = localStorage.setItem('plug1', true);
    setPlugged1(plug1);
  }

  const plug2 = () => {
    const plug2 = localStorage.setItem('plug2', true);
    setPlugged2(plug2);
  }

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
          <ChartArea 
            chart={<LineChart data={data}  draggable={false} />} 
            plugged={plugged1} 
            myRef={chartArea1}
            handleUnplug={handleUnPlug1}
          />
          <ChartArea 
            chart={<LineChart data={data} draggable={false}/>}
            plugged={plugged2}  
            myRef={chartArea2} 
            handleUnplug={handleUnPlug2}
          />
        </div>
        <div className="right">
            <GadgetsWrapper gadgets={gadgets} />
        </div>
      </div>
      <div>{`name: ${dragState.name}`} {`x: ${dragState.coord.x}`} {`   dragging: ${dragState.dragging}`}</div>
    </div>
  );
};

export default ChartPage;
