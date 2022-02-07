#
FROM python:3.9

#
WORKDIR /

#
COPY ./requirements.txt /code/requirements.txt

#
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

#
COPY ./api /api/
COPY .env /

CMD export $(cat .env | xargs) && export PYTHONPATH=/ && python api/main.py

