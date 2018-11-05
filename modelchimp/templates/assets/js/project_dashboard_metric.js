(function(){
  "use strict";

  var metricDataAddress = '';
  var metricFilterAddress = '';
  var metricFilterSelectedList = [];
  var rawMetricDataList = [];
  var rawDurationDataList = [];
  var orderByMetric = null;
  var ascendingFlag = true;
  var experimentCountLimit = 20;
  var experimentMetricChart = null;
  var experimentDurationChart = null;
  var globalExperimentSelected = {};

  /**************
  ** FUNCTIONS
  **************/

  // Metric Dashboard Filter//
  function getMetricFilterData(){
    var url = "/api/project/" + projectId + "/dashboard/experiment-metric-filter/";

    $.ajax({
      type: 'GET',
      url: url,
    })
    .done(function(data) {
      if(data.length === 0){
         hideMetricChart();
         return;
       }

      showMetricFilter(data);
    })
    .fail(function(xhr, errmsg, err) {
      console.log("There was an error while experiment data");
    });
  }


  function showMetricFilter(data){
    $("#metric-filters > .checkboxes").html('');
    $("#metric-orderby > .checkboxes").html('');

    metricFilterSelectedList = [];

    for(var i in data){
      var checkedString = '';

      if( i == 0 ) {
        metricFilterSelectedList.push({
          metric: data[i].metric,
          max_min_flag: 1
        });

        checkedString = 'checked';
      }

      var htmlFilters = '<div class="row">' +
        '<div class="col-8">' +
          '<label for="'+ data[i].metric +'">' +
          data[i].metric + ':' +
           '</label>' +
        '</div>' +
        '<div class="col-4">' +
        '<span>min<input class="metric-filter-checkbox-input" type="checkbox" id="filter-'+ data[i].metric +'-0" value="'+ data[i].metric +'##0"   > </span>' +
        '<span>max<input class="metric-filter-checkbox-input" type="checkbox" id="filter-'+ data[i].metric +'-1"  value="'+ data[i].metric +'##1"   '+ checkedString +'></span>' +
        '</div>' +
      '</div>',

      htmlOrderBy = '<div class="row">' +
        '<div class="col-8">' +
          '<label for="'+ data[i].metric +'">' +
          data[i].metric + ':' +
           '</label>' +
        '</div>' +
        '<div class="col-4">' +
        '<span>min<input class="metric-orderby-radio-input" type="radio" id="order-'+ data[i].metric +'-0" value="'+ data[i].metric +'##0"   > </span>' +
        '<span>max<input class="metric-orderby-radio-input" type="radio" id="order-'+ data[i].metric +'-1" value="'+ data[i].metric +'##1"   '+ checkedString +'></span>' +
        '</div>' +
      '</div>';

      $("#metric-filters > .checkboxes").append(htmlFilters);
      $("#metric-orderby > .checkboxes").append(htmlOrderBy);
    }

    if (orderByMetric === null) orderByMetric = {
        metric: data[0].metric,
        max_min_flag: 1
    };

    // Add the selected filter names
    $('#metric-filters .select-option').html(metricFilterSelectedList.reduce(
      function(memo, e){
        var agg_type = e.max_min_flag ? 'max' : 'min';

        return memo + e.metric + '(' + agg_type + '),' ;
      },''));

    // Add the selected orderby names
    $('#metric-orderby .select-option').html(
      function(){
        var agg_type = orderByMetric.max_min_flag ? 'max' : 'min';

        return  orderByMetric.metric + '(' + agg_type + ')';
      }());

      getMetricChartData(data[0].metric, 1);
    }


    // Metric Dashboard Chart//
    function getMetricChartData(metric, max_min_flag){
      var url = "/api/project/" +
      projectId +
      "/dashboard/experiment-metric/" +
      "?metric=" + metric +
      "&max-min-flag=" + max_min_flag;


      $.ajax({
        type: 'GET',
        url: url,
      })
      .done(function(data) {
        parseMetricData(data, metric, max_min_flag);
      })
      .fail(function(xhr, errmsg, err) {
        console.log("There was an error");
      });
    }


    function parseMetricData(data, metric, max_min_flag){
      var chartLabelsList = [],
      chartLabelsIdList = [],
      chartDataset = [],
      maxEpoch = 0,
      orderByMetricData = {},
      colorList = ["#424153", "#fdadc7", "#ea4c88", "#993399", "#63aebb"];

      if(data) rawMetricDataList.push({
        metric : metric,
        max_min_flag : max_min_flag,
        data : data
      });

      // Generate the label list
      orderByMetricData = rawMetricDataList.find(function(e){
        return e.metric === orderByMetric.metric &&
        e.max_min_flag === orderByMetric.max_min_flag;
      });

      orderByMetricData.data.sort(function(a,b){
        if(ascendingFlag) return a.value - b.value;

        return b.value - a.value;
      });

      initMetricText(experimentCountLimit,
        orderByMetricData.data.length,
        orderByMetric.metric );

      orderByMetricData = orderByMetricData.data.slice(0,experimentCountLimit);
      chartLabelsList = orderByMetricData.map(function(e){return e.short_name;});
      chartLabelsIdList = orderByMetricData.map(function(e){return e.id;});

      // Create the dataset
      for(var i in rawMetricDataList){
        var result = {
          label : rawMetricDataList[i].metric  + "(" + (rawMetricDataList[i].max_min_flag ? "max":"min") + ")" ,
          borderColor: colorList[i],
          backgroundColor: 'transparent',
          data : new Array(chartLabelsIdList.length).join('0').split('').map(parseFloat),
          experimentIds : new Array(chartLabelsIdList.length).join('').split('')
        };

        for(var j in rawMetricDataList[i].data){
          var currentId = rawMetricDataList[i].data[j].id,
          currentMetricValue = rawMetricDataList[i].data[j].value,
          labelIndex = chartLabelsIdList.indexOf(currentId),
          experimentId = rawMetricDataList[i].data[j].id;

          if(labelIndex > -1){
            result.data[labelIndex] = currentMetricValue;
            result.experimentIds[labelIndex] = experimentId;
          }

        }

        chartDataset.push(result);
      }
      showMetricChart(chartLabelsList , chartDataset);
    }


    function showMetricChart(labels, dataset) {
      var ctx = document.getElementById("metric-chart").getContext('2d');

      if (!experimentMetricChart) {
        experimentMetricChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: dataset
          },
          options: {
            onClick	: function (e, a ){
              if(a.length !== 0){
               var active = this.getElementAtEvent(e)[0],
                   experimentId = this.data.datasets[active._datasetIndex].experimentIds[active._index],
                   experimentName = this.data.labels[active._index];

                   globalExperimentSelected = {
                     name : experimentName,
                     id : experimentId
                   };

                   $('#metric-report #experiment-name').html(experimentName);

                   if(experimentId){
                     $('#metric-report  #gotoExperimentModal').modal('show');
                   } else {
                     $('#metric-report  #noExperimentModal').modal('show');
                   }

             }
            },

            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Experiment'
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


    function hideMetricChart(){
      $("#metric-report .report-content").css("display", "none");
      $("#metric-report .error-content").css("display", "block");
    }


    /**************
    ** Events
    **************/
    $('#metric-filters').on('change', 'input', function(d) {
      if (this.checked && metricFilterSelectedList.length < 3) {
        var filterValues = $(this).val();
        filterValues = filterValues.split('##');

        metricFilterSelectedList.push({
          metric: filterValues[0],
          max_min_flag: parseFloat(filterValues[1])
        });
      } else if (this.checked && metricFilterSelectedList.length >= 3) {
        this.checked = false;
        return;
      } else if ( !this.checked && metricFilterSelectedList.length == 1) {
        this.checked = true;
      } else {
        var filterIndex = metricFilterSelectedList
                          .map(function(e){
                            return e.metric + '##' + e.max_min_flag;
                          })
                          .indexOf($(this).val()),
                          dataIndex = rawMetricDataList
                          .map(function(e){
                            return e.metric + '##' + e.max_min_flag;
                          })
                          .indexOf($(this).val());

        if($(this).val() ===  orderByMetric.metric + '##' +orderByMetric.max_min_flag) {
          this.checked = true;
          return;
        }

        if (filterIndex > -1) metricFilterSelectedList.splice(filterIndex, 1);
        if (filterIndex > -1) rawMetricDataList.splice(filterIndex, 1);

        parseMetricData();
        return;
      }

      $('#metric-filters .select-option').html(metricFilterSelectedList.reduce(
        function(memo, e){
          var agg_type = e.max_min_flag ? 'max' : 'min';

          return memo + e.metric + '(' + agg_type + '),' ;
        },''));

        getMetricChartData(filterValues[0], parseFloat(filterValues[1]));
      });



      $('#metric-orderby').on('change', 'input', function(d) {
        $('.metric-orderby-radio-input').prop("checked", false);
        $('.metric-filter-checkbox-input').prop("checked", false);

        this.checked = true;

        var value = $(this).val();
        value = value.split("##");

        $('#filter-' + value[0].split("/").join("·\\/") + '-' + value[1]).prop("checked", true);


        metricFilterSelectedList = [{metric: value[0], max_min_flag: value[1]}];
        orderByMetric = {metric: value[0], max_min_flag: parseFloat(value[1])};
        rawMetricDataList = [];

        $('#metric-filters .select-option').html(metricFilterSelectedList.reduce(
          function(memo, e){
            var agg_type = e.max_min_flag ? 'max' : 'min';

            return memo + e.metric + '(' + agg_type + '),' ;
          },''));

        // Add the selected orderby names
        $('#metric-orderby .select-option').html(
          function(){
            var agg_type = orderByMetric.max_min_flag ? 'max' : 'min';

            return  orderByMetric.metric + '(' + agg_type + ')';
          }());

        getMetricChartData(value[0], parseFloat(value[1]));

      });


      $('#asc-flag').change(function() {
        var ascFlag = this.checked ? true : false;
        ascendingFlag = ascFlag;
        parseMetricData();

      });

      $('#metric-report .popup').click(function(){
          var displayValue = $("#meta-experiment-count-popup").css("display");
            $("#meta-experiment-count-popup").toggle();
            $("#meta-experiment-count-popup input").val(experimentCountLimit);
        }
      );

      $('#button-experiment-count').click(function(){
        $("#meta-experiment-count-popup").hide();
        experimentCountLimit = $("#meta-experiment-count-popup input").val();
        parseMetricData();
      });

      $('#metric-report #btn-goto-experiment-yes').click(function(){
        $('#metric-report #gotoExperimentModal').modal('hide');
         window.location.href = '/model-detail/' + globalExperimentSelected.id + '/';
      });


      /**************
      ** Initialize
      **************/
      function initMetricText(showCount, TotalCount, MetricName){

        if(showCount >= TotalCount) showCount = TotalCount;

        $('#meta-metric-showing-count').html(showCount);
        $('#meta-metric-total-count').html(TotalCount);
        $('#meta-metric-orderby-name').html(MetricName);
      }


      function main() {
        getMetricFilterData();

        $("#metric-report #asc-flag").prop('checked', true);
      }

      $(document).ready(main);
    })();
