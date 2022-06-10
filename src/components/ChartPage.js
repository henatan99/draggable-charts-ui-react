import './ChartPage.css';
import React, { useEffect, useRef, useState } from 'react';
import LineChart from './charts/lineChart/LineChart';
import Gadget from './gadget/Gadget';
import GadgetsWrapper from './gadgetsWrapper/GadgetsWrapper';
import ChartArea from './chartArea/chartArea';

const ChartPage = () => {
  const [state, setState] = useState({
    inputData: '',
    data: ['20', '30', '40', '50'],
    plug: { left: false, right: false },
    mouse: {
      over: { left: null, right: null },
    },
    drag: {
      name: '', dragging: false, coord: { x: 0, y: 0 },
    },
    zoomChart: {
      name: null,
    },
    offset: {
      left: [],
      right: [],
    },
  });

  const chartArea1 = useRef();
  const chartArea2 = useRef();

  const chartArea = {
    left: chartArea1 && chartArea1.current && {
      x: chartArea1.current.offsetLeft,
      y: chartArea1.current.offsetTop,
      w: chartArea1.current.clientWidth,
      h: chartArea1.current.clientHeight,
    },
    right: chartArea2 && chartArea2.current && {
      x: chartArea2.current.offsetLeft,
      y: chartArea2.current.offsetTop,
      w: chartArea2.current.clientWidth,
      h: chartArea2.current.clientHeight,
    },
  };

  useEffect(() => {
    console.log('offsets', state.offset);
  }, []);

  // const [inputData, setInputData] = useState('');

  const defaultData = ['20', '30', '40', '50'];

  const gadgets = [
    <Gadget title="Pie Chart" chart={<LineChart data={defaultData} myName="pie" draggable propState={state} setPropState={setState} chartArea={chartArea} />} key="pie" />,
    <Gadget title="Line Chart" chart={<LineChart data={defaultData} myName="line" draggable propState={state} setPropState={setState} chartArea={chartArea} />} key="line" />,
    <Gadget title="Funnel Chart" chart={<LineChart data={defaultData} myName="funnel" draggable propState={state} setPropState={setState} chartArea={chartArea} />} key="funnel" />,
  ];

  const handleClick = () => {
    // console.log('inputData', inputData);
    // setData(state.inputData.split(','));
    setState({
      ...state,
      data: state.inputData,
    });
  };

  return (
    <div className="chart-page">
      <input
        value={state.inputData}
        onChange={(e) => setState(
          { ...state, inputData: e.target.value },
        )}
      />
      <div>{state.inputData}</div>
      <button type="button" onClick={handleClick}>Add Chart Data</button>
      <div className="chart-screen">
        <div className="left">
          {state.zoomChart.name !== 'right'
            && (
            <ChartArea
              chart={<LineChart data={state.data} draggable={false} />}
              plugged={state.plug.left}
              myRef={chartArea1}
              // handleUnplug={handleUnPlug}
              propState={state}
              setPropState={setState}
              myName="left"
            />
            )}
          {state.zoomChart.name !== 'left'
            && (
            <ChartArea
              chart={<LineChart data={state.data} draggable={false} />}
              plugged={state.plug.right}
              myRef={chartArea2}
              // handleUnplug={handleUnPlug}
              propState={state}
              setPropState={setState}
              myName="right"
            />
            )}

        </div>
        <div className="right">
          <GadgetsWrapper gadgets={gadgets} />
        </div>
      </div>
      <div>
        {`name: ${state.drag.name}`}
        {' '}
        {`x: ${state.drag.coord.x}`}
        {' '}
        {`  dragging: ${state.drag.dragging}`}
      </div>
      <div>
        {`plug left: ${state.plug.left}`}
        {' '}
        {`plug right: ${state.plug.right}`}
      </div>
    </div>
  );
};

export default ChartPage;
