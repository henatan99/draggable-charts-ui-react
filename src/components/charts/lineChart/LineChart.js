import './LineChart.css';
import React, { useState } from 'react';

const Chart = (props) => {
  const { data, propState, setPropState, myName, draggable, chartArea } = props;
  const dataLength = data.length;
  const numericData = data.map((val) => parseFloat(val));
  const maxHeight = Math.max(...numericData);
  const dividerGap = 20;
  const dividers = Math.ceil(maxHeight / dividerGap);
  const chartHeight = dividers * dividerGap;

  // console.log('chartAreafrom chart', chartArea)

  const handleDragStart = (e) => {
    e.stopPropagation()
    setPropState({ ...propState, drag: {name: e.target.id, dragging: true, coord: {x: 0, y: 0}}});
  };

  const handleDrag = (e) => {
    e.stopPropagation()
    setPropState({ ...propState, drag: {name: e.target.id, dragging: true, coord: {x: e.clientX, y: e.clientY}}});
  };

  const calcOffset = (area, mouse) => {
    const centerX = area.x + area.w/2;
    const centerY = area.y + area.h/2;
    const xOff = Math.abs(centerX - mouse.x)/area.w;
    const yOff = Math.abs(centerY - mouse.y)/area.h;
    return [xOff, yOff]
  }

  const handleDragEnd = (e) => {
    e.stopPropagation()
    setPropState({ ...propState, drag: {name: e.target.id, dragging: false, coord: {x: e.clientX, y: e.clientY}}});
    const leftOffset = calcOffset(chartArea.left, {x: e.clientX, y: e.clientY});
    const rightOffset = calcOffset(chartArea.right, {x: e.clientX, y: e.clientY});
    setPropState({...propState, offset: {left: leftOffset, right: rightOffset}})
    setPropState({
      ...propState,
      plug: {
        left: propState.plug.left === false ? (leftOffset[0] < 0.25 &&  leftOffset[1] < 0.25) : true,
        right: propState.plug.right === false ? (rightOffset[0] < 0.25 &&  rightOffset[1] < 0.25) : true
      }
    })
    console.log(chartArea)
    console.log('offsets', {left: leftOffset, right: rightOffset})
  };

  return (
    <>
      <div
        className="chart"
        id={myName}
        draggable={draggable}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {
                dataLength > 0 && numericData.map((val, ind) => (
                  <div
                    className="chart-elem"
                    style={{
                      width: `${100 / 2 / dataLength}%`,
                      height: '100%',
                      marginLeft: `${100 / 4 / dataLength}%`,
                      marginRight: `${100 / 4 / dataLength}%`,
                    }}
                    key={ind}
                  >
                    <span
                      style={{
                        width: '100%',
                        height: `${val / chartHeight * 100}%`,
                        backgroundColor: 'blue',
                      }}
                    >
                      <span>{val}</span>
                    </span>
                  </div>
                ))
            }
        {
                [...Array(dividers + 1).keys()].map((divider) => (
                  <span style={{
                    width: '100%', height: 5, position: 'absolute', left: 0, bottom: `${divider * dividerGap / chartHeight * 100}%`,
                  }}
                  >
                    <p>{divider * dividerGap}</p>
                    <hr />
                  </span>
                ))
            }
      </div>
    </>

  );
};

export default Chart;
