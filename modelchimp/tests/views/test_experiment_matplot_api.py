from rest_framework import status

from modelchimp.tests import BaseTest
from modelchimp.enum import Constants
from modelchimp.factories.factory_experiment_matplot import ExperimentMatPlotFactory


class ExperimentMatPlotApiTest(BaseTest):
    def setUp(self):
        super().setUp()
        self.url = '/{}/experiment/{}/matplot/'.format(Constants.API_V2
                                                    ,self.experiment1.id)
        self.experiment_matplot1 = ExperimentMatPlotFactory(project=self.project
                                                    ,ml_model=self.experiment1)

    def test_create(self):
        f = open('modelchimp/tests/matplot.png','rb')
        response = self.client.post(self.url
                                    ,data={
                                        'name' : 'Scatter Plot'
                                        ,'mat_plot_file' : f
                                        ,'project' : self.project.id
                                        ,'ml_model' : self.experiment1.id

                                    }
                                    ,format='multipart')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post(self.url
                                    ,data={
                                        'name' : 'Scatter Plot'
                                        ,'mat_plot_file' : f

                                    }
                                    ,format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        f.close()

    def test_list(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.experiment_matplot1.name)
        self.assertEqual(response.data[0]['project'], self.experiment_matplot1.project.id)
        self.assertEqual(response.data[0]['ml_model'], self.experiment_matplot1.ml_model.id)
        self.assertTrue(response.data['mat_plot_file'])
