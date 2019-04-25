FROM python:3.6.7-stretch
ENV PYTHONUNBUFFERED 1
COPY requirements.txt /code/
WORKDIR /code
RUN pip install --upgrade setuptools
RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y --no-install-recommends postgresql-client \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY . /code
RUN python manage.py collectstatic --noinput

EXPOSE 8000
