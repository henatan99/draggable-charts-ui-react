const calculateFunnelChartDims = (props) => {
  const {
    totalWidth, totalHeight, funnelTipHeight, funnelTipWidth, data,
  } = props; // in fraction to total funnel height, width

  const z = ((totalHeight - funnelTipHeight) ** 2 + ((totalWidth - funnelTipWidth) / 2) ** 2) ** 0.5;
  const funnelAngle = {
    sine: ((totalWidth - funnelTipWidth) / 2) / z,
    cosine: (totalHeight - funnelTipHeight) / z,
    tangent: ((totalWidth - funnelTipWidth) / 2) / (totalHeight - funnelTipHeight),
  };

  // const totalArea = totalHeight * totalWidth;
  const netArea = (totalHeight * funnelTipWidth) + (totalWidth - funnelTipWidth) / 2 * (totalHeight - funnelTipHeight);
  console.log('net area', netArea);

  const sumOfArray = (arr) => arr.reduce((accum, a) => accum + a, 0);
  console.log('sum', sumOfArray(data));

  const normalizedData = data.map((num) => num * netArea / sumOfArray(data));

  console.log('normalizedData', normalizedData);

  const calculateAreaHeight = (area, width) => (width - (width ** 2 - 4 * area * funnelAngle.tangent) ** 0.5) / 2;

  const areaDims = [];

  let W = totalWidth;

  for (let i = 0; i < normalizedData.length; i += 1) {
    area = normalizedData[i];
    areaHeight = calculateAreaHeight(area, W);
    areaWidth = W - 2 * areaHeight * funnelAngle.tangent;
    areaDims.push({ h: areaHeight, w: areaWidth });
    W = areaWidth;
  }
  return areaDims;
};

const props = {
  data: [90, 70, 40, 10],
  totalHeight: 1,
  totalWidth: 1,
  funnelTipHeight: 0.2,
  funnelTipWidth: 0.2,
};

const dims = calculateFunnelChartDims(props);

console.log(props);
console.log(dims);
