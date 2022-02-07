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
COPY docker-compose.yml /

ENV MONGO_DETAILS="mongodb+srv://testuser:k53NSkBSw0vvc4F3@cluster0.z4anm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

CMD docker-compose up -d

CMD export PYTHONPATH=/ && python api/main.py

#
#CMD ["uvicorn", "code.main:app", "--host", "0.0.0.0", "--port", "80"]
