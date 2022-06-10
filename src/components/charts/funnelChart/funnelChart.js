import React from 'react';
import { funnelChartDims, funnelChartDims, funnelChartDimsNorm, funnelChartDimsNorm } from '../../../helpers/funnelChartCalc';

const FunnelChart = (props) => {
  const { funnelData, tipRatio, angle } = props; // data is array of areas
  
  const funnelChartDims = funnelChartDims(funnelData, tipRatio, angle);
  const funnelChartDimsNorm = funnelChartDimsNorm(funnelChartDims);

  
};

export default FunnelChart;
