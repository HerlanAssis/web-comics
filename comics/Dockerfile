FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /web-comics
WORKDIR /web-comics
COPY requirements.txt /web-comics/
RUN pip install -r requirements.txt
COPY . /web-comics/

ENV FLASK_APP=flask_app.py
ENV FLASK_ENV=development

# CMD ["flask","run", "--host", "0.0.0.0"]