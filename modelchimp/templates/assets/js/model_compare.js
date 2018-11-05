var modelDetailState = {
	evaluationArrow: false,
	modelArrow:false,
	featureArrow:false,
	deepLearningArrow: false,
	evaluationArrowTwo: false,
	modelArrowTwo:false,
	featureArrowTwo:false,
	deepLearningArrowTwo: false
};

/**************
 ** Events
 **************/
$('#evaluation-arrow').click(function(){
	modelDetailState.evaluationArrow = !modelDetailState.evaluationArrow;

	if(modelDetailState.evaluationArrow){
		$('#evaluation-arrow').addClass("rotate-right");
		$('#evaluation-arrow').removeClass("rotate-left");
	} else {
		$('#evaluation-arrow').removeClass("rotate-right");
		$('#evaluation-arrow').addClass("rotate-left");
	}
});

$('#model-arrow').click(function(){
	modelDetailState.modelArrow = !modelDetailState.modelArrow;

	if(modelDetailState.modelArrow){
		$('#model-arrow').addClass("rotate-right");
		$('#model-arrow').removeClass("rotate-left");
	} else {
		$('#model-arrow').removeClass("rotate-right");
		$('#model-arrow').addClass("rotate-left");
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

$('#feature-arrow').click(function(){
	modelDetailState.featureArrow = !modelDetailState.featureArrow;

	if(modelDetailState.featureArrow){
		$('#feature-arrow').addClass("rotate-right");
		$('#feature-arrow').removeClass("rotate-left");
	} else {
		$('#feature-arrow').removeClass("rotate-right");
		$('#feature-arrow').addClass("rotate-left");
	}
});

$('#evaluation-arrow-two').click(function(){
	modelDetailState.evaluationArrowTwo = !modelDetailState.evaluationArrowTwo;

	if(modelDetailState.evaluationArrowTwo){
		$('#evaluation-arrow-two').addClass("rotate-right");
		$('#evaluation-arrow-two').removeClass("rotate-left");
	} else {
		$('#evaluation-arrow-two').removeClass("rotate-right");
		$('#evaluation-arrow-two').addClass("rotate-left");
	}
});

$('#model-arrow-two').click(function(){
	modelDetailState.modelArrowTwo = !modelDetailState.modelArrowTwo;

	if(modelDetailState.modelArrowTwo){
		$('#model-arrow-two').addClass("rotate-right");
		$('#model-arrow-two').removeClass("rotate-left");
	} else {
		$('#model-arrow-two').removeClass("rotate-right");
		$('#model-arrow-two').addClass("rotate-left");
	}
});

$('#deep-learning-arrow-two').click(function() {
  modelDetailState.deepLearningArrowTwo = !modelDetailState.deepLearningArrowTwo;

  if (modelDetailState.deepLearningArrowTwo) {
    $('#deep-learning-arrow-two').addClass("rotate-right");
    $('#deep-learning-arrow-two').removeClass("rotate-left");
  } else {
    $('#deep-learning-arrow-two').removeClass("rotate-right");
    $('#deep-learning-arrow-two').addClass("rotate-left");
  }
});

$('#feature-arrow-two').click(function(){
	modelDetailState.featureArrowTwo = !modelDetailState.featureArrowTwo;

	if(modelDetailState.featureArrowTwo){
		$('#feature-arrow-two').addClass("rotate-right");
		$('#feature-arrow-two').removeClass("rotate-left");
	} else {
		$('#feature-arrow-two').removeClass("rotate-right");
		$('#feature-arrow-two').addClass("rotate-left");
	}
});


$('#evaluation-table').find('tr').each(function(){
	var metricNameFirst = $(this).find('td:eq(0)'),
			metricValueFirst = $(this).find('td:eq(1)');

			$('#evaluation-table-two').find('tr').each(function(){
				var metricNameSecond = $(this).find('td:eq(0)'),
						metricValueSecond = $(this).find('td:eq(1)');

						if(metricNameFirst.html() == metricNameSecond.html()){
							if(metricValueFirst.html() > metricValueSecond.html()){
								metricValueFirst.addClass('eval-green');
								metricValueSecond.addClass('eval-red');

							} else if(metricValueFirst.html() < metricValueSecond.html()){
								metricValueFirst.addClass('eval-red');
								metricValueSecond.addClass('eval-green');
							}
						}

			});
});
