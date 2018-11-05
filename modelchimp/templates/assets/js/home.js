$(document).ready(main);

/**************
** FUNCTIONS
**************/
function main() {
    getData()
}

function getData(){
    var url = "/api/project/";

    $.ajax({
            type: 'GET',
            url: url,
            })
            .done(function(data) {
                updateProjectHTML(data);
            })
            .fail(function(xhr, errmsg, err) {
                alert("There was an error.");
            });
}

function postProject() {
    csrfToAjax();

    var formData = {
        name: $('#form-project-name').val(),
        description: $('#form-project-description').val(),
    };

    if(formData.name.trim().length == 0){
      alert("Please name your project");
    } else {
      $.ajax({
              type: 'POST',
              url: '/api/project/',
              data: formData,
              encode: true
          })
          .done(function(data) {
              updateProjectHTML(data);
              $('#form-project-name').val('');
              $('#form-project-description').val('');
          })
          .fail(function(xhr, errmsg, err) {
              alert("There was an error.");
          });
      }

}


function updateProjectHTML(data){
    $('#project-container').html('');

    for(var i=0; i<data.length; i++){
      var html = '',
      owner_tag = '',
      lastSubmitted = moment(data[i].last_submitted_epoch * 1000).format("Do MMM YYYY HH:mm:ss");

      if(data[i].owner_flag) owner_tag = '<span class="owner">owner</span>';

      html = '<div class="col-md-12 project-row d-flex"> \
            <div class="d-flex mr-auto align-items-center"> \
                <a href="/project/'+ data[i].id +'"><h5> '+ data[i].name + '</h5></a> \
                '+ owner_tag + '\
            </div> \
            <div class="d-flex align-items-end flex-column text-color project-meta"> \
                <div class="p-2"><b>Submissions:</b>'+ data[i].submission_count +'</div> \
                <div class="p-2"><b>Last Submit:</b> ' + lastSubmitted + '</div> \
            </div> \
        </div>'

       $('#project-container').append(html);
    }
}
