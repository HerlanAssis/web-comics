import json
import requests
from bs4 import BeautifulSoup


class Extractor:

    def __init__(self, cache):
        self._cache = cache

    def set_params(self, headers, **kwargs):
        self._headers = {'User-Agent': headers.get('User-Agent')}
        self._url = kwargs.get('url')
        self._url_preffix = kwargs.get('url_preffix')
        self._first_page_suffix = kwargs.get('first_page_suffix')
        self._next_page_suffix = kwargs.get('next_page_suffix')
        self._extract = kwargs.get('extract')
        return self

    def get_page(self, page=1):
        page_suffix = self._first_page_suffix

        if int(page) > 1:
            page_suffix = self._next_page_suffix

        url = "{}{}".format(self._url, page_suffix.format(page))

        page = self._cache.get_cache(url)

        if page is None:
            try:
                page = requests.get(
                    url=url,
                    headers=self._headers,
                    timeout=45,
                    allow_redirects=True,
                ).text
                self._cache.set_cache(url, page)
            except Exception:
                pass

        self._page = page

        return self

    # def get_next_page(self):
    #     if self._has_next_page:
    #         self._page_number += 1
    #         return self._get_page()
    #     return self

    # def get_prev_page(self):
    #     if self._has_prev_page:
    #         self._page_number -= 1
    #         return self._get_page()
    #     return self

    def extract_comics(self):
        soup = BeautifulSoup(self._page, 'html.parser')

        results = []

        for html_elements in soup.find_all(self._extract['from'], **self._extract['args']):
            extracteds = []

            for html_element in html_elements.find_all(self._extract['target']):
                if any(pattern in html_element[self._extract['atribute']] for pattern in self._extract['patterns']):
                    extracteds.append("{}{}".format(
                        self._url_preffix, html_element[self._extract['atribute']]))

            results += extracteds

        comic = {
            'title': soup.title.string,
            'results': results
        }

        return comic
