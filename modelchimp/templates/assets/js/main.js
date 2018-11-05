// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function csrfToAjax() {
    var csrfToken = getCookie('csrftoken');

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrfToken);
            }
        }
    });
}

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}

var enums = (function() {
    var RuleType = {
        'E': 'Equals',
        'GT': 'Above',
        'GTE': 'Above',
        'LT': 'Below',
        'LTE': 'Below',
    },
    ExperimentStatus = {
      'IN_PROCESS' : 1,
      'COMPLETED' : 2
    },
    ClientEvent = {
      'AUTH' : 1,
      'MODEL_PARAM' : 2,
      'EVAL_PARAM' : 3,
      'DURATION_PARAM' : 4,
      'EXPERIMENT_START' : 5,
      'EXPERIMENT_END' : 6,
      'CODE_FILE' : 7,
      'GET_EXPERIMENT_METRIC_FILTER' : 8,
      'GET_EXPERIMENT_METRIC_DATA' : 9,
      'COMPLETED' : 10,
      'GET_EXPERIMENT_DURATION_FILTER' : 11,
      'GET_EXPERIMENT_DURATION_DATA' : 12,
    },
    ServerEvent = {
      'ACCEPTED' : 1,
      'DATA_EXPERIMENT_LEVEL_METRIC' : 2,
      'DATA_EXPERIMENT_LEVEL_DURATION' : 3,
      'FILTER_EXPERIMENT_LEVEL_METRIC' : 4,
      'FILTER_EXPERIMENT_LEVEL_DURATION' : 5,
      'NO_FILTER_EXPERIMENT_LEVEL_METRIC' : 6,
      'NO_FILTER_EXPERIMENT_LEVEL_DURATION' : 7,
      'NOTIFICATION_NEW_METRIC' : 8,
      'NOTIFICATION_NEW_DURATION' : 9
    };

    return { RuleType : RuleType,
             ExperimentStatus : ExperimentStatus,
             ClientEvent : ClientEvent,
             ServerEvent : ServerEvent
           };
})();

function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Spinner
var $loading = $('#loading-div').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });

// Experiment id copy
new ClipboardJS('#experiment-id-copy');
