from modelchimp.tests import BaseTest

from modelchimp.factories.factory_experiment import ExperimentFactory
from modelchimp.models.experiment import Experiment



class ExperimentModelTest(BaseTest):
    model_class = Experiment
    factory_class = ExperimentFactory

    def setUp(self):
        super().setUp()
        self.data = {
            'name' : 'Manhattan'
            ,'status' : self.experiment1.status
            ,'labels' : self.experiment1.labels

            ,'parameters' : self.experiment1.parameters
            ,'metrics' : self.experiment1.metrics
            ,'durations' : self.experiment1.durations
            ,'grid_search' : self.experiment1.grid_search

            ,'user' : self.experiment1.user
            ,'project' : self.experiment1.project
        }

    def test_create(self):
        instance = self.model_class.objects.create(**self.data)
        self.assertEqual(instance.name, self.data['name'])
        self.assertEqual(instance.status, self.data['status'])
        self.assertEqual(instance.labels, self.data['labels'])
        self.assertEqual(instance.parameters, self.data['parameters'])
        self.assertEqual(instance.metrics, self.data['metrics'])
        self.assertEqual(instance.durations, self.data['durations'])
        self.assertEqual(instance.grid_search, self.data['grid_search'])

    def test_retrieve(self):
        instance = self.model_class.objects.get(experiment_id=self.experiment1.experiment_id)

        self.assertEqual(instance.name, self.experiment1.name)
        self.assertEqual(instance.status, self.experiment1.status)
        self.assertEqual(instance.labels, self.experiment1.labels)
        self.assertEqual(instance.parameters, self.data['parameters'])
        self.assertEqual(instance.metrics, self.data['metrics'])
        self.assertEqual(instance.durations, self.data['durations'])
        self.assertEqual(instance.grid_search, self.data['grid_search'])

    def test_update(self):
        instance = self.model_class.objects.get(experiment_id=self.experiment1.experiment_id)
        instance.name = 'Heisenberg'
        instance.parameters = {
            'parameter1' : 'a'
            ,'parameter2' : 'b'
            ,'parameter3' : 'c'
        }
        instance.save()

        self.assertEqual(instance.name, 'Heisenberg')
        self.assertEqual(instance.parameters['parameter1'], 'a')

        instance.parameters['parameter1'] = 'aa'
        instance.save()
        self.assertEqual(instance.parameters['parameter1'], 'aa')

    def test_delete(self):
        delete_flag = False
        instance = self.model_class.objects.get(experiment_id=self.experiment1.experiment_id)
        instance.delete()

        try:
            self.model_class.objects.get(experiment_id=self.experiment1.experiment_id)
        except Experiment.DoesNotExist:
            delete_flag = True

        self.assertTrue(delete_flag)

    def test_parameters_structure(self):
        instance = self.model_class.objects.get(experiment_id=self.experiment1.experiment_id)
        self.assertTrue(isinstance(instance.parameters, dict ))

    def test_metrics_structure(self):
        instance = self.model_class.objects.get(experiment_id=self.experiment1.experiment_id)
        self.assertTrue(isinstance(instance.metrics, dict ))

        ekey = next(iter(instance.metrics['evaluation']))
        self.assertTrue(instance.metrics['evaluation'])
        self.assertTrue(isinstance(instance.metrics['evaluation'], dict ))
        self.assertTrue(isinstance(instance.metrics['evaluation'][ekey], list ))

        self.assertTrue(instance.metrics['metric_list'])
        self.assertTrue(isinstance(instance.metrics['metric_list'], list ))

        self.assertEqual(len(instance.metrics['metric_list']), len(instance.metrics['evaluation'].keys()))

    def test_duration_structure(self):
        instance = self.model_class.objects.get(experiment_id=self.experiment1.experiment_id)
        self.assertTrue(isinstance(instance.durations, dict ))

        dkey = next(iter(instance.durations['duration']))
        self.assertTrue(instance.durations['duration'])
        self.assertTrue(isinstance(instance.durations['duration'], dict ))
        self.assertTrue(isinstance(instance.durations['duration'][dkey], list ))

        self.assertTrue(instance.durations['tag_list'])
        self.assertTrue(isinstance(instance.durations['tag_list'], list ))

        self.assertEqual(len(instance.durations['tag_list']), len(instance.durations['duration'].keys()))

    def test_grid_search_structure(self):
        instance = self.model_class.objects.get(experiment_id=self.experiment1.experiment_id)
        self.assertTrue(isinstance(instance.grid_search, dict ))
        self.assertTrue(isinstance(instance.grid_search['data'], dict ))
        self.assertTrue(isinstance(instance.grid_search['data']['params'], list ))
