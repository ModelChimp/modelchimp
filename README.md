**NOTE**
**This repo is no longer actively maintained. Following are some open source alternatives**
  - mlflow : https://github.com/mlflow/mlflow
  - polyaxxon : https://github.com/polyaxon/polyaxon
 
**Following are some Saas options**
  - cometml: https://www.comet.ml/
  - weights and biases: https://www.wandb.com/



<img src="https://docs.modelchimp.com/img/logo.png" height=200 style="display:block;margin:auto;r"/>


[![CircleCI](https://circleci.com/gh/ModelChimp/modelchimp.svg?style=svg)](https://circleci.com/gh/ModelChimp/modelchimp)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/87a463d2330f4507a507d0710367ee01)](https://www.codacy.com/app/samzer/modelchimp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ModelChimp/modelchimp&amp;utm_campaign=Badge_Grade)
![Join ModelChimp Slack channel](https://img.shields.io/badge/chat_on-slack-dark_green.svg)

![modelchimp-gif](https://media.giphy.com/media/3FiUt4BkCao6VCqRSk/giphy.gif)


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

1. Modelchimp can be deployed referring the docker-compose.local.yml with the container orchestration of your choice. If you are not using any container orchestration and want to start it manually then you can use the following command

```sh
docker-compose -f docker-compose.local.yml up --build -d
```

This will start the containers in daemon mode on the machine where Modelchimp resides. Modelchimp can be accessed from port 8000

2. (Optional) To store the data in an external postgres database. Add the following credentials to the .env file

```sh
DB_HOST=<DB_HOST>
DB_NAME=<DB_NAME>
DB_USER=<DB_USER>
DB_PASSWORD=<DB_PASSWORD>
DBPORT=
```

3. (Optional) To store the file assets in an s3 bucket. Add the following credentials to the .env file

```sh
AWS_STORAGE_FLAG=True
AWS_ACCESS_KEY_ID=<ID>
AWS_SECRET_ACCESS_KEY=<KEY>
AWS_STORAGE_BUCKET_NAME=<bucket_name>
```

4. (Optional) To invite team members to a project. Add the following email credentials to the .env file

```sh
EMAIL_HOST=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
EMAIL_PORT=587
DEFAULT_FROM_EMAIL="noreply@modelchimp.com"
```


## Documentation
- Getting Started - https://docs.modelchimp.com/#installation
- Sample Projects
  - Scikit: https://docs.modelchimp.com/scikit/
  - Tensorflow: https://docs.modelchimp.com/tensorflow/
  - Pytorch: https://docs.modelchimp.com/pytorch/
  - Keras: https://docs.modelchimp.com/keras/
  - PySpark: https://docs.modelchimp.com/pyspark/
