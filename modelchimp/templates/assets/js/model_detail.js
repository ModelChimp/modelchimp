var modelDetailState = {
  evaluationArrow: false,
  modelArrow: false,
  featureArrow: false,
  deepLearningArrow: false,
  modelCommentedSelected: 0,
  labelModelIdSelected: 0
};


function getComments(modelId, modelName) {
  var url = "/api/comment/";

  $.ajax({
      type: 'GET',
      url: url + modelId,
    })
    .done(function(data) {
      $('#commentModalTitle').html(modelName);
      updateCommentHTML(data);
      modelDetailState.modelCommentedSelected = modelId;
    })
    .fail(function(xhr, errmsg, err) {
      alert("There was an error.");
    });
}


function updateCommentHTML(data) {
  $('#comment-modal-body').html('');

  for (var i = 0; i < data.length; i++) {
    var html = '<div class="media">\
                    <img class="mr-3" src="' + (data[i].user_detail.profile_detail.avatar || '/assets/img/profile_pic.png') + '" alt="Generic placeholder image" style="height:64px;width:64px;"> \
                <div class="media-body text-color"> \
                      <h5 class="mt-0">' + (data[i].user_detail.profile_detail.first_name || 'Anonymous') + '</h5> \
                      ' + data[i].comment + ' \
                </div> \
              </div>';

    $('#comment-modal-body').append(html);
  }

  $('#commentModal').modal('show');
}


function commentPost() {
  var url = "/api/comment/",
    modelId = modelDetailState.modelCommentedSelected,
    formData = {
      comment: $('#comment-input').val(),
    };

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
    })
    .fail(function(xhr, errmsg, err) {
      alert("There was an error.");
    });
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


$('#evaluation-arrow').click(function() {
  modelDetailState.evaluationArrow = !modelDetailState.evaluationArrow;

  if (modelDetailState.evaluationArrow) {
    $('#evaluation-arrow').addClass("rotate-right");
    $('#evaluation-arrow').removeClass("rotate-left");
  } else {
    $('#evaluation-arrow').removeClass("rotate-right");
    $('#evaluation-arrow').addClass("rotate-left");
  }
});


$('#model-arrow').click(function() {
  modelDetailState.modelArrow = !modelDetailState.modelArrow;

  if (modelDetailState.modelArrow) {
    $('#model-arrow').addClass("rotate-right");
    $('#model-arrow').removeClass("rotate-left");
  } else {
    $('#model-arrow').removeClass("rotate-right");
    $('#model-arrow').addClass("rotate-left");
  }
});


$('#feature-arrow').click(function() {
  modelDetailState.featureArrow = !modelDetailState.featureArrow;

  if (modelDetailState.featureArrow) {
    $('#feature-arrow').addClass("rotate-right");
    $('#feature-arrow').removeClass("rotate-left");
  } else {
    $('#feature-arrow').removeClass("rotate-right");
    $('#feature-arrow').addClass("rotate-left");
  }
});


$('#deep-learning-arrow').click(function() {
  modelDetailState.deepLearningArrow = !modelDetailState.deepLearningArrow;

  if (modelDetailState.deepLearningArrow) {
    $('#deep-learning-arrow').addClass("rotate-right");
    $('#deep-learning-arrow').removeClass("rotate-left");
  } else {
    $('#deep-learning-arrow').removeClass("rotate-right");
    $('#deep-learning-arrow').addClass("rotate-left");
  }
});


// To delete the project
$('#delete-model-button').click(function() {
  var formData = {
      'model_id': $('#model-name').data('model-id')
    },
    url = "/api/ml-model/",
    project_id = $('#model-name').data('project-id');

    csrfToAjax();
    $.ajax({
        type: 'DELETE',
        url: url + project_id + '/',
        data: formData,
        encode: true
      })
      .done(function(data) {
        window.location.href = '/project/' + project_id;
      })
      .fail(function(xhr, errmsg, err) {
        alert("There was an error.");
      });
});


$('#labels-button').on('click', function(){
  var name = experimentName ,
      modelId = model_id;

      modelDetailState.labelModelIdSelected = modelId;

      $('#labelModalTitle').html(name);
      $('#label-button').data("model-id", modelId);
      $('#label-input').val('');

      getLabelsData(modelId);

      $('#labelModal').modal('show');
});


$('#label-button').on('click', function(){
  var modelId = model_id,
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
           $('#label-input').val('');
        })
        .fail(function(xhr, errmsg, err) {
            console.log("Error");
        });

});


$('#labelModal').on('click', '.label-delete' ,function(){
  var modelId = modelDetailState.labelModelIdSelected,
      labelValue = $(this).data('label');

      csrfToAjax();
      $.ajax({
              type: 'DELETE',
              url: '/api/experiment-label/'+ modelId + '/?label=' + labelValue,
              encode: true,
          })
        .done(function(data) {
          getLabelsData(modelId);
        })
        .fail(function(xhr, errmsg, err) {
            console.log("Error");
        });

});
