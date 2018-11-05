(function(){
"use strict";

var address = "/api/experiment-custom-object/details/";

////// CUSTOM OBJECTS TABLE ///////
function getData(){
  var url = address + model_id;

  $.ajax({
      type: 'GET',
      url: url
    })
    .done(function(data) {
      console.log(data);
      parseData(data);
    })
    .fail(function(xhr, errmsg, err) {
      console.log("There was an error.");
    });
}


function parseData(data){
  for(var i=0; i<data.length; i++){
    data[i].parsedSize = parseFileSize(data[i].filesize);
  }

  showTable(data);
}


function showTable(data) {
  $("#custom-objects-table tbody").html("");

  for(var i=0; i<data.length; i++){
    var html = "<tr><td>" + data[i].name + "</td>" +
                "<td>" + data[i].parsedSize + "</td>" +
                "<td>" + data[i].custom_object_id + "</td></tr>";

    $("#custom-objects-table tbody").append(html);
  }
}


function parseFileSize(size){
  if(size >= 1000 && size < Math.pow(1000,2)){
    return size/1000 + ' kB';
  } else if(size >=  Math.pow(1000,2) && size <  Math.pow(1000,4)){
    return size/ Math.pow(1000,2) + ' MB';
  } else if(size >=  Math.pow(1000,4)){
    return size/Math.pow(1000,4) + ' GB';
  }

  return size + ' B';
}

function main() {
  getData();
}

$(document).ready(main);
})();
