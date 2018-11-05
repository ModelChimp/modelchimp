(function(){
  "use strict";

  var durationDataAddress = '';
  var durationFilterAddress = '';
  var durationFilterSelectedList = [];
  var rawDurationDataList = [];
  var orderByDuration = null;
  var ascendingFlag = true;
  var experimentCountLimit = 20;
  var experimentDurationChart = null;
  var timeDenominator = 1.0;
  var timeDenominatorLabel = 'seconds';
  var globalExperimentSelected = {};

  /**************
  ** FUNCTIONS
  **************/

  // Metric Dashboard Filter//
  function getDurationFilterData(){
    var url = "/api/project/" + projectId + "/dashboard/experiment-duration-filter/";

    $.ajax({
      type: 'GET',
      url: url,
    })
    .done(function(data) {
      if(data.length === 0){
        hideDurationChart();
        return;
      }

      showDurationFilter(data);
    })
    .fail(function(xhr, errmsg, err) {
      console.log("There was an error while experiment data");
    });
  }


  function showDurationFilter(data){
    $("#duration-filters > .checkboxes").html('');
    $("#duration-orderby > .checkboxes").html('');

    durationFilterSelectedList = [];

    for(var i in data){
      var checkedString = '';

      if( i == 0 ) {
        durationFilterSelectedList.push({
          tag: data[i].tag,
        });

        checkedString = 'checked';
      }

      var htmlFilters = '<div class="row">' +
        '<div class="col-8">' +
          '<label for="'+ data[i].tag +'">' +
          data[i].tag + ':' +
           '</label>' +
        '</div>' +
        '<div class="col-4">' +
        '<span>total<input class="duration-filter-checkbox-input" type="checkbox" id="filter-'+ data[i].tag +'" value="'+ data[i].tag + '" '+ checkedString +'></span>' +
        '</div>' +
      '</div>',

      htmlOrderBy = '<div class="row">' +
        '<div class="col-8">' +
          '<label for="'+ data[i].tag +'">' +
          data[i].tag + ':' +
           '</label>' +
        '</div>' +
        '<div class="col-4">' +
        '<span>total<input class="duration-orderby-radio-input" type="radio" id="order-'+ data[i].tag +'" value="'+ data[i].tag + '" '+ checkedString +'></span>' +
        '</div>' +
      '</div>';

      $("#duration-filters > .checkboxes").append(htmlFilters);
      $("#duration-orderby > .checkboxes").append(htmlOrderBy);
    }

    if (orderByDuration === null) orderByDuration = {
        tag: data[0].tag,
    };

    // Add the selected filter names
    $('#duration-filters .select-option').html(durationFilterSelectedList.reduce(
      function(memo, e){
        return memo + e.tag + ',' ;
      },''));

    // Add the selected orderby names
    $('#duration-orderby .select-option').html(
      function(){
        return  orderByDuration.tag;
      }());

    getDurationChartData(data[0].tag);
    }

    // Metric Dashboard Chart//
    function getDurationChartData(tag){
      var url = "/api/project/" +
      projectId +
      "/dashboard/experiment-duration/" +
      "?tag=" + tag;

      $.ajax({
        type: 'GET',
        url: url,
      })
      .done(function(data) {
        parseDurationData(data, tag);
      })
      .fail(function(xhr, errmsg, err) {
        console.log("There was an error");
      });
    }


    function parseDurationData(data, tag){
      var chartLabelsList = [],
      chartLabelsIdList = [],
      chartDataset = [],
      maxEpoch = 0,
      orderByDurationData = {},
      colorList = ["#424153", "#fdadc7", "#ea4c88", "#993399", "#63aebb"];

      if(data) rawDurationDataList.push({
        tag : tag,
        data : data
      });

      // Generate the label list
      orderByDurationData = rawDurationDataList.find(function(e){
        return e.tag === orderByDuration.tag;
      });

      orderByDurationData.data.sort(function(a,b){
        if(ascendingFlag) return a.value - b.value;

        return b.value - a.value;
      });

      initMetricText(experimentCountLimit,
        orderByDurationData.data.length,
        orderByDuration.tag );

      orderByDurationData = orderByDurationData.data.slice(0,experimentCountLimit);
      chartLabelsList = orderByDurationData.map(function(e){return e.short_name;});
      chartLabelsIdList = orderByDurationData.map(function(e){return e.id;});

      // Create the dataset
      for(var i in rawDurationDataList){
        var result = {
          label : rawDurationDataList[i].tag,
          borderColor: colorList[i],
          backgroundColor: 'transparent',
          data : new Array(chartLabelsIdList.length).join('0').split('').map(parseFloat),
          experimentIds : new Array(chartLabelsIdList.length).join('').split('')
        };

        for(var j in rawDurationDataList[i].data){
          var currentId = rawDurationDataList[i].data[j].id,
          currentValue = rawDurationDataList[i].data[j].value,
          labelIndex = chartLabelsIdList.indexOf(currentId),
          experimentId = rawDurationDataList[i].data[j].id;

          if(labelIndex > -1){
            result.data[labelIndex] = currentValue;
            result.experimentIds[labelIndex] = experimentId;
          }

        }

        chartDataset.push(result);
      }

      showDurationChart(chartLabelsList , chartDataset);
    }


    function showDurationChart(labels, dataset) {
      var ctx = document.getElementById("duration-chart").getContext('2d');

      if (!experimentDurationChart) {
        experimentDurationChart = new Chart(ctx, {
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

                   $('#duration-report #experiment-name').html(experimentName);

                   if(experimentId){
                     $('#duration-report #gotoExperimentModal').modal('show');
                   } else {
                     $('#duration-report #noExperimentModal').modal('show');
                   }

             }
            },
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
                  labelString: 'Experiment'
                }
              }],
            }
          }
        });
      } else {
        delete(experimentDurationChart.data.datasets);
        delete(experimentDurationChart.data.labels);
        delete(experimentDurationChart.options.scales.yAxes);


        experimentDurationChart.data.datasets = dataset;
        experimentDurationChart.data.labels = labels;
        experimentDurationChart.options.scales.yAxes = [{
          scaleLabel: {
            display: true,
            labelString: timeDenominatorLabel
          }
        }];

        experimentDurationChart.update();
      }
    }


    function hideDurationChart(){
      $("#duration-report .report-content").css("display", "none");
      $("#duration-report .error-content").css("display", "block");
    }


    /**************
    ** Events
    **************/
    $('#duration-filters').on('change', 'input', function(d) {
        if (this.checked && durationFilterSelectedList.length < 3) {
          var filterValues = $(this).val();

          durationFilterSelectedList.push({
            tag: filterValues,
          });
        } else if (this.checked && durationFilterSelectedList.length >= 3) {
          this.checked = false;
          return;
        } else if ( !this.checked && durationFilterSelectedList.length == 1) {
          this.checked = true;
        } else {
          var filterIndex = durationFilterSelectedList
                            .map(function(e){
                              return e.tag;
                            })
                            .indexOf($(this).val()),
              dataIndex = rawDurationDataList
                            .map(function(e){
                              return e.tag;
                            })
                            .indexOf($(this).val());

          if($(this).val() ===  orderByDuration.tag) {
            this.checked = true;
            return;
          }

          if (filterIndex > -1) durationFilterSelectedList.splice(filterIndex, 1);
          if (filterIndex > -1) rawDurationDataList.splice(filterIndex, 1);

          parseDurationData();
          return;
        }

        $('#duration-filters .select-option').html(durationFilterSelectedList.reduce(
          function(memo, e){

            return memo + e.tag + ',';
          },''));

          getDurationChartData(filterValues);
      });


      $('#duration-orderby').on('change', 'input', function(d) {
        $('.duration-orderby-radio-input').prop("checked", false);
        $('.duration-filter-checkbox-input').prop("checked", false);

        this.checked = true;

        var value = $(this).val();

        $('#filter-' + value.split("/").join("·\\/") ).prop("checked", true);


        durationFilterSelectedList = [{tag: value, }];
        orderByDuration = {tag: value, };
        rawDurationDataList = [];

        $('#duration-filters .select-option').html(durationFilterSelectedList.reduce(
          function(memo, e){
            return memo + e.tag + ',' ;
          },''));

        // Add the selected orderby names
        $('#duration-orderby .select-option').html(
          function(){

            return  orderByDuration.tag;
          }());

        getDurationChartData(value);

      });


      $('#asc-flag-duration').change(function() {
        var ascFlag = this.checked ? true : false;
        ascendingFlag = ascFlag;
        parseDurationData();

      });

      $('#duration-report .popup').click(function(){
          var displayValue = $("#meta-duration-experiment-count-popup").css("display");
            $("#meta-duration-experiment-count-popup").toggle();
            $("#meta-duration-experiment-count-popup input").val(experimentCountLimit);
        }
      );

      $('#button-duration-experiment-count').click(function(){
        $("#meta-duration-experiment-count-popup").hide();
        experimentCountLimit = $("#meta-duration-experiment-count-popup input").val();
        parseDurationData();
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

        parseDurationData();
      });

      $('#duration-report #btn-goto-experiment-yes').click(function(){
        $('#duration-report  #gotoExperimentModal').modal('hide');
         window.location.href = '/model-detail/' + globalExperimentSelected.id + '/';
      });
      /**************
      ** Initialize
      **************/
      function initMetricText(showCount, TotalCount, MetricName){

        if(showCount >= TotalCount) showCount = TotalCount;

        $('#meta-duration-showing-count').html(showCount);
        $('#meta-duration-total-count').html(TotalCount);
        $('#meta-duration-orderby-name').html(MetricName);
      }

      function main() {
        getDurationFilterData();
        $("#asc-flag-duration").prop('checked', true);
      }

      $(document).ready(main);
    })();
