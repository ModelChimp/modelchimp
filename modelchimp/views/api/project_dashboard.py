from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from modelchimp.utils.data_utils import execute_query

from modelchimp.api_permissions import HasProjectMembership
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def experiment_metric_chart(request, project_id):
    try:
        # Get the filter parameters from the request
        params = request.query_params
        metric = None
        max_min_flag = None

        # Check if the metric type exists
        if 'max-min-flag' in params:
            max_min_flag = int(params['max-min-flag'])
            if max_min_flag not in [1,0]:
                raise ValueError('Passed in incorrect max_min_flag')

        if 'metric' in params:
            metric = str(params['metric'])

            metric_query = '''
select distinct value as metric
from modelchimp_machinelearningmodel ml,
jsonb_array_elements(ml.evaluation_parameters::jsonb -> 'metric_list')
where project_id = %s
        	'''

            metric_query = metric_query % (project_id,)
            metric_query_result = execute_query(metric_query)
            metric_query_result = [ mqr['metric'] for mqr in metric_query_result]
            if metric not in metric_query_result:
                raise ValueError('Metric does not exist')
    except Exception as e:
        return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

    query = '''
select
	id,
    name,
    short_name,
	%s(value::decimal) as value
from (select
      id,
      name,
      CASE WHEN name = experiment_id THEN SUBSTRING(name,0,8)
        ELSE name
        END as short_name,
      value ->> 'epoch' as epoch,
      value ->> 'value' as value
from modelchimp_machinelearningmodel ml,
jsonb_array_elements(ml.evaluation_parameters::jsonb -> 'evaluation' -> '%s')
where project_id = %s ) a
group by id, name, short_name
	'''

    query = query % (
        'max' if max_min_flag == 1 else 'min',
        metric,
        project_id,
    )

    result_raw = execute_query(query)

    return Response(result_raw, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def experiment_metric_filter(request, project_id):
    try:
        # Get the filter parameters from the request
        params = request.query_params

        if 'param' in params:
            param = str(params['param'])

            param_query = '''
select distinct json_object_keys(model_parameters::json) as param
from modelchimp_machinelearningmodel ml
where json_typeof(model_parameters::json) = 'object'
and project_id = %s
        	'''

            param_query = param_query % (project_id,)
            param_query_result = execute_query(param_query)
            param_query_result = [ pqr['param'] for pqr in param_query_result]
            if param not in param_query_result:
                raise ValueError('Model Parameter does not exist')
        else:
            param = None
    except Exception as e:
        return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

    query = '''
select distinct value as metric
from modelchimp_machinelearningmodel ml,
jsonb_array_elements(ml.evaluation_parameters::jsonb -> 'metric_list')
where project_id = %s %s
order by metric
	'''

    query = query % (
        project_id,
        "and model_parameters->>'%s' is not null" % (param, ) if param else ''
    )

    result_raw = execute_query(query)

    return Response(result_raw, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def experiment_duration_chart(request, project_id):
    try:
        # Get the filter parameters from the request
        params = request.query_params
        tag = None

        if 'tag' in params:
            tag = str(params['tag'])

            tag_query = '''
select distinct value as tag
from modelchimp_machinelearningmodel ml,
jsonb_array_elements(ml.epoch_durations::jsonb -> 'tag_list')
where project_id = %s
        	'''

            tag_query = tag_query % (project_id,)
            tag_query_result = execute_query(tag_query)
            tag_query_result = [ tag['tag'] for tag in tag_query_result]
            if tag not in tag_query_result:
                raise ValueError('Duration tag does not exist')
    except Exception as e:
        return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

    query = '''
select
	id,
    name,
    short_name,
	sum(value::decimal) as value
from (select
      id,
      name,
      CASE WHEN name = experiment_id THEN SUBSTRING(name,0,8)
        ELSE name
        END as short_name,
      value ->> 'epoch' as epoch,
      value ->> 'value' as value
from modelchimp_machinelearningmodel ml,
json_array_elements(ml.epoch_durations::json -> 'duration' -> '%s')
where project_id = %s ) a
group by id, name, short_name
	'''

    query = query % (
        tag,
        project_id,
    )

    result_raw = execute_query(query)

    return Response(result_raw, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def experiment_duration_filter(request, project_id):
    query = '''
select distinct value as tag
from modelchimp_machinelearningmodel ml,
jsonb_array_elements(ml.epoch_durations::jsonb -> 'tag_list')
where project_id = %s
order by tag
	'''

    query = query % (
        project_id,
    )

    result_raw = execute_query(query)
    return Response(result_raw, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def experiment_parameter_metric_chart(request, project_id):
    try:
        # Get the filter parameters from the request
        params = request.query_params
        metric = None
        max_min_flag = None
        param = None

        # Check if the metric type exists
        if 'max-min-flag' in params:
            max_min_flag = int(params['max-min-flag'])
            if max_min_flag not in [1,0]:
                raise ValueError('Passed in incorrect max_min_flag')

        if 'metric' in params:
            metric = str(params['metric'])

            metric_query = '''
select distinct value as metric
from modelchimp_machinelearningmodel ml,
jsonb_array_elements(ml.evaluation_parameters::jsonb -> 'metric_list')
where project_id = %s
        	'''

            metric_query = metric_query % (project_id,)
            metric_query_result = execute_query(metric_query)
            metric_query_result = [ mqr['metric'] for mqr in metric_query_result]
            if metric not in metric_query_result:
                raise ValueError('Metric does not exist')

        if 'param' in params:
            param = str(params['param'])

            param_query = '''
select distinct json_object_keys(model_parameters::json) as param
from modelchimp_machinelearningmodel ml
where json_typeof(model_parameters::json) = 'object'
and project_id = %s
        	'''

            param_query = param_query % (project_id,)
            param_query_result = execute_query(param_query)
            param_query_result = [ pqr['param'] for pqr in param_query_result]
            if param not in param_query_result:
                raise ValueError('Model Parameter does not exist')
    except Exception as e:
        return Response("Error: %s" % e, status=status.HTTP_400_BAD_REQUEST)

    max_sql = 'DESC' if max_min_flag == 1 else ''
    query = f'''
select id,
    name,
    short_name,
    param,
    value,
    max_rank
from (select
      id,
      name,
      CASE WHEN name = experiment_id THEN SUBSTRING(name,0,8)
        ELSE name
      END as short_name,
      model_parameters->>'{param}' as param,
      value ->> 'epoch' as epoch,
      value -> 'value' as value,
      row_number() OVER (PARTITION BY model_parameters->>'{param}' ORDER BY value -> 'value' {max_sql}) as max_rank
from modelchimp_machinelearningmodel ml,
      jsonb_array_elements(ml.evaluation_parameters::jsonb -> 'evaluation' -> '{metric}')
where project_id = {project_id}
 and model_parameters->>'{param}' is not null) a
where max_rank = 1
	'''
    result_raw = execute_query(query)

    return Response(result_raw, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes((HasProjectMembership, IsAuthenticated))
def experiment_parameter_metric_filter(request, project_id):
    query = '''
select distinct json_object_keys(model_parameters::json) as param
from modelchimp_machinelearningmodel ml
where json_typeof(model_parameters::json) = 'object'
and project_id = %s
	'''

    query = query % (
        project_id,
    )

    result_raw = execute_query(query)
    return Response(result_raw, status=status.HTTP_200_OK)
