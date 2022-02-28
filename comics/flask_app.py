import logging
from flask import Flask, request
from flask_cors import CORS
from factories import ComicsFactory

app = Flask(__name__)
CORS(app)

commic_factory = ComicsFactory.get()


@app.before_first_request
def before_first_request_func():
    recipes = commic_factory.get_recipes()
    logging.info(f'Iniciando a aplicação com as receitas {recipes}')


@app.route('/')
def recipes():
    recipes = commic_factory.get_recipes()
    return commic_factory.to_json(list(recipes))


@app.route('/<recipe_name>/<page>')
def commics(recipe_name, page):
    commic_factory.set_params(request.headers, page=page)
    commics = commic_factory.get_comics(recipe_name)
    return commic_factory.to_json(commics)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
