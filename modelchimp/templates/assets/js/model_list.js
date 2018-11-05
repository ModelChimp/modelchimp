$(document).ready(main);

function main() {
  getData(updateMLModelHTML);
}

/**************
 ** State
 **************/
var modelListState = {
      compareMode: false,
      modelCommentedSelected: 0,
      labelNameSelected: '',
      labelModelIdSelected: 0,
      },
  wsProject = 'ws://' + window.location.host +
    '/ws/project-status/' + $("#project-key").html() + '/';

var dynamicColumnData = [],
    mlCompareSelected = [],
    paramFieldSelectList = [],
    mlModelTable = {},
    commentRowSelected = 0,
    dataLoadedFlag = false;

/**************
 ** FUNCTIONS
 **************/
function getData(func) {
  var url = "/api/ml-model/",
    projectId = $('#project-heading').data('project-id');

  $.ajax({
      type: 'GET',
      url: url + projectId,
    })
    .done(function(data) {
      func(data);
    })
    .fail(function(xhr, errmsg, err) {
      console.error("There was an error while experiment data");
    });

    // Hide the loader
    $loading.hide();
}

function getParamFieldData(func){
  var url = "/api/ml-model/get-param/",
    projectId = $('#project-heading').data('project-id');

  $.ajax({
      type: 'GET',
      url: url + projectId,
    })
    .done(function(data) {
      func(data);
    })
    .fail(function(xhr, errmsg, err) {
      console.error("There was an error while retrieving param data");
    });
}

function updateMLModelHTML(data) {
    mlModelTable = $('#ml-model-table-main').DataTable({
    data: data,
    "info": false,
    "bLengthChange": false,
    "order": [[ 3, "desc" ]],
    "stateSave": true,
     rowId: 'id',
    "dom": '<"top"if>rt<"bottom"p><"clear">',
    columnDefs: [
            {
                targets: [ 0 ],
                visible: false,
                searchable: false
            },
            {
                targets: [ 7,8 ],
                visible: false,
            },
          ],
    columns: [
      {
        title: "Sl No",
        target: "sl_no",
        data: null,
        render: function(d, t, r, m) {
          return  '<input data-model-id="' +
              r.id +
              '" name="compare" \
              class="ml-list-compare-check" type="checkbox"/> ';
        }
      },
      {
        title: "Experiment",
        target: "ml_name",
        data: "name",
        render: function(d,t,r){
          var name = '';
          if(d == null) d = '';

          if(r.name === r.experiment_id){
            name = d.substring(0,7);
          } else {
            name = d;
          }

          return '<a href="/model-detail/' + r.id + '" title="'+ d +'">' +
               name + '</a>';
        }
      },
      {
        title: "Status",
        target: "ml_status",
        data: "status",
        render: function(d, t, r) {
          var statusText = 'COMPLETED';

          if(d === enums.ExperimentStatus.IN_PROCESS) statusText = 'IN PROCESS';

          return statusText;
        }
      },
      {
        title: "Submitted On",
        target: "ml_submitted_on",
        data: "date_created_epoch",
        sortable: true,
        orderable: true,
        render: function(d, t, r) {
          if(t === "display"){
            d =  moment(d * 1000).format("Do MMM YYYY HH:mm:ss");
          }

          return d;
        }
      },
      {
        title: "Submitted By",
        target: "ml_submitted_by",
        data: "submitted_by"
      },
      {
        title: "Comments",
        target: "ml_comments",
        data: "comment_count",
        render: function(d, t, r) {
          var name = r.name;

          if(r.name === r.experiment_id) name = name.substring(0,7);

          return '<span onClick="getComments(' + r.id + ', \'' +
            name + '\',' + r.id + ')">' +
                  d +
                  '<i class="comment-icon fa fa-comment-o"></i></span>';
        }
      },
      {
        title: "Labels",
        target: "ml_labels",
        data: 'labels',
        render : function(d,t,r){
          var result = '',
            name = r.name;

          if(d) result =  d.join(", ");
          if(r.name === r.experiment_id) name = name.substring(0,7);

          return '<span class="label-cell" data-model-id="' +
                    r.id + '"  data-name="' + name + '" >' +
                  result +
                  '<i class="fa fa-edit"></i></span>';

        }
      },
      {
        title: "Dummy Column 1",
        target: "dummy_column1",
        data: 'dummy_column1',
        defaultContent: ""
      },
      {
        title: "Dummy Column 2",
        target: "dummy_column2",
        data: "dummy_column2",
        defaultContent: ""
      },
    ],
  });

  mlModelTable.column(7).visible(false);
  mlModelTable.column(8).visible(false);
}


function getComments(modelId, modelName) {
  var url = "/api/comment/";

  commentRowSelected = modelId;

  $.ajax({
      type: 'GET',
      url: url + modelId,
    })
    .done(function(data) {
      $('#commentModalTitle').html(modelName);
      updateCommentHTML(data);
      modelListState.modelCommentedSelected = modelId;
    })
    .fail(function(xhr, errmsg, err) {
      alert("There was an error.");
    });
}


function updateCommentHTML(data) {
  $('#comment-modal-body').html('');

  for (var i = 0; i < data.length; i++) {
    var html = '<div class="media">\
                      <img class="mr-3" src="' +
                      (data[i].user_detail.profile_detail.avatar ||
                        '/assets/img/profile_pic.png') +
                        '" alt="Generic placeholder image" \
                           style="height:64px;width:64px;"> \
                       <div class="media-body text-color"> \
                        <h5 class="mt-0">' +
                        (data[i].user_detail.profile_detail.first_name ||
                          'Anonymous') +
                        '</h5> ' +
                        data[i].comment +
                        '</div></div>';

    $('#comment-modal-body').append(html);
  }

  $("#commentModal").modal('show');
}


function commentPost() {
  var url = "/api/comment/",
    modelId = modelListState.modelCommentedSelected,
    formData = {
      comment: $('#comment-input').val(),
    },
    commentData = mlModelTable.row('#' + commentRowSelected).data();

  csrfToAjax();
  $.ajax({
      type: 'POST',
      url: url + modelId,
      data: formData,
      encode: true
    })
    .done(function(data) {
      updateCommentHTML(data);
      $('#comment-input').val('');

      // Increase comment count
      commentData.comment_count += 1;
      mlModelTable.row('#' + commentRowSelected).data(commentData).draw();
    })
    .fail(function(xhr, errmsg, err) {
      alert("There was an error.");
    });
}


function addMemberModal() {
  $('#addMemberEmail').val('');
  $('#addMemberModal').modal('show');
}


function sendInvite() {
  var url = "/api/invite/",
    projectId = $('#project-heading').data('project-id'),
    formData = {
      to_email: $('#addMemberEmail').val(),
      project: projectId
    };


  csrfToAjax();
  $.ajax({
      type: 'POST',
      url: url + projectId + '/',
      data: formData,
      encode: true
    })
    .done(function(data) {
      $('#add-member-msg').html('Your invite is on the way!');
      $('#addMemberEmail').val('');

      setTimeout(function() {
        $('#addMemberModal').modal('hide');
        $('#add-member-msg').html('');
      }, 1000);
    })
    .fail(function(xhr, errmsg, err) {
      alert("There was an error.");
    });
}

function showMembers() {
  var url = "/api/project/",
    projectId = $('#project-heading').data('project-id');


  $.ajax({
      type: 'GET',
      url: url + projectId,
    })
    .done(function(data) {
      updateShowMembersHTML(data[0].members);
    })
    .fail(function(xhr, errmsg, err) {
      alert("There was an error.");
    });
}

function updateShowMembersHTML(data) {
  $('#show-members-body').html('');

  for (var i = 0; i < data.length; i++) {
    var name = data[i].first_name + ' ' + data[i].last_name,
        avatar = data[i].avatar,
        email = data[i].email,
        html = '',
        owner_tag = '';

    if (name === ' ') name = 'Anonymous';
    if (data[i].is_owner) owner_tag = '<span class="owner">owner</span>';

    html = '<div class="media"> \
                    <img class="mr-3" src="' +
                      (avatar || '/assets/img/profile_pic.png') +
                      '" alt="Generic placeholder image" \
                        style="height:64px;width:64px;">\
                    <div class="media-body text-color">\
                        <h4 class="mt-0">' + name + owner_tag + '</h4> \
                        <h5 class="mt-0"> ' + email + '</h5>\
                    </div>\
                </div>'

    $('#show-members-body').append(html);
  }
  $('#showMembersModal').modal('show');
}


function initCompare() {
  if (mlCompareSelected.length === 2) {
    window.location.href = '/model-compare/' + mlCompareSelected[0] + '/' +
      mlCompareSelected[1];
  } else {
    alert("Two models needs to be selected in order to compare!");
  }
}


function copyKey() {
  var copyText = document.getElementById("project-key");
  copyText.select();
  document.execCommand("Copy");
}


// Update the table data with the fresh data fetched every n seconds
function updateData(data){

  for(var i=0; i < data.length; i++){
    var rowData = data[i],
        existingRow = mlModelTable.row('#' + rowData.id);

        if(existingRow.data() === undefined){
          mlModelTable.row.add(rowData).draw(false);
          break;
        }

        existingRow.data(rowData).draw(false);
  }

  updateDynamicColumnData();

  // Check the selected input checkboxes
  for(i in mlCompareSelected){
    $('input[data-model-id="' + mlCompareSelected[i] + '"]').prop("checked", true);
  }

}


function customiseTable(){
  getParamFieldData(showParamField);

  $('#customiseTable').modal('show');
}


function showParamField(data){
  $('#param-field-list').html('');

  for (var i = 0; i < data.length; i++) {
    var html = '',
        checked_string = '';

    if(paramFieldSelectList.indexOf(data[i].parameter) > -1) checked_string = 'checked';

    html = '<li class="list-group-item">'+ data[i].parameter +
      '<span><input  class="pull-right" type="checkbox" value="' +
      data[i].parameter + '" '+ checked_string +' /></span>';

    $('#param-field-list').append(html);
  }
}


function applyCustomization(){
  // Hide dummy columns
  mlModelTable.column( 7 ).visible(false);
  mlModelTable.column( 8 ).visible(false);

  getDynamicColumnData();

  $('#customiseTable').modal('hide');
  }


function getDynamicColumnData(){
  var formData = {
    'project_id' : $('#project-heading').data('project-id'),
    'param_fields' : paramFieldSelectList
  };

  if(paramFieldSelectList.length > 0){
    csrfToAjax();
    $.ajax({
            type: 'POST',
            url: '/api/ml-model/get-param-select-data/' + formData.project_id + '/',
            data: formData,
            encode: true
        })
        .done(function(data) {
          updateDynamicColumnData(data);
          })
        .fail(function(xhr, errmsg, err) {
            console.error("Error with param selected data");
        });

        // Hide the loader
        $loading.hide();
    }
}


function updateDynamicColumnData(data){
  var dummyColumnNames = ['dummy_column1', 'dummy_column2'];

  if (data === undefined){
    data = dynamicColumnData;
  } else {
    dynamicColumnData = data;
  }

  for(var i=0; i < data.length; i++){
    var rowData = data[i],
        existingRow = mlModelTable.row('#' + data[i].id);
        //existingRowData = existingRow.data();
    if(existingRow.data() === undefined) break;

    for(var j=0; j<paramFieldSelectList.length; j++){
      if(data[i].key === paramFieldSelectList[j]){
          existingRow.cell('#' + data[i].id, 7 + j ).data(data[i].value).draw(false);
      }
    }
  }

  for(var k=0; k<paramFieldSelectList.length; k++){
    $( mlModelTable.column( 7 + k ).header() ).text( paramFieldSelectList[k] );
      mlModelTable.column( 7 + k).visible(true);
  }
}


function getLabelsData(modelId){
  $.ajax({
          type: 'GET',
          url: '/api/experiment-label/'+ modelId + '/',
          encode: true
      })
      .done(function(data) {
        showLabelsHTML(data.labels);
      })
      .fail(function(xhr, errmsg, err) {
          console.log("Error");
      });
}


function showLabelsHTML(data){
  $('#label-modal-body').html('');

  for(var i in data){
    var labelHTML = '<div class="row media" > <div class="col-10">'+
                      data[i] +
                    '</div> <div class="col-2">' +
                    '<i class="label-delete fa fa-trash" style="color:red;" ' +
                    'data-label="' + data[i] + '" ></i>' +
                    '</div> </div>';

        $('#label-modal-body').append(labelHTML);
  }
}
/**************
 ** Events
 **************/
$('#compare-start').click(function() {
  modelListState.compareMode = true;
  compareStart();
});


function compareStart() {
  $('#compare-mode-off').removeClass("compare-mode-flip");
  $('#compare-mode-off').addClass("compare-mode");

  $('#compare-mode-on').removeClass("compare-mode");
  $('#compare-mode-on').addClass("compare-mode-flip");

  mlModelTable.column(0).visible(true);
}

$('#compare-cancel').click(function() {
  modelListState.compareMode = false;
  compareCancel();

});


function compareCancel() {
  $('#compare-mode-off').removeClass("compare-mode");
  $('#compare-mode-off').addClass("compare-mode-flip");

  $('#compare-mode-on').removeClass("compare-mode-flip");
  $('#compare-mode-on').addClass("compare-mode");

  mlModelTable.column(0).visible(false);

}


$('table').on('change', 'input', function(d) {

  if (this.checked && mlCompareSelected.length < 2) {
    mlCompareSelected.push($(this).data('model-id'));
  } else if (this.checked && mlCompareSelected.length >= 2) {
    this.checked = false;
  } else {
    var index = mlCompareSelected.indexOf($(this).data('model-id'));
    if (index > -1) mlCompareSelected.splice(index, 1);
  }

});


$('#param-field-list').on('change', 'input', function(d) {

  if (this.checked && paramFieldSelectList.length < 2) {
    paramFieldSelectList.push($(this).val());
  } else if (this.checked && paramFieldSelectList.length >= 2) {
    this.checked = false;
  } else {
    var index = paramFieldSelectList.indexOf($(this).val());
    if (index > -1) paramFieldSelectList.splice(index, 1);
  }
});


// To delete the project
$('#delete-project-button').click(function() {
  var formData = {
      'project_id': $('#project-heading').data('project-id')
    },
    url = "/api/project/";

  csrfToAjax();
  $.ajax({
      type: 'DELETE',
      url: url,
      data: formData,
      encode: true
    })
    .done(function(data) {
      window.location.href = '/project';
    })
    .fail(function(xhr, errmsg, err) {
      alert("There was an error.");
    });
});


$('table').on('click', '.label-cell', function(){
  var name = $(this).data("name"),
      modelId = $(this).data("model-id");

      modelListState.labelModelIdSelected = modelId;

      $('#labelModalTitle').html(name);
      $('#label-button').data("model-id", modelId);
      $('#label-input').val('');

      getLabelsData(modelId);

      $('#labelModal').modal('show');
});


$('#label-button').on('click', function(){
  var modelId = $(this).data("model-id"),
      labelValue = $('#label-input').val();

      if(labelValue == ''){
        alert("Label cannot be empty");
        return;
      }

      csrfToAjax();
      $.ajax({
              type: 'POST',
              url: '/api/experiment-label/'+ modelId + '/',
              encode: true,
              data:{
                label:labelValue
              }
          })
        .done(function(data) {
          showLabelsHTML(data);
          getData(updateData);
           $('#label-input').val('');
        })
        .fail(function(xhr, errmsg, err) {
            console.log("Error");
        });

});


$('#labelModal').on('click', '.label-delete' ,function(){
  var modelId = modelListState.labelModelIdSelected,
      labelValue = $(this).data('label');

      csrfToAjax();
      $.ajax({
              type: 'DELETE',
              url: '/api/experiment-label/'+ modelId + '/?label=' + labelValue,
              encode: true,
          })
        .done(function(data) {
          getLabelsData(modelId);
          getData(updateData);
        })
        .fail(function(xhr, errmsg, err) {
            console.log("Error");
        });
});


// Instantiate the copy of project key
new ClipboardJS('#project-copy');


// Get the updated data every 10 seconds
setInterval(function(){
  getData(updateData);
  getDynamicColumnData();
}, 10000);
