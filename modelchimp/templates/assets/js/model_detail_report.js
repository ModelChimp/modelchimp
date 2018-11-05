(function(){
"use strict";


var wsProtocol = location.protocol == "https:" ? "wss://" : "ws://";
var wsAddress = wsProtocol + window.location.host +
  '/ws/experiment-level-metric-report/' + projectKey + '/' + experimentId + '/';
var experimentMetricChart = null;
var experimentDurationChart = null;
var metricFilterSelectedList = [];
var durationFilterSelectedList = [];
var rawDataList = [];
var rawDurationDataList = [];
var metricParsed = [];
var durationParsed = [];
var wsSocket = {};

var timeDenominator = 1.0;
var timeDenominatorLabel = 'seconds';


////// METRIC CHART ///////
function getMetricData(){
  rawDataList = [];
  metricParsed = [];

  for(var i in metricFilterSelectedList){
    wsSocket.onsend(enums.ClientEvent.GET_EXPERIMENT_METRIC_DATA, metricFilterSelectedList[i]);
  }
}


function parseData(data){
  var chartLabelsList = [],
      chartDataset = [],
      maxEpoch = 0,
      colorList = ["#424153", "#fdadc7", "#ea4c88", "#993399", "#63aebb"];

  // Add the received data
  if(metricParsed.indexOf(data.metric) === -1){
    rawDataList.push({
      filterValue : data.metric,
      data : data.message
    });

    metricParsed.push(data.metric);
  } else {
    return;
  }

  // Get the max epoch value
  for(var i in rawDataList){
    for(var j in rawDataList[i].data){
      var currentEpoch = parseInt(rawDataList[i].data[j].epoch);

      if(currentEpoch > maxEpoch) maxEpoch = currentEpoch;
    }
  }

  // Generate a list of ascending n
  chartLabelsList = Array.apply(null, Array(maxEpoch + 1));
  chartLabelsList = chartLabelsList.map(function(e,i){
      return i;
    });

    // Create the dataset
    for(var i in rawDataList){
      var result = {
        label : rawDataList[i].filterValue,
        borderColor: colorList[i],
        backgroundColor: 'transparent',
        data : new Array(maxEpoch + 1).join('0').split('').map(parseFloat)
      };

      for(var j in rawDataList[i].data){
        var currentEpoch = rawDataList[i].data[j].epoch,
            currentMetricValue = rawDataList[i].data[j].value;

            result.data[currentEpoch] = currentMetricValue;
      }
      chartDataset.push(result);
    }
    showMetricChart(chartLabelsList , chartDataset);
}


function showMetricChart(labels, dataset) {
  var ctx = document.getElementById("experiment-metric-chart").getContext('2d');

  if (!experimentMetricChart) {
    experimentMetricChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: dataset
      },
      options: {
        scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'epoch'
              },
              ticks : {
                  maxTicksLimit: 10
              }
            }],
          }
      }
    });
  } else {
    delete(experimentMetricChart.data.datasets);
    delete(experimentMetricChart.data.labels);

    experimentMetricChart.data.datasets = dataset;
    experimentMetricChart.data.labels = labels;

    experimentMetricChart.update();
  }
}


////// DURATION CHART ///////
function getDurationData(){
  rawDurationDataList = [];
  durationParsed = [];

  for(var i in durationFilterSelectedList){
    wsSocket.onsend(enums.ClientEvent.GET_EXPERIMENT_DURATION_DATA, durationFilterSelectedList[i]);
  }
}


function parseDurationData(data){
  var chartLabelsList = [],
      chartDataset = [],
      maxEpoch = 0,
      colorList = ["#424153", "#fdadc7", "#ea4c88", "#993399", "#63aebb"];

  // Add the received data
  if(durationParsed.indexOf(data.metric) === -1){
    rawDurationDataList.push({
      filterValue : data.tag,
      data : data.message
    });
    durationParsed.push(data.metric);
  } else {
    return;
  }


  // Get the max epoch value
  for(var i in rawDurationDataList){
    for(var j in rawDurationDataList[i].data){
      var currentEpoch = parseInt(rawDurationDataList[i].data[j].epoch);

      if(currentEpoch > maxEpoch) maxEpoch = currentEpoch;
    }
  }


  // Generate a list of ascending n
  chartLabelsList = Array.apply(null, Array(maxEpoch + 1));
  chartLabelsList = chartLabelsList.map(function(e,i){
      return i;
    });

    // Create the dataset
    for(var i in rawDurationDataList){
      var result = {
        label : rawDurationDataList[i].filterValue,
        borderColor: colorList[i],
        backgroundColor: 'transparent',
        data : new Array(maxEpoch + 1).join('0').split('').map(parseFloat)
      };

      for(var j in rawDurationDataList[i].data){
        var currentEpoch = rawDurationDataList[i].data[j].epoch,
            currentMetricValue = rawDurationDataList[i].data[j].value;

            result.data[currentEpoch] = currentMetricValue / timeDenominator;
      }
      chartDataset.push(result);
    }
    showDurationChart(chartLabelsList , chartDataset);
}


function showDurationChart(labels, dataset) {
  var ctx = document.getElementById("experiment-duration-chart").getContext('2d');

  if (!experimentDurationChart) {
    experimentDurationChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: dataset
      },
      options: {
        scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: timeDenominatorLabel
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'epoch'
              },
              ticks : {
                  maxTicksLimit: 10
              }
            }]
          }
      }
    });
  } else {
    delete(experimentDurationChart.data.datasets);
    delete(experimentDurationChart.data.labels);
    delete(experimentDurationChart.options.scales);

    experimentDurationChart.data.datasets = dataset;
    experimentDurationChart.data.labels = labels;
    experimentDurationChart.options.scales = {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: timeDenominatorLabel
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'epoch'
          }
        }]
      };

    experimentDurationChart.update();
  }
}


////// METRIC FILTERS ///////
function showMetricFilters(data){
  var initialFilterSelected = '';

  $("#metric-filters > .checkboxes").html('');
  metricFilterSelectedList = [];

  for(var i in data){
    var checkedString = '';
    if( i == 0 ) {
      initialFilterSelected = data[i];
      metricFilterSelectedList.push(data[i]);
      checkedString = 'checked';
    }

    var html = '<label for="'+ data[i]+'">' +
      '<input type="checkbox" id="'+ data[i]+'" value="'+ data[i]+'" '+ checkedString +' />'+ data[i]+'</label>';
      $("#metric-filters > .checkboxes").append(html);
  }

    $('#metric-filters .select-option').html(metricFilterSelectedList.join(","));
    getMetricData();
}


function showDurationFilters(data){
  var initialFilterSelected = '';

  $("#duration-filters > .checkboxes").html('');
  durationFilterSelectedList = [];

  for(var i in data){
    var checkedString = '';
    if( i == 0 ) {
      initialFilterSelected = data[i];
      durationFilterSelectedList.push(data[i]);
      checkedString = 'checked';
    }

    var html = '<label for="'+ data[i]+'">' +
      '<input type="checkbox" id="'+ data[i]+'" value="'+ data[i]+'" '+ checkedString +' />'+ data[i]+'</label>';
      $("#duration-filters > .checkboxes").append(html);
  }

  $('#duration-filters .select-option').html(durationFilterSelectedList.join(","));
  getDurationData();
}


function hideMetricChart(){
  $("#metric-report .report-content").css("display", "none");
  $("#metric-report .error-content").css("display", "block");
}


function hideDurationChart(){
  $("#duration-report .report-content").css("display", "none");
  $("#duration-report .error-content").css("display", "block");
}

/**************
 ** Events
 **************/
$('#metric-filters').on('change', 'input', function(d) {
  if (this.checked && metricFilterSelectedList.length < 3) {
    metricFilterSelectedList.push($(this).val());
  } else if (this.checked && metricFilterSelectedList.length >= 3) {
    this.checked = false;
    return;
  } else if ( !this.checked && metricFilterSelectedList.length == 1) {
    this.checked = true;
  } else {
    var index = metricFilterSelectedList.indexOf($(this).val());
    if (index > -1) metricFilterSelectedList.splice(index, 1);
  }

  $('#metric-filters .select-option').html(metricFilterSelectedList.join(","));
  getMetricData();
});


$('#duration-filters').on('change', 'input', function(d) {
  if (this.checked && durationFilterSelectedList.length < 3) {
    durationFilterSelectedList.push($(this).val());
  } else if (this.checked && durationFilterSelectedList.length >= 3) {
    this.checked = false;
    return;
  } else if ( !this.checked && durationFilterSelectedList.length == 1) {
    this.checked = true;
  } else {
    var index = durationFilterSelectedList.indexOf($(this).val());
    if (index > -1) durationFilterSelectedList.splice(index, 1);
  }

  $('#duration-filters .select-option').html(durationFilterSelectedList.join(","));
  getDurationData();
});


$('#time-filter').on('change', 'select', function(d) {
  var timeSelected = $(this).val();

  if( timeSelected == 's'){
    timeDenominator = 1.0;
    timeDenominatorLabel = 'seconds';
  } else if (timeSelected == 'm') {
    timeDenominator = 60.0;
    timeDenominatorLabel = 'minutes';
  } else if (timeSelected == 'h') {
    timeDenominator = 3600.0;
    timeDenominatorLabel = 'hours';
  }

  getDurationData();
});


function start(){
  wsSocket = new WebSocket(wsAddress);

  wsSocket.onmessage = function(e) {
      var data = JSON.parse(e.data),
          message = data.message;

      if(data.type == enums.ServerEvent.FILTER_EXPERIMENT_LEVEL_METRIC) showMetricFilters(data.message);
      if(data.type == enums.ServerEvent.FILTER_EXPERIMENT_LEVEL_DURATION) showDurationFilters(data.message);
      if(data.type == enums.ServerEvent.DATA_EXPERIMENT_LEVEL_METRIC) parseData(data);
      if(data.type == enums.ServerEvent.DATA_EXPERIMENT_LEVEL_DURATION) parseDurationData(data);
      if(data.type == enums.ServerEvent.NO_FILTER_EXPERIMENT_LEVEL_METRIC) hideMetricChart();
      if(data.type == enums.ServerEvent.NO_FILTER_EXPERIMENT_LEVEL_DURATION) hideDurationChart();
      if(data.type == enums.ServerEvent.NOTIFICATION_NEW_METRIC) { getMetricData(); }
      if(data.type == enums.ServerEvent.NOTIFICATION_NEW_DURATION) getDurationData();
  };

  wsSocket.onclose = function(e) {
      setTimeout(function(){
        console.log('Checking for connection again');

        start();
      }, 2000);
  };

  wsSocket.onopen = function(e){
    wsSocket.send(JSON.stringify({
            'type': enums.ClientEvent.GET_EXPERIMENT_METRIC_FILTER,
            'value': ''
        }));
    wsSocket.send(JSON.stringify({
            'type': enums.ClientEvent.GET_EXPERIMENT_DURATION_FILTER,
            'value': ''
        }));
  };

  wsSocket.onsend = function(t,d){
    wsSocket.send(JSON.stringify({
            'type': t,
            'value': d
        }));
  };
}

start();
})();
