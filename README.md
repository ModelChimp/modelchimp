![modelchimp-logo](https://docs.modelchimp.com/logo.png)

[![CircleCI](https://circleci.com/gh/ModelChimp/modelchimp.svg?style=svg)](https://circleci.com/gh/ModelChimp/modelchimp)

[![Join ModelChimp Slack channel](https://i.imgur.com/V7jxjak.png)](https://join.slack.com/t/modelchimp/shared_invite/enQtNDcyNzU0MTQ2MzU0LTYxNDFjZWIwOTE0NjFkMGVlOGQ5YTZhYWQ2MWE1YWVmMDVhMDQ5MmZlYTU0N2UxMWYxYzE0Nzc2NGZlN2FiN2Q)


## What is ModelChimp?
ModelChimp is an experiment tracker for Deep Learning and Machine Learning experiments.

ModelChimp provides the following features:
- Real-time tracking of parameters and metrics
- Realtime charts for experiment metrics at epoch level
- Code used for the experiment
- Experiment comparison
- Collaborate and share experiments with team members
- Python objects storage such as data objects and model objects which can be used pulled for other experiments
- Storage of test and validation images for computer vision use cases. Useful for post experiment forensics of deep learning models
- Server based solution with user registration and authentication


## Why ModelChimp?
The idea for ModelChimp came up when I was building a recommendation algorithm for a large retail company based in India. Along with my 6 member team, we would store the meta information related to each experiment in an excel sheet. Two of the biggest problems we encountered while using this approach were:
1. Sometimes, we would miss out on logging the details while fine-tuning and analysing the model
2. Sharing these excel sheets over email amongst the team members and the client was a cumbersome process

ModelChimp is a solution to this problem faced by data scientists and machine learning engineers/enthusiasts. They can spend more time on experiments and not on managing the data related to the experiments.

## Installation
Choose either Docker based installation or the manual approach.

- Docker
- Production Deployment

### Docker
1. Docker is a prerequisite. You can download it from here - https://docs.docker.com/install/

```sh
$ git clone https://github.com/ModelChimp/modelchimp
$ cd modelchimp
$ bash docker.sh
```

2. After starting ModelChimp server, you can access it at http://localhost:8000

3. Use the following credentials to log in

```
username: admin@modelchimp.com
password: modelchimp123
```

4. (Optional) If you are using modelchimp on a remote server then add the hostname or ip address in the .env file for the following variables

```sh
DOMAIN=<hostname/ip>
ALLOWED_HOSTS=.localhost,127.0.0.1,<hostname/ip>
```

5. (Optional) For inviting team members, email credentials have to be added for the following variables in .env file

```sh
EMAIL_HOST=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
EMAIL_PORT=587
DEFAULT_FROM_EMAIL="noreply@modelchimp.com"
```


### Production Deployment
For production deployment, contact Karthik at  karthik@modelchimp.com

## Documentation
- Getting Started - https://docs.modelchimp.com/#installation
- Sample Projects
  - Scikit: https://docs.modelchimp.com/scikit/
  - Tensorflow: https://docs.modelchimp.com/tensorflow/
  - Pytorch: https://docs.modelchimp.com/pytorch/
  - Keras: https://docs.modelchimp.com/keras/
  - PySpark: https://docs.modelchimp.com/pyspark/
