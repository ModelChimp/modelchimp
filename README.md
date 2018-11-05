<div style="text-align:center;">
  <img src="http://www.modelchimp.com/assets/img/logo.png"  style="height:200px !important;"/>
</div>

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

![modelchimp-gif](https://docs.modelchimp.com/modelchimp.gif)


## Why ModelChimp?
The idea for ModelChimp came up when I was working on building a recommendation algorithm for a large retail company out of India. We were a 7 member team and we were storing the meta information related to each model building experiment in an excel sheet. Sometimes, we would miss out on logging the details, mostly due to fine-tuning and analysing the model at that moment. Sharing these sheets were over email and it was cumbersome to consolidate this data and share it with our client.

ModelChimp is a solution to this problem faced by data scientists and machine learning engineers/enthusiasts. They can spend more time on experiments and not on managing the data related to the experiments.

## Installation
### Docker based
1. Docker is a prerequisite. You can download it from here - https://docs.docker.com/install/

```sh
$ git clone ....
$ cd modelchimp-server
$ bash docker.sh --load-data
```

Use the following command to start ModelChimp without any preloaded data

```sh
$ bash docker.sh
```

2. After starting ModelChimp server, you can access it at http://localhost:8000

3. Use the following credentials to log in

```
username: admin@modelchimp.com
password: modelchimp123
```

### Manual
1. Create database and user in Postgres for keralarescue and give privileges.

```sql
$ psql user=postgres
Password:
psql (10.4 (Ubuntu 10.4-0ubuntu0.18.04))
Type "help" for help.

postgres=# CREATE DATABASE modelchimp;

CREATE DATABASE
postgres=# CREATE USER modelchimp WITH PASSWORD 'modelchimp123';
CREATE ROLE
postgres=# GRANT ALL PRIVILEGES ON DATABASE modelchimp TO modelchimp;
GRANT
postgres=# \q
```

2. Install Redis and check its live with the following command

```sh
$ redis-cli
127.0.0.1:6379> ping
PONG
```

3. Clone and cd to the repository

```sh
$ git clone ...
$ cd modelchimp-server
```

4. Copy .env-dev into .env and fill the db details

```sh
$ cp .env-dev .env
```
```sh
DB_HOST=localhost
DB_NAME=modelchimp
DB_USER=modelchimp
DB_PASSWORD=modelchimp123
DB_PORT=
```


5. Create a virtual environment and instantiate it

```sh
$ virtualenv -p python3 venv
$ source venv/bin/activate
```

6. Run the following to start ModelChimp server

```sh
$ python install -r requirements.txt
$ python manage.py collectstatic
$ python loaddata modelchimp.json
$ python manage.py runserver
```

7. Access ModelChimp server at http://localhost:8000 and use the following credentials

```
username: admin@modelchimp.com
password: modelchimp123
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
