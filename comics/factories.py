from cache import RepoCache
from extractor import Extractor
from comics import Comics


class CacheFactory:
    @staticmethod
    def get():
        return RepoCache()


class ExtractorFactory:
    @staticmethod
    def get():
        return Extractor(CacheFactory.get())


class ComicsFactory:
    @staticmethod
    def get():
        return Comics(ExtractorFactory.get())
