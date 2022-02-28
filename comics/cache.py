import os
from pymemcache.client import base


class RepoCache:
    def __init__(self, timeout=18000, version=None):
        cache_host = os.environ.get('CACHE_HOST')
        cache_port = os.environ.get('CACHE_PORT')
        # cache_username = os.environ.get('CACHE_USERNAME')
        # cache_password = os.environ.get('CACHE_PASSWORD')

        self._cache = base.Client((cache_host, cache_port))
        # self._cache = bmemcached.Client(
        # [cache_host], username=cache_username, password=cache_password)

        self._timeout = timeout
        self._version = version

    def get_cache(self, key):
        return self._cache.get(key)

    def set_cache(self, key, value):
        return self._cache.set(key, value, self._timeout)

    def delete_cache(self, key):
        return self._cache.delete(key, self._version)
