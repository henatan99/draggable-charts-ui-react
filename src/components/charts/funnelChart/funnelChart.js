import React from 'react';

const FunnelChart = (props) => {
  const { data } = props; // data is array of areas
  const { funnelTipHeight } = props; // in fraction to total funnel height
  const { funnelTipWidth } = props; // in fraction of total funnel width
  const SinOfFunnelAngle = (1 - funnelTipWidth / 2) / (1 - funnelTipHeight); // sin of funnel angle

  // d = ((W/SinOfFunnelAngle) +- sqrt(4*A/SinOfFunnelAngle)) / 2 // W is 1 because it is the chart

  const calculateAreaHeight = (area) => (1 / SinOfFunnelAngle + (4 * area / SinOfFunnelAngle) ** 0.5) / 2;
  const areaDims = [];
  let W = 1;
  for (let i = 0; i < data.length; i += 1) {
    area = data[i];
    areaHeight = calculateAreaHeight(area);
    areaWidth = W - areaHeight * SinOfFunnelAngle;
    areaDims.push({ h: areaHeight, w: areaWidth });
    W = areaWidth;
  }
};
