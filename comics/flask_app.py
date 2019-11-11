import json
from flask import Flask, request
from flask_cors import CORS
from factories import ComicsFactory

app = Flask(__name__)
CORS(app)


@app.route('/<page>')
def main(page):
    return ComicsFactory.get().set_params(request.headers, page=page).get_recipes().get_comics().to_json()


if __name__ == "__main__":
    app.run(host='0.0.0.0')
