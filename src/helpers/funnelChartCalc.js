const angleRad = (angelDeg) => (3.14 * angelDeg) / 180;

const quadratic = (a, b, c) => {
  const discriminant = b * b - 4 * a * c;

  let root1; let
    root2;
  if (discriminant > 0) {
    root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  }
  if (root1 > 0) return root1;
  return root2;
};

export const funnelChartDims = (data, tipRatio, angle) => {
  // data is array of the funnel data from largest to smallest value
  // the_ratio is the ratio of the height to the width of the funnel tip
  // angle is the angle of the funnel divergence from the tip

  const tipArea = data[data.length - 1]; // area of the funnel tip
  const tipHeight = (tipArea / tipRatio) ** 0.5; // height of the funnel tip
  const tipWidth = tipArea / tipHeight; // width of the funnel tip

  const areaDims = [[tipHeight, tipWidth]];
  // area dimensions for all the area blocks starting from the tip
  // 2*h1^2*tan(teta) + w*h1 - A1 = 0
  let w = tipWidth;
  for (let i = 1; i < data.length; i += 1) {
    // area = width * height   // width = previous_width - 2*(side_offset) = w_p - 2 * b
    // tan(angle) = b / h
    // a = w * h = (w_p - 2 * b) * h = 2 * w_p * h - b * h = 2 * w_p * h - h ^ 2 * tan(angle)
    // solve h in a quadratic formula
    const a = 2 * Math.tan(angleRad(angle)); // the a in a quadratic equation
    const b = w; // w is the width of the previous area
    const c = -data[i];
    const h = quadratic(a, b, c);
    w = data[i] / h;
    areaDims.push([h, w]);
  }
  return areaDims;
};

export const funnelChartDimsNorm = (calcData) => {
  const last = calcData[calcData.length - 1];
  const maxVal = last[0] >= last[1] ? last[0] : last[1];
  const normalized = [];
  for (let i = calcData.length - 1; i >= 0; i -= 1) {
    normalized.push([(calcData[i][0] / maxVal) * 100, (calcData[i][1] / maxVal) * 100]);
  }
  return normalized;
};

// const a = calc([90, 40, 30, 20], 2, 30);

// console.log(a);
// console.log(normalizedCalc(a));
