import os
import json


class Comics:
    path_to_recipes = 'recipes/'

    def __init__(self, extractor):
        self._recipes = None
        self._comics = []
        self._extractor = extractor

    def set_params(self, headers, page=1):
        self._headers = {'User-Agent': headers.get('User-Agent')}
        self._page = page
        return self

    def get_recipes(self, *args, **kwargs):
        json_files = [pos_json for pos_json in os.listdir(
            self.path_to_recipes) if pos_json.endswith('.json')]

        recipes = []
        for recipe_json in json_files:
            with open('{}{}'.format(self.path_to_recipes, recipe_json)) as data_file:
                recipes.append(json.load(data_file))

        self._recipes = recipes

        return self

    def get_comics(self):
        comics = []

        for recipe in self._recipes:
            comics.append(self._extractor.set_params(
                self._headers, **recipe).get_page(self._page).extract_comics())

        self._comics = comics

        return self

    def to_json(self):
        return json.dumps(self._comics)
