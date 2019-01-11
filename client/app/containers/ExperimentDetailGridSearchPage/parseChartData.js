
/*
* Helps in parsing the data for parallel coordinates plot
*/

const parseChartData = (data, paramCols, metricCol) =>{
    const isNumColumn = (colName) => {
        let numFlag = true;

        for(var i in data){
          numFlag = Number.isFinite(data[i][colName]);

          if(!numFlag) return false;
        }

        return numFlag;
    };


    const getRangeValues = (colName) => {
      let max = 0,
          min = 0,
          values = [];

      for(var i in data){
        if(i==0){
          max = data[i][colName];
          min = data[i][colName];
        };

        if( max < data[i][colName]) max = data[i][colName];
        if( min > data[i][colName]) min = data[i][colName];

        values.push(data[i][colName]);
      }

      return {
        range:[min, max],
        values: values
      }
    }

    const getCategoryValues = (colName) => {
      let values = [],
          tickText = [];

        for(var i in data){
          if(!(tickText.includes(data[i][colName]))){
              tickText.push(data[i][colName]);
          }

          values.push(data[i][colName]);
        }

        values = values.map((e) => tickText.indexOf(e) + 1);

        return {
          range:[1, tickText.length],
          values: values,
          tickText: tickText,
          tickvals: generateArray(tickText.length)
        };
    }

    const generateArray = n => [...Array(n)].map((_, index) => index + 1);

    if(!data) return null;

    const paramsResult = [];
    const metricResult = [];

    // Iterate through each param columns
    // Check the column type
    // For number column create the range based tickvals
    // For string column create the annotated ticks

    for(var p in paramCols){
      let numColFlag = isNumColumn(paramCols[p]);

      if(numColFlag){
        let rangeAndValues = getRangeValues(paramCols[p]);

        paramsResult.push({
          range: rangeAndValues.range,
          label: paramCols[p],
          values: rangeAndValues.values,
        });
      } else {
        let categoryValues = getCategoryValues(paramCols[p]);

        paramsResult.push({
          range: categoryValues.range,
          label: paramCols[p],
          values: categoryValues.values,
          tickvals: categoryValues.tickvals,
          ticktext: categoryValues.tickText
        });
      }
    }

    // Create the range based ticks for the metric column
    let metricRangeValues = getRangeValues(metricCol);

    metricResult.push({
      range: metricRangeValues.range,
      label: metricCol,
      values: metricRangeValues.values,
    });
    // Combine the columns and return

     return {
      type: 'parcoords',
      line: {
        color: 'blue'
      },
      dimensions: [...paramsResult, ...metricResult]
    };
};


export default parseChartData;
