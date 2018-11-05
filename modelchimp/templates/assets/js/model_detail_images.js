(function(){
"use strict";

var metricFilterSelectedList = [],
    epochSelected = '',
    dataTable = {},
    dataTableColumns = [
      {"data": "name",
        "name": "name",
        "target": "name",
        "title" : "Name",
        "searchable": false},
      {"data": "experiment_image",
      "name": "experiment_image",
      "target": "image",
      "title": "Image",
      "sortable" : false,
      render: function(d, t, r, m) {
          return  '<img class="table-image" src="' +
              d +
              '" alt="experiment_image" height=80 data-name="' + r.name + '"/> ';
        }},];

/**************
 ** Functions
 **************/
function getFilterData(){
  var url = '/api/experiment-images/filter/' + model_id;

  $.ajax({
      type: 'GET',
      url: url
    })
    .done(function(data) {
      setFilterHTML(data);
    })
    .fail(function(xhr, errmsg, err) {
      console.log("There was an error.");
    });
}


function setFilterHTML(data) {
  var metric_filter = data.metric_filter,
      epoch_filter = data.epoch_filter;

  $("#metric-filters > .checkboxes").html('');

  for(var i in metric_filter){
    var checkedString = '',
        html = '<label for="'+ metric_filter[i].metric+'">' +
      '<input type="checkbox" id="'+ metric_filter[i].metric+'" value="'+ metric_filter[i].metric+'" '+ checkedString +' />'+ metric_filter[i].metric+'</label>';
      $("#metric-filters > .checkboxes").append(html);
  }

  for(var i in epoch_filter){
    var html = '<option class="select-option" value="'+ epoch_filter[i].epoch +'">'+ epoch_filter[i].epoch +'</option>';
    $("#epoch-filter-select").append(html);
  }
}


function initTable(){
  dataTable = $('#image-table-main').DataTable( {
      serverSide : true,
      autoWidth : false,
      ajax : {
                url: '/api/experiment-images/data/' + model_id,
                data: function ( d ) {
                    d.epoch = epochSelected;
                }
              },
      columns : dataTableColumns,
  });
}


function reinitializeTable(){
  // Destroy the table
  dataTable.destroy();
  $('#image-table-main').empty();

  // Remove the extra columns
  dataTableColumns.splice(2);

  // Add the definition of the columns to be inserted
  for(var i in metricFilterSelectedList){
    var col = {"data": "metric_" + i,
              "target" : "metric_" + i,
              "type" : "num",
              "name": metricFilterSelectedList[i],
              "title": metricFilterSelectedList[i]};

    dataTableColumns.push(col);
  }

  // Render the table
  initTable();
}


/**************
 ** Events
 **************/
$('#image-table-main').on('click','img', function() {
  var imageUrl = $(this).attr("src"),
      imageName = $(this).data("name");

  $('#image-modal-img').attr("src", "");
  $('#image-modal-img').attr("src", imageUrl);

  $('#image-modal-title').html("");
  $('#image-modal-title').html(imageName);

  $('#showImageModal').modal('show');
});


$('#metric-filters').on('change', 'input', function(d) {
  if (this.checked && metricFilterSelectedList.length < 2) {
    metricFilterSelectedList.push($(this).val());
  } else if (this.checked && metricFilterSelectedList.length >= 2) {
    this.checked = false;
    return;
  } else {
    var index = metricFilterSelectedList.indexOf($(this).val());
    if (index > -1) metricFilterSelectedList.splice(index, 1);
  }

  var filterString = metricFilterSelectedList.join(",");

  filterString = filterString==''? 'Select an option': filterString;

  $('#metric-filters .select-option').html(filterString);

  reinitializeTable();
});


$('#epoch-filter').on('change', 'select', function(d) {
  epochSelected = $(this).val();

  //reinitializeTable();

  dataTable.draw();
});
/**************
 ** Main
 **************/
function main() {
  initTable();

  getFilterData();
}

$(document).ready(main);
})();
