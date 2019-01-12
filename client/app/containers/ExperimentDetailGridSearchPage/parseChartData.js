/*
* Helps in parsing the data for parallel coordinates plot
*/

const parseChartData = (data, paramCols, metricCol) => {
  const isNumColumn = colName => {
    let numFlag = true;

    for (let i = 0; i < data.length; i += 1) {
      numFlag = Number.isFinite(data[i][colName]);

      if (!numFlag) return false;
    }

    return numFlag;
  };

  const getRangeValues = colName => {
    let max = 0;

    let min = 0;

    const values = [];

    for (let i = 0; i < data.length; i += 1) {
      if (i === 0) {
        max = data[i][colName];
        min = data[i][colName];
      }

      if (max < data[i][colName]) max = data[i][colName];
      if (min > data[i][colName]) min = data[i][colName];

      values.push(data[i][colName]);
    }

    return {
      range: [min, max],
      values,
    };
  };

  const getCategoryValues = colName => {
    let values = [];

    const tickText = [];

    for (let i = 0; i < data.length; i += 1) {
      if (!tickText.includes(data[i][colName])) {
        tickText.push(data[i][colName]);
      }

      values.push(data[i][colName]);
    }

    values = values.map(e => tickText.indexOf(e) + 1);

    return {
      range: [1, tickText.length],
      values,
      tickText,
      tickvals: generateArray(tickText.length),
    };
  };

  const generateArray = n => [...Array(n)].map((_, index) => index + 1);

  if (!data) return null;

  const paramsResult = [];
  const metricResult = [];

  // Iterate through each param columns
  // Check the column type
  // For number column create the range based tickvals
  // For string column create the annotated ticks
  for (let p = 0; p < paramCols.length; p += 1) {
    const numColFlag = isNumColumn(paramCols[p]);

    if (numColFlag) {
      const rangeAndValues = getRangeValues(paramCols[p]);

      paramsResult.push({
        range: rangeAndValues.range,
        label: paramCols[p],
        values: rangeAndValues.values,
      });
    } else {
      const categoryValues = getCategoryValues(paramCols[p]);

      paramsResult.push({
        range: categoryValues.range,
        label: paramCols[p],
        values: categoryValues.values,
        tickvals: categoryValues.tickvals,
        ticktext: categoryValues.tickText,
      });
    }
  }

  // Create the range based ticks for the metric column
  const metricRangeValues = getRangeValues(metricCol);

  metricResult.push({
    range: metricRangeValues.range,
    label: metricCol,
    values: metricRangeValues.values,
  });
  // Combine the columns and return

  return {
    type: 'parcoords',
    line: {
      color: 'blue',
    },
    dimensions: [...paramsResult, ...metricResult],
  };
};

// Check for filters applied on the lines selected within
// the parallel coordinate chart
const parseFilterData = data => {
  const fData = data.data[0].dimensions;
  const result = {};

  const isCategoryColumn = d => {
    if ('ticktext' in d) return true;

    return false;
  };

  const getCategoryValues = d => {
    const filteredValIndex = [];
    let constraintRange = [];

    if (Array.isArray(d.constraintrange[0])) {
      constraintRange = d.constraintrange;
    } else {
      constraintRange = [d.constraintrange];
    }

    for (let i = 0; i < d.values.length; i += 1) {
      for (let j = 0; i < constraintRange.length; j += 1) {
        if (
          d.tickvals[i] >= constraintRange[j][0] &&
          d.tickvals[i] <= constraintRange[j][1]
        )
          filteredValIndex.push(d.tickvals[i] - 1);
      }
    }

    result[d.label] = {
      values: [],
      type: 'categorical',
    };
    result[d.label].values = filteredValIndex.map(e => d.ticktext[e]);

    return result;
  };

  const getNumericalValues = d => {
    result[d.label] = {
      values: [],
      type: 'numerical',
    };

    if (Array.isArray(d.constraintrange[0])) {
      result[d.label].values = d.constraintrange;
    } else {
      result[d.label].values = [d.constraintrange];
    }
  };

  for (let i = 0; i < fData.length; i += 1) {
    // If filter not applied then ignore the column
    if ('constraintrange' in fData[i]) {
      // Check is it a categorical or numerical column
      if (isCategoryColumn(fData[i])) {
        getCategoryValues(fData[i]);
      } else {
        getNumericalValues(fData[i]);
      }
    }
  }

  return result;
};

export { parseChartData, parseFilterData };
