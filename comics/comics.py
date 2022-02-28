import os
import json


class Comics:
    path_to_recipes = 'recipes/'

    def __init__(self, extractor):
        self._recipes = dict()
        self._comics = []
        self._extractor = extractor

    def set_params(self, headers, page=1):
        self._headers = {'User-Agent': headers.get('User-Agent')}
        self._page = page

    def get_recipes(self, *args, **kwargs):
        json_files = [pos_json for pos_json in os.listdir(
            self.path_to_recipes) if pos_json.endswith('.json')]

        recipes = []
        for recipe_json in json_files:
            with open('{}{}'.format(self.path_to_recipes, recipe_json)) as data_file:
                recipes.append(json.load(data_file))

        for recipe in recipes:
            self._recipes[recipe.get("name")] = recipe

        return self._recipes

    def get_comics(self, recipe_name):
        comics = None

        recipe = self._recipes[recipe_name]

        if recipe_name:
            comics = self._extractor.set_params(
                self._headers, **recipe).get_page(self._page).extract_comics()

        self._comics = comics

        return self._comics

    def to_json(self, arg):
        return json.dumps(arg)
