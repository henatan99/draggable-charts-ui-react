import './FunnelChart.css';
import React from 'react';
import PropTypes from 'prop-types';
import { funnelChartDims, funnelChartDimsNorm } from '../../../helpers/funnelChartCalc';

const FunnelChart = (props) => {
  const { data, tipRatio, angle } = props; // data is array of areas
  
  const numericData = data.map((val) => parseFloat(val));
  const funnelChartDimsCal = funnelChartDims(numericData, tipRatio, angle);
  const funnelChartDimsNormCal = funnelChartDimsNorm(funnelChartDimsCal);
  let heightSum = 0;
  funnelChartDimsNormCal.forEach((val) => {
    return heightSum += val[0];
  })

  const heights = funnelChartDimsNormCal.map((val) => {
    return Math.round((val[0]/heightSum) * 100);
  })
  console.log('heightSum', heightSum);
  console.log('heights', heights);
  console.log('funnelChart numericData', funnelChartDimsNormCal);
  return (
    <div className='funnel-chart'>
      {
        funnelChartDimsNormCal.length > 0 &&  funnelChartDimsNormCal.map((val, ind) => 
          <div
            className='funnel-elem'
            style={{
              width: '100%',
              height: `${Math.round((val[0]/heightSum) * 100)}%`,
            }}
          >
            <span
              className='funnel-elem-span'
              style={{
                width: `${val[1]}%`,
                height: '100%',
                backgroundColor: `rgb(${numericData[ind]}, ${numericData[ind]*2}, ${numericData[ind]*3})`,
              }}
            />
          </div>
        )
      }
    </div>
  )  
};


FunnelChart.defaultProps = {
  data: [],
  tipRatio: null,
  angle: null,
};

FunnelChart.propTypes = {
  data: PropTypes.instanceOf(Array),
  tipRatio: PropTypes.number,
  angle: PropTypes.number,
};

export default FunnelChart;
