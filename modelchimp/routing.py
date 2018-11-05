from django.conf.urls import url
from .views.consumers import ( tracker,
                                project_status,
                                experiment_level_reporting )

websocket_urlpatterns = [
    url(r'^ws/tracker/(?P<experiment_id>[^/]+)/$',
        tracker.TrackerConsumer),
    url(r'^ws/project-status/(?P<project_key>[^/]+)/$',
        project_status.ProjectStatusConsumer),
    url(r'^ws/experiment-level-metric-report/(?P<project_key>[^/]+)/(?P<experiment_id>[^/]+)/$',
        experiment_level_reporting.ExperimentLevelReportingConsumer),
]
