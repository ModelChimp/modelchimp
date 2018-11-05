FROM python:3.6.7-stretch
ENV PYTHONUNBUFFERED 1
ADD requirements.txt /code/
WORKDIR /code
RUN pip install --upgrade setuptools
RUN pip install -r requirements.txt
ADD . /code/
EXPOSE 8000
