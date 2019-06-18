import datetime

from django.utils import timezone

from celery.decorators import periodic_task
from celery.utils.log import get_task_logger

from modelchimp.models.experiment import Experiment
from modelchimp.enum import ExperimentStatus

logger = get_task_logger(__name__)


@periodic_task(run_every=5, name="close_dead_experiments")
def close_dead_experiments():
    in_process_experiments = Experiment.objects.filter(status=ExperimentStatus.IN_PROCESS)

    for exp in in_process_experiments:
        time_diff = datetime.datetime.utcnow() - exp.last_heart_beat.replace(tzinfo=None)
        time_diff = time_diff.total_seconds()

        if time_diff > 30.0:
            exp.status = ExperimentStatus.COMPLETED
            exp.experiment_end = timezone.now()
            exp.save()
